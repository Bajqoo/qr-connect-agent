import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Verify calling user is admin
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user: caller }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !caller) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check admin or manager role
    const { data: callerRoles } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", caller.id);

    const isAdmin = callerRoles?.some((r: any) => r.role === "admin");
    const isManager = callerRoles?.some((r: any) => r.role === "manager");

    if (!isAdmin && !isManager) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action, ...body } = await req.json();

    if (action === "create-user") {
      const { email, password, full_name, phone, role, agent_type, commission_rate, manager_cut } = body;

      // Only admins can create managers; managers can create agents
      if (role === "manager" && !isAdmin) {
        return new Response(JSON.stringify({ error: "Only admins can create managers" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (role === "agent" && !isAdmin && !isManager) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Create auth user
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name },
      });

      if (createError) {
        return new Response(JSON.stringify({ error: createError.message }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Update profile with additional info
      await supabaseAdmin
        .from("profiles")
        .update({
          phone,
          agent_type: agent_type || null,
          commission_rate: commission_rate || 4.00,
          manager_cut: manager_cut || 1.00,
        })
        .eq("user_id", newUser.user!.id);

      // Assign role
      await supabaseAdmin
        .from("user_roles")
        .insert({ user_id: newUser.user!.id, role });

      // If manager created this agent, link them
      if (isManager && role === "agent") {
        const { data: managerProfile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("user_id", caller.id)
          .single();

        const { data: agentProfile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("user_id", newUser.user!.id)
          .single();

        if (managerProfile && agentProfile) {
          await supabaseAdmin
            .from("manager_agents")
            .insert({ manager_id: managerProfile.id, agent_id: agentProfile.id });
        }
      }

      return new Response(JSON.stringify({ user: newUser.user }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "update-status") {
      const { profile_id, status } = body;

      await supabaseAdmin
        .from("profiles")
        .update({ status })
        .eq("id", profile_id);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "get-users-by-role") {
      const { role } = body;

      const { data: roleUsers } = await supabaseAdmin
        .from("user_roles")
        .select("user_id")
        .eq("role", role);

      if (!roleUsers?.length) {
        return new Response(JSON.stringify({ users: [] }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const userIds = roleUsers.map((r: any) => r.user_id);
      const { data: profiles } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .in("user_id", userIds);

      // If requesting agents for a manager, filter to only their agents
      if (role === "agent" && isManager && !isAdmin) {
        const { data: managerProfile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("user_id", caller.id)
          .single();

        const { data: agentLinks } = await supabaseAdmin
          .from("manager_agents")
          .select("agent_id")
          .eq("manager_id", managerProfile?.id);

        const agentIds = agentLinks?.map((l: any) => l.agent_id) || [];
        const filtered = profiles?.filter((p: any) => agentIds.includes(p.id)) || [];

        return new Response(JSON.stringify({ users: filtered }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ users: profiles || [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

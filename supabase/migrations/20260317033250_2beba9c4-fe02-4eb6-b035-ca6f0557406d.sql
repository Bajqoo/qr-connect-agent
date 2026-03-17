
-- Fix recursive RLS policies on profiles/manager_agents.

CREATE OR REPLACE FUNCTION public.current_profile_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id
  FROM public.profiles
  WHERE user_id = auth.uid()
  LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.is_manager_of_agent(_agent_profile_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.manager_agents
    WHERE manager_id = public.current_profile_id()
      AND agent_id = _agent_profile_id
  )
$$;

DROP POLICY IF EXISTS "Managers can view their agents" ON public.profiles;
DROP POLICY IF EXISTS "Managers can update their agents" ON public.profiles;
DROP POLICY IF EXISTS "Managers can view own agents" ON public.manager_agents;
DROP POLICY IF EXISTS "Managers can insert agent links" ON public.manager_agents;

CREATE POLICY "Managers can view their agents"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'manager')
  AND (
    user_id = auth.uid()
    OR public.is_manager_of_agent(id)
  )
);

CREATE POLICY "Managers can update their agents"
ON public.profiles
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'manager')
  AND public.is_manager_of_agent(id)
)
WITH CHECK (
  public.has_role(auth.uid(), 'manager')
  AND public.is_manager_of_agent(id)
);

CREATE POLICY "Managers can view own agents"
ON public.manager_agents
FOR SELECT
TO authenticated
USING (
  manager_id = public.current_profile_id()
);

CREATE POLICY "Managers can insert agent links"
ON public.manager_agents
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'manager')
  AND manager_id = public.current_profile_id()
);

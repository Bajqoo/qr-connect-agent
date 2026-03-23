
-- Add agent tier enum
CREATE TYPE public.agent_tier AS ENUM ('bronze', 'silver', 'gold');

-- Add tier, total_earned, balance_payable to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS tier public.agent_tier DEFAULT 'bronze',
  ADD COLUMN IF NOT EXISTS total_earned numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS balance_payable numeric DEFAULT 0;

-- Add release_date to commissions for holding period logic
ALTER TABLE public.commissions
  ADD COLUMN IF NOT EXISTS release_date timestamp with time zone;

-- Create payout_requests table
CREATE TABLE public.payout_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  method text,
  method_details jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  processed_at timestamp with time zone,
  notes text
);

ALTER TABLE public.payout_requests ENABLE ROW LEVEL SECURITY;

-- RLS: Agents can view own payout requests
CREATE POLICY "Agents can view own payout_requests"
  ON public.payout_requests FOR SELECT TO authenticated
  USING (agent_id = public.current_profile_id());

-- RLS: Agents can insert own payout requests
CREATE POLICY "Agents can insert own payout_requests"
  ON public.payout_requests FOR INSERT TO authenticated
  WITH CHECK (agent_id = public.current_profile_id());

-- RLS: Admins can manage all payout_requests
CREATE POLICY "Admins can manage payout_requests"
  ON public.payout_requests FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS: Managers can view agent payout_requests
CREATE POLICY "Managers can view agent payout_requests"
  ON public.payout_requests FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'manager') AND public.is_manager_of_agent(agent_id));

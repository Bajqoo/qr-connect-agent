
-- Referral clicks table (detailed tracking with device fingerprint)
CREATE TABLE public.referral_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code text NOT NULL,
  agent_id uuid REFERENCES public.profiles(id),
  device_id text,
  ip_address text,
  user_agent text,
  country text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.referral_clicks ENABLE ROW LEVEL SECURITY;

-- Anyone can insert clicks (public tracking)
CREATE POLICY "Anyone can insert clicks"
  ON public.referral_clicks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Agents can view their own clicks
CREATE POLICY "Agents can view own clicks"
  ON public.referral_clicks FOR SELECT
  TO authenticated
  USING (agent_id = current_profile_id());

-- Admins can view all clicks
CREATE POLICY "Admins can view all clicks"
  ON public.referral_clicks FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Orders table
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email text NOT NULL,
  customer_name text,
  product_id text,
  product_name text,
  price numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'EUR',
  agent_id uuid REFERENCES public.profiles(id),
  referral_code text,
  device_id text,
  ip_address text,
  commission numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Agents can view orders attributed to them
CREATE POLICY "Agents can view own orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING (agent_id = current_profile_id());

-- Admins can manage all orders
CREATE POLICY "Admins can manage all orders"
  ON public.orders FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Managers can view their agents' orders
CREATE POLICY "Managers can view agent orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING (
    has_role(auth.uid(), 'manager'::app_role)
    AND is_manager_of_agent(agent_id)
  );

-- Commissions table
CREATE TABLE public.commissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid NOT NULL REFERENCES public.profiles(id),
  order_id uuid NOT NULL REFERENCES public.orders(id),
  amount numeric NOT NULL DEFAULT 4.00,
  currency text NOT NULL DEFAULT 'EUR',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  paid_at timestamptz
);

ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;

-- Agents can view own commissions
CREATE POLICY "Agents can view own commissions"
  ON public.commissions FOR SELECT
  TO authenticated
  USING (agent_id = current_profile_id());

-- Admins can manage all commissions
CREATE POLICY "Admins can manage all commissions"
  ON public.commissions FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Managers can view their agents' commissions
CREATE POLICY "Managers can view agent commissions"
  ON public.commissions FOR SELECT
  TO authenticated
  USING (
    has_role(auth.uid(), 'manager'::app_role)
    AND is_manager_of_agent(agent_id)
  );

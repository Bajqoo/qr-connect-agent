
CREATE TABLE public.referral_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code text NOT NULL,
  country text,
  scanned_at timestamptz NOT NULL DEFAULT now(),
  ip_address text,
  user_agent text
);

-- Enable RLS
ALTER TABLE public.referral_scans ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (scans come from unauthenticated visitors)
CREATE POLICY "Anyone can insert scans"
  ON public.referral_scans
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Agents can view scans for their own referral code
CREATE POLICY "Agents can view own scans"
  ON public.referral_scans
  FOR SELECT
  TO authenticated
  USING (
    referral_code IN (
      SELECT p.referral_code FROM public.profiles p WHERE p.user_id = auth.uid()
    )
  );

-- Admins can view all scans
CREATE POLICY "Admins can view all scans"
  ON public.referral_scans
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

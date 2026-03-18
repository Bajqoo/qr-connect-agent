
-- Allow newly registered users to insert their own agent role
CREATE POLICY "Users can insert own agent role"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid() AND role = 'agent'::app_role);

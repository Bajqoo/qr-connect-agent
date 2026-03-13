
-- Add preferred_locale column to profiles
ALTER TABLE public.profiles ADD COLUMN preferred_locale text DEFAULT NULL;

-- Allow users to update their own profile (currently missing)
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

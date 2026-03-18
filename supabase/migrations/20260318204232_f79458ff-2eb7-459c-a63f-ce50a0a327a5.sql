
-- Add a unique short referral_code to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referral_code text UNIQUE;

-- Generate referral codes for existing profiles that don't have one
UPDATE public.profiles
SET referral_code = UPPER(SUBSTR(MD5(id::text), 1, 8))
WHERE referral_code IS NULL;

-- Create a function to auto-generate referral_code on insert
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := UPPER(SUBSTR(MD5(NEW.id::text), 1, 8));
  END IF;
  RETURN NEW;
END;
$function$;

CREATE TRIGGER set_referral_code
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_referral_code();

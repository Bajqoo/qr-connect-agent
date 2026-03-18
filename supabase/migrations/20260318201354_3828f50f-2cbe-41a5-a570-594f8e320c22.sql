
ALTER TABLE public.profiles
  ADD COLUMN bank_name text,
  ADD COLUMN iban text,
  ADD COLUMN account_holder_name text,
  ADD COLUMN swift_bic text;

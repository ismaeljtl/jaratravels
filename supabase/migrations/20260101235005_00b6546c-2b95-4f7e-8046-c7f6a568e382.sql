-- Add explicit SELECT policy that denies access to anon/authenticated users
-- Service role (used by admin edge functions) bypasses RLS automatically
CREATE POLICY "No public selects from bookings"
ON public.bookings
FOR SELECT
TO anon, authenticated
USING (false);
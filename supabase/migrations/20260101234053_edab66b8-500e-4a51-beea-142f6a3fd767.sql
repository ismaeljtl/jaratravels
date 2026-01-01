-- Add explicit UPDATE policy that denies access to anon/authenticated users
-- Service role (used by admin edge functions) bypasses RLS automatically
CREATE POLICY "No public updates to bookings"
ON public.bookings
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- Add explicit DELETE policy that denies access to anon/authenticated users
-- Service role (used by admin edge functions) bypasses RLS automatically
CREATE POLICY "No public deletes from bookings"
ON public.bookings
FOR DELETE
TO anon, authenticated
USING (false);
-- Drop the existing misleading RLS policies
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Only service role can read bookings" ON public.bookings;
DROP POLICY IF EXISTS "Service role can delete bookings" ON public.bookings;
DROP POLICY IF EXISTS "Service role can update bookings" ON public.bookings;

-- Create proper RLS policies

-- INSERT: Allow anyone to create bookings (public booking form)
-- This is a PERMISSIVE policy that allows public booking submissions
CREATE POLICY "Public can create bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- SELECT: No policy for anon/authenticated means they cannot read
-- Service role (used by edge functions) bypasses RLS automatically
-- This ensures only the admin edge function can read bookings

-- UPDATE: No policy for anon/authenticated means they cannot update
-- Service role (used by edge functions) bypasses RLS automatically

-- DELETE: No policy for anon/authenticated means they cannot delete
-- Service role (used by edge functions) bypasses RLS automatically
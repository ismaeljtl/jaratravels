-- Fix bookings table: restrict SELECT to service_role only
DROP POLICY IF EXISTS "Service role can read all bookings" ON public.bookings;

CREATE POLICY "Only service role can read bookings"
ON public.bookings
FOR SELECT
TO service_role
USING (true);

-- Fix rate_limits table: restrict SELECT to service_role only
DROP POLICY IF EXISTS "Service role can manage rate limits" ON public.rate_limits;

CREATE POLICY "Only service role can manage rate limits"
ON public.rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
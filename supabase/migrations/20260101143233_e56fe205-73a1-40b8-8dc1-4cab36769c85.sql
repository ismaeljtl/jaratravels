-- Drop the ALL policy and create explicit separate policies for rate_limits
DROP POLICY IF EXISTS "Only service role can manage rate limits" ON public.rate_limits;

-- Explicit SELECT policy for service_role only
CREATE POLICY "Only service role can select rate limits"
ON public.rate_limits
FOR SELECT
TO service_role
USING (true);

-- Explicit INSERT policy for service_role only
CREATE POLICY "Only service role can insert rate limits"
ON public.rate_limits
FOR INSERT
TO service_role
WITH CHECK (true);

-- Explicit UPDATE policy for service_role only
CREATE POLICY "Only service role can update rate limits"
ON public.rate_limits
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Explicit DELETE policy for service_role only
CREATE POLICY "Only service role can delete rate limits"
ON public.rate_limits
FOR DELETE
TO service_role
USING (true);
-- Drop the existing INSERT policy that allows public access
DROP POLICY IF EXISTS "Public can create bookings" ON public.bookings;

-- Create a new restrictive INSERT policy that denies direct public inserts
-- Bookings will only be created through the create-booking edge function using service_role
CREATE POLICY "No direct public inserts to bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (false);
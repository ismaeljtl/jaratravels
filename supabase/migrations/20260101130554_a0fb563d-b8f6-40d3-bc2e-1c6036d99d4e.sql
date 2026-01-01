-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_name TEXT NOT NULL,
  service_price TEXT NOT NULL,
  service_duration TEXT NOT NULL,
  booking_date DATE NOT NULL,
  participants INTEGER NOT NULL DEFAULT 1,
  payment_method TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Constraints
  CONSTRAINT valid_email CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  CONSTRAINT valid_participants CHECK (participants > 0 AND participants <= 50),
  CONSTRAINT valid_payment_method CHECK (payment_method IN ('mbway', 'bank-transfer', 'paypal')),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'))
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to INSERT bookings (public booking form)
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: Only service role can read bookings (admin access via Edge Functions)
-- No public SELECT policy = customers cannot see other bookings
CREATE POLICY "Service role can read all bookings"
ON public.bookings
FOR SELECT
TO service_role
USING (true);

-- Policy: Only service role can update bookings (admin operations)
CREATE POLICY "Service role can update bookings"
ON public.bookings
FOR UPDATE
TO service_role
USING (true);

-- Policy: Only service role can delete bookings (admin operations)
CREATE POLICY "Service role can delete bookings"
ON public.bookings
FOR DELETE
TO service_role
USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for common queries
CREATE INDEX idx_bookings_email ON public.bookings(email);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_created_at ON public.bookings(created_at DESC);
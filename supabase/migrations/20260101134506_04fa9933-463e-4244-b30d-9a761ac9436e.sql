-- Create rate_limits table to track submission attempts
CREATE TABLE public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL, -- email or IP address
  action TEXT NOT NULL DEFAULT 'booking',
  attempts INTEGER NOT NULL DEFAULT 1,
  first_attempt_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_attempt_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_rate_limits_identifier_action ON public.rate_limits(identifier, action);
CREATE INDEX idx_rate_limits_last_attempt ON public.rate_limits(last_attempt_at);

-- Enable RLS
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Only service role can access this table
CREATE POLICY "Service role can manage rate limits"
ON public.rate_limits
FOR ALL
USING (true)
WITH CHECK (true);

-- Function to check and update rate limit
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_identifier TEXT,
  p_action TEXT DEFAULT 'booking',
  p_max_attempts INTEGER DEFAULT 5,
  p_window_minutes INTEGER DEFAULT 60
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_record rate_limits%ROWTYPE;
  v_window_start TIMESTAMP WITH TIME ZONE;
  v_is_allowed BOOLEAN;
  v_remaining INTEGER;
BEGIN
  v_window_start := now() - (p_window_minutes || ' minutes')::INTERVAL;
  
  -- Get existing record
  SELECT * INTO v_record
  FROM rate_limits
  WHERE identifier = p_identifier AND action = p_action;
  
  IF v_record.id IS NULL THEN
    -- No record exists, create one
    INSERT INTO rate_limits (identifier, action, attempts, first_attempt_at, last_attempt_at)
    VALUES (p_identifier, p_action, 1, now(), now());
    
    RETURN jsonb_build_object(
      'allowed', true,
      'remaining', p_max_attempts - 1,
      'reset_at', now() + (p_window_minutes || ' minutes')::INTERVAL
    );
  END IF;
  
  -- Check if window has expired
  IF v_record.first_attempt_at < v_window_start THEN
    -- Reset the counter
    UPDATE rate_limits
    SET attempts = 1, first_attempt_at = now(), last_attempt_at = now()
    WHERE id = v_record.id;
    
    RETURN jsonb_build_object(
      'allowed', true,
      'remaining', p_max_attempts - 1,
      'reset_at', now() + (p_window_minutes || ' minutes')::INTERVAL
    );
  END IF;
  
  -- Check if limit exceeded
  IF v_record.attempts >= p_max_attempts THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'remaining', 0,
      'reset_at', v_record.first_attempt_at + (p_window_minutes || ' minutes')::INTERVAL,
      'retry_after', EXTRACT(EPOCH FROM (v_record.first_attempt_at + (p_window_minutes || ' minutes')::INTERVAL - now()))::INTEGER
    );
  END IF;
  
  -- Increment counter
  UPDATE rate_limits
  SET attempts = attempts + 1, last_attempt_at = now()
  WHERE id = v_record.id;
  
  v_remaining := p_max_attempts - v_record.attempts - 1;
  
  RETURN jsonb_build_object(
    'allowed', true,
    'remaining', v_remaining,
    'reset_at', v_record.first_attempt_at + (p_window_minutes || ' minutes')::INTERVAL
  );
END;
$$;

-- Function to clean up old rate limit records (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM rate_limits
  WHERE last_attempt_at < now() - INTERVAL '24 hours';
END;
$$;
-- Create tables for Gulf Unified Platform

-- Chalets table
CREATE TABLE IF NOT EXISTS public.chalets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country_code TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  default_price DECIMAL(10,2) NOT NULL,
  images TEXT[] DEFAULT '{}',
  provider_id TEXT,
  verified BOOLEAN DEFAULT false,
  amenities TEXT[] DEFAULT '{}',
  capacity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Shipping carriers table
CREATE TABLE IF NOT EXISTS public.shipping_carriers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country_code TEXT NOT NULL,
  services TEXT[] DEFAULT '{}',
  contact TEXT,
  website TEXT,
  logo_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Links table (for payment links)
CREATE TABLE IF NOT EXISTS public.links (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  country_code TEXT NOT NULL,
  provider_id TEXT,
  payload JSONB NOT NULL,
  microsite_url TEXT NOT NULL,
  payment_url TEXT NOT NULL,
  signature TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  otp TEXT,
  attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP WITH TIME ZONE,
  receipt_url TEXT,
  cardholder_name TEXT,
  last_four TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  FOREIGN KEY (link_id) REFERENCES public.links(id) ON DELETE SET NULL
);

-- Enable RLS on all tables
ALTER TABLE public.chalets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_carriers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS policies for public read access (since these are public services)
CREATE POLICY "Allow public read access to chalets"
  ON public.chalets FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to shipping_carriers"
  ON public.shipping_carriers FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to links"
  ON public.links FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read access to links"
  ON public.links FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to payments"
  ON public.payments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read access to payments"
  ON public.payments FOR SELECT
  USING (true);

CREATE POLICY "Allow public update to payments"
  ON public.payments FOR UPDATE
  USING (true);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chalets_country ON public.chalets(country_code);
CREATE INDEX IF NOT EXISTS idx_carriers_country ON public.shipping_carriers(country_code);
CREATE INDEX IF NOT EXISTS idx_links_country ON public.links(country_code);
CREATE INDEX IF NOT EXISTS idx_payments_link ON public.payments(link_id);

-- Trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables
CREATE TRIGGER update_chalets_updated_at
  BEFORE UPDATE ON public.chalets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_carriers_updated_at
  BEFORE UPDATE ON public.shipping_carriers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_links_updated_at
  BEFORE UPDATE ON public.links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
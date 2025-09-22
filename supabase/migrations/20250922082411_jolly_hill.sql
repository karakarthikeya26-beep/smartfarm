/*
  # Smart Farming Database Schema

  1. New Tables
    - `farm_profiles`
      - `id` (uuid, primary key)
      - `user_id` (text, for future auth integration)
      - `farm_size` (numeric, in acres)
      - `soil_type` (text)
      - `elevation` (numeric, in meters)
      - `location` (text, address)
      - `water_source` (text)
      - `current_crops` (text array)
      - `latitude` (numeric, GPS coordinate)
      - `longitude` (numeric, GPS coordinate)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `crops`
      - `id` (uuid, primary key)
      - `farm_id` (uuid, foreign key)
      - `crop_name` (text)
      - `planting_date` (date)
      - `expected_harvest` (date)
      - `area` (numeric, in acres)
      - `variety` (text)
      - `status` (text, enum: planted/growing/harvested)
      - `yield_actual` (numeric, optional)
      - `yield_expected` (numeric)
      - `created_at` (timestamp)

    - `irrigation_logs`
      - `id` (uuid, primary key)
      - `farm_id` (uuid, foreign key)
      - `zone_name` (text)
      - `duration_minutes` (integer)
      - `water_amount_liters` (numeric)
      - `soil_moisture_before` (numeric, percentage)
      - `soil_moisture_after` (numeric, percentage)
      - `irrigation_date` (timestamp)
      - `created_at` (timestamp)

    - `weather_logs`
      - `id` (uuid, primary key)
      - `farm_id` (uuid, foreign key)
      - `temperature` (numeric)
      - `humidity` (numeric)
      - `wind_speed` (numeric)
      - `rainfall` (numeric)
      - `pressure` (numeric)
      - `recorded_at` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data

  3. Storage
    - Create buckets for file uploads (soil tests, crop images, etc.)
*/

-- Create farm_profiles table
CREATE TABLE IF NOT EXISTS farm_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  farm_size numeric NOT NULL,
  soil_type text NOT NULL,
  elevation numeric DEFAULT 0,
  location text NOT NULL,
  water_source text NOT NULL,
  current_crops text[] DEFAULT '{}',
  latitude numeric,
  longitude numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create crops table
CREATE TABLE IF NOT EXISTS crops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id uuid NOT NULL REFERENCES farm_profiles(id) ON DELETE CASCADE,
  crop_name text NOT NULL,
  planting_date date NOT NULL,
  expected_harvest date NOT NULL,
  area numeric NOT NULL,
  variety text DEFAULT '',
  status text DEFAULT 'planted' CHECK (status IN ('planted', 'growing', 'harvested')),
  yield_actual numeric,
  yield_expected numeric,
  created_at timestamptz DEFAULT now()
);

-- Create irrigation_logs table
CREATE TABLE IF NOT EXISTS irrigation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id uuid NOT NULL REFERENCES farm_profiles(id) ON DELETE CASCADE,
  zone_name text NOT NULL,
  duration_minutes integer NOT NULL,
  water_amount_liters numeric NOT NULL,
  soil_moisture_before numeric NOT NULL,
  soil_moisture_after numeric NOT NULL,
  irrigation_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create weather_logs table
CREATE TABLE IF NOT EXISTS weather_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id uuid NOT NULL REFERENCES farm_profiles(id) ON DELETE CASCADE,
  temperature numeric NOT NULL,
  humidity numeric NOT NULL,
  wind_speed numeric NOT NULL,
  rainfall numeric DEFAULT 0,
  pressure numeric NOT NULL,
  recorded_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE farm_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE irrigation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for farm_profiles
CREATE POLICY "Users can manage their own farm profiles"
  ON farm_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Allow anonymous access for demo"
  ON farm_profiles
  FOR ALL
  TO anon
  USING (true);

-- Create policies for crops
CREATE POLICY "Users can manage crops on their farms"
  ON crops
  FOR ALL
  TO authenticated
  USING (
    farm_id IN (
      SELECT id FROM farm_profiles WHERE user_id = auth.uid()::text
    )
  );

CREATE POLICY "Allow anonymous access for crops demo"
  ON crops
  FOR ALL
  TO anon
  USING (true);

-- Create policies for irrigation_logs
CREATE POLICY "Users can manage irrigation logs for their farms"
  ON irrigation_logs
  FOR ALL
  TO authenticated
  USING (
    farm_id IN (
      SELECT id FROM farm_profiles WHERE user_id = auth.uid()::text
    )
  );

CREATE POLICY "Allow anonymous access for irrigation demo"
  ON irrigation_logs
  FOR ALL
  TO anon
  USING (true);

-- Create policies for weather_logs
CREATE POLICY "Users can manage weather logs for their farms"
  ON weather_logs
  FOR ALL
  TO authenticated
  USING (
    farm_id IN (
      SELECT id FROM farm_profiles WHERE user_id = auth.uid()::text
    )
  );

CREATE POLICY "Allow anonymous access for weather demo"
  ON weather_logs
  FOR ALL
  TO anon
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_farm_profiles_user_id ON farm_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_crops_farm_id ON crops(farm_id);
CREATE INDEX IF NOT EXISTS idx_irrigation_logs_farm_id ON irrigation_logs(farm_id);
CREATE INDEX IF NOT EXISTS idx_weather_logs_farm_id ON weather_logs(farm_id);
CREATE INDEX IF NOT EXISTS idx_weather_logs_recorded_at ON weather_logs(recorded_at);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('farm-documents', 'farm-documents', true),
  ('soil-tests', 'soil-tests', true),
  ('crop-images', 'crop-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Allow public uploads to farm-documents"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'farm-documents');

CREATE POLICY "Allow public access to farm-documents"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'farm-documents');

CREATE POLICY "Allow public uploads to soil-tests"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'soil-tests');

CREATE POLICY "Allow public access to soil-tests"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'soil-tests');

CREATE POLICY "Allow public uploads to crop-images"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'crop-images');

CREATE POLICY "Allow public access to crop-images"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'crop-images');
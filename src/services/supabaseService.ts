import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface FarmProfile {
  id?: string;
  user_id: string;
  farm_size: number;
  soil_type: string;
  elevation: number;
  location: string;
  water_source: string;
  current_crops: string[];
  latitude?: number;
  longitude?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CropData {
  id?: string;
  farm_id: string;
  crop_name: string;
  planting_date: string;
  expected_harvest: string;
  area: number;
  variety: string;
  status: 'planted' | 'growing' | 'harvested';
  yield_actual?: number;
  yield_expected?: number;
  created_at?: string;
}

export interface IrrigationLog {
  id?: string;
  farm_id: string;
  zone_name: string;
  duration_minutes: number;
  water_amount_liters: number;
  soil_moisture_before: number;
  soil_moisture_after: number;
  irrigation_date: string;
  created_at?: string;
}

export interface WeatherLog {
  id?: string;
  farm_id: string;
  temperature: number;
  humidity: number;
  wind_speed: number;
  rainfall: number;
  pressure: number;
  recorded_at: string;
  created_at?: string;
}

export class SupabaseService {
  // Farm Profile Operations
  async createFarmProfile(profile: Omit<FarmProfile, 'id' | 'created_at' | 'updated_at'>): Promise<FarmProfile | null> {
    try {
      const { data, error } = await supabase
        .from('farm_profiles')
        .insert([profile])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating farm profile:', error);
      return null;
    }
  }

  async updateFarmProfile(id: string, updates: Partial<FarmProfile>): Promise<FarmProfile | null> {
    try {
      const { data, error } = await supabase
        .from('farm_profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating farm profile:', error);
      return null;
    }
  }

  async getFarmProfile(userId: string): Promise<FarmProfile | null> {
    try {
      const { data, error } = await supabase
        .from('farm_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching farm profile:', error);
      return null;
    }
  }

  // Crop Operations
  async addCrop(crop: Omit<CropData, 'id' | 'created_at'>): Promise<CropData | null> {
    try {
      const { data, error } = await supabase
        .from('crops')
        .insert([crop])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding crop:', error);
      return null;
    }
  }

  async getCrops(farmId: string): Promise<CropData[]> {
    try {
      const { data, error } = await supabase
        .from('crops')
        .select('*')
        .eq('farm_id', farmId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching crops:', error);
      return [];
    }
  }

  async updateCrop(id: string, updates: Partial<CropData>): Promise<CropData | null> {
    try {
      const { data, error } = await supabase
        .from('crops')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating crop:', error);
      return null;
    }
  }

  // Irrigation Logs
  async logIrrigation(log: Omit<IrrigationLog, 'id' | 'created_at'>): Promise<IrrigationLog | null> {
    try {
      const { data, error } = await supabase
        .from('irrigation_logs')
        .insert([log])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error logging irrigation:', error);
      return null;
    }
  }

  async getIrrigationLogs(farmId: string, days: number = 7): Promise<IrrigationLog[]> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data, error } = await supabase
        .from('irrigation_logs')
        .select('*')
        .eq('farm_id', farmId)
        .gte('irrigation_date', startDate.toISOString())
        .order('irrigation_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching irrigation logs:', error);
      return [];
    }
  }

  // Weather Logs
  async logWeather(log: Omit<WeatherLog, 'id' | 'created_at'>): Promise<WeatherLog | null> {
    try {
      const { data, error } = await supabase
        .from('weather_logs')
        .insert([log])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error logging weather:', error);
      return null;
    }
  }

  async getWeatherLogs(farmId: string, days: number = 30): Promise<WeatherLog[]> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data, error } = await supabase
        .from('weather_logs')
        .select('*')
        .eq('farm_id', farmId)
        .gte('recorded_at', startDate.toISOString())
        .order('recorded_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching weather logs:', error);
      return [];
    }
  }

  // File Upload
  async uploadFile(file: File, bucket: string, path: string): Promise<string | null> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  }

  async deleteFile(bucket: string, path: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }
}
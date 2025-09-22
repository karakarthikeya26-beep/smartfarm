import { useState, useEffect } from 'react';
import { LocationService, LocationData } from '../services/locationService';

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  const locationService = new LocationService();

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      const locationData = await locationService.getCurrentLocation();
      setLocation(locationData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location');
      console.error('Location error:', err);
    } finally {
      setLoading(false);
    }
  };

  const startWatching = () => {
    if (watchId) return; // Already watching

    const id = locationService.watchLocation(
      (locationData) => {
        setLocation(locationData);
        setError(null);
      },
      (err) => {
        setError(err.message);
        console.error('Location watch error:', err);
      }
    );

    setWatchId(id);
  };

  const stopWatching = () => {
    if (watchId) {
      locationService.stopWatchingLocation(watchId);
      setWatchId(null);
    }
  };

  useEffect(() => {
    return () => {
      if (watchId) {
        locationService.stopWatchingLocation(watchId);
      }
    };
  }, [watchId]);

  return {
    location,
    loading,
    error,
    getCurrentLocation,
    startWatching,
    stopWatching,
    isWatching: watchId !== null
  };
};
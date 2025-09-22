export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
  accuracy: number;
}

export class LocationService {
  async getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude, accuracy } = position.coords;
            
            // Reverse geocoding to get address
            const locationData = await this.reverseGeocode(latitude, longitude);
            
            resolve({
              latitude,
              longitude,
              accuracy: accuracy || 0,
              ...locationData
            });
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          let errorMessage = 'Unable to get location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          
          reject(new Error(errorMessage));
        },
        options
      );
    });
  }

  async reverseGeocode(lat: number, lon: number): Promise<{city: string, state: string, country: string}> {
    try {
      // Using OpenStreetMap Nominatim API for reverse geocoding (free)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding failed');
      }
      
      const data = await response.json();
      const address = data.address || {};
      
      return {
        city: address.city || address.town || address.village || 'Unknown',
        state: address.state || address.region || 'Unknown',
        country: address.country || 'Unknown'
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return {
        city: 'Unknown',
        state: 'Unknown',
        country: 'Unknown'
      };
    }
  }

  watchLocation(callback: (location: LocationData) => void, errorCallback: (error: Error) => void): number {
    if (!navigator.geolocation) {
      errorCallback(new Error('Geolocation not supported'));
      return 0;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000 // 1 minute
    };

    return navigator.geolocation.watchPosition(
      async (position) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;
          const locationData = await this.reverseGeocode(latitude, longitude);
          
          callback({
            latitude,
            longitude,
            accuracy: accuracy || 0,
            ...locationData
          });
        } catch (error) {
          errorCallback(error as Error);
        }
      },
      (error) => {
        errorCallback(new Error(`Location error: ${error.message}`));
      },
      options
    );
  }

  stopWatchingLocation(watchId: number): void {
    navigator.geolocation.clearWatch(watchId);
  }
}
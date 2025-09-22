import React, { useState } from 'react';
import { MapPin, Navigation, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { useLocation } from '../hooks/useLocation';

interface LocationPickerProps {
  onLocationSelected?: (location: { latitude: number; longitude: number; address: string }) => void;
  showCurrentLocation?: boolean;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelected,
  showCurrentLocation = true
}) => {
  const { location, loading, error, getCurrentLocation } = useLocation();
  const [manualAddress, setManualAddress] = useState('');

  const handleGetCurrentLocation = async () => {
    await getCurrentLocation();
  };

  const handleLocationConfirm = () => {
    if (location && onLocationSelected) {
      onLocationSelected({
        latitude: location.latitude,
        longitude: location.longitude,
        address: `${location.city}, ${location.state}, ${location.country}`
      });
    }
  };

  const formatCoordinates = (lat: number, lon: number) => {
    return `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
  };

  const formatAccuracy = (accuracy: number) => {
    if (accuracy < 1000) {
      return `±${Math.round(accuracy)}m`;
    }
    return `±${(accuracy / 1000).toFixed(1)}km`;
  };

  return (
    <div className="space-y-4">
      {showCurrentLocation && (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Current Location</h4>
            <button
              onClick={handleGetCurrentLocation}
              disabled={loading}
              className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4" />
              )}
              <span>{loading ? 'Getting Location...' : 'Get Location'}</span>
            </button>
          </div>

          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {location && (
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium text-green-800">Location Found</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">
                      {location.city}, {location.state}, {location.country}
                    </span>
                  </div>
                  
                  <div className="text-gray-600">
                    <strong>Coordinates:</strong> {formatCoordinates(location.latitude, location.longitude)}
                  </div>
                  
                  {location.accuracy > 0 && (
                    <div className="text-gray-600">
                      <strong>Accuracy:</strong> {formatAccuracy(location.accuracy)}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleLocationConfirm}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Use This Location
              </button>
            </div>
          )}
        </div>
      )}

      <div className="border rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Manual Address Entry</h4>
        <div className="space-y-3">
          <textarea
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            placeholder="Enter your farm address (e.g., Village Name, Taluka, District, State, PIN)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <button
            onClick={() => {
              if (manualAddress.trim() && onLocationSelected) {
                onLocationSelected({
                  latitude: 0,
                  longitude: 0,
                  address: manualAddress.trim()
                });
              }
            }}
            disabled={!manualAddress.trim()}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Use Manual Address
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>• GPS location provides more accurate weather data and recommendations</p>
        <p>• Location data is used only for agricultural insights and is kept secure</p>
        <p>• You can update your location anytime in the farm profile</p>
      </div>
    </div>
  );
};

export default LocationPicker;
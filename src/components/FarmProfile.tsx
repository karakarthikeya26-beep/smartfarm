import React, { useState } from 'react';
import { MapPin, Save } from 'lucide-react';
import FileUpload from './FileUpload';
import LocationPicker from './LocationPicker';

interface FarmProfileProps {
  farmData: {
    farmSize: string;
    soilType: string;
    elevation: string;
    location: string;
    waterSource: string;
    currentCrops: string[];
  };
  setFarmData: (data: any) => void;
}

const FarmProfile: React.FC<FarmProfileProps> = ({ farmData, setFarmData }) => {
  const [localData, setLocalData] = useState(farmData);

  const soilTypes = [
    'Clay', 'Sandy', 'Loamy', 'Silty', 'Peaty', 'Chalky'
  ];

  const waterSources = [
    'Rainwater', 'Borewell', 'Canal', 'River', 'Pond', 'Drip Irrigation'
  ];

  const cropOptions = [
    'Rice', 'Wheat', 'Corn', 'Tomatoes', 'Potatoes', 'Onions', 
    'Cabbage', 'Carrots', 'Beans', 'Cotton', 'Sugarcane', 'Soybeans'
  ];

  const handleInputChange = (field: string, value: any) => {
    setLocalData({ ...localData, [field]: value });
  };

  const handleSave = () => {
    setFarmData(localData);
    // Here you would typically save to a database
    alert('Farm profile saved successfully!');
  };

  const handleCropToggle = (crop: string) => {
    const currentCrops = localData.currentCrops || [];
    const isSelected = currentCrops.includes(crop);
    
    if (isSelected) {
      handleInputChange('currentCrops', currentCrops.filter(c => c !== crop));
    } else {
      handleInputChange('currentCrops', [...currentCrops, crop]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <MapPin className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Farm Profile Setup</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Farm Size (acres)
              </label>
              <input
                type="number"
                value={localData.farmSize}
                onChange={(e) => handleInputChange('farmSize', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter farm size in acres"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location (City, State)
              </label>
              <input
                type="text"
                value={localData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Pune, Maharashtra"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Elevation (meters)
              </label>
              <input
                type="number"
                value={localData.elevation}
                onChange={(e) => handleInputChange('elevation', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter elevation in meters"
              />
            </div>
          </div>

          {/* Soil and Water Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Soil Type
              </label>
              <select
                value={localData.soilType}
                onChange={(e) => handleInputChange('soilType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select soil type</option>
                {soilTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water Source
              </label>
              <select
                value={localData.waterSource}
                onChange={(e) => handleInputChange('waterSource', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select water source</option>
                {waterSources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPS Coordinates (Optional)
              </label>
              <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-green-400 hover:text-green-600 transition-colors">
                Click to get current location
              </button>
            </div>
          </div>
        </div>

        {/* Current Crops */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Current Crops (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cropOptions.map(crop => (
              <button
                key={crop}
                onClick={() => handleCropToggle(crop)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  (localData.currentCrops || []).includes(crop)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        {/* Location Selection */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Farm Location
          </label>
          <LocationPicker
            onLocationSelected={(location) => {
              handleInputChange('location', location.address);
              if (location.latitude && location.longitude) {
                handleInputChange('latitude', location.latitude);
                handleInputChange('longitude', location.longitude);
              }
            }}
          />
        </div>

        {/* Soil Test Upload */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Soil Test Results (Optional)
          </label>
          <FileUpload
            onFileUploaded={(url, fileName) => {
              console.log('Soil test uploaded:', fileName, url);
              // You can store this in the farm profile
            }}
            acceptedTypes={['image/*', 'application/pdf']}
            maxSize={10}
            bucket="soil-tests"
            path="reports"
          />
        </div>

        {/* Additional Information */}
        <div className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Farming Experience (years)
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Years of farming experience"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Previous Season Yield Issues (Optional)
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Describe any challenges faced in previous seasons..."
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Save className="h-5 w-5" />
            <span>Save Farm Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmProfile;
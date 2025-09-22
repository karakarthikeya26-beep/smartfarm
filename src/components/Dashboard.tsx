import React from 'react';
import { useWeather } from '../hooks/useWeather';
import { 
  TrendingUp, 
  AlertTriangle, 
  Droplets, 
  Thermometer,
  Wind,
  Eye,
  Target,
  Calendar,
  DollarSign
} from 'lucide-react';

interface DashboardProps {
  farmData: {
    farmSize: string;
    soilType: string;
    elevation: string;
    location: string;
    waterSource: string;
    currentCrops: string[];
  };
}

const Dashboard: React.FC<DashboardProps> = ({ farmData }) => {
  const { weather, loading: weatherLoading, error: weatherError } = useWeather();

  const alerts = [
    { type: 'warning', message: 'Potential blight detected in tomato field', priority: 'High' },
    { type: 'info', message: 'Optimal irrigation time: 6:00 AM tomorrow', priority: 'Medium' },
    { type: 'success', message: 'Soil moisture levels optimal', priority: 'Low' }
  ];

  const cropPredictions = [
    { crop: 'Tomatoes', currentYield: 85, predictedYield: 92, trend: 'up' },
    { crop: 'Corn', currentYield: 78, predictedYield: 75, trend: 'down' },
    { crop: 'Wheat', currentYield: 82, predictedYield: 88, trend: 'up' }
  ];

  const marketPrices = [
    { crop: 'Tomatoes', price: 245, change: '+12%', trend: 'up' },
    { crop: 'Corn', price: 189, change: '-3%', trend: 'down' },
    { crop: 'Wheat', price: 298, change: '+8%', trend: 'up' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome to your Smart Farm Dashboard</h2>
        <p className="text-green-100">
          {farmData.location ? `Managing ${farmData.farmSize} acres in ${farmData.location}` : 'Complete your farm profile to get personalized insights'}
        </p>
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Today: {new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Growing Season: Day 45</span>
          </div>
        </div>
      </div>

      {/* Weather Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-2xl font-bold text-orange-600">
                {weatherLoading ? '...' : weather ? `${weather.temperature}°C` : 'N/A'}
              </p>
            </div>
            <Thermometer className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="text-2xl font-bold text-blue-600">
                {weatherLoading ? '...' : weather ? `${weather.humidity}%` : 'N/A'}
              </p>
            </div>
            <Droplets className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Wind Speed</p>
              <p className="text-2xl font-bold text-gray-600">
                {weatherLoading ? '...' : weather ? `${weather.windSpeed} km/h` : 'N/A'}
              </p>
            </div>
            <Wind className="h-8 w-8 text-gray-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rainfall</p>
              <p className="text-2xl font-bold text-green-600">
                {weatherLoading ? '...' : weather ? `${weather.rainfall} mm` : 'N/A'}
              </p>
            </div>
            <Droplets className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Weather Error */}
      {weatherError && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span className="text-yellow-800">Weather data unavailable: {weatherError}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Alerts */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Active Alerts</h3>
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                alert.type === 'info' ? 'bg-blue-50 border-blue-400' :
                'bg-green-50 border-green-400'
              }`}>
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-700">{alert.message}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    alert.priority === 'High' ? 'bg-red-100 text-red-800' :
                    alert.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {alert.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yield Predictions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Yield Predictions</h3>
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
          <div className="space-y-4">
            {cropPredictions.map((crop, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{crop.crop}</p>
                  <p className="text-sm text-gray-600">Current: {crop.currentYield}% | Predicted: {crop.predictedYield}%</p>
                </div>
                <div className={`flex items-center space-x-1 ${
                  crop.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`h-4 w-4 ${crop.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span className="text-sm font-medium">
                    {crop.trend === 'up' ? '+' : '-'}{Math.abs(crop.predictedYield - crop.currentYield)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Market Prices (₹/quintal)</h3>
          <DollarSign className="h-6 w-6 text-green-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketPrices.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{item.crop}</p>
                  <p className="text-2xl font-bold text-green-600">₹{item.price}</p>
                </div>
                <div className={`flex items-center space-x-1 ${
                  item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`h-4 w-4 ${item.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span className="text-sm font-medium">{item.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Eye className="h-6 w-6" />
          <h3 className="text-xl font-bold">AI Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Irrigation Optimization</h4>
            <p className="text-sm text-purple-100">Reduce watering by 15% in Zone A. Soil moisture sensors indicate optimal levels.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Disease Prevention</h4>
            <p className="text-sm text-purple-100">Apply copper fungicide to tomatoes within 48 hours. Weather conditions favor blight development.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
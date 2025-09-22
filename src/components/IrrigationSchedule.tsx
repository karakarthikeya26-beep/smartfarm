import React, { useState } from 'react';
import { Droplets, Clock, Calendar, Thermometer, CloudRain } from 'lucide-react';

const IrrigationSchedule: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState('zone1');

  const zones = [
    { id: 'zone1', name: 'Tomato Field A', crop: 'Tomatoes', area: 2.5, soilMoisture: 65 },
    { id: 'zone2', name: 'Corn Field B', crop: 'Corn', area: 4.0, soilMoisture: 45 },
    { id: 'zone3', name: 'Wheat Field C', crop: 'Wheat', area: 3.2, soilMoisture: 78 },
  ];

  const scheduleData = [
    { time: '06:00 AM', zone: 'Zone A', duration: '45 min', status: 'scheduled' },
    { time: '07:30 AM', zone: 'Zone B', duration: '60 min', status: 'scheduled' },
    { time: '06:00 PM', zone: 'Zone C', duration: '30 min', status: 'scheduled' },
  ];

  const recommendations = [
    {
      type: 'reduce',
      zone: 'Tomato Field A',
      message: 'Reduce watering by 20%. Current soil moisture is optimal.',
      priority: 'medium'
    },
    {
      type: 'increase',
      zone: 'Corn Field B',
      message: 'Increase watering by 30%. Soil moisture below optimal levels.',
      priority: 'high'
    },
    {
      type: 'maintain',
      zone: 'Wheat Field C',
      message: 'Maintain current irrigation schedule. Perfect moisture levels.',
      priority: 'low'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <Droplets className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Smart Irrigation Schedule</h2>
        </div>
        <p className="text-gray-600">Optimize water usage with AI-powered irrigation recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Zone Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Field Zones</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedZone === zone.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedZone(zone.id)}
                >
                  <h4 className="font-semibold text-gray-900">{zone.name}</h4>
                  <p className="text-sm text-gray-600">{zone.crop}</p>
                  <p className="text-sm text-gray-600">{zone.area} acres</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <div className={`h-2 w-full bg-gray-200 rounded-full`}>
                      <div 
                        className={`h-2 rounded-full ${
                          zone.soilMoisture >= 70 ? 'bg-green-500' :
                          zone.soilMoisture >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${zone.soilMoisture}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{zone.soilMoisture}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Today's Schedule</h3>
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="space-y-3">
              {scheduleData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{item.time}</span>
                    </div>
                    <span className="text-gray-600">{item.zone}</span>
                    <span className="text-sm text-gray-500">{item.duration}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'scheduled' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Update Schedule
            </button>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">AI Recommendations</h3>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  rec.priority === 'high' ? 'bg-red-50 border-red-400' :
                  rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-400' :
                  'bg-green-50 border-green-400'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{rec.zone}</p>
                      <p className="text-sm text-gray-600">{rec.message}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weather and Controls */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Weather Impact</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Temperature</span>
                </div>
                <span className="font-medium">28°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Humidity</span>
                </div>
                <span className="font-medium">65%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CloudRain className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Rain Forecast</span>
                </div>
                <span className="font-medium">60% chance</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Recommendation:</strong> Delay evening irrigation due to expected rainfall tonight.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                Start Irrigation Now
              </button>
              <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors">
                Pause All Zones
              </button>
              <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                Emergency Override
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Water Usage</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Today</span>
                  <span>2,340 L</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>This Week</span>
                  <span>15,680 L</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600 mt-2">
                12% less than last week
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationSchedule;
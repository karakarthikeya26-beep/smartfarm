import React, { useState } from 'react';
import { Sprout, Calendar, RotateCcw, TrendingUp, AlertCircle } from 'lucide-react';

const CropPlanning: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState('kharif');
  const [planningMode, setPlanningMode] = useState('rotation');

  const seasons = [
    { id: 'kharif', name: 'Kharif (Monsoon)', months: 'Jun - Oct' },
    { id: 'rabi', name: 'Rabi (Winter)', months: 'Nov - Apr' },
    { id: 'zaid', name: 'Zaid (Summer)', months: 'Mar - Jun' }
  ];

  const rotationPlans = [
    {
      year: '2024-25',
      crops: [
        { season: 'Kharif', crop: 'Rice', area: 3, yield: '85%', profit: '₹2,40,000' },
        { season: 'Rabi', crop: 'Wheat', area: 3, yield: '92%', profit: '₹1,80,000' },
        { season: 'Zaid', crop: 'Sugarcane', area: 2, yield: '78%', profit: '₹3,20,000' }
      ]
    },
    {
      year: '2025-26',
      crops: [
        { season: 'Kharif', crop: 'Cotton', area: 4, yield: '88%', profit: '₹2,80,000' },
        { season: 'Rabi', crop: 'Mustard', area: 2, yield: '90%', profit: '₹1,20,000' },
        { season: 'Zaid', crop: 'Fodder', area: 2, yield: '95%', profit: '₹80,000' }
      ]
    }
  ];

  const cropRecommendations = [
    {
      crop: 'Tomatoes',
      suitability: 95,
      reasons: ['High market demand', 'Suitable soil pH', 'Good weather conditions'],
      expectedYield: '450 quintals/ha',
      profitability: 'High',
      risk: 'Medium'
    },
    {
      crop: 'Onions',
      suitability: 88,
      reasons: ['Storage advantage', 'Price stability', 'Low pest risk'],
      expectedYield: '380 quintals/ha',
      profitability: 'High',
      risk: 'Low'
    },
    {
      crop: 'Cotton',
      suitability: 82,
      reasons: ['Government support', 'Processing facilities nearby'],
      expectedYield: '18 quintals/ha',
      profitability: 'Medium',
      risk: 'High'
    },
    {
      crop: 'Wheat',
      suitability: 79,
      reasons: ['MSP guarantee', 'Traditional expertise', 'Low input cost'],
      expectedYield: '42 quintals/ha',
      profitability: 'Medium',
      risk: 'Low'
    }
  ];

  const companionCrops = [
    { main: 'Tomatoes', companion: 'Basil', benefit: 'Pest deterrent' },
    { main: 'Corn', companion: 'Beans', benefit: 'Nitrogen fixation' },
    { main: 'Wheat', companion: 'Mustard', benefit: 'Soil improvement' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sprout className="h-6 w-6 text-green-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Smart Crop Planning</h2>
              <p className="text-gray-600">AI-powered crop selection and rotation planning</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPlanningMode('rotation')}
              className={`px-4 py-2 rounded-lg ${
                planningMode === 'rotation' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Rotation Planning
            </button>
            <button
              onClick={() => setPlanningMode('recommendations')}
              className={`px-4 py-2 rounded-lg ${
                planningMode === 'recommendations' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Crop Recommendations
            </button>
          </div>
        </div>
      </div>

      {planningMode === 'rotation' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rotation Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <RotateCcw className="h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">Crop Rotation Plan</h3>
              </div>
              
              <div className="space-y-6">
                {rotationPlans.map((plan, index) => (
                  <div key={index} className="border-l-4 border-green-400 pl-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">{plan.year}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {plan.crops.map((crop, cropIndex) => (
                        <div key={cropIndex} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500 uppercase font-medium">{crop.season}</span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{crop.area} acres</span>
                          </div>
                          <h5 className="font-semibold text-gray-900">{crop.crop}</h5>
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Yield</span>
                              <span className="text-green-600 font-medium">{crop.yield}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Est. Profit</span>
                              <span className="text-blue-600 font-medium">{crop.profit}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900">Rotation Benefits</h5>
                    <p className="text-sm text-blue-800">This rotation plan improves soil fertility, reduces pest buildup, and maximizes land utilization across seasons.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Companion Planting */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Companion Planting Suggestions</h3>
              <div className="space-y-3">
                {companionCrops.map((combo, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">{combo.main}</span>
                      <span className="text-gray-600"> + </span>
                      <span className="font-medium text-green-600">{combo.companion}</span>
                    </div>
                    <span className="text-sm text-gray-500">{combo.benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Planning Tools */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Season Planning</h3>
              <div className="space-y-3">
                {seasons.map((season) => (
                  <button
                    key={season.id}
                    onClick={() => setSelectedSeason(season.id)}
                    className={`w-full p-3 text-left rounded-lg border ${
                      selectedSeason === season.id
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{season.name}</div>
                    <div className="text-sm text-gray-600">{season.months}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Financial Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Expected Revenue</span>
                  <span className="font-bold text-green-600">₹7,40,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Investment Cost</span>
                  <span className="font-bold text-red-600">₹3,20,000</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Net Profit</span>
                    <span className="font-bold text-blue-600">₹4,20,000</span>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-500">
                  ROI: 131%
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                  Generate New Plan
                </button>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Export Schedule
                </button>
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                  Set Reminders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {planningMode === 'recommendations' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cropRecommendations.map((rec, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{rec.crop}</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{rec.suitability}%</div>
                  <div className="text-xs text-gray-500">Suitability</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Why this crop?</h4>
                  <ul className="space-y-1">
                    {rec.reasons.map((reason, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Expected Yield</div>
                    <div className="font-medium">{rec.expectedYield}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Profitability</div>
                    <div className={`font-medium ${
                      rec.profitability === 'High' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {rec.profitability}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Risk Level:</span>
                    <span className={`text-sm font-medium ${
                      rec.risk === 'Low' ? 'text-green-600' :
                      rec.risk === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {rec.risk}
                    </span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CropPlanning;
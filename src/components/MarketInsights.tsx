import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, MapPin, Calendar, BarChart3 } from 'lucide-react';

const MarketInsights: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [selectedMarket, setSelectedMarket] = useState('local');

  const timeframes = ['1W', '1M', '3M', '6M', '1Y'];
  const marketTypes = [
    { id: 'local', name: 'Local Market' },
    { id: 'state', name: 'State Average' },
    { id: 'national', name: 'National' }
  ];

  const currentPrices = [
    { 
      crop: 'Tomatoes', 
      price: 2450, 
      change: 12.5, 
      trend: 'up',
      unit: 'per quintal',
      volume: '245 tonnes',
      demand: 'High'
    },
    { 
      crop: 'Onions', 
      price: 1890, 
      change: -3.2, 
      trend: 'down',
      unit: 'per quintal',
      volume: '189 tonnes',
      demand: 'Medium'
    },
    { 
      crop: 'Wheat', 
      price: 2975, 
      change: 8.1, 
      trend: 'up',
      unit: 'per quintal',
      volume: '892 tonnes',
      demand: 'High'
    },
    { 
      crop: 'Cotton', 
      price: 6250, 
      change: 15.3, 
      trend: 'up',
      unit: 'per quintal',
      volume: '156 tonnes',
      demand: 'Very High'
    },
    { 
      crop: 'Rice', 
      price: 3150, 
      change: -1.8, 
      trend: 'down',
      unit: 'per quintal',
      volume: '634 tonnes',
      demand: 'Medium'
    },
    { 
      crop: 'Sugarcane', 
      price: 385, 
      change: 4.7, 
      trend: 'up',
      unit: 'per tonne',
      volume: '1245 tonnes',
      demand: 'High'
    }
  ];

  const marketTrends = [
    {
      insight: 'Tomato prices expected to rise 20% next month due to festival demand',
      type: 'opportunity',
      timeframe: 'Next 30 days',
      confidence: 'High'
    },
    {
      insight: 'Cotton export demand increasing - good time to sell stored produce',
      type: 'opportunity',
      timeframe: 'Next 15 days',
      confidence: 'High'
    },
    {
      insight: 'Onion oversupply in neighboring districts may affect local prices',
      type: 'warning',
      timeframe: 'Next 7 days',
      confidence: 'Medium'
    },
    {
      insight: 'Government procurement for wheat starts next week - MSP guaranteed',
      type: 'info',
      timeframe: 'Next 7 days',
      confidence: 'High'
    }
  ];

  const nearbyMarkets = [
    { name: 'Pune APMC', distance: '12 km', avgPrice: '₹2,450', commission: '2.5%' },
    { name: 'Mumbai Market', distance: '45 km', avgPrice: '₹2,680', commission: '3%' },
    { name: 'Nashik Mandi', distance: '78 km', avgPrice: '₹2,320', commission: '2%' },
    { name: 'Aurangabad Market', distance: '125 km', avgPrice: '₹2,590', commission: '2.8%' }
  ];

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'text-green-800 bg-green-100';
      case 'High': return 'text-blue-800 bg-blue-100';
      case 'Medium': return 'text-yellow-800 bg-yellow-100';
      case 'Low': return 'text-red-800 bg-red-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <DollarSign className="h-6 w-6 text-green-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Market Insights</h2>
              <p className="text-gray-600">Real-time prices and market intelligence</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {timeframes.map(tf => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    selectedTimeframe === tf
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
            
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {marketTypes.map(market => (
                <option key={market.id} value={market.id}>{market.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Current Prices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPrices.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{item.crop}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(item.demand)}`}>
                {item.demand}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-green-600">₹{item.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500">{item.unit}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {item.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.change > 0 ? '+' : ''}{item.change}%
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
              
              <div className="pt-2 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Volume traded</span>
                  <span className="font-medium">{item.volume}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Market Intelligence */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">Market Intelligence</h3>
          </div>
          
          <div className="space-y-4">
            {marketTrends.map((trend, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                trend.type === 'opportunity' ? 'bg-green-50 border-green-400' :
                trend.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-gray-800 font-medium">{trend.insight}</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    trend.confidence === 'High' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {trend.confidence}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{trend.timeframe}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Get Detailed Analysis
          </button>
        </div>

        {/* Nearby Markets */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <MapPin className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Nearby Markets</h3>
          </div>
          
          <div className="space-y-4">
            {nearbyMarkets.map((market, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div>
                  <h4 className="font-medium text-gray-900">{market.name}</h4>
                  <p className="text-sm text-gray-600">{market.distance} away</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{market.avgPrice}</p>
                  <p className="text-xs text-gray-500">{market.commission} commission</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Transportation Available</h4>
            <p className="text-sm text-blue-800">Shared truck to Mumbai Market leaving tomorrow at 6 AM. Book now to save 40% on transport costs.</p>
            <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
              Book Transport →
            </button>
          </div>
        </div>
      </div>

      {/* Price History Chart Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Price Trends</h3>
          <div className="text-sm text-gray-600">
            Showing trends for {selectedTimeframe} timeframe
          </div>
        </div>
        
        <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Interactive price charts coming soon</p>
            <p className="text-sm text-gray-500">Historical data and predictions will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
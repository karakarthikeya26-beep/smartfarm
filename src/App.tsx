import React, { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { 
  MapPin, 
  CloudRain, 
  TrendingUp, 
  AlertTriangle, 
  Leaf, 
  Calendar,
  BarChart3,
  Settings,
  Bell,
  Sun,
  Droplets,
  Sprout
} from 'lucide-react';
import FarmProfile from './components/FarmProfile';
import Dashboard from './components/Dashboard';
import CropPlanning from './components/CropPlanning';
import MarketInsights from './components/MarketInsights';
import IrrigationSchedule from './components/IrrigationSchedule';
import Alerts from './components/Alerts';
import SustainablePractices from './components/SustainablePractices';
import VoiceChat from './components/VoiceChat';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { weather } = useWeather();
  const [farmData, setFarmData] = useState({
    farmSize: '',
    soilType: '',
    elevation: '',
    location: '',
    waterSource: '',
    currentCrops: []
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'profile', label: 'Farm Profile', icon: MapPin },
    { id: 'irrigation', label: 'Irrigation', icon: Droplets },
    { id: 'crops', label: 'Crop Planning', icon: Sprout },
    { id: 'market', label: 'Market', icon: TrendingUp },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'sustainable', label: 'Sustainability', icon: Leaf }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <FarmProfile farmData={farmData} setFarmData={setFarmData} />;
      case 'irrigation':
        return <IrrigationSchedule />;
      case 'crops':
        return <CropPlanning />;
      case 'market':
        return <MarketInsights />;
      case 'alerts':
        return <Alerts />;
      case 'sustainable':
        return <SustainablePractices />;
      default:
        return <Dashboard farmData={farmData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SmartFarm AI</h1>
                <p className="text-sm text-gray-600">Intelligent Farming Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Sun className="h-4 w-4 text-yellow-500" />
                <span>{weather ? `${weather.temperature}°C` : 'Loading...'}</span>
                <CloudRain className="h-4 w-4 text-blue-500 ml-2" />
                <span>{weather ? weather.rainForecast : 'Loading...'}</span>
              </div>
              <div className="relative">
                <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                  <Bell className="h-5 w-5 text-gray-700" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-green-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
      
      {/* Voice Chat Component */}
      <VoiceChat onNavigate={setActiveTab} />
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, X, Calendar, MapPin } from 'lucide-react';

const Alerts: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Potential Blight Detected',
      message: 'Early signs of late blight detected in tomato field A. Immediate fungicide application recommended.',
      location: 'Field A - Tomato Section',
      timestamp: '2 hours ago',
      priority: 'High',
      actionRequired: true,
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Optimal Irrigation Time',
      message: 'Soil moisture levels indicate best irrigation window opens at 6:00 AM tomorrow.',
      location: 'Zone B - Corn Field',
      timestamp: '4 hours ago',
      priority: 'Medium',
      actionRequired: false,
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Harvest Ready',
      message: 'Wheat in Field C has reached optimal maturity. Begin harvesting within 3-5 days.',
      location: 'Field C - Wheat Section',
      timestamp: '6 hours ago',
      priority: 'High',
      actionRequired: true,
      read: true
    },
    {
      id: 4,
      type: 'warning',
      title: 'Weather Alert',
      message: 'Heavy rainfall expected in next 48 hours. Secure loose equipment and delay irrigation.',
      location: 'Entire Farm',
      timestamp: '8 hours ago',
      priority: 'Medium',
      actionRequired: true,
      read: false
    },
    {
      id: 5,
      type: 'info',
      title: 'Market Price Update',
      message: 'Tomato prices increased by 12% in local market. Consider selling stored produce.',
      location: 'Market Analysis',
      timestamp: '1 day ago',
      priority: 'Low',
      actionRequired: false,
      read: true
    },
    {
      id: 6,
      type: 'warning',
      title: 'Pest Activity Detected',
      message: 'Increased aphid activity detected via sensor network. Monitor closely and prepare treatment.',
      location: 'Field B - Cotton Section',
      timestamp: '1 day ago',
      priority: 'Medium',
      actionRequired: true,
      read: false
    }
  ]);

  const filters = [
    { id: 'all', name: 'All Alerts', count: alerts.length },
    { id: 'unread', name: 'Unread', count: alerts.filter(a => !a.read).length },
    { id: 'high', name: 'High Priority', count: alerts.filter(a => a.priority === 'High').length },
    { id: 'action', name: 'Action Required', count: alerts.filter(a => a.actionRequired).length }
  ];

  const getFilteredAlerts = () => {
    switch (activeFilter) {
      case 'unread':
        return alerts.filter(alert => !alert.read);
      case 'high':
        return alerts.filter(alert => alert.priority === 'High');
      case 'action':
        return alerts.filter(alert => alert.actionRequired);
      default:
        return alerts;
    }
  };

  const markAsRead = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getAlertBorderColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-yellow-400';
      case 'success':
        return 'border-l-green-400';
      default:
        return 'border-l-blue-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6 text-orange-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h2>
              <p className="text-gray-600">Stay informed about critical farm conditions</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Configure Alerts
            </button>
            <button 
              onClick={() => setAlerts(alerts.map(alert => ({ ...alert, read: true })))}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Mark All Read
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Filter Alerts</h3>
            <div className="space-y-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-orange-50 text-orange-800 border border-orange-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{filter.name}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeFilter === filter.id
                      ? 'bg-orange-200 text-orange-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-4 shadow-sm mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Alert Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Today</span>
                <span className="font-medium text-red-600">3 new</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-medium text-yellow-600">12 total</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Resolved</span>
                <span className="font-medium text-green-600">8 this week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {getFilteredAlerts().map(alert => (
              <div
                key={alert.id}
                className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${getAlertBorderColor(alert.type)} ${
                  !alert.read ? 'ring-2 ring-orange-100' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getAlertIcon(alert.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className={`font-semibold ${!alert.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {alert.title}
                        </h4>
                        {!alert.read && (
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        )}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(alert.priority)}`}>
                          {alert.priority}
                        </span>
                        {alert.actionRequired && (
                          <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                            Action Required
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-700 mb-3">{alert.message}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                      
                      {alert.actionRequired && (
                        <div className="mt-4 flex space-x-2">
                          <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                            Take Action
                          </button>
                          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                            View Details
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {!alert.read && (
                      <button
                        onClick={() => markAsRead(alert.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Dismiss alert"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {getFilteredAlerts().length === 0 && (
            <div className="bg-white rounded-xl p-12 shadow-sm text-center">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
              <p className="text-gray-500">
                {activeFilter === 'all' 
                  ? 'All caught up! No alerts at the moment.' 
                  : `No ${activeFilter} alerts found.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
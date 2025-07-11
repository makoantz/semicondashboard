import React from 'react';
import { BarChart3, Database, Settings, AlertTriangle, TrendingUp, Sparkles } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'from-apple-blue-500 to-apple-indigo-500' },
    { id: 'performance', label: 'Performance', icon: TrendingUp, color: 'from-apple-green-500 to-apple-green-600' },
    { id: 'test-results', label: 'Test Results', icon: Database, color: 'from-apple-purple-500 to-apple-indigo-500' },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, color: 'from-apple-red-500 to-apple-red-600' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'from-apple-gray-500 to-apple-gray-600' }
  ];

  return (
    <nav className="nav-gradient shadow-apple-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center px-6 py-4 text-sm font-medium transition-all duration-300 group ${
                  isActive
                    ? 'text-apple-blue-600'
                    : 'text-apple-gray-700 hover:text-apple-blue-500'
                }`}
              >
                {isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-t-lg shadow-lg`}>
                    <div className="absolute inset-0 bg-white bg-opacity-10 rounded-t-lg"></div>
                  </div>
                )}
                <div className="relative flex items-center">
                  <Icon className={`h-4 w-4 mr-2 ${isActive ? 'animate-pulse' : 'group-hover:scale-110'} transition-transform duration-200`} />
                  {tab.label}
                  {isActive && <Sparkles className="h-3 w-3 ml-2 text-apple-orange-500 animate-pulse" />}
                  {tab.id === 'alerts' && (
                    <div className="ml-2 px-2 py-1 bg-apple-red-500 text-xs font-bold text-white rounded-full animate-bounce">
                      3
                    </div>
                  )}
                </div>
                {!isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-apple-blue-500 to-transparent opacity-0 group-hover:opacity-50 transition-opacity"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
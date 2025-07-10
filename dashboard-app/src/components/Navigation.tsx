import React from 'react';
import { BarChart3, Database, Settings, AlertTriangle, TrendingUp, Sparkles } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'from-cyan-500 to-blue-500' },
    { id: 'performance', label: 'Performance', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { id: 'test-results', label: 'Test Results', icon: Database, color: 'from-purple-500 to-violet-500' },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, color: 'from-red-500 to-rose-500' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'from-gray-500 to-slate-500' }
  ];

  return (
    <nav className="nav-gradient shadow-lg">
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
                    ? 'text-white'
                    : 'text-slate-300 hover:text-white'
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
                  {isActive && <Sparkles className="h-3 w-3 ml-2 text-yellow-300 animate-pulse" />}
                  {tab.id === 'alerts' && (
                    <div className="ml-2 px-2 py-1 bg-red-500 text-xs font-bold text-white rounded-full animate-bounce">
                      3
                    </div>
                  )}
                </div>
                {!isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-50 transition-opacity"></div>
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
import React from 'react';
import { BarChart3, Database, Settings, AlertTriangle, TrendingUp } from 'lucide-react';

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
    <nav className="bg-white border-b-2 border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-tab relative flex items-center px-6 py-4 text-sm font-semibold transition-all duration-300 group ${
                  isActive
                    ? 'active'
                    : ''
                }`}
              >
                <div className="relative flex items-center">
                  <Icon className={`h-5 w-5 mr-3 transition-transform duration-200 ${
                    isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-500'
                  }`} />
                  <span className={isActive ? 'text-gray-800' : 'text-gray-600'}>{tab.label}</span>
                  {tab.id === 'alerts' && (
                    <div className="alert-badge ml-3 min-w-[1.5rem] h-6 flex items-center justify-center text-xs">
                      3
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
import React from 'react';
import { BarChart3, Database, Settings, AlertTriangle, TrendingUp } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'test-results', label: 'Test Results', icon: Database },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 transition-all duration-200 outline-none ${isActive
                    ? 'border-primary-500 text-primary-600 bg-primary-50'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  } group`}
              >
                <Icon className={`h-5 w-5 mr-2 transition-all duration-200 ${isActive ? 'text-primary-500' : 'text-slate-400 group-hover:text-slate-600'}`} />
                {tab.label}
                {tab.id === 'alerts' && (
                  <span className="ml-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    3
                  </span>
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
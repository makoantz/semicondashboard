import React from 'react';
import { BarChart3, Database, Settings, AlertTriangle, TrendingUp } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { 
      id: 'overview', 
      label: 'Dashboard Overview', 
      icon: BarChart3,
      description: 'Main dashboard with role-based views'
    },
    { 
      id: 'performance', 
      label: 'Performance Analytics', 
      icon: TrendingUp,
      description: 'Detailed performance metrics and trends'
    },
    { 
      id: 'test-results', 
      label: 'Test Results', 
      icon: Database,
      description: 'Test data and device information'
    },
    { 
      id: 'alerts', 
      label: 'System Alerts', 
      icon: AlertTriangle,
      description: 'Active alerts and notifications'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings,
      description: 'Dashboard configuration and preferences'
    }
  ];

  return (
    <nav className="nav-enterprise">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const hasAlerts = tab.id === 'alerts';
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-tab-enterprise ${isActive ? 'active' : ''} group relative`}
                title={tab.description}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Icon className={`h-5 w-5 transition-all duration-200 ${
                      isActive 
                        ? 'text-blue-600' 
                        : 'text-slate-500 group-hover:text-slate-700'
                    }`} />
                    
                    {hasAlerts && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">3</span>
                      </div>
                    )}
                  </div>
                  
                  <span className={`font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive 
                      ? 'text-blue-700' 
                      : 'text-slate-600 group-hover:text-slate-800'
                  }`}>
                    {tab.label}
                  </span>
                  
                  {isActive && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                
                {/* Hover tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {tab.description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
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
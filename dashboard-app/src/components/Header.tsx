import React, { useState } from 'react';
import { Cpu, Settings, Bell, Zap, ChevronDown } from 'lucide-react';

interface HeaderProps {
  selectedUser: string;
  onUserChange: (userId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedUser, onUserChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const users = [
    {
      id: 'executive',
      name: 'Sarah Chen',
      position: 'Chief Technology Officer',
      department: 'Executive Leadership',
      avatar: '👩‍💼',
      level: 'executive'
    },
    {
      id: 'manager',
      name: 'Michael Rodriguez',
      position: 'Operations Manager',
      department: 'Manufacturing Operations',
      avatar: '👨‍💼',
      level: 'manager'
    },
    {
      id: 'engineer',
      name: 'John Engineer',
      position: 'Senior Test Engineer',
      department: 'Quality Assurance',
      avatar: '👨‍🔬',
      level: 'engineer'
    },
    {
      id: 'operator',
      name: 'Lisa Wang',
      position: 'Test Equipment Operator',
      department: 'Production Floor',
      avatar: '👩‍🔧',
      level: 'operator'
    }
  ];

  const currentUser = users.find(user => user.id === selectedUser) || users[2];

  const handleUserSelect = (userId: string) => {
    onUserChange(userId);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-slate-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                <Cpu className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Zap className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                SemiConductor Testing Dashboard
              </h1>
              <p className="text-sm text-slate-400 font-medium">Advanced Semiconductor Analytics Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="relative p-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-slate-900">
                3
              </div>
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-slate-800 text-xs text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg">
                3 Active Alerts
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
              </div>
            </button>
            
            <button className="p-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group">
              <Settings className="h-5 w-5" />
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-slate-800 text-xs text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg">
                Settings
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
              </div>
            </button>
            
            {/* User Dropdown */}
            <div className="relative ml-4 pl-4 border-l border-slate-600/50">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 p-2 hover:bg-white/10 rounded-xl transition-all duration-200 group"
              >
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{currentUser.name}</p>
                  <p className="text-xs text-slate-400">{currentUser.position}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-lg font-semibold text-white shadow-lg ring-2 ring-white/20">
                    {currentUser.avatar}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Modern Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/60 z-50 overflow-hidden backdrop-blur-sm">
                  <div className="p-2">
                    {users.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => handleUserSelect(user.id)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center space-x-4 group ${
                          user.id === selectedUser 
                            ? 'bg-blue-50 border border-blue-200/60 shadow-sm' 
                            : 'hover:bg-slate-50/80'
                        }`}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-lg font-semibold text-white shadow-md ring-2 ring-white/50">
                          {user.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{user.name}</p>
                          <p className="text-sm text-slate-600">{user.position}</p>
                          <p className="text-xs text-slate-500">{user.department}</p>
                        </div>
                        {user.id === selectedUser && (
                          <div className="w-3 h-3 bg-green-500 rounded-full ring-2 ring-green-200"></div>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-slate-200/60 p-4 bg-slate-50/50">
                    <button className="w-full text-left text-sm text-slate-600 hover:text-slate-800 transition-colors font-medium">
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { Cpu, Settings, Bell, User, Zap, ChevronDown } from 'lucide-react';

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
    <header className="header-gradient shadow-xl border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="relative">
              <Cpu className="h-8 w-8 text-cyan-400 mr-3" />
              <Zap className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                SemiConductor Testing Dashboard
              </h1>
              <p className="text-xs text-slate-400">Advanced Semiconductor Analytics Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-3 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 rounded-xl transition-all duration-200 relative group">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-slate-900"></div>
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-700 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                3 Alerts
              </div>
            </button>
            <button className="p-3 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 rounded-xl transition-all duration-200 group">
              <Settings className="h-5 w-5" />
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-700 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Settings
              </div>
            </button>
            
            {/* User Dropdown */}
            <div className="relative ml-4 pl-4 border-l border-slate-600">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 p-2 hover:bg-slate-700 rounded-xl transition-all duration-200"
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{currentUser.name}</p>
                  <p className="text-xs text-slate-400">{currentUser.position}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-lg">
                    {currentUser.avatar}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                  <div className="p-2">
                    {users.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => handleUserSelect(user.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                          user.id === selectedUser 
                            ? 'bg-blue-50 border border-blue-200' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-lg">
                          {user.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.position}</p>
                          <p className="text-xs text-gray-500">{user.department}</p>
                        </div>
                        {user.id === selectedUser && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 p-3">
                    <button className="w-full text-left text-sm text-gray-600 hover:text-gray-800 transition-colors">
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay to close dropdown */}
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
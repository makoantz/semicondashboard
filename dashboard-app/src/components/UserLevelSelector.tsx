import React from 'react';
import { User, Shield, Settings, Wrench } from 'lucide-react';
import type { UserLevel } from '../data/mockData';

interface UserLevelSelectorProps {
  userLevels: UserLevel[];
  selectedLevel: string;
  onLevelChange: (levelId: string) => void;
}

const UserLevelSelector: React.FC<UserLevelSelectorProps> = ({
  userLevels,
  selectedLevel,
  onLevelChange
}) => {
  const getIcon = (accessLevel: string) => {
    switch (accessLevel) {
      case 'executive':
        return Shield;
      case 'manager':
        return User;
      case 'engineer':
        return Wrench;
      case 'operator':
        return Settings;
      default:
        return User;
    }
  };

  const getColorClass = (accessLevel: string, isSelected: boolean) => {
    if (isSelected) {
      switch (accessLevel) {
        case 'executive':
          return 'bg-gradient-to-br from-purple-600 to-purple-700 text-white border-purple-500 shadow-xl shadow-purple-500/25 scale-105';
        case 'manager':
          return 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-500 shadow-xl shadow-blue-500/25 scale-105';
        case 'engineer':
          return 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white border-emerald-500 shadow-xl shadow-emerald-500/25 scale-105';
        case 'operator':
          return 'bg-gradient-to-br from-orange-600 to-orange-700 text-white border-orange-500 shadow-xl shadow-orange-500/25 scale-105';
        default:
          return 'bg-gradient-to-br from-gray-600 to-gray-700 text-white border-gray-500 shadow-xl shadow-gray-500/25 scale-105';
      }
    } else {
      switch (accessLevel) {
        case 'executive':
          return 'bg-white text-purple-600 border-purple-200 hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 hover:border-purple-300 hover:shadow-lg';
        case 'manager':
          return 'bg-white text-blue-600 border-blue-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 hover:shadow-lg';
        case 'engineer':
          return 'bg-white text-emerald-600 border-emerald-200 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-emerald-100 hover:border-emerald-300 hover:shadow-lg';
        case 'operator':
          return 'bg-white text-orange-600 border-orange-200 hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100 hover:border-orange-300 hover:shadow-lg';
        default:
          return 'bg-white text-gray-600 border-gray-200 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 hover:border-gray-300 hover:shadow-lg';
      }
    }
  };

  return (
    <div className="card-gradient">
      <div className="flex items-center mb-6">
        <div className="h-8 w-1 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full mr-4"></div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Select User Access Level</h3>
          <p className="text-sm text-gray-600">Choose your role to customize the dashboard view</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {userLevels.map((level) => {
          const Icon = getIcon(level.accessLevel);
          const isSelected = selectedLevel === level.id;
          
          return (
            <button
              key={level.id}
              onClick={() => onLevelChange(level.id)}
              className={`user-level-card ${isSelected ? 'selected' : ''}`}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              )}
              <div className="flex items-center mb-3">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-white bg-opacity-20' : 'bg-gray-100'} mr-3`}>
                  <Icon className={`h-6 w-6 ${isSelected ? 'text-white' : ''}`} />
                </div>
                <span className="font-bold text-lg">{level.name}</span>
              </div>
              <p className={`text-sm ${isSelected ? 'text-white text-opacity-90' : 'text-gray-600'} leading-relaxed`}>
                {level.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UserLevelSelector;
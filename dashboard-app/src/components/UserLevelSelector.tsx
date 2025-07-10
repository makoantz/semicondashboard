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
import React, { useState } from 'react';
import { Play, Pause, Square, Settings, AlertTriangle, CheckCircle, Clock, Thermometer } from 'lucide-react';
import type { TestResult } from '../data/mockData';

interface OperatorViewProps {
  devices: TestResult[];
}

const OperatorView: React.FC<OperatorViewProps> = ({ devices }) => {
  const [selectedStation, setSelectedStation] = useState('TS-01');

  const stations = Array.from(new Set(devices.map(d => d.testStation))).map(station => {
    const device = devices.find(d => d.testStation === station);
    return {
      id: station,
      name: station,
      status: device?.status || 'Pass',
      deviceType: device?.deviceType || 'Unknown',
      temperature: device?.temperature || 0,
      voltage: device?.voltage || 0,
      current: device?.current || 0,
      isRunning: Math.random() > 0.3,
      progress: Math.floor(Math.random() * 100),
      remainingTime: Math.floor(Math.random() * 120) + 30
    };
  });

  const currentStation = stations.find(s => s.id === selectedStation) || stations[0];

  const getStationStatusColor = (status: string, isRunning: boolean) => {
    if (!isRunning) return 'bg-gray-100 text-gray-600';
    switch (status) {
      case 'Pass':
        return 'bg-green-100 text-green-800';
      case 'Fail':
        return 'bg-red-100 text-red-800';
      case 'Retest':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: string, isRunning: boolean) => {
    if (!isRunning) return Pause;
    switch (status) {
      case 'Pass':
        return CheckCircle;
      case 'Fail':
        return AlertTriangle;
      case 'Retest':
        return Clock;
      default:
        return Settings;
    }
  };

  return (
    <div className="space-y-6">
      {/* Operator Dashboard Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Operator Control Panel</h2>
        <p className="text-green-100">Equipment operation, monitoring, and basic system controls</p>
      </div>

      {/* Station Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Test Station Selection</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {stations.map((station) => {
            const StatusIcon = getStatusIcon(station.status, station.isRunning);
            return (
              <button
                key={station.id}
                onClick={() => setSelectedStation(station.id)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedStation === station.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <StatusIcon className={`h-6 w-6 ${
                    station.isRunning 
                      ? station.status === 'Pass' ? 'text-green-600' 
                        : station.status === 'Fail' ? 'text-red-600' 
                        : 'text-yellow-600'
                      : 'text-gray-400'
                  }`} />
                  <span className="text-xs font-medium">{station.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStationStatusColor(station.status, station.isRunning)}`}>
                    {station.isRunning ? 'Running' : 'Idle'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Station Control */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Station {currentStation.name} - Control Panel</h3>
          
          {/* Station Status */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Current Test</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStationStatusColor(currentStation.status, currentStation.isRunning)}`}>
                {currentStation.isRunning ? 'Running' : 'Idle'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Device Type:</span>
                <p className="font-medium">{currentStation.deviceType}</p>
              </div>
              <div>
                <span className="text-gray-500">Remaining Time:</span>
                <p className="font-medium">{currentStation.remainingTime} min</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Test Progress</span>
                <span>{currentStation.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentStation.progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button 
              className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                currentStation.isRunning 
                  ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100'
              }`}
              disabled={currentStation.isRunning}
            >
              <Play className="h-6 w-6 mr-2" />
              Start Test
            </button>
            
            <button 
              className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                currentStation.isRunning 
                  ? 'border-yellow-500 bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                  : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!currentStation.isRunning}
            >
              <Pause className="h-6 w-6 mr-2" />
              Pause
            </button>
            
            <button className="flex items-center justify-center p-4 rounded-lg border-2 border-red-500 bg-red-50 text-red-700 hover:bg-red-100 transition-all duration-200">
              <Square className="h-6 w-6 mr-2" />
              Stop
            </button>
          </div>

          {/* Equipment Parameters */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center text-blue-600 mb-1">
                <Thermometer className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Temperature</span>
              </div>
              <p className="text-lg font-bold text-blue-900">{currentStation.temperature}°C</p>
              <p className="text-xs text-blue-600">Normal Range</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center text-purple-600 mb-1">
                <Settings className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Voltage</span>
              </div>
              <p className="text-lg font-bold text-purple-900">{currentStation.voltage}V</p>
              <p className="text-xs text-purple-600">Within Spec</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center text-orange-600 mb-1">
                <Settings className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Current</span>
              </div>
              <p className="text-lg font-bold text-orange-900">{currentStation.current}A</p>
              <p className="text-xs text-orange-600">Stable</p>
            </div>
          </div>
        </div>

        {/* System Status & Alerts */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm text-green-800">Power Supply</span>
                </div>
                <span className="text-xs text-green-600">OK</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm text-green-800">Cooling System</span>
                </div>
                <span className="text-xs text-green-600">OK</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                  <span className="text-sm text-yellow-800">Calibration</span>
                </div>
                <span className="text-xs text-yellow-600">Due Soon</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-yellow-800">Maintenance Due</p>
                  <p className="text-xs text-yellow-600">Station TS-03 - Scheduled for tomorrow</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Settings className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-blue-800">Calibration Complete</p>
                  <p className="text-xs text-blue-600">Station TS-06 - Ready for operation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-2 text-left text-sm bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                Equipment Status Report
              </button>
              <button className="w-full p-2 text-left text-sm bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                Test History Log
              </button>
              <button className="w-full p-2 text-left text-sm bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                Maintenance Schedule
              </button>
              <button className="w-full p-2 text-left text-sm bg-red-50 hover:bg-red-100 text-red-700 rounded transition-colors">
                Emergency Stop All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorView;
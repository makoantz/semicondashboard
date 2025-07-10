import React, { useState } from 'react';
import { Play, Pause, Square, Settings, AlertTriangle, CheckCircle, Clock, Thermometer, Zap, Monitor, Power } from 'lucide-react';
import type { TestResult } from '../data/mockData';

interface OperatorViewProps {
  devices: TestResult[];
}

const OperatorView: React.FC<OperatorViewProps> = ({ devices }) => {
  const [selectedStation, setSelectedStation] = useState('TS-01');

  const stations = Array.from(new Set(devices.map(d => d.testStation))).slice(0, 8).map(station => {
    const device = devices.find(d => d.testStation === station);
    return {
      id: station,
      name: station,
      status: device?.status || 'Pass',
      deviceType: device?.deviceType || 'Mobile Processor',
      temperature: device?.temperature || Math.floor(Math.random() * 10) + 20,
      voltage: device?.voltage || Math.floor(Math.random() * 5) + 3,
      current: device?.current || Math.floor(Math.random() * 200) + 100,
      isRunning: Math.random() > 0.2,
      progress: Math.floor(Math.random() * 100),
      remainingTime: Math.floor(Math.random() * 120) + 30,
      cycleCount: Math.floor(Math.random() * 1000) + 500,
      lastTest: '2 min ago'
    };
  });

  const currentStation = stations.find(s => s.id === selectedStation) || stations[0];

  const getStationStatusColor = (status: string, isRunning: boolean) => {
    if (!isRunning) return 'status-info-pro';
    switch (status) {
      case 'Pass':
        return 'status-success-pro';
      case 'Fail':
        return 'status-error-pro';
      case 'Retest':
        return 'status-warning-pro';
      default:
        return 'status-info-pro';
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
        return Monitor;
    }
  };

  const handleStationControl = (action: string) => {
    console.log(`${action} action on station ${selectedStation}`);
    // Station control logic would go here
  };

  return (
    <div className="space-y-8">
      {/* Operator Dashboard Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl p-8 shadow-floating">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Operator Control Center</h2>
            <p className="text-indigo-100">Real-time station monitoring and test execution control</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{stations.filter(s => s.isRunning).length}</div>
              <div className="text-xs text-indigo-200">Active Stations</div>
            </div>
            <div className="w-px h-12 bg-indigo-400 opacity-50"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stations.reduce((sum, s) => sum + s.cycleCount, 0)}</div>
              <div className="text-xs text-indigo-200">Total Cycles</div>
            </div>
          </div>
        </div>
      </div>

      {/* Station Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stations.map((station) => {
          const StatusIcon = getStatusIcon(station.status, station.isRunning);
          const isSelected = station.id === selectedStation;
          
          return (
            <div 
              key={station.id} 
              className={`card-premium cursor-pointer transition-all duration-300 hover:scale-105 ${
                isSelected ? 'ring-2 ring-primary-500 shadow-lg' : ''
              }`}
              onClick={() => setSelectedStation(station.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800">{station.name}</h3>
                <span className={`status-badge-pro ${getStationStatusColor(station.status, station.isRunning)} flex items-center`}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {station.isRunning ? station.status : 'Idle'}
                </span>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600 mb-1">Device Type</p>
                  <p className="font-medium text-slate-800 truncate">{station.deviceType}</p>
                </div>
                
                {station.isRunning && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span>Progress</span>
                        <span>{station.progress}%</span>
                      </div>
                      <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${station.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-slate-600">Remaining:</span>
                      <span className="font-medium text-slate-800">{station.remainingTime}min</span>
                    </div>
                  </>
                )}
                
                <div className="flex justify-between">
                  <span className="text-slate-600">Cycles:</span>
                  <span className="font-medium text-slate-800">{station.cycleCount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Station Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-premium">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-heading-md text-slate-800 flex items-center">
              <Monitor className="h-5 w-5 mr-2 text-primary-600" />
              Station Control - {currentStation.name}
            </h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleStationControl('start')}
                className="btn-pro bg-success-600 text-white hover:bg-success-700 flex items-center"
                disabled={currentStation.isRunning}
              >
                <Play className="h-4 w-4 mr-1" />
                Start
              </button>
              <button 
                onClick={() => handleStationControl('pause')}
                className="btn-pro bg-warning-600 text-white hover:bg-warning-700 flex items-center"
                disabled={!currentStation.isRunning}
              >
                <Pause className="h-4 w-4 mr-1" />
                Pause
              </button>
              <button 
                onClick={() => handleStationControl('stop')}
                className="btn-pro bg-danger-600 text-white hover:bg-danger-700 flex items-center"
              >
                <Square className="h-4 w-4 mr-1" />
                Stop
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
              <Thermometer className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-blue-700 mb-1">Temperature</p>
              <p className="text-xl font-bold text-blue-900">{currentStation.temperature}°C</p>
              <div className="text-xs text-blue-600 mt-1">
                {currentStation.temperature > 25 ? 'High' : 'Normal'}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
              <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-green-700 mb-1">Voltage</p>
              <p className="text-xl font-bold text-green-900">{currentStation.voltage}V</p>
              <div className="text-xs text-green-600 mt-1">Stable</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
              <Power className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-purple-700 mb-1">Current</p>
              <p className="text-xl font-bold text-purple-900">{currentStation.current}mA</p>
              <div className="text-xs text-purple-600 mt-1">Normal</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-orange-700 mb-1">Runtime</p>
              <p className="text-xl font-bold text-orange-900">4.2h</p>
              <div className="text-xs text-orange-600 mt-1">Active</div>
            </div>
          </div>

          {/* Device Details */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h4 className="font-semibold text-slate-800 mb-4">Current Device Under Test</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Type:</span>
                <p className="font-medium text-slate-800">{currentStation.deviceType}</p>
              </div>
              <div>
                <span className="text-slate-600">Status:</span>
                <p className="font-medium text-slate-800">{currentStation.status}</p>
              </div>
              <div>
                <span className="text-slate-600">Last Test:</span>
                <p className="font-medium text-slate-800">{currentStation.lastTest}</p>
              </div>
              <div>
                <span className="text-slate-600">Cycle Count:</span>
                <p className="font-medium text-slate-800">{currentStation.cycleCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          <div className="card-premium">
            <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
              <Settings className="h-4 w-4 mr-2 text-slate-600" />
              Quick Actions
            </h4>
            <div className="space-y-3">
              <button className="w-full btn-pro bg-primary-600 text-white hover:bg-primary-700">
                Run Calibration Test
              </button>
              <button className="w-full btn-pro bg-secondary-600 text-white hover:bg-secondary-700">
                Download Logs
              </button>
              <button className="w-full btn-pro bg-purple-600 text-white hover:bg-purple-700">
                Schedule Maintenance
              </button>
            </div>
          </div>

          <div className="card-premium">
            <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
              Active Alerts
            </h4>
            <div className="space-y-3">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center">
                  <Thermometer className="h-4 w-4 text-yellow-600 mr-2" />
                  <span className="text-sm font-medium text-yellow-800">TS-05 Temperature High</span>
                </div>
                <p className="text-xs text-yellow-600 mt-1">Current: 28.5°C (Target: &lt;26°C)</p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                  <span className="text-sm font-medium text-red-800">TS-03 Calibration Due</span>
                </div>
                <p className="text-xs text-red-600 mt-1">Last calibrated: 7 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorView;
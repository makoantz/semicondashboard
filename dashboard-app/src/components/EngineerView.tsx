import React, { useState } from 'react';
import { Cpu, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import type { TestResult } from '../data/mockData';
import DeviceDetailModal from './DeviceDetailModal';

interface EngineerViewProps {
  devices: TestResult[];
}

const EngineerView: React.FC<EngineerViewProps> = ({ devices }) => {
  const [selectedDevice, setSelectedDevice] = useState<TestResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeviceClick = (device: TestResult) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDevice(null);
  };

  const getDeviceIcon = (status: 'ok' | 'potential' | 'anomaly') => {
    switch (status) {
      case 'ok':
        return CheckCircle;
      case 'potential':
        return Clock;
      case 'anomaly':
        return AlertTriangle;
      default:
        return Cpu;
    }
  };

  const getDeviceColor = (status: 'ok' | 'potential' | 'anomaly') => {
    switch (status) {
      case 'ok':
        return 'text-apple-green-800 bg-gradient-to-br from-white to-apple-green-50 border-apple-green-200 hover:from-apple-green-50 hover:to-apple-green-100 shadow-apple shadow-apple-green-500/10 hover:shadow-apple-green-500/20';
      case 'potential':
        return 'text-apple-orange-800 bg-gradient-to-br from-white to-apple-orange-50 border-apple-orange-200 hover:from-apple-orange-50 hover:to-apple-orange-100 shadow-apple shadow-apple-orange-500/10 hover:shadow-apple-orange-500/20';
      case 'anomaly':
        return 'text-apple-red-800 bg-gradient-to-br from-white to-apple-red-50 border-apple-red-200 hover:from-apple-red-50 hover:to-apple-red-100 shadow-apple shadow-apple-red-500/10 hover:shadow-apple-red-500/20 animate-pulse';
      default:
        return 'text-apple-gray-800 bg-gradient-to-br from-white to-apple-gray-50 border-apple-gray-200 hover:from-apple-gray-50 hover:to-apple-gray-100 shadow-apple shadow-apple-gray-500/10';
    }
  };

  const getStatusText = (status: 'ok' | 'potential' | 'anomaly') => {
    switch (status) {
      case 'ok':
        return 'OK';
      case 'potential':
        return 'POTENTIAL ISSUE';
      case 'anomaly':
        return 'ANOMALY DETECTED';
      default:
        return 'UNKNOWN';
    }
  };

  const statusCounts = devices.reduce((acc, device) => {
    acc[device.engineerStatus] = (acc[device.engineerStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Status Summary */}
      <div className="bg-gradient-to-r from-white to-apple-gray-50 rounded-apple-xl shadow-apple-lg border border-apple-gray-200 p-6 backdrop-blur-sm">
        <div className="flex items-center mb-6">
          <div className="h-8 w-1 bg-gradient-to-b from-apple-blue-500 to-apple-indigo-500 rounded-full mr-4"></div>
          <div>
            <h3 className="text-xl font-bold text-apple-gray-800">Device Status Overview</h3>
            <p className="text-sm text-apple-gray-600">Real-time monitoring of all testing stations</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-apple-green-500 to-apple-green-600 rounded-apple-xl shadow-apple-lg p-6 text-white">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 bg-white bg-opacity-20 rounded-full"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold mb-1">{statusCounts.ok || 0}</p>
                <p className="text-white/90 font-medium">Devices OK</p>
                <p className="text-xs text-white/80 mt-1">Operating normally</p>
              </div>
              <CheckCircle className="h-12 w-12 text-white/80" />
            </div>
          </div>
          <div className="relative overflow-hidden bg-gradient-to-br from-apple-orange-500 to-apple-orange-600 rounded-apple-xl shadow-apple-lg p-6 text-white">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 bg-white bg-opacity-20 rounded-full"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold mb-1">{statusCounts.potential || 0}</p>
                <p className="text-white/90 font-medium">Potential Issues</p>
                <p className="text-xs text-white/80 mt-1">Requires monitoring</p>
              </div>
              <Clock className="h-12 w-12 text-white/80" />
            </div>
          </div>
          <div className="relative overflow-hidden bg-gradient-to-br from-apple-red-500 to-apple-red-600 rounded-apple-xl shadow-apple-lg p-6 text-white">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 bg-white bg-opacity-20 rounded-full"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold mb-1">{statusCounts.anomaly || 0}</p>
                <p className="text-white/90 font-medium">Anomalies</p>
                <p className="text-xs text-white/80 mt-1">Immediate attention</p>
              </div>
              <AlertTriangle className="h-12 w-12 text-white/80 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Device Map */}
      <div className="bg-white/80 backdrop-blur-md rounded-apple-lg shadow-apple border border-apple-gray-200 p-6">
        <h3 className="text-lg font-medium text-apple-gray-900 mb-4">Device Status Map</h3>
        <div className="relative bg-apple-gray-50/50 rounded-apple h-96 overflow-hidden">
          {/* Grid lines for reference */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#9CA3AF" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Device Icons */}
          {devices.map((device) => {
            const Icon = getDeviceIcon(device.engineerStatus);
            return (
              <button
                key={device.id}
                onClick={() => handleDeviceClick(device)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-full border-2 transition-all duration-200 hover:scale-110 ${getDeviceColor(device.engineerStatus)}`}
                style={{
                  left: `${Math.min(Math.max(device.position.x, 30), 570)}px`,
                  top: `${Math.min(Math.max(device.position.y, 30), 350)}px`
                }}
                title={`${device.deviceType} - ${getStatusText(device.engineerStatus)}`}
              >
                <Icon className="h-6 w-6" />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm border opacity-0 group-hover:opacity-100 transition-opacity">
                  {device.testStation}
                </div>
              </button>
            );
          })}
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-sm border">
            <p className="text-xs font-medium text-gray-700 mb-2">Status Legend</p>
            <div className="space-y-1">
              <div className="flex items-center text-xs">
                <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                <span>OK</span>
              </div>
              <div className="flex items-center text-xs">
                <Clock className="h-3 w-3 text-yellow-600 mr-1" />
                <span>Potential Issue</span>
              </div>
              <div className="flex items-center text-xs">
                <AlertTriangle className="h-3 w-3 text-red-600 mr-1" />
                <span>Anomaly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device List */}
      <div className="bg-white/80 backdrop-blur-md rounded-apple-lg shadow-apple border border-apple-gray-200 p-6">
        <h3 className="text-lg font-medium text-apple-gray-900 mb-4">Device Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device) => {
            const Icon = getDeviceIcon(device.engineerStatus);
            return (
              <button
                key={device.id}
                onClick={() => handleDeviceClick(device)}
                className={`p-4 rounded-apple border text-left transition-all duration-200 hover:shadow-apple-lg ${getDeviceColor(device.engineerStatus)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{device.testStation}</span>
                </div>
                <h4 className="font-medium mb-1">{device.deviceType}</h4>
                <p className="text-sm opacity-80 mb-1">Lot: {device.waferLot}</p>
                <p className="text-xs font-medium">{getStatusText(device.engineerStatus)}</p>
                <div className="mt-2 text-xs opacity-60">
                  <span>Yield: {device.yield}% | </span>
                  <span>Temp: {device.temperature}°C</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <DeviceDetailModal
        device={selectedDevice}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default EngineerView;
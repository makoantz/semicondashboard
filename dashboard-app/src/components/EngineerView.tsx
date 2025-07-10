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
        return 'card-premium bg-success-50 border-success-200 text-success-800 hover:bg-success-100';
      case 'potential':
        return 'card-premium bg-warning-50 border-warning-200 text-warning-800 hover:bg-warning-100';
      case 'anomaly':
        return 'card-premium bg-danger-50 border-danger-200 text-danger-800 hover:bg-danger-100 animate-pulse-subtle';
      default:
        return 'card-premium bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100';
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
      <div className="card-premium p-6">
        <div className="flex items-center mb-6">
          <div className="h-8 w-1 bg-gradient-pro rounded-full mr-4"></div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Device Status Overview</h3>
            <p className="text-sm text-gray-600">Real-time monitoring of all testing stations</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-premium bg-gradient-to-br from-success-500 to-success-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold mb-1">{statusCounts.ok || 0}</p>
                <p className="text-success-100 font-medium">Devices OK</p>
                <p className="text-xs text-success-200 mt-1">Operating normally</p>
              </div>
              <div className="icon-container-pro bg-white/20">
                <CheckCircle className="h-8 w-8" />
              </div>
            </div>
          </div>
          <div className="card-premium bg-gradient-to-br from-warning-500 to-warning-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold mb-1">{statusCounts.potential || 0}</p>
                <p className="text-warning-100 font-medium">Potential Issues</p>
                <p className="text-xs text-warning-200 mt-1">Requires monitoring</p>
              </div>
              <div className="icon-container-pro bg-white/20">
                <Clock className="h-8 w-8" />
              </div>
            </div>
          </div>
          <div className="card-premium bg-gradient-to-br from-danger-500 to-danger-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold mb-1">{statusCounts.anomaly || 0}</p>
                <p className="text-danger-100 font-medium">Anomalies</p>
                <p className="text-xs text-danger-200 mt-1">Immediate attention</p>
              </div>
              <div className="icon-container-pro bg-white/20">
                <AlertTriangle className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device Status Map */}
      <div className="card-premium p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <div className="icon-container-pro bg-primary-100 mr-3">
            <Cpu className="h-5 w-5 text-primary-600" />
          </div>
          Device Status Map
        </h3>
        <div className="relative bg-gray-50 rounded-xl h-96 overflow-hidden border">
          {/* Grid lines for reference */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-6 h-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>
          
          {/* Device positions */}
          {devices.map((device, index) => {
            const Icon = getDeviceIcon(device.engineerStatus);
            const row = Math.floor(index / 8);
            const col = index % 8;
            const left = (col * 12.5) + 6.25;
            const top = (row * 16.67) + 8.33;
            
            return (
              <button
                key={device.id}
                onClick={() => handleDeviceClick(device)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-xl transition-all duration-200 hover:scale-110 hover:z-10 ${getDeviceColor(device.engineerStatus)}`}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
                title={`${device.deviceType} - ${device.testStation} - ${getStatusText(device.engineerStatus)}`}
              >
                <Icon className="h-6 w-6" />
              </button>
            );
          })}
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 card-premium p-3">
            <p className="text-xs font-medium text-gray-700 mb-2">Status Legend</p>
            <div className="space-y-1">
              <div className="flex items-center text-xs">
                <CheckCircle className="h-3 w-3 text-success-600 mr-2" />
                <span>OK</span>
              </div>
              <div className="flex items-center text-xs">
                <Clock className="h-3 w-3 text-warning-600 mr-2" />
                <span>Potential Issue</span>
              </div>
              <div className="flex items-center text-xs">
                <AlertTriangle className="h-3 w-3 text-danger-600 mr-2" />
                <span>Anomaly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device List */}
      <div className="card-premium p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <div className="icon-container-pro bg-primary-100 mr-3">
            <Cpu className="h-5 w-5 text-primary-600" />
          </div>
          Device Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device) => {
            const Icon = getDeviceIcon(device.engineerStatus);
            return (
              <button
                key={device.id}
                onClick={() => handleDeviceClick(device)}
                className={`p-4 text-left transition-all duration-200 hover:shadow-lg ${getDeviceColor(device.engineerStatus)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="icon-container-pro bg-white/80">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="status-badge-pro text-xs">{device.testStation}</span>
                </div>
                <h4 className="font-semibold mb-2">{device.deviceType}</h4>
                <p className="text-sm opacity-80 mb-2">Lot: {device.waferLot}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{getStatusText(device.engineerStatus)}</span>
                  <div className="text-xs opacity-70">
                    <span>{device.yield}% • {device.temperature}°C</span>
                  </div>
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
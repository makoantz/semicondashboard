import React from 'react';
import { X, Thermometer, Zap, Activity, AlertCircle, Cpu, Clock, Database } from 'lucide-react';
import type { TestResult } from '../data/mockData';

interface DeviceDetailModalProps {
  device: TestResult | null;
  isOpen: boolean;
  onClose: () => void;
}

const DeviceDetailModal: React.FC<DeviceDetailModalProps> = ({ device, isOpen, onClose }) => {
  if (!isOpen || !device) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pass':
        return 'status-badge-pro bg-success-100 text-success-800 border-success-200';
      case 'Fail':
        return 'status-badge-pro bg-danger-100 text-danger-800 border-danger-200';
      case 'Retest':
        return 'status-badge-pro bg-warning-100 text-warning-800 border-warning-200';
      default:
        return 'status-badge-pro bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="card-premium max-w-5xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-pro text-white rounded-t-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="icon-container-pro bg-white/20">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Device Analysis Report</h2>
                <p className="text-primary-100">Complete Performance Analysis & Testing Results</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-primary-200 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Device Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Basic Info */}
            <div className="lg:col-span-2">
              <div className="card-premium p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="icon-container-pro bg-primary-100">
                    <Database className="h-5 w-5 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Device Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Device Type</label>
                      <p className="text-sm font-semibold text-gray-900">{device.deviceType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Wafer Lot</label>
                      <p className="text-sm font-semibold text-gray-900">{device.waferLot}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Test Station</label>
                      <p className="text-sm font-semibold text-gray-900">{device.testStation}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Timestamp</label>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(device.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div>
              <div className="card-premium p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="icon-container-pro bg-primary-100">
                    <Activity className="h-5 w-5 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Test Status</h3>
                </div>
                <div className="text-center">
                  <span className={getStatusColor(device.status)}>
                    {device.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-2">Current Test Result</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="card-premium p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="icon-container-pro bg-primary-100">
                <Activity className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card-premium bg-blue-50 border-blue-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">Yield</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">{device.yield}%</p>
                <p className="text-xs text-blue-600 mt-1">Production Quality</p>
              </div>
              
              <div className="card-premium bg-green-50 border-green-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <Zap className="h-5 w-5 text-green-600" />
                  <span className="text-xs font-medium text-green-600 uppercase tracking-wider">Throughput</span>
                </div>
                <p className="text-2xl font-bold text-green-900">{device.throughput}</p>
                <p className="text-xs text-green-600 mt-1">Units per Hour</p>
              </div>
              
              <div className="card-premium bg-red-50 border-red-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-xs font-medium text-red-600 uppercase tracking-wider">Defects</span>
                </div>
                <p className="text-2xl font-bold text-red-900">{device.defectCount}</p>
                <p className="text-xs text-red-600 mt-1">Total Count</p>
              </div>
              
              <div className="card-premium bg-orange-50 border-orange-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <Thermometer className="h-5 w-5 text-orange-600" />
                  <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">Temp</span>
                </div>
                <p className="text-2xl font-bold text-orange-900">{device.temperature}°C</p>
                <p className="text-xs text-orange-600 mt-1">Operating Range</p>
              </div>
            </div>
          </div>

          {/* Electrical Parameters */}
          <div className="card-premium p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="icon-container-pro bg-primary-100">
                <Zap className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Electrical Parameters</h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-gray-50 rounded-xl p-4 mb-2">
                  <p className="text-2xl font-bold text-gray-900">{device.voltage}V</p>
                </div>
                <p className="text-sm font-medium text-gray-600">Voltage</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-50 rounded-xl p-4 mb-2">
                  <p className="text-2xl font-bold text-gray-900">{device.current}A</p>
                </div>
                <p className="text-sm font-medium text-gray-600">Current</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-50 rounded-xl p-4 mb-2">
                  <p className="text-2xl font-bold text-gray-900">{device.frequency}GHz</p>
                </div>
                <p className="text-sm font-medium text-gray-600">Frequency</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-50 rounded-xl p-4 mb-2">
                  <p className="text-2xl font-bold text-gray-900">{device.power}W</p>
                </div>
                <p className="text-sm font-medium text-gray-600">Power</p>
              </div>
            </div>
          </div>

          {/* Status-specific Messages */}
          {device.status === 'Fail' && (
            <div className="card-premium bg-red-50 border-red-200 p-6">
              <div className="flex items-center space-x-3 mb-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <h4 className="text-lg font-semibold text-red-800">Failure Analysis</h4>
              </div>
              <p className="text-red-700">
                High defect count detected ({device.defectCount} defects). 
                Temperature exceeded optimal range ({device.temperature}°C). 
                Recommend immediate inspection and potential rework.
              </p>
            </div>
          )}

          {device.status === 'Retest' && (
            <div className="card-premium bg-yellow-50 border-yellow-200 p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <h4 className="text-lg font-semibold text-yellow-800">Retest Required</h4>
              </div>
              <p className="text-yellow-700">
                Performance metrics are within acceptable range but require verification. 
                Schedule for retest to confirm stability.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-2xl">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="btn-pro bg-gray-600 text-white hover:bg-gray-700"
            >
              Close
            </button>
            <button className="btn-pro bg-primary-600 text-white hover:bg-primary-700">
              Download Report
            </button>
            <button className="btn-pro bg-success-600 text-white hover:bg-success-700">
              Mark as Reviewed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailModal;

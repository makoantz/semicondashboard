import React from 'react';
import { X, Thermometer, Zap, Activity, AlertCircle } from 'lucide-react';
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
        return 'text-green-600 bg-green-50';
      case 'Fail':
        return 'text-red-600 bg-red-50';
      case 'Retest':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Device Details</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Basic Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Device ID:</span>
                    <span className="text-sm font-medium text-gray-900">{device.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Device Type:</span>
                    <span className="text-sm font-medium text-gray-900">{device.deviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Wafer Lot:</span>
                    <span className="text-sm font-medium text-gray-900">{device.waferLot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Test Station:</span>
                    <span className="text-sm font-medium text-gray-900">{device.testStation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Timestamp:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(device.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                      {device.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Performance Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-xs text-blue-600">Yield</span>
                    </div>
                    <p className="text-lg font-semibold text-blue-900">{device.yield}%</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-xs text-green-600">Throughput</span>
                    </div>
                    <p className="text-lg font-semibold text-green-900">{device.throughput}</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                      <span className="text-xs text-red-600">Defects</span>
                    </div>
                    <p className="text-lg font-semibold text-red-900">{device.defectCount}</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <Thermometer className="h-4 w-4 text-orange-600 mr-2" />
                      <span className="text-xs text-orange-600">Temperature</span>
                    </div>
                    <p className="text-lg font-semibold text-orange-900">{device.temperature}°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Electrical Parameters</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Voltage</span>
                  <p className="text-lg font-semibold text-gray-900">{device.voltage}V</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Current</span>
                  <p className="text-lg font-semibold text-gray-900">{device.current}A</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Frequency</span>
                  <p className="text-lg font-semibold text-gray-900">{device.frequency}GHz</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Power</span>
                  <p className="text-lg font-semibold text-gray-900">{device.power}W</p>
                </div>
              </div>
            </div>
          </div>
          
          {device.status === 'Fail' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-red-800 mb-2">Failure Analysis</h4>
              <p className="text-sm text-red-700">
                High defect count detected ({device.defectCount} defects). 
                Temperature exceeded optimal range ({device.temperature}°C). 
                Recommend immediate inspection and potential rework.
              </p>
            </div>
          )}
          
          {device.status === 'Retest' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">Retest Required</h4>
              <p className="text-sm text-yellow-700">
                Performance metrics are within acceptable range but require verification. 
                Schedule for retest to confirm stability.
              </p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailModal;
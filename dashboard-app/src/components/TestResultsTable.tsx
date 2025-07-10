import React, { useState } from 'react';
import { Search, Filter, Download, Eye } from 'lucide-react';
import type { TestResult } from '../data/mockData';
import DeviceDetailModal from './DeviceDetailModal';

interface TestResultsTableProps {
  data: TestResult[];
}

const TestResultsTable: React.FC<TestResultsTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDevice, setSelectedDevice] = useState<TestResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDevice = (device: TestResult) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDevice(null);
  };

  const filteredData = data.filter(item => {
    const matchesSearch = item.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.waferLot.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.testStation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'Pass':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Fail':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Retest':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-medium text-gray-900">Test Results</h3>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search devices, lots, stations..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
                <option value="Retest">Retest</option>
              </select>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wafer Lot</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Station</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yield</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Throughput</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Defects</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.deviceType}</div>
                  <div className="text-sm text-gray-500">{item.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.waferLot}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.testStation}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(item.status)}>{item.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.yield}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.throughput}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.defectCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.temperature}°C</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => handleViewDevice(item)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No test results found matching your criteria.</p>
          </div>
        )}
      </div>
      
      <DeviceDetailModal
        device={selectedDevice}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default TestResultsTable;
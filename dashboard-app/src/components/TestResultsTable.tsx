import React, { useState } from 'react';
import { Search, Filter, Download, Eye, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
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
  const [sortField, setSortField] = useState<keyof TestResult>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleViewDevice = (device: TestResult) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDevice(null);
  };

  const handleSort = (field: keyof TestResult) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredData = data.filter(item => {
    const matchesSearch = item.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.waferLot.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.testStation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const modifier = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * modifier;
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * modifier;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pass':
        return 'status-badge-pro status-success-pro';
      case 'Fail':
        return 'status-badge-pro status-error-pro';
      case 'Retest':
        return 'status-badge-pro status-warning-pro';
      default:
        return 'status-badge-pro status-info-pro';
    }
  };

  const getPriorityColor = (voltage: number) => {
    if (voltage > 3.5) return 'text-danger-600';
    if (voltage > 3.2) return 'text-warning-600';
    return 'text-success-600';
  };

  const SortButton: React.FC<{ field: keyof TestResult; children: React.ReactNode }> = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left font-semibold text-slate-700 hover:text-primary-600 transition-colors duration-200"
    >
      <span>{children}</span>
      {sortField === field && (
        sortDirection === 'asc' ? 
          <ChevronUp className="h-4 w-4" /> : 
          <ChevronDown className="h-4 w-4" />
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl p-8 shadow-floating">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Test Results Database</h2>
            <p className="text-slate-300">Comprehensive testing data and device analysis</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{filteredData.length}</div>
              <div className="text-xs text-slate-400">Total Results</div>
            </div>
            <div className="w-px h-12 bg-slate-600 opacity-50"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Math.round((filteredData.filter(d => d.status === 'Pass').length / filteredData.length) * 100)}%
              </div>
              <div className="text-xs text-slate-400">Pass Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="card-premium">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search devices, lots, stations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="All">All Status</option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
                <option value="Retest">Retest</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="btn-pro bg-secondary-600 text-white hover:bg-secondary-700 flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </button>
            <button className="btn-pro bg-primary-600 text-white hover:bg-primary-700 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-4">
                  <SortButton field="deviceType">Device Type</SortButton>
                </th>
                <th className="text-left py-4 px-4">
                  <SortButton field="waferLot">Wafer Lot</SortButton>
                </th>
                <th className="text-left py-4 px-4">
                  <SortButton field="testStation">Station</SortButton>
                </th>
                <th className="text-left py-4 px-4">
                  <SortButton field="status">Status</SortButton>
                </th>
                <th className="text-left py-4 px-4">
                  <SortButton field="voltage">Voltage</SortButton>
                </th>
                <th className="text-left py-4 px-4">
                  <SortButton field="temperature">Temp</SortButton>
                </th>
                <th className="text-left py-4 px-4">
                  <SortButton field="timestamp">Timestamp</SortButton>
                </th>
                <th className="text-left py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((device) => (
                <tr 
                  key={device.id} 
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-slate-800">{device.deviceType}</div>
                    <div className="text-sm text-slate-500">ID: {device.id}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-slate-800">{device.waferLot}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-slate-800">{device.testStation}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={getStatusBadge(device.status)}>
                      {device.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${getPriorityColor(device.voltage)}`}>
                      {device.voltage}V
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-700">{device.temperature}°C</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-slate-600">
                      {new Date(device.timestamp).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-slate-400">
                      {new Date(device.timestamp).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewDevice(device)}
                        className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors duration-200"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                        title="More Actions"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
          <div className="text-sm text-slate-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                if (page > totalPages) return null;
                
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm rounded-lg ${
                      page === currentPage
                        ? 'bg-primary-600 text-white'
                        : 'border border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Device Detail Modal */}
      {isModalOpen && selectedDevice && (
        <DeviceDetailModal
          device={selectedDevice}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default TestResultsTable;
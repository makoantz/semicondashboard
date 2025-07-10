import React from 'react';
import { Users, Clock, AlertTriangle, CheckCircle, Target, TrendingUp } from 'lucide-react';
import type { OverviewMetrics, TestResult } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ManagerViewProps {
  metrics: OverviewMetrics;
  devices: TestResult[];
}

const ManagerView: React.FC<ManagerViewProps> = ({ metrics, devices }) => {
  // Use metrics and devices in the component
  console.log('Manager metrics:', metrics, 'Devices:', devices);
  const teamMetrics = [
    {
      title: 'Team Efficiency',
      value: '94.2%',
      target: '92%',
      status: 'above',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Technicians',
      value: '24',
      target: '22',
      status: 'above',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Avg. Processing Time',
      value: '4.2h',
      target: '4.5h',
      status: 'below',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Issues Resolved',
      value: '18',
      target: '15',
      status: 'above',
      icon: CheckCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const stationPerformance = [
    { station: 'TS-01', efficiency: 96, throughput: 128, issues: 2 },
    { station: 'TS-02', efficiency: 98, throughput: 135, issues: 1 },
    { station: 'TS-03', efficiency: 78, throughput: 95, issues: 5 },
    { station: 'TS-04', efficiency: 94, throughput: 142, issues: 3 },
    { station: 'TS-05', efficiency: 89, throughput: 110, issues: 4 },
    { station: 'TS-06', efficiency: 97, throughput: 140, issues: 1 },
    { station: 'TS-07', efficiency: 92, throughput: 125, issues: 3 },
    { station: 'TS-08', efficiency: 82, throughput: 105, issues: 4 }
  ];

  const dailyTrends = [
    { day: 'Mon', completed: 145, quality: 96, efficiency: 94 },
    { day: 'Tue', completed: 152, quality: 97, efficiency: 95 },
    { day: 'Wed', completed: 148, quality: 95, efficiency: 93 },
    { day: 'Thu', completed: 156, quality: 98, efficiency: 96 },
    { day: 'Fri', completed: 162, quality: 97, efficiency: 97 },
    { day: 'Sat', completed: 138, quality: 96, efficiency: 94 },
    { day: 'Sun', completed: 142, quality: 95, efficiency: 92 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'above':
        return 'text-green-600';
      case 'below':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStationStatus = (efficiency: number) => {
    if (efficiency >= 95) return { color: 'bg-green-100 text-green-800', label: 'Excellent' };
    if (efficiency >= 85) return { color: 'bg-yellow-100 text-yellow-800', label: 'Good' };
    return { color: 'bg-red-100 text-red-800', label: 'Needs Attention' };
  };

  return (
    <div className="space-y-6">
      {/* Manager Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Operations Manager Dashboard</h2>
        <p className="text-blue-100">Team performance, process optimization, and operational oversight</p>
      </div>

      {/* Team Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMetrics.map((metric, index) => {
          const Icon = metric.icon;
          
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`text-sm ${getStatusColor(metric.status)}`}>
                  vs {metric.target}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="#3B82F6" name="Tests Completed" />
              <Line type="monotone" dataKey="efficiency" stroke="#10B981" name="Efficiency %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Station Efficiency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stationPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="station" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="efficiency" fill="#8B5CF6" name="Efficiency %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Station Status Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Test Station Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stationPerformance.map((station) => {
            const status = getStationStatus(station.efficiency);
            return (
              <div key={station.station} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{station.station}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Efficiency:</span>
                    <span className="font-medium">{station.efficiency}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Throughput:</span>
                    <span className="font-medium">{station.throughput}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Issues:</span>
                    <span className={`font-medium ${station.issues > 3 ? 'text-red-600' : 'text-green-600'}`}>
                      {station.issues}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Items & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Priority Action Items</h3>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">Station TS-03 Performance Issue</p>
                <p className="text-xs text-red-600">Efficiency down to 78% - requires immediate attention</p>
                <p className="text-xs text-red-500 mt-1">Assigned to: Tech Team Alpha</p>
              </div>
            </div>
            <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800">Preventive Maintenance Due</p>
                <p className="text-xs text-yellow-600">Stations TS-02, TS-05 scheduled for maintenance</p>
                <p className="text-xs text-yellow-500 mt-1">Due: This Weekend</p>
              </div>
            </div>
            <div className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Users className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800">Staff Training Required</p>
                <p className="text-xs text-blue-600">New equipment training for night shift team</p>
                <p className="text-xs text-blue-500 mt-1">Scheduled: Next Tuesday</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Team Performance Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-900">Day Shift (6AM-6PM)</p>
                <p className="text-xs text-green-700">12 technicians • 96% efficiency</p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-900">Night Shift (6PM-6AM)</p>
                <p className="text-xs text-blue-700">8 technicians • 92% efficiency</p>
              </div>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-purple-900">Weekend Crew</p>
                <p className="text-xs text-purple-700">4 technicians • 89% efficiency</p>
              </div>
              <Target className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerView;
import React from 'react';
import { Users, Clock, AlertTriangle, CheckCircle, Target, TrendingUp, Award, Settings } from 'lucide-react';
import type { OverviewMetrics, TestResult } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ManagerViewProps {
  metrics: OverviewMetrics;
  devices: TestResult[];
}

const ManagerView: React.FC<ManagerViewProps> = ({ metrics, devices }) => {
  const teamMetrics = [
    {
      title: 'Team Efficiency',
      value: '94.2%',
      target: '92%',
      status: 'above',
      icon: Target,
      color: 'text-success-600',
      bgColor: 'bg-success-100',
      progress: 94.2,
      gradient: 'from-success-500 to-emerald-600'
    },
    {
      title: 'Active Technicians',
      value: '24',
      target: '22',
      status: 'above',
      icon: Users,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
      progress: 85,
      gradient: 'from-primary-500 to-blue-600'
    },
    {
      title: 'Avg. Processing Time',
      value: '4.2h',
      target: '4.5h',
      status: 'below',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      progress: 78,
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'Issues Resolved',
      value: '18',
      target: '15',
      status: 'above',
      icon: CheckCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      progress: 92,
      gradient: 'from-orange-500 to-amber-600'
    }
  ];

  const stationPerformance = [
    { station: 'TS-01', efficiency: 96, throughput: 128, issues: 2, status: 'excellent' },
    { station: 'TS-02', efficiency: 98, throughput: 135, issues: 1, status: 'excellent' },
    { station: 'TS-03', efficiency: 78, throughput: 95, issues: 5, status: 'attention' },
    { station: 'TS-04', efficiency: 94, throughput: 142, issues: 3, status: 'good' },
    { station: 'TS-05', efficiency: 89, throughput: 110, issues: 4, status: 'good' },
    { station: 'TS-06', efficiency: 97, throughput: 140, issues: 1, status: 'excellent' },
    { station: 'TS-07', efficiency: 92, throughput: 125, issues: 3, status: 'good' },
    { station: 'TS-08', efficiency: 82, throughput: 105, issues: 4, status: 'attention' }
  ];

  const dailyTrends = [
    { day: 'Mon', completed: 145, quality: 96, efficiency: 94, capacity: 88 },
    { day: 'Tue', completed: 152, quality: 97, efficiency: 95, capacity: 91 },
    { day: 'Wed', completed: 148, quality: 95, efficiency: 93, capacity: 89 },
    { day: 'Thu', completed: 156, quality: 98, efficiency: 96, capacity: 94 },
    { day: 'Fri', completed: 162, quality: 97, efficiency: 97, capacity: 96 },
    { day: 'Sat', completed: 138, quality: 96, efficiency: 94, capacity: 82 },
    { day: 'Sun', completed: 142, quality: 95, efficiency: 92, capacity: 84 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'above':
        return 'text-success-600';
      case 'below':
        return 'text-purple-600';
      default:
        return 'text-slate-600';
    }
  };

  const getStationStatus = (status: string) => {
    switch (status) {
      case 'excellent':
        return { color: 'status-success-pro', label: 'Excellent', icon: Award };
      case 'good':
        return { color: 'status-warning-pro', label: 'Good', icon: CheckCircle };
      case 'attention':
        return { color: 'status-error-pro', label: 'Needs Attention', icon: AlertTriangle };
      default:
        return { color: 'status-info-pro', label: 'Normal', icon: Settings };
    }
  };

  return (
    <div className="space-y-8">
      {/* Manager Dashboard Header */}
      <div className="bg-gradient-to-r from-primary-600 to-indigo-700 text-white rounded-2xl p-8 shadow-floating">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Operations Manager Dashboard</h2>
            <p className="text-primary-100">Team performance, process optimization, and operational oversight</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{devices.length}</div>
              <div className="text-xs text-primary-200">Active Devices</div>
            </div>
            <div className="w-px h-12 bg-primary-400 opacity-50"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">{metrics.activeStations}</div>
              <div className="text-xs text-primary-200">Stations Online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMetrics.map((metric, index) => {
          const Icon = metric.icon;
          
          return (
            <div key={index} className="card-premium group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className={`icon-container-pro ${metric.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`text-sm font-semibold ${getStatusColor(metric.status)}`}>
                  vs {metric.target}
                </div>
              </div>
              
              <h3 className="text-heading-sm text-slate-800 font-semibold mb-2">{metric.title}</h3>
              <p className="kpi-value-pro mb-4">{metric.value}</p>
              
              {/* Progress bar */}
              <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${metric.gradient} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${metric.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Progress</span>
                <span>{metric.progress}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Trends and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-premium">
          <h3 className="text-heading-md text-slate-800 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
            Daily Performance Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyTrends} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }} 
              />
              <Line type="monotone" dataKey="completed" stroke="#3b82f6" name="Tests Completed" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }} />
              <Line type="monotone" dataKey="efficiency" stroke="#10b981" name="Efficiency %" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }} />
              <Line type="monotone" dataKey="capacity" stroke="#8b5cf6" name="Capacity %" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card-premium">
          <h3 className="text-heading-md text-slate-800 mb-6">Station Efficiency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stationPerformance} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="station" stroke="#64748b" fontSize={10} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }} 
              />
              <Bar dataKey="efficiency" fill="#8b5cf6" name="Efficiency %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Station Status Overview */}
      <div className="card-premium">
        <h3 className="text-heading-md text-slate-800 mb-6">Test Station Status Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stationPerformance.map((station) => {
            const status = getStationStatus(station.status);
            const StatusIcon = status.icon;
            
            return (
              <div key={station.station} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-800">{station.station}</h4>
                  <span className={`status-badge-pro ${status.color} flex items-center`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {status.label}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Efficiency:</span>
                    <div className="flex items-center">
                      <div className="w-12 bg-slate-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${station.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="font-medium text-slate-800">{station.efficiency}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Throughput:</span>
                    <span className="font-medium text-slate-800">{station.throughput}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Issues:</span>
                    <span className={`font-medium ${station.issues > 3 ? 'text-danger-600' : 'text-success-600'}`}>
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
        <div className="card-premium">
          <h3 className="text-heading-md text-slate-800 mb-6">Priority Action Items</h3>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-danger-50 to-red-100 border-l-4 border-danger-500 rounded-xl p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-danger-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-danger-900 mb-1">Station TS-03 Performance Issue</h4>
                    <p className="text-sm text-danger-700 mb-2">Efficiency down to 78% - requires immediate attention</p>
                    <p className="text-xs text-danger-600">Assigned to: Tech Team Alpha</p>
                  </div>
                </div>
                <button className="btn-pro bg-danger-600 text-white hover:bg-danger-700 text-sm px-3 py-1">
                  Investigate
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-warning-50 to-yellow-100 border-l-4 border-warning-500 rounded-xl p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-warning-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-warning-900 mb-1">Maintenance Scheduled</h4>
                    <p className="text-sm text-warning-700 mb-2">TS-05 and TS-08 scheduled for preventive maintenance</p>
                    <p className="text-xs text-warning-600">Scheduled: Tomorrow 2:00 AM</p>
                  </div>
                </div>
                <button className="btn-pro bg-warning-600 text-white hover:bg-warning-700 text-sm px-3 py-1">
                  Review
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-success-50 to-green-100 border-l-4 border-success-500 rounded-xl p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-success-900 mb-1">Target Achievement</h4>
                    <p className="text-sm text-success-700 mb-2">Team efficiency exceeded monthly target by 2.1%</p>
                    <p className="text-xs text-success-600">Achieved: This Quarter</p>
                  </div>
                </div>
                <button className="btn-pro bg-success-600 text-white hover:bg-success-700 text-sm px-3 py-1">
                  Celebrate
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card-premium">
          <h3 className="text-heading-md text-slate-800 mb-6">Resource Optimization</h3>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center mb-3">
                <Users className="h-5 w-5 text-primary-600 mr-2" />
                <h4 className="font-semibold text-primary-900">Staff Allocation</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-primary-700">Day Shift:</span>
                  <p className="font-semibold text-primary-900">14 Technicians</p>
                </div>
                <div>
                  <span className="text-primary-700">Night Shift:</span>
                  <p className="font-semibold text-primary-900">10 Technicians</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-indigo-100 rounded-xl p-4">
              <div className="flex items-center mb-3">
                <Target className="h-5 w-5 text-purple-600 mr-2" />
                <h4 className="font-semibold text-purple-900">Capacity Planning</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-700">Current Utilization:</span>
                  <span className="font-semibold text-purple-900">87.3%</span>
                </div>
                <div className="bg-purple-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '87.3%' }}></div>
                </div>
                <p className="text-xs text-purple-600 mt-2">Optimal range: 85-90%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerView;
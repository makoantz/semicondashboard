import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, Users, Factory } from 'lucide-react';
import type { OverviewMetrics } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ExecutiveViewProps {
  metrics: OverviewMetrics;
}

const ExecutiveView: React.FC<ExecutiveViewProps> = ({ metrics }) => {
  const kpiData = [
    {
      title: 'Revenue Impact',
      value: '$2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Operational Efficiency',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Quality Score',
      value: '96.8%',
      change: '+1.8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Resource Utilization',
      value: '87.3%',
      change: '-0.5%',
      trend: 'down',
      icon: Factory,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const performanceData = [
    { month: 'Jan', revenue: 2100, efficiency: 89, quality: 94 },
    { month: 'Feb', revenue: 2200, efficiency: 91, quality: 95 },
    { month: 'Mar', revenue: 2400, efficiency: 94, quality: 97 },
    { month: 'Apr', revenue: 2300, efficiency: 92, quality: 96 }
  ];

  const distributionData = [
    { name: 'Mobile Processors', value: 45, color: '#3B82F6' },
    { name: 'Server CPUs', value: 30, color: '#10B981' },
    { name: 'AI Chips', value: 15, color: '#8B5CF6' },
    { name: 'IoT Devices', value: 10, color: '#F59E0B' }
  ];

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Executive Dashboard</h2>
        <p className="text-blue-100">Comprehensive overview of semiconductor testing operations and business performance</p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
                <div className={`flex items-center text-sm ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon className="h-4 w-4 mr-1" />
                  {kpi.change}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">{kpi.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenue (K$)" />
              <Bar dataKey="efficiency" fill="#10B981" name="Efficiency (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Product Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Business Metrics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Impact Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{metrics.totalDevicesTested.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Total Units Tested</div>
            <div className="text-xs text-gray-400 mt-1">This Quarter</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">${(metrics.totalDevicesTested * 0.15).toFixed(1)}M</div>
            <div className="text-sm text-gray-500">Revenue Generated</div>
            <div className="text-xs text-gray-400 mt-1">Estimated Value</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{metrics.passRate}%</div>
            <div className="text-sm text-gray-500">Customer Satisfaction</div>
            <div className="text-xs text-gray-400 mt-1">Quality Index</div>
          </div>
        </div>
      </div>

      {/* Strategic Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Strategic Insights</h3>
        <div className="space-y-4">
          <div className="flex items-start p-4 bg-green-50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-900">Strong Performance</h4>
              <p className="text-sm text-green-700">Testing efficiency improved 12.5% this quarter, exceeding targets by 8%</p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-blue-50 rounded-lg">
            <Users className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Capacity Optimization</h4>
              <p className="text-sm text-blue-700">Current utilization at 87.3% suggests optimal resource allocation</p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-yellow-50 rounded-lg">
            <Target className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900">Market Opportunity</h4>
              <p className="text-sm text-yellow-700">AI chip testing demand projected to grow 35% next quarter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveView;
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { TrendingUp, BarChart3, Activity, Target } from 'lucide-react';
import type { ChartData } from '../data/mockData';

interface PerformanceChartsProps {
  data: ChartData[];
}

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-lg">
          <p className="text-sm font-medium text-slate-800">{new Date(label).toLocaleDateString()}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}{entry.name.includes('Yield') ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Performance Analytics Header */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-700 text-white rounded-2xl p-8 shadow-floating">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Performance Analytics</h2>
            <p className="text-primary-100">Comprehensive testing metrics and trend analysis</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{data.length}</div>
              <div className="text-xs text-primary-200">Data Points</div>
            </div>
            <div className="w-px h-12 bg-primary-400 opacity-50"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Math.round(data.reduce((sum, d) => sum + d.yield, 0) / data.length)}%
              </div>
              <div className="text-xs text-primary-200">Avg Yield</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Yield Trend Chart */}
        <div className="card-premium">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-heading-md text-slate-800 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-success-600" />
              Yield Trend Analysis
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Yield %</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                domain={[85, 100]}
                tick={{ fontSize: 12, fill: '#64748b' }}
                label={{ value: 'Yield (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="yield" 
                stroke="#10b981" 
                strokeWidth={3}
                fill="url(#yieldGradient)"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Throughput Performance Chart */}
        <div className="card-premium">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-heading-md text-slate-800 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-primary-600" />
              Throughput Performance
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Units/Hour</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                label={{ value: 'Throughput', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="throughput" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                name="Throughput"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Combined Performance View */}
      <div className="card-premium">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-heading-md text-slate-800 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-purple-600" />
            Combined Performance Metrics
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Yield</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Throughput</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Defects</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 12, fill: '#64748b' }}
              label={{ value: 'Yield (%) / Throughput', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12, fill: '#64748b' }}
              label={{ value: 'Defects', angle: 90, position: 'insideRight', style: { textAnchor: 'middle' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="yield" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
              name="Yield"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="throughput" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
              name="Throughput"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="defects" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }}
              name="Defects"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-premium text-center">
          <div className="icon-container-pro bg-success-100 mx-auto mb-4">
            <Target className="h-6 w-6 text-success-600" />
          </div>
          <h4 className="text-heading-sm text-slate-800 mb-2">Peak Yield</h4>
          <p className="kpi-value-pro text-success-600">
            {Math.max(...data.map(d => d.yield))}%
          </p>
          <p className="text-sm text-slate-600 mt-2">Best performance recorded</p>
        </div>
        
        <div className="card-premium text-center">
          <div className="icon-container-pro bg-primary-100 mx-auto mb-4">
            <BarChart3 className="h-6 w-6 text-primary-600" />
          </div>
          <h4 className="text-heading-sm text-slate-800 mb-2">Max Throughput</h4>
          <p className="kpi-value-pro text-primary-600">
            {Math.max(...data.map(d => d.throughput))}
          </p>
          <p className="text-sm text-slate-600 mt-2">Units per hour</p>
        </div>
        
        <div className="card-premium text-center">
          <div className="icon-container-pro bg-purple-100 mx-auto mb-4">
            <Activity className="h-6 w-6 text-purple-600" />
          </div>
          <h4 className="text-heading-sm text-slate-800 mb-2">Avg Defects</h4>
          <p className="kpi-value-pro text-purple-600">
            {Math.round(data.reduce((sum, d) => sum + d.defects, 0) / data.length)}
          </p>
          <p className="text-sm text-slate-600 mt-2">Per testing cycle</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts;
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, Users, Factory, Zap, Award, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import type { OverviewMetrics } from '../data/mockData';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

interface ExecutiveViewProps {
  metrics: OverviewMetrics;
}

const ExecutiveView: React.FC<ExecutiveViewProps> = ({ metrics }) => {
  const executiveKPIs = [
    {
      title: 'Revenue Impact',
      value: '$2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      subtitle: 'Quarterly Revenue',
      target: '$2.2M',
      progress: 109
    },
    {
      title: 'Operational Excellence',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      color: 'blue',
      subtitle: 'Efficiency Score',
      target: '92%',
      progress: 102
    },
    {
      title: 'Quality Index',
      value: '96.8%',
      change: '+1.8%',
      trend: 'up',
      icon: Award,
      color: 'purple',
      subtitle: 'Quality Rating',
      target: '95%',
      progress: 102
    },
    {
      title: 'Resource Utilization',
      value: '87.3%',
      change: '-0.5%',
      trend: 'down',
      icon: Factory,
      color: 'orange',
      subtitle: 'Capacity Usage',
      target: '90%',
      progress: 97
    }
  ];

  const performanceTrends = [
    { month: 'Jan', revenue: 2100, efficiency: 89, quality: 94, defects: 156 },
    { month: 'Feb', revenue: 2200, efficiency: 91, quality: 95, defects: 142 },
    { month: 'Mar', revenue: 2400, efficiency: 94, quality: 97, defects: 128 },
    { month: 'Apr', revenue: 2300, efficiency: 92, quality: 96, defects: 134 },
    { month: 'May', revenue: 2600, efficiency: 95, quality: 98, defects: 118 },
    { month: 'Jun', revenue: 2800, efficiency: 96, quality: 97, defects: 122 }
  ];

  const productMix = [
    { name: 'Mobile Processors', value: 45, color: '#3B82F6', revenue: 1080 },
    { name: 'Server CPUs', value: 30, color: '#10B981', revenue: 840 },
    { name: 'AI Chips', value: 15, color: '#8B5CF6', revenue: 420 },
    { name: 'IoT Devices', value: 10, color: '#F59E0B', revenue: 240 }
  ];

  const strategicMetrics = [
    { 
      metric: 'Market Share Growth',
      value: '+15.3%',
      benchmark: '12%',
      status: 'exceeding'
    },
    {
      metric: 'Customer Satisfaction',
      value: '4.8/5.0',
      benchmark: '4.5/5.0',
      status: 'exceeding'
    },
    {
      metric: 'Time to Market',
      value: '14.2 days',
      benchmark: '16 days',
      status: 'exceeding'
    },
    {
      metric: 'R&D Investment ROI',
      value: '285%',
      benchmark: '250%',
      status: 'exceeding'
    }
  ];

  const getIconColor = (color: string) => {
    const colors = {
      green: 'icon-green-pro',
      blue: 'icon-blue-pro',
      purple: 'icon-purple-pro',
      orange: 'icon-orange-pro',
      red: 'icon-red-pro'
    };
    return colors[color as keyof typeof colors] || 'icon-blue-pro';
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Executive Summary Header */}
      <div className="executive-header-pro">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-heading-xl text-white mb-2">Executive Dashboard</h1>
            <p className="text-slate-200 text-lg">Strategic overview of semiconductor testing operations and business performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-slate-300 text-sm">Last Updated</p>
              <p className="text-white font-semibold">Real-time</p>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-2">Today's Performance</h3>
            <p className="text-3xl font-bold text-white">{metrics.totalDevicesTested.toLocaleString()}</p>
            <p className="text-slate-300 text-sm">Units Tested</p>
          </div>
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-2">Yield Rate</h3>
            <p className="text-3xl font-bold text-green-300">{metrics.overallYield}%</p>
            <p className="text-slate-300 text-sm">Above Target</p>
          </div>
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-2">Active Lines</h3>
            <p className="text-3xl font-bold text-blue-300">{metrics.activeStations}</p>
            <p className="text-slate-300 text-sm">Production Lines</p>
          </div>
        </div>
      </div>

      {/* Executive KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {executiveKPIs.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <div key={index} className="kpi-card-executive group">
              <div className="flex items-center justify-between mb-6">
                <div className={`icon-container-pro ${getIconColor(kpi.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`status-badge-pro ${kpi.trend === 'up' ? 'status-success-pro' : 'status-error-pro'}`}>
                  <TrendIcon className="h-3 w-3 mr-1" />
                  {kpi.change}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-subtitle-pro mb-2">{kpi.title}</h3>
                <p className="text-display">{kpi.value}</p>
                <p className="text-sm text-slate-500">{kpi.subtitle}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Target: {kpi.target}</span>
                  <span className={`font-semibold ${kpi.progress >= 100 ? 'text-green-600' : 'text-orange-600'}`}>
                    {kpi.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${kpi.progress >= 100 ? 'bg-green-500' : 'bg-orange-500'}`}
                    style={{ width: `${Math.min(kpi.progress, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue & Efficiency Trends */}
        <div className="lg:col-span-2 chart-container-pro">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-heading-md text-slate-800 mb-1">Performance Trends</h3>
              <p className="text-slate-600">6-month revenue and efficiency analysis</p>
            </div>
            <BarChart3 className="h-6 w-6 text-slate-400" />
          </div>
          
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={performanceTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(20px)'
                }} 
              />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="efficiency" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorEfficiency)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Product Mix */}
        <div className="chart-container-pro">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-heading-md text-slate-800 mb-1">Product Portfolio</h3>
              <p className="text-slate-600">Revenue distribution by product</p>
            </div>
            <PieChartIcon className="h-6 w-6 text-slate-400" />
          </div>
          
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={productMix}
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={50}
                paddingAngle={5}
                dataKey="value"
              >
                {productMix.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="space-y-3 mt-4">
            {productMix.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: product.color }}
                  ></div>
                  <span className="text-sm text-slate-700">{product.name}</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">${product.revenue}K</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Metrics */}
      <div className="card-premium">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-heading-md text-slate-800 mb-2">Strategic Performance Indicators</h3>
            <p className="text-slate-600">Key business metrics and benchmarks</p>
          </div>
          <Zap className="h-6 w-6 text-blue-500" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {strategicMetrics.map((metric, index) => (
            <div key={index} className="bg-slate-50/50 rounded-2xl p-6 hover:bg-slate-100/50 transition-colors">
              <h4 className="text-sm font-medium text-slate-600 mb-3">{metric.metric}</h4>
              <p className="text-2xl font-bold text-slate-800 mb-2">{metric.value}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Target: {metric.benchmark}</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Exceeding
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Insights */}
      <div className="card-premium">
        <h3 className="text-heading-md text-slate-800 mb-6">Executive Insights & Recommendations</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-green-900 mb-2">Outstanding Performance</h4>
                <p className="text-sm text-green-700 leading-relaxed">
                  Q2 revenue exceeded targets by 12.5%. Testing efficiency improvements have driven significant cost reductions.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200/50">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Capacity Optimization</h4>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Current 87.3% utilization suggests optimal resource allocation with room for strategic growth.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200/50">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">Market Opportunity</h4>
                <p className="text-sm text-purple-700 leading-relaxed">
                  AI chip testing demand projected to grow 35% next quarter, presenting expansion opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveView;

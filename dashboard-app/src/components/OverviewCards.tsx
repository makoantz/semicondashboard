import React from 'react';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, CheckCircle, Zap, Target, Factory } from 'lucide-react';
import type { OverviewMetrics } from '../data/mockData';

interface OverviewCardsProps {
  metrics: OverviewMetrics;
}

const OverviewCards: React.FC<OverviewCardsProps> = ({ metrics }) => {
  const cards = [
    {
      title: 'Total Devices Tested',
      value: metrics.totalDevicesTested.toLocaleString(),
      icon: Activity,
      iconColor: 'text-primary-600',
      iconBg: 'bg-primary-100',
      change: '+12.5%',
      trend: 'up',
      description: 'Units processed this period',
      gradient: 'from-primary-500 to-blue-600'
    },
    {
      title: 'Overall Yield',
      value: `${metrics.overallYield}%`,
      icon: Target,
      iconColor: 'text-success-600',
      iconBg: 'bg-success-100',
      change: '+2.1%',
      trend: 'up',
      description: 'Production quality rate',
      gradient: 'from-success-500 to-emerald-600'
    },
    {
      title: 'Avg Throughput',
      value: `${metrics.avgThroughput} units/hr`,
      icon: Zap,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      change: '+8.3%',
      trend: 'up',
      description: 'Processing efficiency',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'Total Defects',
      value: metrics.totalDefects.toLocaleString(),
      icon: AlertTriangle,
      iconColor: 'text-danger-600',
      iconBg: 'bg-danger-100',
      change: '-5.2%',
      trend: 'down',
      description: 'Quality issues identified',
      gradient: 'from-danger-500 to-red-600'
    },
    {
      title: 'Active Stations',
      value: metrics.activeStations.toString(),
      icon: Factory,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
      change: '+1',
      trend: 'up',
      description: 'Operational test stations',
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      title: 'Pass Rate',
      value: `${metrics.passRate}%`,
      icon: CheckCircle,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      change: '+1.8%',
      trend: 'up',
      description: 'Success rate metric',
      gradient: 'from-emerald-500 to-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <div key={index} className="card-premium group hover:scale-105 transition-all duration-300">
            {/* Header with Icon and Trend */}
            <div className="flex items-center justify-between mb-6">
              <div className={`icon-container-pro ${card.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`h-6 w-6 ${card.iconColor}`} />
              </div>
              <div className={`status-badge-pro ${card.trend === 'up' ? 'status-success-pro' : 'status-error-pro'} flex items-center`}>
                <TrendIcon className="h-4 w-4 mr-1" />
                {card.change}
              </div>
            </div>
            
            {/* Title and Description */}
            <div className="mb-4">
              <h3 className="text-heading-sm text-slate-800 font-semibold mb-1">{card.title}</h3>
              <p className="text-xs text-slate-500 uppercase tracking-wider">{card.description}</p>
            </div>
            
            {/* Value with Gradient Accent */}
            <div className="relative">
              <p className="kpi-value-pro">{card.value}</p>
              <div className={`absolute bottom-0 left-0 h-1 w-16 bg-gradient-to-r ${card.gradient} rounded-full opacity-60`}></div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: card.trend === 'up' ? '75%' : '45%' }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OverviewCards;
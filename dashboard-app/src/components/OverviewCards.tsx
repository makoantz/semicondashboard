import React from 'react';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
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
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Overall Yield',
      value: `${metrics.overallYield}%`,
      icon: CheckCircle,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      change: '+2.1%',
      trend: 'up'
    },
    {
      title: 'Avg Throughput',
      value: `${metrics.avgThroughput} units/hr`,
      icon: Zap,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      change: '+8.3%',
      trend: 'up'
    },
    {
      title: 'Total Defects',
      value: metrics.totalDefects.toLocaleString(),
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100',
      change: '-5.2%',
      trend: 'down'
    },
    {
      title: 'Active Stations',
      value: metrics.activeStations.toString(),
      icon: Activity,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
      change: '+1',
      trend: 'up'
    },
    {
      title: 'Pass Rate',
      value: `${metrics.passRate}%`,
      icon: CheckCircle,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      change: '+1.8%',
      trend: 'up'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <div key={index} className="modern-card">
            <div className="flex items-center justify-between mb-4">
              <div className="modern-icon-container">
                <Icon className={`h-6 w-6 ${card.iconColor}`} />
              </div>
              <div className={`status-badge ${card.trend === 'up' ? 'status-success' : 'status-error'}`}>
                <TrendIcon className="h-4 w-4 mr-1" />
                {card.change}
              </div>
            </div>
            
            <h3 className="modern-subtitle mb-2">{card.title}</h3>
            <p className="kpi-value">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default OverviewCards;
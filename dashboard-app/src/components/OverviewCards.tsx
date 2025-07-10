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
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Overall Yield',
      value: `${metrics.overallYield}%`,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+2.1%',
      trend: 'up'
    },
    {
      title: 'Avg Throughput',
      value: `${metrics.avgThroughput} units/hr`,
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+8.3%',
      trend: 'up'
    },
    {
      title: 'Total Defects',
      value: metrics.totalDefects.toLocaleString(),
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: '-5.2%',
      trend: 'down'
    },
    {
      title: 'Active Stations',
      value: metrics.activeStations.toString(),
      icon: Activity,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      change: '+1',
      trend: 'up'
    },
    {
      title: 'Pass Rate',
      value: `${metrics.passRate}%`,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
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
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <Icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div className={`flex items-center text-sm ${
                card.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendIcon className="h-4 w-4 mr-1" />
                {card.change}
              </div>
            </div>
            
            <h3 className="text-sm font-medium text-gray-500 mb-1">{card.title}</h3>
            <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default OverviewCards;
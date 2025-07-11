import React from 'react';
import { TrendingUp, TrendingDown, Clock, Target } from 'lucide-react';
import { PipelineStats } from '../types';

interface StatisticsPanelProps {
  stats: PipelineStats;
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ stats }) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const statCards = [
    {
      title: 'Total Runs',
      value: stats.totalRuns.toString(),
      icon: Target,
      color: 'blue',
      trend: null
    },
    {
      title: 'Success Rate',
      value: `${stats.successRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'green',
      trend: stats.successRate > 80 ? 'up' : 'down'
    },
    {
      title: 'Average Duration',
      value: formatDuration(stats.averageDuration),
      icon: Clock,
      color: 'purple',
      trend: null
    },
    {
      title: 'Failure Rate',
      value: `${stats.failureRate.toFixed(1)}%`,
      icon: TrendingDown,
      color: 'red',
      trend: stats.failureRate < 20 ? 'up' : 'down'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Pipeline Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'green' ? 'bg-green-100' :
                stat.color === 'purple' ? 'bg-purple-100' :
                'bg-red-100'
              }`}>
                <stat.icon className={`h-5 w-5 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'purple' ? 'text-purple-600' :
                  'text-red-600'
                }`} />
              </div>
              {stat.trend && (
                <div className={`flex items-center ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.trend === 'up' ? 
                    <TrendingUp className="h-4 w-4" /> : 
                    <TrendingDown className="h-4 w-4" />
                  }
                </div>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-md font-medium text-gray-900 mb-4">Recent Performance</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Pipeline Success Rate</span>
            <span>{stats.successRate.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.successRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { GitCommit, User, Calendar, Clock } from 'lucide-react';
import { Pipeline } from '../types';
import { PipelineStageCard } from './PipelineStageCard';

interface PipelineCardProps {
  pipeline: Pipeline;
  currentStageIndex: number;
}

export const PipelineCard: React.FC<PipelineCardProps> = ({ pipeline, currentStageIndex }) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = () => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (pipeline.status) {
      case 'success':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'running':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'cancelled':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{pipeline.name}</h3>
            <span className={getStatusBadge()}>
              {pipeline.status.charAt(0).toUpperCase() + pipeline.status.slice(1)}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <GitCommit className="h-4 w-4" />
              <span>{pipeline.commit}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{pipeline.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{pipeline.createdAt.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(pipeline.duration)}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 mb-4">{pipeline.message}</p>
        </div>
      </div>

      <div className="space-y-3">
        {pipeline.stages.map((stage, index) => (
          <PipelineStageCard
            key={stage.id}
            stage={stage}
            isActive={index === currentStageIndex && pipeline.status === 'running'}
          />
        ))}
      </div>
    </div>
  );
};
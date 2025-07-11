import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { PipelineStage } from '../types';

interface PipelineStageCardProps {
  stage: PipelineStage;
  isActive: boolean;
}

export const PipelineStageCard: React.FC<PipelineStageCardProps> = ({ stage, isActive }) => {
  const [showLogs, setShowLogs] = useState(false);

  const getStatusIcon = () => {
    switch (stage.status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'running':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (stage.status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'failed':
        return 'border-red-200 bg-red-50';
      case 'running':
        return 'border-blue-200 bg-blue-50';
      case 'cancelled':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`border rounded-lg p-4 transition-all duration-200 ${getStatusColor()} ${
      isActive ? 'ring-2 ring-blue-200' : ''
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <h3 className="font-medium text-gray-900">{stage.name}</h3>
            <p className="text-sm text-gray-500">
              {stage.status === 'running' ? 'Running...' : `Duration: ${formatDuration(stage.duration)}`}
            </p>
          </div>
        </div>
        
        {stage.logs.length > 0 && (
          <button
            onClick={() => setShowLogs(!showLogs)}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
          >
            {showLogs ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <span>Logs</span>
          </button>
        )}
      </div>

      {showLogs && stage.logs.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="bg-gray-900 rounded-md p-3 text-sm font-mono text-green-400 max-h-48 overflow-y-auto">
            {stage.logs.map((log, index) => (
              <div key={index} className="mb-1">
                <span className="text-gray-500">{new Date().toLocaleTimeString()}</span>
                <span className="ml-2">{log}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
import React, { useState, useMemo } from 'react';
import { Play, GitBranch } from 'lucide-react';
import { Header } from './components/Header';
import { PipelineCard } from './components/PipelineCard';
import { StatisticsPanel } from './components/StatisticsPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { usePipelineSimulation } from './hooks/usePipelineSimulation';
import { mockRepository, mockStats } from './utils/mockData';

function App() {
  const [activeTab, setActiveTab] = useState<'pipelines' | 'stats' | 'settings'>('pipelines');
  const { pipelines, activePipeline, currentStageIndex, triggerNewPipeline, runPipeline } = usePipelineSimulation();

  const pipelineStats = useMemo(() => {
    if (pipelines.length === 0) return mockStats;
    
    const successfulPipelines = pipelines.filter(p => p.status === 'success').length;
    const failedPipelines = pipelines.filter(p => p.status === 'failed').length;
    const totalDuration = pipelines.reduce((acc, p) => acc + p.duration, 0);
    
    return {
      totalRuns: pipelines.length,
      successRate: pipelines.length > 0 ? (successfulPipelines / pipelines.length) * 100 : 0,
      averageDuration: pipelines.length > 0 ? Math.round(totalDuration / pipelines.length) : 0,
      failureRate: pipelines.length > 0 ? (failedPipelines / pipelines.length) * 100 : 0
    };
  }, [pipelines]);

  const handleSettingsSave = (settings: any) => {
    console.log('Settings saved:', settings);
    // In a real app, this would save to backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        repository={mockRepository}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'pipelines' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CI/CD Pipelines</h1>
                <p className="text-gray-500">Manage and monitor your deployment pipelines</p>
              </div>
              <button
                onClick={triggerNewPipeline}
                disabled={!!activePipeline}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activePipeline
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Play className="h-4 w-4" />
                <span>Trigger Pipeline</span>
              </button>
            </div>

            {pipelines.length === 0 ? (
              <div className="text-center py-12">
                <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pipelines yet</h3>
                <p className="text-gray-500 mb-4">Get started by triggering your first pipeline</p>
                <button
                  onClick={triggerNewPipeline}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Trigger Pipeline
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {pipelines.map((pipeline) => (
                  <PipelineCard
                    key={pipeline.id}
                    pipeline={pipeline}
                    currentStageIndex={activePipeline?.id === pipeline.id ? currentStageIndex : -1}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pipeline Statistics</h1>
              <p className="text-gray-500">Monitor your pipeline performance and metrics</p>
            </div>
            <StatisticsPanel stats={pipelineStats} />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pipeline Settings</h1>
              <p className="text-gray-500">Configure your CI/CD pipeline behavior</p>
            </div>
            <SettingsPanel onSave={handleSettingsSave} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
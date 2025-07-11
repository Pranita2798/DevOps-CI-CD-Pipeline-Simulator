import { useState, useEffect, useCallback } from 'react';
import { Pipeline, PipelineStage } from '../types';

export const usePipelineSimulation = () => {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [activePipeline, setActivePipeline] = useState<Pipeline | null>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const createPipelineStages = (): PipelineStage[] => [
    {
      id: 'build',
      name: 'Build',
      status: 'pending',
      duration: 0,
      logs: [],
      commands: ['npm install', 'npm run build']
    },
    {
      id: 'test',
      name: 'Test',
      status: 'pending',
      duration: 0,
      logs: [],
      commands: ['npm run test', 'npm run test:coverage']
    },
    {
      id: 'security',
      name: 'Security Scan',
      status: 'pending',
      duration: 0,
      logs: [],
      commands: ['npm audit', 'snyk test']
    },
    {
      id: 'deploy',
      name: 'Deploy',
      status: 'pending',
      duration: 0,
      logs: [],
      commands: ['docker build', 'kubectl apply']
    }
  ];

  const generateLogs = (stage: PipelineStage, isSuccess: boolean): string[] => {
    const baseLogs = [
      `Starting ${stage.name.toLowerCase()} stage...`,
      ...stage.commands.map(cmd => `> ${cmd}`),
      `Executing ${stage.commands.length} commands...`
    ];

    if (isSuccess) {
      return [
        ...baseLogs,
        `✓ ${stage.name} completed successfully`,
        `Stage duration: ${stage.duration}s`
      ];
    } else {
      return [
        ...baseLogs,
        `✗ ${stage.name} failed`,
        `Error: Build step failed with exit code 1`
      ];
    }
  };

  const runPipeline = useCallback((pipeline: Pipeline) => {
    setActivePipeline(pipeline);
    setCurrentStageIndex(0);
    
    const updatedPipeline = {
      ...pipeline,
      status: 'running' as const,
      stages: pipeline.stages.map(stage => ({ ...stage, status: 'pending' as const }))
    };

    setPipelines(prev => 
      prev.map(p => p.id === pipeline.id ? updatedPipeline : p)
    );

    const runStages = async () => {
      for (let i = 0; i < pipeline.stages.length; i++) {
        setCurrentStageIndex(i);
        
        const stage = pipeline.stages[i];
        const duration = Math.floor(Math.random() * 30) + 15;
        const isSuccess = Math.random() > 0.2; // 80% success rate
        
        // Start stage
        setPipelines(prev => 
          prev.map(p => 
            p.id === pipeline.id 
              ? {
                  ...p,
                  stages: p.stages.map((s, idx) => 
                    idx === i 
                      ? { ...s, status: 'running', startTime: new Date() }
                      : s
                  )
                }
              : p
          )
        );

        // Simulate stage duration
        await new Promise(resolve => setTimeout(resolve, duration * 100));

        // Complete stage
        const finalStatus = isSuccess ? 'success' : 'failed';
        const logs = generateLogs(stage, isSuccess);
        
        setPipelines(prev => 
          prev.map(p => 
            p.id === pipeline.id 
              ? {
                  ...p,
                  stages: p.stages.map((s, idx) => 
                    idx === i 
                      ? { 
                          ...s, 
                          status: finalStatus,
                          duration,
                          endTime: new Date(),
                          logs
                        }
                      : s
                  )
                }
              : p
          )
        );

        if (!isSuccess) {
          // Pipeline failed
          setPipelines(prev => 
            prev.map(p => 
              p.id === pipeline.id 
                ? { ...p, status: 'failed', duration: duration * (i + 1) }
                : p
            )
          );
          setActivePipeline(null);
          return;
        }
      }

      // Pipeline succeeded
      setPipelines(prev => 
        prev.map(p => 
          p.id === pipeline.id 
            ? { ...p, status: 'success', duration: pipeline.stages.reduce((acc, s) => acc + s.duration, 0) }
            : p
        )
      );
      setActivePipeline(null);
    };

    runStages();
  }, []);

  const triggerNewPipeline = useCallback(() => {
    const commits = [
      { hash: 'abc123', message: 'Add new feature', author: 'John Doe' },
      { hash: 'def456', message: 'Fix bug in authentication', author: 'Jane Smith' },
      { hash: 'ghi789', message: 'Update dependencies', author: 'Bob Johnson' },
      { hash: 'jkl012', message: 'Improve performance', author: 'Alice Brown' }
    ];
    
    const randomCommit = commits[Math.floor(Math.random() * commits.length)];
    
    const newPipeline: Pipeline = {
      id: `pipeline-${Date.now()}`,
      name: `Pipeline #${pipelines.length + 1}`,
      branch: 'main',
      commit: randomCommit.hash,
      author: randomCommit.author,
      message: randomCommit.message,
      status: 'pending',
      stages: createPipelineStages(),
      createdAt: new Date(),
      duration: 0
    };

    setPipelines(prev => [newPipeline, ...prev]);
    runPipeline(newPipeline);
  }, [pipelines.length, runPipeline]);

  // Initialize with some sample pipelines
  useEffect(() => {
    const initialPipelines: Pipeline[] = [
      {
        id: 'pipeline-1',
        name: 'Pipeline #1',
        branch: 'main',
        commit: 'abc123',
        author: 'John Doe',
        message: 'Initial commit',
        status: 'success',
        stages: createPipelineStages().map(stage => ({
          ...stage,
          status: 'success',
          duration: Math.floor(Math.random() * 30) + 15,
          logs: generateLogs(stage, true)
        })),
        createdAt: new Date(Date.now() - 3600000),
        duration: 120
      }
    ];

    setPipelines(initialPipelines);
  }, []);

  return {
    pipelines,
    activePipeline,
    currentStageIndex,
    triggerNewPipeline,
    runPipeline
  };
};
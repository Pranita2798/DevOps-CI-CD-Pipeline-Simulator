export interface PipelineStage {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'cancelled';
  duration: number;
  startTime?: Date;
  endTime?: Date;
  logs: string[];
  commands: string[];
}

export interface Pipeline {
  id: string;
  name: string;
  branch: string;
  commit: string;
  author: string;
  message: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'cancelled';
  stages: PipelineStage[];
  createdAt: Date;
  duration: number;
}

export interface Repository {
  name: string;
  owner: string;
  branch: string;
  lastCommit: string;
  commits: Commit[];
}

export interface Commit {
  hash: string;
  message: string;
  author: string;
  timestamp: Date;
}

export interface PipelineStats {
  totalRuns: number;
  successRate: number;
  averageDuration: number;
  failureRate: number;
}
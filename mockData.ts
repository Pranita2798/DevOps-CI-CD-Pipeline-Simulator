import { Repository, PipelineStats } from '../types';

export const mockRepository: Repository = {
  name: 'awesome-app',
  owner: 'devops-team',
  branch: 'main',
  lastCommit: 'abc123',
  commits: [
    {
      hash: 'abc123',
      message: 'Add new feature for user authentication',
      author: 'John Doe',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      hash: 'def456',
      message: 'Fix bug in payment processing',
      author: 'Jane Smith',
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      hash: 'ghi789',
      message: 'Update dependencies and security patches',
      author: 'Bob Johnson',
      timestamp: new Date(Date.now() - 10800000)
    },
    {
      hash: 'jkl012',
      message: 'Improve application performance',
      author: 'Alice Brown',
      timestamp: new Date(Date.now() - 14400000)
    }
  ]
};

export const mockStats: PipelineStats = {
  totalRuns: 45,
  successRate: 87.5,
  averageDuration: 180,
  failureRate: 12.5
};
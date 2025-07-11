import React from 'react';
import { GitBranch, Settings, BarChart3 } from 'lucide-react';

interface HeaderProps {
  repository: {
    name: string;
    owner: string;
    branch: string;
  };
  activeTab: 'pipelines' | 'stats' | 'settings';
  onTabChange: (tab: 'pipelines' | 'stats' | 'settings') => void;
}

export const Header: React.FC<HeaderProps> = ({ repository, activeTab, onTabChange }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <GitBranch className="h-6 w-6 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {repository.owner}/{repository.name}
                </h1>
                <p className="text-sm text-gray-500">Branch: {repository.branch}</p>
              </div>
            </div>
          </div>
          
          <nav className="flex space-x-8">
            <button
              onClick={() => onTabChange('pipelines')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'pipelines'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Pipelines
            </button>
            <button
              onClick={() => onTabChange('stats')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                activeTab === 'stats'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Statistics</span>
            </button>
            <button
              onClick={() => onTabChange('settings')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                activeTab === 'settings'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
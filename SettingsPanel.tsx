import React, { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';

interface SettingsPanelProps {
  onSave: (settings: any) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onSave }) => {
  const [settings, setSettings] = useState({
    autoTrigger: true,
    notifications: true,
    parallelJobs: 2,
    timeout: 30,
    retryCount: 3,
    environment: 'staging'
  });

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Pipeline Settings</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.autoTrigger}
                onChange={(e) => setSettings({...settings, autoTrigger: e.target.checked})}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Auto-trigger on push</span>
            </label>
          </div>
          
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Email notifications</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parallel Jobs
            </label>
            <input
              type="number"
              value={settings.parallelJobs}
              onChange={(e) => setSettings({...settings, parallelJobs: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
              max="10"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timeout (minutes)
            </label>
            <input
              type="number"
              value={settings.timeout}
              onChange={(e) => setSettings({...settings, timeout: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="5"
              max="120"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retry Count
            </label>
            <input
              type="number"
              value={settings.retryCount}
              onChange={(e) => setSettings({...settings, retryCount: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              max="5"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Environment
            </label>
            <select
              value={settings.environment}
              onChange={(e) => setSettings({...settings, environment: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="development">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};
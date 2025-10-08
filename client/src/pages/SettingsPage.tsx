import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, SaveIcon, AlertCircleIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Input from '../components/ui/Input';
interface ModelProvider {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  requiresApiKey: boolean;
}
interface ApiKey {
  provider: string;
  key: string;
}
const SettingsPage = () => {
  // Model provider options
  const [providers] = useState<ModelProvider[]>([{
    id: 'gemini',
    name: 'Google Gemini',
    description: "Google's latest AI model with advanced capabilities.",
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/240px-Google_%22G%22_logo.svg.png',
    requiresApiKey: true
  }, {
    id: 'openai',
    name: 'OpenAI GPT-4',
    description: 'Powerful language model with strong reasoning capabilities.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/240px-OpenAI_Logo.svg.png',
    requiresApiKey: true
  }, {
    id: 'builtin',
    name: 'Built-in API (Free)',
    description: 'Limited capabilities, but no API key required.',
    logoUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
    requiresApiKey: false
  }]);
  // Selected provider
  const [selectedProvider, setSelectedProvider] = useState('gemini');
  // API keys state
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([{
    provider: 'gemini',
    key: ''
  }, {
    provider: 'openai',
    key: ''
  }]);
  // Show/hide API key
  const [showApiKey, setShowApiKey] = useState<{
    [key: string]: boolean;
  }>({
    gemini: false,
    openai: false
  });
  // Usage statistics
  const [usageStats] = useState({
    totalScans: 42,
    successfulScans: 38,
    failedScans: 4,
    totalRecommendations: 156,
    apiCallsThisMonth: 87,
    apiUsagePercentage: 58
  });
  // Handle API key change
  const handleApiKeyChange = (provider: string, value: string) => {
    setApiKeys(apiKeys.map(key => key.provider === provider ? {
      ...key,
      key: value
    } : key));
  };
  // Toggle show/hide API key
  const toggleShowApiKey = (provider: string) => {
    setShowApiKey({
      ...showApiKey,
      [provider]: !showApiKey[provider]
    });
  };
  // Save settings
  const saveSettings = () => {
    // In a real app, this would save to backend/localStorage
    alert('Settings saved successfully!');
  };
  return <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Settings
      </h1>
      <div className="space-y-8">
        {/* Model Provider Selection */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Model Provider
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Select which AI model provider to use for book detection and
              recommendations.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {providers.map(provider => <div key={provider.id} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedProvider === provider.id ? 'border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'}`} onClick={() => setSelectedProvider(provider.id)}>
                  <div className="flex items-center">
                    <div className="h-10 w-10 mr-4 flex-shrink-0">
                      <img src={provider.logoUrl} alt={provider.name} className="h-full w-full object-contain" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {provider.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {provider.description}
                      </p>
                    </div>
                    <div className="ml-4">
                      {selectedProvider === provider.id && <div className="h-4 w-4 rounded-full bg-primary-600 dark:bg-primary-400"></div>}
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
        {/* API Key Management */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              API Keys
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Enter your API keys for the selected providers. Keys are securely
              stored in your browser.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {apiKeys.map(apiKey => {
              const provider = providers.find(p => p.id === apiKey.provider);
              if (!provider) return null;
              return <div key={apiKey.provider} className="space-y-2">
                    <label className="block font-medium text-gray-700 dark:text-gray-300">
                      {provider.name} API Key
                    </label>
                    <div className="flex">
                      <div className="flex-grow">
                        <Input type={showApiKey[apiKey.provider] ? 'text' : 'password'} placeholder={`Enter your ${provider.name} API key`} value={apiKey.key} onChange={e => handleApiKeyChange(apiKey.provider, e.target.value)} />
                      </div>
                      <button type="button" className="ml-2 p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" onClick={() => toggleShowApiKey(apiKey.provider)}>
                        {showApiKey[apiKey.provider] ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    </div>
                    {apiKey.provider === selectedProvider && !apiKey.key && provider.requiresApiKey && <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm">
                          <AlertCircleIcon className="h-4 w-4 mr-1" />
                          <span>Required for the selected provider</span>
                        </div>}
                  </div>;
            })}
              <div className="pt-4">
                <Button onClick={saveSettings} icon={<SaveIcon className="h-5 w-5" />}>
                  Save Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Usage Statistics */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Usage Statistics
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              View your current usage and limits.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-4 text-gray-900 dark:text-white">
                  Scan Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Scans
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {usageStats.totalScans}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Successful Scans
                    </span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {usageStats.successfulScans}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Failed Scans
                    </span>
                    <span className="font-medium text-red-600 dark:text-red-400">
                      {usageStats.failedScans}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-4 text-gray-900 dark:text-white">
                  API Usage
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      API Calls This Month
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {usageStats.apiCallsThisMonth}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Recommendations
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {usageStats.totalRecommendations}
                    </span>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600 dark:text-gray-400">
                        Monthly Limit Usage
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {usageStats.apiUsagePercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${usageStats.apiUsagePercentage > 80 ? 'bg-amber-500 dark:bg-amber-600' : 'bg-primary-600 dark:bg-primary-500'}`} style={{
                      width: `${usageStats.apiUsagePercentage}%`
                    }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default SettingsPage;
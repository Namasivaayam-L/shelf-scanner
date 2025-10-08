import React, { useState } from 'react';
import { Save, Eye, EyeOff, Info } from 'lucide-react';
export function Settings() {
  const [modelProvider, setModelProvider] = useState('gemini');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [useBuiltInKey, setUseBuiltInKey] = useState(true);
  return <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-6">Settings</h1>
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Model Configuration
        </h2>
        <div className="mb-4">
          <label htmlFor="model-provider" className="block text-sm font-medium text-foreground mb-2">
            AI Model Provider
          </label>
          <select id="model-provider" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-background text-foreground" value={modelProvider} onChange={e => setModelProvider(e.target.value)}>
            <option value="gemini">Google Gemini</option>
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
          </select>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="api-key" className="block text-sm font-medium text-foreground">
              API Key
            </label>
            <button type="button" className="text-xs text-muted-foreground hover:text-foreground" onClick={() => setShowApiKey(!showApiKey)}>
              {showApiKey ? <span className="flex items-center">
                  <EyeOff className="w-4 h-4 mr-1" />
                  Hide
                </span> : <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  Show
                </span>}
            </button>
          </div>
          <div className="relative">
            <input type={showApiKey ? 'text' : 'password'} id="api-key" className={`w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${useBuiltInKey ? 'bg-muted text-muted-foreground' : 'bg-background text-foreground'}`} placeholder={useBuiltInKey ? 'Using built-in API key' : 'Enter your API key'} value={apiKey} onChange={e => setApiKey(e.target.value)} disabled={useBuiltInKey} />
          </div>
        </div>
        <div className="flex items-center mb-6">
          <input id="use-built-in" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-border rounded dark:bg-secondary-800" checked={useBuiltInKey} onChange={() => setUseBuiltInKey(!useBuiltInKey)} />
          <label htmlFor="use-built-in" className="ml-2 block text-sm text-foreground">
            Use built-in API key
          </label>
        </div>
        <button type="button" className="w-full py-2 px-4 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center dark:bg-primary-700 dark:hover:bg-primary-600">
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </button>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Usage Statistics
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-sm text-foreground">Tokens Used</span>
            <span className="text-sm font-medium">12,458</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-sm text-foreground">API Requests</span>
            <span className="text-sm font-medium">87</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-sm text-foreground">Books Scanned</span>
            <span className="text-sm font-medium">34</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-foreground">
              Recommendations Generated
            </span>
            <span className="text-sm font-medium">156</span>
          </div>
        </div>
        <div className="mt-6 p-3 bg-secondary rounded-md flex items-start dark:bg-secondary-800">
          <Info className="w-5 h-5 text-muted-foreground mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Usage statistics are reset at the beginning of each month. The
            built-in API key has a monthly limit of 100,000 tokens.
          </p>
        </div>
      </div>
    </div>;
}
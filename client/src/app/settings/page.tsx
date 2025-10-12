"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { Settings, ArrowLeft, Eye, EyeOff, Wrench, Home, Image, BookOpen, Bookmark } from "lucide-react";

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("••••••••");
  const router = useRouter();

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.back()}
            className="rounded-full p-2 text-slate-800 dark:text-slate-200"
          >
            <ArrowLeft className="text-[#1b130d] dark:text-white" size={24} />
          </Button>
          <h1 className="flex-1 text-center text-lg font-bold text-[#1b130d] dark:text-white">
            Settings
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-32">
        <div className="space-y-8">
          {/* AI Model Section */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-[#1b130d] dark:text-white">AI Model</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="model-provider">
                  Model Provider
                </label>
                <select 
                  className="w-full bg-background-light dark:bg-background-dark border border-primary/30 dark:border-primary/50 rounded-lg focus:ring-primary focus:border-primary p-3 text-[#1b130d] dark:text-white"
                  id="model-provider"
                >
                  <option>Google Gemini</option>
                  <option>OpenAI</option>
                  <option>Anthropic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="api-key">
                  API Key
                </label>
                <div className="relative">
                  <input 
                    className="w-full pr-10 bg-background-light dark:bg-background-dark border border-primary/30 dark:border-primary/50 rounded-lg focus:ring-primary focus:border-primary p-3 text-[#1b130d] dark:text-white"
                    id="api-key" 
                    type={showApiKey ? "text" : "password"} 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <Button 
                    onClick={toggleApiKeyVisibility}
                    variant="ghost"
                    size="icon"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400"
                  >
                    {showApiKey ? (
                      <EyeOff className="text-[#1b130d] dark:text-white" size={20} />
                    ) : (
                      <Eye className="text-[#1b130d] dark:text-white" size={20} />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Default Configuration Section */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-[#1b130d] dark:text-white">Default Configuration</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="model">
                  Model
                </label>
                <select 
                  className="w-full bg-background-light dark:bg-background-dark border border-primary/30 dark:border-primary/50 rounded-lg focus:ring-primary focus:border-primary p-3 text-[#1b130d] dark:text-white"
                  id="model"
                >
                  <option>gemini-1.5-pro-latest</option>
                  <option>gpt-4o</option>
                  <option>claude-3-opus-20240229</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="temperature">
                  Temperature
                </label>
                <select 
                  className="w-full bg-background-light dark:bg-background-dark border border-primary/30 dark:border-primary/50 rounded-lg focus:ring-primary focus:border-primary p-3 text-[#1b130d] dark:text-white"
                  id="temperature"
                >
                  <option>0.7 (Recommended)</option>
                  <option>0.5</option>
                  <option>1.0</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="top-p">
                  Top P
                </label>
                <select 
                  className="w-full bg-background-light dark:bg-background-dark border border-primary/30 dark:border-primary/50 rounded-lg focus:ring-primary focus:border-primary p-3 text-[#1b130d] dark:text-white"
                  id="top-p"
                >
                  <option>1</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="top-k">
                  Top K
                </label>
                <select 
                  className="w-full bg-background-light dark:bg-background-dark border border-primary/30 dark:border-primary/50 rounded-lg focus:ring-primary focus:border-primary p-3 text-[#1b130d] dark:text-white"
                  id="top-k"
                >
                  <option>1</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="max-tokens">
                  Max Output Tokens
                </label>
                <select 
                  className="w-full bg-background-light dark:bg-background-dark border border-primary/30 dark:border-primary/50 rounded-lg focus:ring-primary focus:border-primary p-3 text-[#1b130d] dark:text-white"
                  id="max-tokens"
                >
                  <option>8192</option>
                  <option>4096</option>
                  <option>2048</option>
                </select>
              </div>
            </div>
          </section>

          {/* Usage Section */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-[#1b130d] dark:text-white">Usage</h2>
            <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-xl">
              <div className="divide-y divide-primary/20 dark:divide-primary/40">
                <div className="flex justify-between py-3">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Total Tokens Used</span>
                  <span className="font-medium text-gray-800 dark:text-gray-100">12,345</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Total Requests</span>
                  <span className="font-medium text-gray-800 dark:text-gray-100">567</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Request Limit</span>
                  <span className="font-medium text-gray-800 dark:text-gray-100">1,000</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Token Limit</span>
                  <span className="font-medium text-gray-800 dark:text-gray-100">20,000</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

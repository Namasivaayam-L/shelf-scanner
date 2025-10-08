import React, { useState } from 'react';
import { BarChartIcon, PieChartIcon, UsersIcon, BookIcon, ServerIcon, AlertTriangleIcon, TrendingUpIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
const AdminPage = () => {
  // Mock data for admin dashboard
  const [stats] = useState({
    totalUsers: 2547,
    activeUsers: 1823,
    totalScans: 12458,
    successfulScans: 11234,
    failedScans: 1224,
    totalRecommendations: 45678,
    apiCalls: 98765,
    errorRate: 9.8
  });
  // Mock data for charts
  const [dailyActivity] = useState([{
    day: 'Mon',
    scans: 145,
    recommendations: 432
  }, {
    day: 'Tue',
    scans: 132,
    recommendations: 387
  }, {
    day: 'Wed',
    scans: 156,
    recommendations: 512
  }, {
    day: 'Thu',
    scans: 178,
    recommendations: 573
  }, {
    day: 'Fri',
    scans: 184,
    recommendations: 629
  }, {
    day: 'Sat',
    scans: 210,
    recommendations: 752
  }, {
    day: 'Sun',
    scans: 193,
    recommendations: 683
  }]);
  const [modelPerformance] = useState([{
    model: 'Google Gemini',
    successRate: 92,
    avgProcessingTime: 1.2
  }, {
    model: 'OpenAI GPT-4',
    successRate: 94,
    avgProcessingTime: 1.8
  }, {
    model: 'Built-in API',
    successRate: 85,
    avgProcessingTime: 2.3
  }]);
  const [recentErrors] = useState([{
    id: 'e1',
    user: 'user123',
    error: 'Image quality too low',
    time: '2 hours ago'
  }, {
    id: 'e2',
    user: 'reader456',
    error: 'API rate limit exceeded',
    time: '5 hours ago'
  }, {
    id: 'e3',
    user: 'bookworm789',
    error: 'No books detected in image',
    time: '1 day ago'
  }, {
    id: 'e4',
    user: 'library101',
    error: 'Connection timeout',
    time: '2 days ago'
  }]);
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Admin Dashboard
      </h1>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <UsersIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Active Users
                </h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats.activeUsers.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  of {stats.totalUsers.toLocaleString()} total users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <BookIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Successful Scans
                </h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats.successfulScans.toLocaleString()}
                </p>
                <p className="text-xs text-green-500 dark:text-green-400">
                  {Math.round(stats.successfulScans / stats.totalScans * 100)}
                  % success rate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                <BarChartIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Recommendations
                </h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats.totalRecommendations.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round(stats.totalRecommendations / stats.totalScans)}{' '}
                  per scan avg.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                <AlertTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Error Rate
                </h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats.errorRate}%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stats.failedScans.toLocaleString()} failed scans
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Activity Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Daily Activity
            </h2>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <div className="flex h-full items-end">
                {dailyActivity.map((day, index) => <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full px-1 flex flex-col items-center">
                      <div className="w-full bg-blue-500 dark:bg-blue-600 rounded-t" style={{
                    height: `${day.recommendations / 8}px`
                  }}></div>
                      <div className="w-full bg-green-500 dark:bg-green-600 rounded-t" style={{
                    height: `${day.scans}px`
                  }}></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      {day.day}
                    </div>
                  </div>)}
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 bg-green-500 dark:bg-green-600 rounded mr-1"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Scans
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 dark:bg-blue-600 rounded mr-1"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Recommendations
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              API Usage
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <div className="relative h-40 w-40">
                <PieChartIcon className="h-full w-full text-gray-200 dark:text-gray-700" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stats.apiCalls.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Total API Calls
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    Google Gemini
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    68%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" style={{
                  width: '68%'
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    OpenAI GPT-4
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    24%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full" style={{
                  width: '24%'
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    Built-in API
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    8%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 dark:bg-green-500 h-2 rounded-full" style={{
                  width: '8%'
                }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Model Performance and Errors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Model Performance
            </h2>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Model
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Success Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Avg. Processing Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
                  {modelPerformance.map((model, index) => <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {model.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {model.successRate}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {model.avgProcessingTime}s
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${model.successRate > 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : model.successRate > 80 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                          {model.successRate > 90 ? 'Excellent' : model.successRate > 80 ? 'Good' : 'Needs Improvement'}
                        </span>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Errors
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentErrors.map(error => <div key={error.id} className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <XCircleIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-400">
                        {error.error}
                      </h3>
                      <div className="mt-1 text-sm text-red-700 dark:text-red-300">
                        <p>User: {error.user}</p>
                      </div>
                      <div className="mt-1 text-xs text-red-500 dark:text-red-400">
                        {error.time}
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default AdminPage;
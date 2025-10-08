import React from 'react';
import { BarChart, LineChart, PieChart } from 'lucide-react';
export function Admin() {
  // Mock data for demonstration
  const usageData = [{
    date: 'Mon',
    value: 120
  }, {
    date: 'Tue',
    value: 150
  }, {
    date: 'Wed',
    value: 180
  }, {
    date: 'Thu',
    value: 220
  }, {
    date: 'Fri',
    value: 270
  }, {
    date: 'Sat',
    value: 250
  }, {
    date: 'Sun',
    value: 300
  }];
  const statsCards = [{
    title: 'Total Users',
    value: '1,247',
    change: '+12%',
    changeType: 'positive'
  }, {
    title: 'Active Users',
    value: '847',
    change: '+7%',
    changeType: 'positive'
  }, {
    title: 'Books Scanned',
    value: '12,384',
    change: '+24%',
    changeType: 'positive'
  }, {
    title: 'Recommendations',
    value: '48,271',
    change: '+18%',
    changeType: 'positive'
  }];
  return <div className="w-full">
      <h1 className="text-3xl font-bold text-foreground mb-6">
        Admin Dashboard
      </h1>
      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => <div key={index} className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground">{stat.title}</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <span className={`text-xs font-medium ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
          </div>)}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              Daily Active Users
            </h2>
            <LineChart className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-64 flex items-end">
            {usageData.map((data, index) => <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="w-full max-w-[30px] bg-primary-600 rounded-t-sm dark:bg-primary-700" style={{
              height: `${data.value / 300 * 100}%`
            }}></div>
                <span className="text-xs text-muted-foreground mt-2">
                  {data.date}
                </span>
              </div>)}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              API Usage by Provider
            </h2>
            <PieChart className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="relative h-40 w-40">
              <div className="absolute inset-0 rounded-full border-8 border-primary-600 dark:border-primary-700" style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
            }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 0 0)',
              opacity: 0.7
            }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-amber-500" style={{
              clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 0)',
              opacity: 0.7
            }}></div>
            </div>
            <div className="ml-8 space-y-2">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-primary-600 rounded-sm mr-2 dark:bg-primary-700"></div>
                <span className="text-xs text-muted-foreground">
                  Gemini (65%)
                </span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-blue-500 rounded-sm mr-2"></div>
                <span className="text-xs text-muted-foreground">
                  OpenAI (25%)
                </span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-amber-500 rounded-sm mr-2"></div>
                <span className="text-xs text-muted-foreground">
                  Anthropic (10%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Error tracking */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Error Tracking
          </h2>
          <BarChart className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left font-medium text-muted-foreground">
                  Error Type
                </th>
                <th className="pb-3 text-left font-medium text-muted-foreground">
                  Count
                </th>
                <th className="pb-3 text-left font-medium text-muted-foreground">
                  Rate
                </th>
                <th className="pb-3 text-left font-medium text-muted-foreground">
                  Last Occurrence
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3 text-foreground">
                  Image Processing Failed
                </td>
                <td className="py-3 text-foreground">24</td>
                <td className="py-3 text-red-500">2.4%</td>
                <td className="py-3 text-muted-foreground">2 hours ago</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 text-foreground">
                  API Rate Limit Exceeded
                </td>
                <td className="py-3 text-foreground">12</td>
                <td className="py-3 text-amber-500">1.2%</td>
                <td className="py-3 text-muted-foreground">6 hours ago</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 text-foreground">
                  Book Title Not Recognized
                </td>
                <td className="py-3 text-foreground">87</td>
                <td className="py-3 text-amber-500">8.7%</td>
                <td className="py-3 text-muted-foreground">30 mins ago</td>
              </tr>
              <tr>
                <td className="py-3 text-foreground">Authentication Failed</td>
                <td className="py-3 text-foreground">5</td>
                <td className="py-3 text-green-500">0.5%</td>
                <td className="py-3 text-muted-foreground">1 day ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}
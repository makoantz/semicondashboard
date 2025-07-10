import { useState } from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import ExecutiveView from './components/ExecutiveView'
import ManagerView from './components/ManagerView'
import EngineerView from './components/EngineerView'
import OperatorView from './components/OperatorView'
import PerformanceCharts from './components/PerformanceCharts'
import TestResultsTable from './components/TestResultsTable'
import { mockOverviewMetrics, mockChartData, mockTestResults } from './data/mockData'
import './App.css'


function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedUserLevel, setSelectedUserLevel] = useState('engineer')

  const renderUserLevelContent = () => {
    switch (selectedUserLevel) {
      case 'executive':
        return <ExecutiveView metrics={mockOverviewMetrics} />
      case 'manager':
        return <ManagerView metrics={mockOverviewMetrics} devices={mockTestResults} />
      case 'engineer':
        return <EngineerView devices={mockTestResults} />
      case 'operator':
        return <OperatorView devices={mockTestResults} />
      default:
        return <EngineerView devices={mockTestResults} />
    }
  }

  const renderContent = () => {
    // Show user-level specific content for overview tab
    if (activeTab === 'overview') {
      return renderUserLevelContent();
    }

    // Legacy tabs for backward compatibility and additional features
    switch (activeTab) {
      case 'performance':
        return <PerformanceCharts data={mockChartData} />
      case 'test-results':
        return <TestResultsTable data={mockTestResults} />
      case 'alerts':
        return (
          <div className="modern-card">
            <h3 className="modern-title mb-6">System Alerts</h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
                <div className="h-3 w-3 bg-red-500 rounded-full mr-4 animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">High defect rate detected on TS-03</p>
                  <p className="text-xs text-red-600 mt-1">Yield dropped to 78.5% - requires immediate attention</p>
                </div>
                <span className="status-badge status-error text-xs">Critical</span>
              </div>
              <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
                <div className="h-3 w-3 bg-yellow-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800">Temperature warning on TS-05</p>
                  <p className="text-xs text-yellow-600 mt-1">Operating at 28.5°C - above optimal range</p>
                </div>
                <span className="status-badge bg-yellow-100 text-yellow-700 text-xs">Warning</span>
              </div>
              <div className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <div className="h-3 w-3 bg-blue-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800">Maintenance scheduled for TS-07</p>
                  <p className="text-xs text-blue-600 mt-1">Scheduled for tomorrow at 2:00 AM</p>
                </div>
                <span className="status-badge bg-blue-100 text-blue-700 text-xs">Info</span>
              </div>
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="modern-card">
            <h3 className="modern-title mb-6">Dashboard Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Refresh Interval</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm">
                  <option>5 seconds</option>
                  <option>10 seconds</option>
                  <option>30 seconds</option>
                  <option>1 minute</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Alert Notifications</label>
                <div className="space-y-3">
                  <label className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                    <span className="text-sm text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                    <span className="text-sm text-gray-700">SMS notifications</span>
                  </label>
                  <label className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Push notifications</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return renderUserLevelContent();
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header 
        selectedUser={selectedUserLevel} 
        onUserChange={setSelectedUserLevel} 
      />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  )
}

export default App

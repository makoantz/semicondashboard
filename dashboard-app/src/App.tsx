import { useState } from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import UserLevelSelector from './components/UserLevelSelector'
import ExecutiveView from './components/ExecutiveView'
import ManagerView from './components/ManagerView'
import EngineerView from './components/EngineerView'
import OperatorView from './components/OperatorView'
import OverviewCards from './components/OverviewCards'
import PerformanceCharts from './components/PerformanceCharts'
import TestResultsTable from './components/TestResultsTable'
import { mockOverviewMetrics, mockChartData, mockTestResults, mockUserLevels } from './data/mockData'
import './App.css'
import './styles/fallback.css'

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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">System Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="h-2 w-2 bg-red-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-red-800">High defect rate detected on TS-03</p>
                  <p className="text-xs text-red-600">Yield dropped to 78.5% - requires immediate attention</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="h-2 w-2 bg-yellow-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-yellow-800">Temperature warning on TS-05</p>
                  <p className="text-xs text-yellow-600">Operating at 28.5°C - above optimal range</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-blue-800">Maintenance scheduled for TS-07</p>
                  <p className="text-xs text-blue-600">Scheduled for tomorrow at 2:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Dashboard Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Refresh Interval</label>
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>5 seconds</option>
                  <option>10 seconds</option>
                  <option>30 seconds</option>
                  <option>1 minute</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alert Notifications</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm text-gray-700">SMS notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
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
    <div className="app-background">
      <div className="content-wrapper">
        <Header 
          selectedUser={selectedUserLevel} 
          onUserChange={setSelectedUserLevel} 
        />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App

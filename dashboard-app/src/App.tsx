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
          <div className="card-premium">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-heading-md text-slate-800 mb-2">System Alerts & Notifications</h3>
                <p className="text-slate-600">Real-time monitoring and alert management</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-600">3 Active Alerts</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2 animate-pulse"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-semibold text-red-900">Critical Alert</h4>
                        <span className="status-badge-pro status-error-pro">High Priority</span>
                      </div>
                      <p className="text-red-800 mb-1">High defect rate detected on TS-03</p>
                      <p className="text-sm text-red-600">Yield dropped to 78.5% - requires immediate attention</p>
                      <p className="text-xs text-red-500 mt-2">Alert triggered 2 minutes ago</p>
                    </div>
                  </div>
                  <button className="btn-pro btn-primary-pro text-sm">
                    Investigate
                  </button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-amber-100 border-l-4 border-yellow-500 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-semibold text-yellow-900">Temperature Warning</h4>
                        <span className="status-badge-pro status-warning-pro">Medium Priority</span>
                      </div>
                      <p className="text-yellow-800 mb-1">TS-05 operating above optimal temperature</p>
                      <p className="text-sm text-yellow-600">Current temperature: 28.5°C (Target: &lt;26°C)</p>
                      <p className="text-xs text-yellow-500 mt-2">Alert triggered 15 minutes ago</p>
                    </div>
                  </div>
                  <button className="btn-pro bg-yellow-600 text-white hover:bg-yellow-700 text-sm">
                    Review
                  </button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-100 border-l-4 border-blue-500 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-semibold text-blue-900">Scheduled Maintenance</h4>
                        <span className="status-badge-pro bg-blue-100 text-blue-700 border-blue-300">Info</span>
                      </div>
                      <p className="text-blue-800 mb-1">Preventive maintenance for TS-07</p>
                      <p className="text-sm text-blue-600">Scheduled for tomorrow at 2:00 AM</p>
                      <p className="text-xs text-blue-500 mt-2">Notification sent 1 hour ago</p>
                    </div>
                  </div>
                  <button className="btn-pro bg-blue-600 text-white hover:bg-blue-700 text-sm">
                    Schedule
                  </button>
                </div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-800">
      <Header 
        selectedUser={selectedUserLevel} 
        onUserChange={setSelectedUserLevel} 
      />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="animate-fade-in-up">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default App

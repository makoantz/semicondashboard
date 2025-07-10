# Semiconductor Testing Dashboard - Development Specifications

## Project Overview

This document provides comprehensive specifications for developing a **Semiconductor Testing Dashboard** mockup application. The dashboard serves as a UI/UX prototype for a full-stack application that will provide high-level to low-level data and information on the performance of devices tested in a semiconductor company.

## Business Context

### Company Structure
- **Manager Level**: Top-level oversight of all teams and customers
- **Section Manager Level**: Team-focused management with cross-team visibility
- **Engineer Level**: Individual contributor with device-specific responsibilities

### Teams & Organization
```
Manager (Sarah Chen)
├── Section Manager A - Team Alpha (Mike Rodriguez)
│   ├── Engineer A1 (Lisa Wang)
│   ├── Engineer A2-A5
├── Section Manager B - Team Beta
│   ├── Engineer B1-B5
└── Section Manager C - Team Gamma
    ├── Engineer C1-C5
```

### Customer Portfolio
- **Electronix**: High-volume automotive semiconductor customer
- **Photonix**: Optical communication device manufacturer
- **Neutronix**: Industrial sensor and control systems

## Technical Architecture

### Technology Stack
- **Frontend**: React.js with functional components and hooks
- **UI Framework**: Tailwind CSS for styling
- **Charts**: Recharts library for data visualization
- **Icons**: Lucide React icon library
- **Build Tool**: Modern JavaScript bundler (Vite/Create React App)

### Data Architecture

#### Mock Data Structure

##### User Authentication & Access Control
```javascript
const userRoles = {
  manager: {
    id: 'mgr001',
    name: 'Sarah Chen',
    role: 'Manager',
    email: 'sarah.chen@company.com',
    accessLevel: 'full',
    permissions: ['view_all_teams', 'view_all_customers', 'manage_users', 'export_data']
  },
  sectionManager: {
    id: 'sma001',
    name: 'Mike Rodriguez',
    role: 'Section Manager',
    team: 'Alpha',
    email: 'mike.rodriguez@company.com',
    accessLevel: 'team_plus',
    permissions: ['view_own_team', 'view_customer_summary', 'manage_team_devices']
  },
  engineer: {
    id: 'ea1001',
    name: 'Lisa Wang',
    role: 'Engineer',
    team: 'Alpha',
    email: 'lisa.wang@company.com',
    accessLevel: 'limited',
    permissions: ['view_assigned_devices', 'edit_test_parameters', 'create_reports']
  }
}
```

##### Device Data Model
```javascript
const deviceSchema = {
  id: String,                    // E12345, P44433, N54243 format
  customer: String,              // Electronix, Photonix, Neutronix
  team: String,                  // Alpha, Beta, Gamma
  assignedEngineer: String,      // Team member responsible
  
  // Test Equipment
  tester: String,                // 'Teradyne UltraFlex' | 'Advantest V93K'
  handler: String,               // 'Epson' | 'Hontech'
  loadboard: String,             // LB001-LB999
  socket: String,                // Socket type and condition
  
  // Performance Metrics
  yield: Number,                 // 0-100 percentage
  testTime: Number,              // Seconds per device
  volume: Number,                // Units tested per day
  firstPassYield: Number,        // FPY percentage
  retestRate: Number,            // Percentage requiring retest
  
  // Status & Health
  status: String,                // 'green' | 'yellow' | 'red'
  statusReason: String,          // Detailed explanation
  issueCount: Number,            // Active issues
  alertLevel: String,            // 'none' | 'warning' | 'critical'
  
  // Operational Data
  npiStartDate: Date,            // New Product Introduction date
  hvmDate: Date,                 // High Volume Manufacturing date
  lastUpdated: Date,             // Last data refresh
  dataFreshness: String,         // 'real-time' | 'hourly' | 'daily'
  
  // Quality Metrics
  binDistribution: Object,       // Bin 1-15 fail analysis
  parametricLimits: Object,      // Test limit violations
  spcViolations: Array,          // Statistical Process Control alerts
  correlationIssues: Array,      // Cross-tester correlation problems
  
  // Business Context
  customerPriority: String,      // 'low' | 'medium' | 'high' | 'critical'
  contractVolume: Number,        // Expected yearly volume
  deliverySchedule: Date,        // Next major delivery
  engineeringSupport: String     // Support level required
}
```

##### Time Series Data Model
```javascript
const timeSeriesSchema = {
  timestamp: Date,
  timeRange: String,             // '1D' | '1W' | '1M' | '3M' | '1Y'
  
  // Yield Metrics
  overallYield: Number,
  electronixYield: Number,
  photonixYield: Number,
  neutronixYield: Number,
  
  // Volume Metrics
  testVolume: Number,
  throughputEfficiency: Number,
  
  // Equipment Metrics
  equipmentUtilization: Number,
  downtimeIncidents: Number,
  maintenanceEvents: Number,
  
  // Quality Metrics
  defectDensity: Number,
  customerReturns: Number,
  yieldVariability: Number
}
```

## Feature Specifications

### 1. Authentication & Role-Based Access

#### Login Simulation
- User dropdown selector in header
- Immediate role-based dashboard reconfiguration
- Permission-based feature availability

#### Access Control Matrix
| Feature | Manager | Section Manager | Engineer |
|---------|---------|-----------------|----------|
| View All Teams | ✅ | ❌ | ❌ |
| View All Customers | ✅ | Summary Only | ❌ |
| Cross-Team Data | ✅ | Limited | ❌ |
| Device Assignment | ✅ | Team Only | View Only |
| Export All Data | ✅ | Team Only | Limited |
| User Management | ✅ | ❌ | ❌ |

### 2. Dashboard Layout & Navigation

#### Header Component
```
[Logo] Semiconductor Testing Dashboard        [Last Updated] [Notifications] [User Menu] [Logout]
```

#### Main Navigation Sections
1. **Executive Summary** (Manager only)
2. **Team Performance** (Section Manager+)
3. **Device Portfolio** (All users)
4. **Quality Analytics** (All users)
5. **Equipment Status** (All users)
6. **Reports & Export** (Permission-based)

### 3. Data Visualization Requirements

#### Stock Market-Style Time Range Controls
```javascript
const timeRangeOptions = [
  { value: '1D', label: '1 Day', dataPoints: 24, interval: 'hourly' },
  { value: '1W', label: '1 Week', dataPoints: 7, interval: 'daily' },
  { value: '1M', label: '1 Month', dataPoints: 30, interval: 'daily' },
  { value: '3M', label: '3 Months', dataPoints: 90, interval: 'daily' },
  { value: '1Y', label: '1 Year', dataPoints: 365, interval: 'daily' }
]
```

#### Chart Types & Data
1. **Yield Trend Lines**: Multi-customer overlay with time range selection
2. **Volume Area Charts**: Test throughput over time
3. **Status Distribution**: Pie charts for green/yellow/red status
4. **Equipment Utilization**: Bar charts per tester type
5. **Quality Heat Maps**: Wafer-level yield visualization
6. **Correlation Matrices**: Tester-to-tester performance comparison

### 4. Status Indicator System

#### Color-Coded Status Logic
```javascript
const statusCriteria = {
  green: {
    conditions: [
      'yield > 95%',
      'testTime within spec (±10%)',
      'no equipment alarms',
      'SPC in control',
      'no customer complaints'
    ],
    displayColor: '#10b981',
    priority: 'low'
  },
  yellow: {
    conditions: [
      'yield 90-95%',
      'testTime trending up',
      'minor equipment warnings',
      'SPC approaching limits',
      'isolated quality issues'
    ],
    displayColor: '#f59e0b',
    priority: 'medium'
  },
  red: {
    conditions: [
      'yield < 90%',
      'equipment failures',
      'SPC violations',
      'customer complaints',
      'delivery risk'
    ],
    displayColor: '#ef4444',
    priority: 'high'
  }
}
```

#### Real-Time Status Updates
- Background data processing simulation (30-second intervals)
- Status change animations and notifications
- Historical status tracking for trend analysis

### 5. Mock Data Generation Strategy

#### Device Assignment Logic
```javascript
const deviceAssignment = {
  'Team Alpha': {
    customer: 'Electronix',
    devices: ['E12345', 'E12346', 'E12347', 'E12348', 'E12349', 
              'E12350', 'E12351', 'E12352', 'E12353', 'E12354'],
    engineers: ['A1', 'A2', 'A3', 'A4', 'A5']
  },
  'Team Beta': {
    customer: 'Photonix',
    devices: ['P44433', 'P44434', 'P44435', 'P44436', 'P44437',
              'P44438', 'P44439', 'P44440', 'P44441', 'P44442'],
    engineers: ['B1', 'B2', 'B3', 'B4', 'B5']
  },
  'Team Gamma': {
    customer: 'Neutronix',
    devices: ['N54243', 'N54244', 'N54245', 'N54246', 'N54247',
              'N54248', 'N54249', 'N54250', 'N54251', 'N54252'],
    engineers: ['C1', 'C2', 'C3', 'C4', 'C5']
  }
}
```

#### Performance Variation Simulation
```javascript
const performanceFactors = {
  testerVariation: {
    'Teradyne UltraFlex': { yieldOffset: +2, timeOffset: -5 },
    'Advantest V93K': { yieldOffset: -1, timeOffset: +3 }
  },
  handlerVariation: {
    'Epson': { reliabilityFactor: 0.98 },
    'Hontech': { reliabilityFactor: 0.95 }
  },
  timeBasedDegradation: {
    socketWear: 'linear decline over 6 months',
    loadboardAging: 'step function at 12 months',
    calibrationDrift: 'gradual over 3 months'
  },
  lotVariation: {
    fabVariation: 'random ±5% yield',
    assemblyVariation: 'random ±3% yield',
    seasonalEffects: 'quarterly patterns'
  }
}
```

### 6. Component Architecture

#### Core Components
```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   ├── UserMenu.jsx
│   │   └── NotificationBell.jsx
│   ├── Dashboard/
│   │   ├── DashboardContainer.jsx
│   │   ├── StatusCards.jsx
│   │   ├── KPICards.jsx
│   │   └── FilterControls.jsx
│   ├── Charts/
│   │   ├── YieldTrendChart.jsx
│   │   ├── VolumeChart.jsx
│   │   ├── StatusDistribution.jsx
│   │   └── EquipmentUtilization.jsx
│   ├── Tables/
│   │   ├── DeviceTable.jsx
│   │   ├── DeviceRow.jsx
│   │   └── TablePagination.jsx
│   └── Common/
│       ├── StatusIndicator.jsx
│       ├── TimeRangeSelector.jsx
│       └── LoadingSpinner.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useDeviceData.js
│   ├── useTimeSeriesData.js
│   └── useRealTimeUpdates.js
├── utils/
│   ├── mockDataGenerator.js
│   ├── dataFilters.js
│   ├── statusCalculator.js
│   └── dateUtils.js
└── App.jsx
```

### 7. Responsive Design Requirements

#### Breakpoint Strategy
- **Desktop (1024px+)**: Full dashboard with side-by-side charts
- **Tablet (768px-1023px)**: Stacked layout, collapsible sections
- **Mobile (320px-767px)**: Simplified cards, essential metrics only

#### Mobile-First Considerations
- Touch-friendly interface elements
- Swipeable chart navigation
- Collapsible data tables
- Essential information prioritization

### 8. Performance Optimization

#### Data Loading Strategy
- Lazy loading for non-critical components
- Virtualized tables for large datasets
- Debounced filter updates
- Memoized expensive calculations

#### State Management
```javascript
// Using React hooks for state management
const useDashboardState = () => {
  const [currentUser, setCurrentUser] = useState('manager');
  const [timeRange, setTimeRange] = useState('1D');
  const [filters, setFilters] = useState({
    customer: 'All',
    team: 'All',
    status: 'All'
  });
  const [devices, setDevices] = useState([]);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  
  // Real-time update logic
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  
  return {
    currentUser, setCurrentUser,
    timeRange, setTimeRange,
    filters, setFilters,
    devices, timeSeriesData,
    lastUpdate
  };
};
```

### 9. Implementation Guidelines

#### Development Phases
1. **Phase 1**: Basic layout and navigation structure
2. **Phase 2**: Mock data generation and basic charts
3. **Phase 3**: Role-based access control and filtering
4. **Phase 4**: Real-time updates and advanced interactions
5. **Phase 5**: Responsive design and performance optimization

#### Code Quality Standards
- TypeScript for type safety (optional but recommended)
- ESLint and Prettier for code formatting
- Component-based architecture with clear separation of concerns
- Comprehensive prop validation
- Accessible design following WCAG guidelines

#### Testing Strategy
- Unit tests for utility functions
- Component testing with React Testing Library
- Integration tests for user workflows
- Visual regression testing for UI consistency

### 10. Deployment Configuration

#### Build Requirements
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint src --ext .js,.jsx"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.8.0",
    "lucide-react": "^0.263.1",
    "tailwindcss": "^3.3.0"
  }
}
```

#### Environment Variables
```env
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_REFRESH_INTERVAL=30000
REACT_APP_MOCK_DATA_ENABLED=true
REACT_APP_DEBUG_MODE=true
```

### 11. Future Enhancement Roadmap

#### Phase 2 Features
- Real API integration
- Advanced analytics and ML insights
- Export functionality (PDF, Excel, CSV)
- Email notifications and alerts
- Collaborative features (comments, annotations)

#### Phase 3 Features
- Mobile app development
- Advanced reporting engine
- Integration with existing ERP systems
- Predictive maintenance algorithms
- Advanced security and audit logging

## Conclusion

This specification document provides a comprehensive foundation for developing the Semiconductor Testing Dashboard mockup. The focus is on creating a realistic, functional prototype that demonstrates the user experience and data visualization capabilities required for the eventual full-stack application.

The mock data and interaction patterns are designed to closely mirror real semiconductor testing environments, providing stakeholders with an accurate preview of the final product's capabilities and user interface design.

For development using Claude Code, follow the component architecture and implementation phases outlined above, ensuring each feature is built incrementally with proper testing and validation at each step.the host
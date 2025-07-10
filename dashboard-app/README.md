# Semiconductor Testing Dashboard

A React TypeScript application that provides a comprehensive mockup for semiconductor testing data visualization and management.

## Features

### 📊 Overview Dashboard
- **High-level metrics cards** showing total devices tested, overall yield, throughput, defects, active stations, and pass rates
- **Real-time performance charts** with yield trends, throughput performance, and defect tracking
- **Multi-chart visualization** using Recharts library

### 🔍 Test Results Management
- **Detailed test results table** with comprehensive device information
- **Advanced filtering** by device type, wafer lot, test station, and status
- **Search functionality** across multiple fields
- **Export capabilities** for data analysis

### 🎯 Device Detail Views
- **Drill-down capability** with detailed device modal
- **Complete device specifications** including electrical parameters
- **Performance metrics visualization** with color-coded status indicators
- **Failure analysis** and retest recommendations

### 📱 Responsive Design
- **Mobile-first approach** using Tailwind CSS
- **Clean, modern UI** with intuitive navigation
- **Accessible design** following best practices

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

1. **Navigate to the project directory**:
   ```bash
   cd dashboard-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## Mock Data

The application includes comprehensive mock data simulating:
- Various semiconductor device types (ARM Cortex, Snapdragon, Apple A17, Intel Core, AMD Ryzen)
- Test results with realistic metrics (yield, throughput, defects, temperature, electrical parameters)
- Historical performance data for trend analysis
- Different test statuses (Pass, Fail, Retest)

## Project Structure

```
src/
├── components/
│   ├── Header.tsx              # Main header with navigation
│   ├── Navigation.tsx          # Tab-based navigation
│   ├── OverviewCards.tsx       # Metrics overview cards
│   ├── PerformanceCharts.tsx   # Charts and graphs
│   ├── TestResultsTable.tsx    # Data table with filtering
│   └── DeviceDetailModal.tsx   # Detailed device view
├── data/
│   └── mockData.ts            # Mock data and interfaces
├── App.tsx                    # Main application component
└── main.tsx                   # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Future Enhancements

This mockup provides a solid foundation for a full-stack semiconductor testing dashboard. Potential enhancements include:

- Real-time data integration
- Advanced analytics and reporting
- User authentication and role management
- Custom alert configurations
- Data export in multiple formats
- Integration with testing equipment APIs

## UI/UX Design Notes

The dashboard follows modern design principles with:
- Clean, minimal interface reducing cognitive load
- Consistent color coding for status indicators
- Responsive grid layouts for optimal viewing
- Intuitive navigation with clear visual hierarchy
- Interactive elements with hover states and feedback

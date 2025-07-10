export interface TestResult {
  id: string;
  deviceType: string;
  waferLot: string;
  testStation: string;
  timestamp: string;
  status: 'Pass' | 'Fail' | 'Retest';
  yield: number;
  throughput: number;
  defectCount: number;
  temperature: number;
  voltage: number;
  current: number;
  frequency: number;
  power: number;
  engineerStatus: 'ok' | 'potential' | 'anomaly';
  position: { x: number; y: number };
}

export interface UserLevel {
  id: string;
  name: string;
  description: string;
  accessLevel: 'executive' | 'manager' | 'engineer' | 'operator';
}

export interface DeviceStatus {
  id: string;
  deviceType: string;
  status: 'ok' | 'potential' | 'anomaly';
  position: { x: number; y: number };
  lastUpdate: string;
  alerts: string[];
}

export interface OverviewMetrics {
  totalDevicesTested: number;
  overallYield: number;
  avgThroughput: number;
  totalDefects: number;
  activeStations: number;
  passRate: number;
}

export interface ChartData {
  date: string;
  yield: number;
  throughput: number;
  defects: number;
}

export const mockUserLevels: UserLevel[] = [
  {
    id: 'executive',
    name: 'Executive',
    description: 'High-level overview with KPIs and business metrics',
    accessLevel: 'executive'
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Operational oversight with team and process metrics',
    accessLevel: 'manager'
  },
  {
    id: 'engineer',
    name: 'Engineer',
    description: 'Technical view with device status icons and diagnostics',
    accessLevel: 'engineer'
  },
  {
    id: 'operator',
    name: 'Operator',
    description: 'Equipment operation and basic monitoring',
    accessLevel: 'operator'
  }
];

export const mockOverviewMetrics: OverviewMetrics = {
  totalDevicesTested: 15847,
  overallYield: 94.2,
  avgThroughput: 125.8,
  totalDefects: 923,
  activeStations: 12,
  passRate: 92.7
};

export const mockChartData: ChartData[] = [
  { date: '2024-01-01', yield: 92.5, throughput: 120, defects: 45 },
  { date: '2024-01-02', yield: 94.1, throughput: 118, defects: 38 },
  { date: '2024-01-03', yield: 91.8, throughput: 122, defects: 52 },
  { date: '2024-01-04', yield: 95.2, throughput: 125, defects: 29 },
  { date: '2024-01-05', yield: 93.7, throughput: 127, defects: 41 },
  { date: '2024-01-06', yield: 96.1, throughput: 130, defects: 23 },
  { date: '2024-01-07', yield: 94.8, throughput: 128, defects: 33 },
  { date: '2024-01-08', yield: 92.3, throughput: 124, defects: 48 },
  { date: '2024-01-09', yield: 95.5, throughput: 132, defects: 27 },
  { date: '2024-01-10', yield: 94.2, throughput: 126, defects: 35 }
];

export const mockTestResults: TestResult[] = [
  {
    id: 'T001',
    deviceType: 'ARM Cortex-A78',
    waferLot: 'W2024-001',
    testStation: 'TS-01',
    timestamp: '2024-01-10T10:30:00Z',
    status: 'Pass',
    yield: 95.2,
    throughput: 128,
    defectCount: 2,
    temperature: 25.5,
    voltage: 1.2,
    current: 0.85,
    frequency: 2.4,
    power: 1.02,
    engineerStatus: 'ok',
    position: { x: 120, y: 80 }
  },
  {
    id: 'T002',
    deviceType: 'Snapdragon 8 Gen 3',
    waferLot: 'W2024-002',
    testStation: 'TS-02',
    timestamp: '2024-01-10T10:45:00Z',
    status: 'Pass',
    yield: 97.1,
    throughput: 135,
    defectCount: 1,
    temperature: 24.8,
    voltage: 1.1,
    current: 0.92,
    frequency: 3.2,
    power: 1.01,
    engineerStatus: 'ok',
    position: { x: 300, y: 150 }
  },
  {
    id: 'T003',
    deviceType: 'Apple A17 Pro',
    waferLot: 'W2024-003',
    testStation: 'TS-03',
    timestamp: '2024-01-10T11:00:00Z',
    status: 'Fail',
    yield: 78.5,
    throughput: 95,
    defectCount: 12,
    temperature: 27.2,
    voltage: 1.3,
    current: 1.15,
    frequency: 2.8,
    power: 1.49,
    engineerStatus: 'anomaly',
    position: { x: 480, y: 120 }
  },
  {
    id: 'T004',
    deviceType: 'Intel Core i9',
    waferLot: 'W2024-004',
    testStation: 'TS-04',
    timestamp: '2024-01-10T11:15:00Z',
    status: 'Pass',
    yield: 93.8,
    throughput: 142,
    defectCount: 3,
    temperature: 26.1,
    voltage: 1.25,
    current: 1.05,
    frequency: 3.6,
    power: 1.31,
    engineerStatus: 'ok',
    position: { x: 200, y: 250 }
  },
  {
    id: 'T005',
    deviceType: 'AMD Ryzen 9',
    waferLot: 'W2024-005',
    testStation: 'TS-05',
    timestamp: '2024-01-10T11:30:00Z',
    status: 'Retest',
    yield: 89.2,
    throughput: 110,
    defectCount: 6,
    temperature: 28.5,
    voltage: 1.4,
    current: 1.22,
    frequency: 3.4,
    power: 1.71,
    engineerStatus: 'potential',
    position: { x: 400, y: 200 }
  },
  {
    id: 'T006',
    deviceType: 'Qualcomm Snapdragon',
    waferLot: 'W2024-006',
    testStation: 'TS-06',
    timestamp: '2024-01-10T12:00:00Z',
    status: 'Pass',
    yield: 96.8,
    throughput: 140,
    defectCount: 1,
    temperature: 24.2,
    voltage: 1.15,
    current: 0.88,
    frequency: 3.1,
    power: 1.01,
    engineerStatus: 'ok',
    position: { x: 150, y: 180 }
  },
  {
    id: 'T007',
    deviceType: 'MediaTek Dimensity',
    waferLot: 'W2024-007',
    testStation: 'TS-07',
    timestamp: '2024-01-10T12:15:00Z',
    status: 'Pass',
    yield: 92.1,
    throughput: 125,
    defectCount: 4,
    temperature: 26.8,
    voltage: 1.22,
    current: 0.95,
    frequency: 2.9,
    power: 1.16,
    engineerStatus: 'potential',
    position: { x: 350, y: 90 }
  },
  {
    id: 'T008',
    deviceType: 'NVIDIA Tegra',
    waferLot: 'W2024-008',
    testStation: 'TS-08',
    timestamp: '2024-01-10T12:30:00Z',
    status: 'Fail',
    yield: 82.3,
    throughput: 105,
    defectCount: 8,
    temperature: 29.1,
    voltage: 1.35,
    current: 1.18,
    frequency: 2.7,
    power: 1.59,
    engineerStatus: 'anomaly',
    position: { x: 270, y: 300 }
  }
];
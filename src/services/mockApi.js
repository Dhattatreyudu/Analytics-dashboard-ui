import {
  mockSummaryKpis,
  mockRevenueTrends,
  mockCategorySales,
  mockTrafficSources,
  mockDeviceDistribution,
  mockTransactions,
  mockCustomers,
  mockNotifications,
  mockRegionalPerformance,
} from './mockData';

// Simulated server latency in ms
const DEFAULT_DELAY = 650;

let shouldSimulateError = false;

export const mockApi = {
  // Toggle error simulation for testing error states
  setErrorSimulation(enable) {
    shouldSimulateError = enable;
  },

  getErrorSimulation() {
    return shouldSimulateError;
  },

  // Simulates GET /api/v1/dashboard/overview?timeframe=monthly
  async getDashboardOverview(timeframe = 'monthly') {
    await new Promise(resolve => setTimeout(resolve, DEFAULT_DELAY));

    if (shouldSimulateError) {
      throw new Error('500 Internal Server Error: Failed to fetch dashboard telemetry from upstream server.');
    }

    const trends = mockRevenueTrends[timeframe] || mockRevenueTrends.monthly;

    return {
      success: true,
      data: {
        kpis: mockSummaryKpis,
        revenueTrend: trends,
        categorySales: mockCategorySales,
        trafficSources: mockTrafficSources,
        deviceDistribution: mockDeviceDistribution,
        regionalPerformance: mockRegionalPerformance,
        recentTransactions: mockTransactions.slice(0, 6),
        notifications: mockNotifications,
        serverTimestamp: new Date().toISOString(),
      },
    };
  },

  // Simulates GET /api/v1/transactions?search=&status=&page=1&limit=10
  async getTransactions({
    search = '',
    status = 'all',
    paymentMethod = 'all',
    page = 1,
    limit = 10,
    sortBy = 'date',
    sortOrder = 'desc',
  } = {}) {
    await new Promise(resolve => setTimeout(resolve, Math.max(300, DEFAULT_DELAY - 200)));

    if (shouldSimulateError) {
      throw new Error('503 Service Unavailable: Transaction database cluster is currently unreachable.');
    }

    let filtered = [...mockTransactions];

    // Filter by search query
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.id.toLowerCase().includes(q) ||
          item.customer.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.product.toLowerCase().includes(q)
      );
    }

    // Filter by status
    if (status && status !== 'all') {
      filtered = filtered.filter(
        item => item.status.toLowerCase() === status.toLowerCase()
      );
    }

    // Filter by payment method
    if (paymentMethod && paymentMethod !== 'all') {
      filtered = filtered.filter(
        item => item.paymentMethod.toLowerCase() === paymentMethod.toLowerCase()
      );
    }

    // Sort items
    filtered.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (sortBy === 'amount') {
        valA = Number(valA);
        valB = Number(valB);
      } else if (sortBy === 'date') {
        valA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
        valB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
      } else {
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return {
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
      data: paginated,
    };
  },

  // Simulates GET /api/v1/customers
  async getCustomers() {
    await new Promise(resolve => setTimeout(resolve, DEFAULT_DELAY));
    if (shouldSimulateError) {
      throw new Error('Failed to fetch customers roster.');
    }
    return {
      success: true,
      data: mockCustomers,
    };
  },
};

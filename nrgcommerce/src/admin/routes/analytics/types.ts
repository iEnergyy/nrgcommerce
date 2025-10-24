// Shared types for analytics components

export interface AnalyticsData {
  totalRevenue: Record<string, number> | number
  totalOrders: Record<string, number> | number
  totalCustomers: number
  conversionRate: Record<string, number> | number
  averageOrderValue: Record<string, number> | number
  revenueGrowth: Record<string, number> | number
  ordersGrowth: Record<string, number> | number
  customersGrowth: number
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    currency?: string
  }[]
}

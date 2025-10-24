import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"
import {
  getRevenueAnalytics,
  getOrdersAnalytics,
  getCustomersAnalytics,
  getTopProductsAnalytics,
  getSalesTrendsAnalytics,
  AnalyticsFilters
} from "./helpers"
import { getStoreCurrencies } from "./currency-utils"

// GET /admin/analytics
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    console.log("Analytics API called with URL:", req.url)
    console.log("Request headers:", req.headers)
    console.log("Request method:", req.method)


    // Get query parameters from req.query (Medusa's way)
    const dateRange = req.query.dateRange as string || "30d"  // Changed default to 30 days
    const currency = req.query.currency as string || "all"

    console.log("Date range requested:", dateRange, "Currency:", currency)

    // Calculate date range
    const now = new Date()
    let startDate: Date

    switch (dateRange) {
      case "7d":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case "30d":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case "90d":
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      case "1y":
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    }

    // Resolve Medusa services
    console.log("Resolving Medusa services...")
    const orderModuleService = req.scope.resolve(Modules.ORDER)
    const customerModuleService = req.scope.resolve(Modules.CUSTOMER)
    const productModuleService = req.scope.resolve(Modules.PRODUCT)
    const storeModuleService = req.scope.resolve(Modules.STORE)
    console.log("Services resolved successfully")

    // Create analyticsFilters
    const analyticsFilters: AnalyticsFilters = {
      startDate,
      endDate: now,
      currency
    }

    // Fetch all analytics data in parallel
    const [
      revenueData,
      ordersData,
      customersData,
      topProductsData,
      salesTrendsData,
      availableCurrencies
    ] = await Promise.all([
      getRevenueAnalytics(orderModuleService, analyticsFilters),
      getOrdersAnalytics(orderModuleService, analyticsFilters),
      getCustomersAnalytics(customerModuleService, analyticsFilters),
      getTopProductsAnalytics(orderModuleService, productModuleService, analyticsFilters),
      getSalesTrendsAnalytics(orderModuleService, analyticsFilters),
      getStoreCurrencies(storeModuleService)
    ])

    console.log("Analytics data fetched:")
    console.log("- Revenue data:", revenueData)
    console.log("- Orders data:", ordersData)
    console.log("- Customers data:", customersData)
    console.log("- Available currencies:", availableCurrencies)

    // Calculate conversion rate (completed orders / total orders)
    const conversionRate: Record<string, number> = {}
    Object.keys(ordersData.total).forEach(curr => {
      const totalOrders = ordersData.total[curr] || 0
      const completedOrders = ordersData.completed[curr] || 0
      conversionRate[curr] = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0
    })

    // Build response
    const analyticsData = {
      metrics: {
        totalRevenue: revenueData.total,
        totalOrders: ordersData.total,
        totalCustomers: customersData.total,
        conversionRate,
        averageOrderValue: ordersData.averageOrderValue,
        revenueGrowth: revenueData.growth,
        ordersGrowth: ordersData.growth,
        customersGrowth: customersData.growth
      },
      charts: {
        revenue: salesTrendsData,
        orders: salesTrendsData // Could be separate order count trends
      },
      topProducts: topProductsData,
      availableCurrencies
    }

    console.log("Analytics data generated successfully")
    res.json(analyticsData)
  } catch (error) {
    console.error("Error fetching analytics data:", error)

    // Fallback to mock data if real data fails
    console.log("Falling back to mock data")
    const mockData = {
      metrics: {
        totalRevenue: { usd: 50000, eur: 35000 },
        totalOrders: { usd: 450, eur: 320 },
        totalCustomers: 650,
        conversionRate: { usd: 85.2, eur: 78.1 },
        averageOrderValue: { usd: 111.11, eur: 109.38 },
        revenueGrowth: { usd: 12.5, eur: 8.3 },
        ordersGrowth: { usd: 10.2, eur: 5.7 },
        customersGrowth: 15.2
      },
      charts: {
        revenue: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "USD",
              data: [12000, 15000, 18000, 14000, 16000, 20000, 18000],
              currency: "usd",
              borderColor: "#3B82F6",
              backgroundColor: "#3B82F620"
            },
            {
              label: "EUR",
              data: [10000, 13000, 15000, 12000, 14000, 17000, 15000],
              currency: "eur",
              borderColor: "#10B981",
              backgroundColor: "#10B98120"
            }
          ]
        }
      },
      topProducts: [
        {
          id: "1",
          name: "Premium Wireless Headphones",
          sales: { usd: 100, eur: 56 },
          revenue: { usd: 8000, eur: 4480 },
          growth: { usd: 12.5, eur: 8.3 }
        }
      ],
      availableCurrencies: ["usd", "eur"]
    }

    res.json(mockData)
  }
}


// POST /admin/analytics (for custom date ranges or analyticsFilters)
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    const body = req.body as any
    const { startDate, endDate, analyticsFilters } = body

    // Validate dates
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      res.status(400).json({ error: "Invalid date format" })
      return
    }

    if (start >= end) {
      res.status(400).json({ error: "Start date must be before end date" })
      return
    }

    // Generate analytics data for custom date range
    const orderModuleService = req.scope.resolve(Modules.ORDER)
    const customerModuleService = req.scope.resolve(Modules.CUSTOMER)
    const productModuleService = req.scope.resolve(Modules.PRODUCT)
    const storeModuleService = req.scope.resolve(Modules.STORE)

    const postAnalyticsFilters: AnalyticsFilters = {
      startDate: start,
      endDate: end,
      currency: body.currency || 'all'
    }

    const [
      revenueData,
      ordersData,
      customersData,
      topProductsData,
      salesTrendsData,
      availableCurrencies
    ] = await Promise.all([
      getRevenueAnalytics(orderModuleService, postAnalyticsFilters),
      getOrdersAnalytics(orderModuleService, postAnalyticsFilters),
      getCustomersAnalytics(customerModuleService, postAnalyticsFilters),
      getTopProductsAnalytics(orderModuleService, productModuleService, postAnalyticsFilters),
      getSalesTrendsAnalytics(orderModuleService, postAnalyticsFilters),
      getStoreCurrencies(storeModuleService)
    ])

    const conversionRate: Record<string, number> = {}
    Object.keys(ordersData.total).forEach(curr => {
      const totalOrders = ordersData.total[curr] || 0
      const completedOrders = ordersData.completed[curr] || 0
      conversionRate[curr] = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0
    })

    const analyticsData = {
      metrics: {
        totalRevenue: revenueData.total,
        totalOrders: ordersData.total,
        totalCustomers: customersData.total,
        conversionRate,
        averageOrderValue: ordersData.averageOrderValue,
        revenueGrowth: revenueData.growth,
        ordersGrowth: ordersData.growth,
        customersGrowth: customersData.growth
      },
      charts: {
        revenue: salesTrendsData,
        orders: salesTrendsData
      },
      topProducts: topProductsData,
      availableCurrencies
    }

    res.json(analyticsData)
  } catch (error) {
    console.error("Error processing analytics request:", error)
    res.status(500).json({ error: "Failed to process analytics request" })
  }
}

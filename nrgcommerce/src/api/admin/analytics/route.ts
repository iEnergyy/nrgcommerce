import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

// GET /admin/analytics
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    console.log("Analytics API called with URL:", req.url)

    // Get date range from query parameters
    const { searchParams } = new URL(req.url)
    const dateRange = searchParams.get("dateRange") || "7d"

    console.log("Date range requested:", dateRange)

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

    // Mock analytics data - replace with actual database queries
    const analyticsData = await generateMockAnalyticsData(startDate, now)

    console.log("Analytics data generated successfully")
    res.json(analyticsData)
  } catch (error) {
    console.error("Error fetching analytics data:", error)
    res.status(500).json({ error: "Failed to fetch analytics data" })
  }
}

async function generateMockAnalyticsData(startDate: Date, endDate: Date) {
  // Mock metrics data
  const metrics = {
    totalRevenue: Math.floor(Math.random() * 100000) + 50000,
    totalOrders: Math.floor(Math.random() * 1000) + 500,
    totalCustomers: Math.floor(Math.random() * 500) + 200,
    conversionRate: Math.random() * 5 + 1,
    averageOrderValue: Math.floor(Math.random() * 200) + 100,
    revenueGrowth: (Math.random() - 0.5) * 20,
    ordersGrowth: (Math.random() - 0.5) * 15,
    customersGrowth: (Math.random() - 0.5) * 10
  }

  // Generate chart data for the date range
  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const labels: string[] = []
  const revenueData: number[] = []
  const ordersData: number[] = []

  for (let i = 0; i < daysDiff; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
    labels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }))

    // Generate realistic revenue data with some randomness
    const baseRevenue = metrics.totalRevenue / daysDiff
    const randomFactor = 0.5 + Math.random()
    revenueData.push(Math.floor(baseRevenue * randomFactor))

    // Generate realistic orders data
    const baseOrders = metrics.totalOrders / daysDiff
    const ordersRandomFactor = 0.5 + Math.random()
    ordersData.push(Math.floor(baseOrders * ordersRandomFactor))
  }

  const charts = {
    revenue: {
      labels,
      datasets: [
        {
          label: "Revenue",
          data: revenueData,
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)"
        }
      ]
    },
    orders: {
      labels,
      datasets: [
        {
          label: "Orders",
          data: ordersData,
          borderColor: "rgb(16, 185, 129)",
          backgroundColor: "rgba(16, 185, 129, 0.1)"
        }
      ]
    }
  }

  return {
    metrics,
    charts: {
      revenue: charts.revenue,
      orders: charts.orders
    },
    dateRange: {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    }
  }
}

// POST /admin/analytics (for custom date ranges or filters)
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    const body = req.body as any
    const { startDate, endDate, filters } = body

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
    const analyticsData = await generateMockAnalyticsData(start, end)

    res.json(analyticsData)
  } catch (error) {
    console.error("Error processing analytics request:", error)
    res.status(500).json({ error: "Failed to process analytics request" })
  }
}

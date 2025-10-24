// Analytics helper functions for calculating metrics from Medusa data

import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { aggregateByCurrency, calculateGrowthRate } from "./currency-utils"

export interface AnalyticsFilters {
  startDate: Date
  endDate: Date
  currency?: string
}

export interface RevenueAnalytics {
  total: Record<string, number>
  growth: Record<string, number>
}

export interface OrdersAnalytics {
  total: Record<string, number>
  completed: Record<string, number>
  pending: Record<string, number>
  canceled: Record<string, number>
  growth: Record<string, number>
  averageOrderValue: Record<string, number>
}

export interface CustomersAnalytics {
  total: number
  newCustomers: number
  growth: number
}

export interface TopProduct {
  id: string
  name: string
  sales: Record<string, number>
  revenue: Record<string, number>
  growth: Record<string, number>
}

export interface SalesTrends {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    currency: string
    borderColor: string
    backgroundColor: string
  }>
}

export async function getRevenueAnalytics(
  orderModuleService: any,
  filters: AnalyticsFilters
): Promise<RevenueAnalytics> {
  const { startDate, endDate, currency } = filters

  // Build query filters
  const queryFilters: any = {
    created_at: {
      $gte: startDate,
      $lte: endDate
    }
  }

  if (currency && currency !== 'all') {
    queryFilters.currency_code = currency
  }

  // Get current period orders
  const orders = await orderModuleService.listOrders(queryFilters)

  // Calculate previous period for growth comparison
  const periodLength = endDate.getTime() - startDate.getTime()
  const previousStartDate = new Date(startDate.getTime() - periodLength)
  const previousEndDate = new Date(startDate.getTime())

  const previousQueryFilters = {
    created_at: {
      $gte: previousStartDate,
      $lte: previousEndDate
    }
  }

  if (currency && currency !== 'all') {
    previousQueryFilters.currency_code = currency
  }

  const previousOrders = await orderModuleService.listOrders(previousQueryFilters)

  // Aggregate revenue by currency
  const currentRevenue = aggregateByCurrency(orders, 'total')
  const previousRevenue = aggregateByCurrency(previousOrders, 'total')

  return {
    total: currentRevenue,
    growth: calculateGrowthRate(currentRevenue, previousRevenue)
  }
}

export async function getOrdersAnalytics(
  orderModuleService: any,
  filters: AnalyticsFilters
): Promise<OrdersAnalytics> {
  const { startDate, endDate, currency } = filters

  const queryFilters: any = {
    created_at: {
      $gte: startDate,
      $lte: endDate
    }
  }

  if (currency && currency !== 'all') {
    queryFilters.currency_code = currency
  }

  // Get all orders
  const allOrders = await orderModuleService.listOrders(queryFilters)

  // Get completed orders
  const completedOrders = await orderModuleService.listOrders({
    ...queryFilters,
    status: 'completed'
  })

  // Get pending orders
  const pendingOrders = await orderModuleService.listOrders({
    ...queryFilters,
    status: 'pending'
  })

  // Get cancelled orders
  const cancelledOrders = await orderModuleService.listOrders({
    ...queryFilters,
    status: 'canceled'
  })

  // Calculate previous period for growth
  const periodLength = endDate.getTime() - startDate.getTime()
  const previousStartDate = new Date(startDate.getTime() - periodLength)
  const previousEndDate = new Date(startDate.getTime())

  const previousQueryFilters = {
    created_at: {
      $gte: previousStartDate,
      $lte: previousEndDate
    }
  }

  if (currency && currency !== 'all') {
    previousQueryFilters.currency_code = currency
  }

  const previousOrders = await orderModuleService.listOrders(previousQueryFilters)

  // Aggregate by currency
  const totalOrders = aggregateByCurrency(allOrders, 'total')
  const completedOrdersByCurrency = aggregateByCurrency(completedOrders, 'total')
  const pendingOrdersByCurrency = aggregateByCurrency(pendingOrders, 'total')
  const cancelledOrdersByCurrency = aggregateByCurrency(cancelledOrders, 'total')
  const previousOrdersByCurrency = aggregateByCurrency(previousOrders, 'total')

  // Calculate growth
  const growth = calculateGrowthRate(totalOrders, previousOrdersByCurrency)

  // Calculate average order value
  const averageOrderValue: Record<string, number> = {}
  Object.keys(totalOrders).forEach(currency => {
    const totalRevenue = totalOrders[currency]
    const orderCount = allOrders.filter(order => order.currency_code === currency).length
    averageOrderValue[currency] = orderCount > 0 ? totalRevenue / orderCount : 0
  })

  return {
    total: totalOrders,
    completed: completedOrdersByCurrency,
    pending: pendingOrdersByCurrency,
    canceled: cancelledOrdersByCurrency,
    growth,
    averageOrderValue
  }
}

export async function getCustomersAnalytics(
  customerModuleService: any,
  filters: AnalyticsFilters
): Promise<CustomersAnalytics> {
  const { startDate, endDate } = filters

  // Get total customers in period
  const customers = await customerModuleService.listCustomers({
    created_at: {
      $gte: startDate,
      $lte: endDate
    }
  })

  // Calculate previous period for growth
  const periodLength = endDate.getTime() - startDate.getTime()
  const previousStartDate = new Date(startDate.getTime() - periodLength)
  const previousEndDate = new Date(startDate.getTime())

  const previousCustomers = await customerModuleService.listCustomers({
    created_at: {
      $gte: previousStartDate,
      $lte: previousEndDate
    }
  })

  const total = customers.length
  const newCustomers = customers.length
  const previousTotal = previousCustomers.length

  const growth = previousTotal > 0 ? ((total - previousTotal) / previousTotal) * 100 : 0

  return {
    total,
    newCustomers,
    growth
  }
}

export async function getTopProductsAnalytics(
  orderModuleService: any,
  productModuleService: any,
  filters: AnalyticsFilters
): Promise<TopProduct[]> {
  const { startDate, endDate, currency } = filters

  const queryFilters: any = {
    created_at: {
      $gte: startDate,
      $lte: endDate
    },
    status: 'completed'
  }

  if (currency && currency !== 'all') {
    queryFilters.currency_code = currency
  }

  // Get completed orders with items
  const orders = await orderModuleService.listOrders(queryFilters)

  // Aggregate product sales
  const productSales = new Map<string, {
    sales: Record<string, number>
    revenue: Record<string, number>
  }>()

  orders.forEach(order => {
    if (order.items) {
      order.items.forEach((item: any) => {
        const productId = item.product_id
        const currency = order.currency_code
        const quantity = item.quantity || 0
        const total = item.total || 0

        if (!productSales.has(productId)) {
          productSales.set(productId, {
            sales: {},
            revenue: {}
          })
        }

        const product = productSales.get(productId)!
        product.sales[currency] = (product.sales[currency] || 0) + quantity
        product.revenue[currency] = (product.revenue[currency] || 0) + total
      })
    }
  })

  // Get top 10 products by total revenue
  const topProducts = Array.from(productSales.entries())
    .map(([productId, data]) => ({
      productId,
      totalRevenue: Object.values(data.revenue).reduce((sum, val) => sum + val, 0),
      data
    }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 10)

  // Fetch product details
  const productsWithDetails = await Promise.all(
    topProducts.map(async ({ productId, data }) => {
      try {
        const product = await productModuleService.retrieveProduct(productId)
        return {
          id: productId,
          name: product.title,
          sales: data.sales,
          revenue: data.revenue,
          growth: {} // Could be calculated with previous period data
        }
      } catch (error) {
        console.error(`Error fetching product ${productId}:`, error)
        return {
          id: productId,
          name: `Product ${productId}`,
          sales: data.sales,
          revenue: data.revenue,
          growth: {}
        }
      }
    })
  )

  return productsWithDetails
}

export async function getSalesTrendsAnalytics(
  orderModuleService: any,
  filters: AnalyticsFilters
): Promise<SalesTrends> {
  const { startDate, endDate, currency } = filters

  // Generate daily data points
  const labels: string[] = []
  const dailyData: Record<string, Record<string, number>> = {}

  const currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    const dayStart = new Date(currentDate)
    const dayEnd = new Date(currentDate)
    dayEnd.setDate(dayEnd.getDate() + 1)

    const dayOrders = await orderModuleService.listOrders({
      created_at: {
        $gte: dayStart,
        $lt: dayEnd
      },
      status: 'completed',
      ...(currency && currency !== 'all' ? { currency_code: currency } : {})
    })

    const dayRevenue = aggregateByCurrency(dayOrders, 'total')

    // Store data by currency
    Object.keys(dayRevenue).forEach(curr => {
      if (!dailyData[curr]) {
        dailyData[curr] = {}
      }
      dailyData[curr][currentDate.toISOString().split('T')[0]] = dayRevenue[curr]
    })

    labels.push(currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  // Create datasets for each currency
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']
  const datasets = Object.keys(dailyData).map((curr, index) => ({
    label: curr.toUpperCase(),
    data: labels.map((_, i) => {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      const dateKey = date.toISOString().split('T')[0]
      return dailyData[curr][dateKey] || 0
    }),
    currency: curr,
    borderColor: colors[index % colors.length],
    backgroundColor: colors[index % colors.length] + '20'
  }))

  return {
    labels,
    datasets
  }
}

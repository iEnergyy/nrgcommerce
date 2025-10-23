import React from "react"
import { Text } from "@medusajs/ui"

interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  conversionRate: number
  averageOrderValue: number
  revenueGrowth: number
  ordersGrowth: number
  customersGrowth: number
}

interface SalesOverviewProps {
  data: AnalyticsData
}

const SalesOverview: React.FC<SalesOverviewProps> = ({ data }) => {
  const metrics = [
    {
      label: "Average Order Value",
      value: `$${data.averageOrderValue.toFixed(2)}`,
      status: data.averageOrderValue > 100 ? "good" : "warning"
    },
    {
      label: "Conversion Rate",
      value: `${data.conversionRate.toFixed(2)}%`,
      status: data.conversionRate > 2 ? "good" : "warning"
    },
    {
      label: "Revenue per Customer",
      value: `$${(data.totalRevenue / data.totalCustomers).toFixed(2)}`,
      status: "info"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-500/20 text-green-400"
      case "warning": return "bg-yellow-500/20 text-yellow-400"
      case "info": return "bg-blue-500/20 text-blue-400"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div>
            <Text className="text-sm text-muted-foreground">{metric.label}</Text>
            <Text className="text-lg font-semibold">{metric.value}</Text>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
            {metric.status}
          </span>
        </div>
      ))}
    </div>
  )
}

export default SalesOverview

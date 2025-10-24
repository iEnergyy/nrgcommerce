import React from "react"
import { Text } from "@medusajs/ui"
import { AnalyticsData } from "../types"

interface SalesOverviewProps {
  data: AnalyticsData
}

const SalesOverview: React.FC<SalesOverviewProps> = ({ data }) => {
  // Helper function to get a single value from multi-currency data
  const getValue = (value: Record<string, number> | number): number => {
    if (typeof value === 'number') return value
    return Object.values(value).reduce((sum, val) => sum + val, 0)
  }

  const avgOrderValue = getValue(data.averageOrderValue)
  const conversionRate = getValue(data.conversionRate)
  const totalRevenue = getValue(data.totalRevenue)

  const metrics = [
    {
      label: "Average Order Value",
      value: `$${avgOrderValue.toFixed(2)}`,
      status: avgOrderValue > 100 ? "good" : "warning"
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate.toFixed(2)}%`,
      status: conversionRate > 2 ? "good" : "warning"
    },
    {
      label: "Revenue per Customer",
      value: `$${(totalRevenue / data.totalCustomers).toFixed(2)}`,
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

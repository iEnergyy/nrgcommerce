import React from "react"
import { Text, Heading } from "@medusajs/ui"

interface MetricsCardProps {
  title: string
  value: string | Record<string, number> | number
  growth: number | Record<string, number>
  icon: string
  currency?: string
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, growth, icon, currency }) => {
  const getGrowthColor = (growth: number) => {
    if (growth > 0) return "text-green-600"
    if (growth < 0) return "text-red-600"
    return "text-gray-600"
  }

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return "↗"
    if (growth < 0) return "↘"
    return "→"
  }

  const formatValue = (value: string | Record<string, number> | number): string => {
    if (typeof value === 'string') {
      return value
    }
    
    if (typeof value === 'number') {
      return new Intl.NumberFormat('en-US').format(value)
    }
    
    if (currency && currency !== 'all' && value[currency]) {
      return new Intl.NumberFormat('en-US').format(value[currency])
    }
    
    // Show all currencies
    return Object.entries(value)
      .map(([curr, amount]) => `${curr.toUpperCase()} ${new Intl.NumberFormat('en-US').format(amount)}`)
      .join(' + ')
  }

  const formatGrowth = (growth: number | Record<string, number>): { value: number; color: string; icon: string } => {
    if (typeof growth === 'number') {
      return {
        value: growth,
        color: getGrowthColor(growth),
        icon: getGrowthIcon(growth)
      }
    }
    
    if (currency && currency !== 'all' && growth[currency] !== undefined) {
      const growthValue = growth[currency]
      return {
        value: growthValue,
        color: getGrowthColor(growthValue),
        icon: getGrowthIcon(growthValue)
      }
    }
    
    // For multi-currency, show average growth
    const values = Object.values(growth)
    const avgGrowth = values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0
    return {
      value: avgGrowth,
      color: getGrowthColor(avgGrowth),
      icon: getGrowthIcon(avgGrowth)
    }
  }

  const formattedValue = formatValue(value)
  const formattedGrowth = formatGrowth(growth)

  return (
    <div className="p-6 border border-border rounded-lg bg-background">
      <div className="flex items-center justify-between">
        <div>
          <Text className="text-sm text-muted-foreground mb-1">{title}</Text>
          <Heading level="h2" className="text-2xl font-bold">
            {formattedValue}
          </Heading>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      {formattedGrowth.value !== 0 && (
        <div className={`flex items-center mt-2 text-sm ${formattedGrowth.color}`}>
          <span className="mr-1">{formattedGrowth.icon}</span>
          <span>{Math.abs(formattedGrowth.value).toFixed(1)}% from last period</span>
        </div>
      )}
    </div>
  )
}

export default MetricsCard

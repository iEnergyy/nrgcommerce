import React from "react"
import { Text, Heading } from "@medusajs/ui"

interface MetricsCardProps {
  title: string
  value: string
  growth: number
  icon: string
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, growth, icon }) => {
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

  return (
    <div className="p-6 border border-border rounded-lg bg-background">
      <div className="flex items-center justify-between">
        <div>
          <Text className="text-sm text-muted-foreground mb-1">{title}</Text>
          <Heading level="h2" className="text-2xl font-bold">
            {value}
          </Heading>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      {growth !== 0 && (
        <div className={`flex items-center mt-2 text-sm ${getGrowthColor(growth)}`}>
          <span className="mr-1">{getGrowthIcon(growth)}</span>
          <span>{Math.abs(growth).toFixed(1)}% from last period</span>
        </div>
      )}
    </div>
  )
}

export default MetricsCard

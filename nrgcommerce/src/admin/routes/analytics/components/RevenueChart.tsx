import React from "react"
import { Text } from "@medusajs/ui"

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
  }[]
}

interface RevenueChartProps {
  data: ChartData
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  // Simple bar chart representation using CSS
  const maxValue = Math.max(...data.datasets[0]?.data || [0])
  
  return (
    <div className="w-full h-64">
      <div className="flex items-end justify-between h-full space-x-2">
        {data.labels.map((label, index) => {
          const value = data.datasets[0]?.data[index] || 0
          const height = maxValue > 0 ? (value / maxValue) * 100 : 0
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="bg-primary rounded-t w-full transition-all duration-300 hover:bg-primary/80"
                style={{ height: `${height}%` }}
                title={`${label}: $${value.toLocaleString()}`}
              />
              <Text className="text-xs text-muted-foreground mt-2 transform -rotate-45 origin-left">
                {label}
              </Text>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RevenueChart

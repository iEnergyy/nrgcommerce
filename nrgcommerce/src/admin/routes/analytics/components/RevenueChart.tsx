import React from "react"
import { Text } from "@medusajs/ui"

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    currency?: string
  }[]
}

interface RevenueChartProps {
  data: ChartData
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  // Calculate max value across all datasets
  const maxValue = Math.max(
    ...data.datasets.flatMap(dataset => dataset.data),
    0
  )
  
  // Color mapping for different currencies
  const currencyColors: Record<string, string> = {
    usd: '#3B82F6',
    eur: '#10B981', 
    gbp: '#F59E0B',
    jpy: '#EF4444',
    cad: '#8B5CF6',
    aud: '#06B6D4'
  }
  
  return (
    <div className="w-full h-64">
      <div className="flex items-end justify-between h-full space-x-2">
        {data.labels.map((label, index) => {
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="flex flex-col items-center h-full justify-end space-y-1">
                {data.datasets.map((dataset, datasetIndex) => {
                  const value = dataset.data[index] || 0
                  const height = maxValue > 0 ? (value / maxValue) * 100 : 0
                  const color = dataset.currency ? currencyColors[dataset.currency] : dataset.borderColor
                  
                  return (
                    <div
                      key={datasetIndex}
                      className="w-full transition-all duration-300 hover:opacity-80 rounded-t"
                      style={{ 
                        height: `${height}%`,
                        backgroundColor: color
                      }}
                      title={`${label} - ${dataset.label}: ${value.toLocaleString()}`}
                    />
                  )
                })}
              </div>
              <Text className="text-xs text-muted-foreground mt-2 transform -rotate-45 origin-left">
                {label}
              </Text>
            </div>
          )
        })}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-2 mt-4">
        {data.datasets.map((dataset, index) => {
          const color = dataset.currency ? currencyColors[dataset.currency] : dataset.borderColor
          return (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <Text className="text-xs text-muted-foreground">
                {dataset.label}
              </Text>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RevenueChart

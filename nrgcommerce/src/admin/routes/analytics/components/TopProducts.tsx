import React, { useState, useEffect } from "react"
import { Text, Button } from "@medusajs/ui"

interface Product {
  id: string
  name: string
  sales: Record<string, number>
  revenue: Record<string, number>
  growth: Record<string, number>
}

const TopProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchTopProducts = async () => {
      try {
        setLoading(true)
        // Mock data - replace with actual API call
        const mockProducts: Product[] = [
          {
            id: "1",
            name: "Premium Wireless Headphones",
            sales: { usd: 100, eur: 56, dop: 45 },
            revenue: { usd: 8000, eur: 4480, dop: 62500 },
            growth: { usd: 12.5, eur: 8.3, dop: 15.2 }
          },
          {
            id: "2", 
            name: "Smart Fitness Watch",
            sales: { usd: 60, eur: 38, dop: 32 },
            revenue: { usd: 12000, eur: 7600, dop: 44444 },
            growth: { usd: 8.3, eur: 5.2, dop: 12.8 }
          },
          {
            id: "3",
            name: "Bluetooth Speaker",
            sales: { usd: 45, eur: 42, dop: 28 },
            revenue: { usd: 2250, eur: 2100, dop: 38889 },
            growth: { usd: -2.1, eur: 3.5, dop: 6.7 }
          },
          {
            id: "4",
            name: "Wireless Charging Pad",
            sales: { usd: 40, eur: 36, dop: 25 },
            revenue: { usd: 1600, eur: 1440, dop: 34722 },
            growth: { usd: 15.7, eur: 12.1, dop: 18.3 }
          },
          {
            id: "5",
            name: "USB-C Cable Set",
            sales: { usd: 35, eur: 30, dop: 22 },
            revenue: { usd: 700, eur: 600, dop: 30556 },
            growth: { usd: 5.2, eur: 8.9, dop: 11.4 }
          }
        ]
        
        setProducts(mockProducts)
      } catch (error) {
        console.error("Error fetching top products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Text>Loading top products...</Text>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {products.map((product, index) => (
        <div key={product.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Text className="text-sm font-semibold text-primary">#{index + 1}</Text>
            </div>
            <div>
              <Text className="font-medium">{product.name}</Text>
              <Text className="text-sm text-muted-foreground">
                {Object.entries(product.sales)
                  .map(([curr, sales]) => `${sales} sales (${curr.toUpperCase()})`)
                  .join(' • ')} • {Object.entries(product.revenue)
                  .map(([curr, revenue]) => `${curr.toUpperCase()} ${revenue.toLocaleString()}`)
                  .join(' + ')} revenue
              </Text>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {Object.entries(product.growth).map(([curr, growth]) => (
              <span 
                key={curr}
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  growth > 0 
                    ? "bg-green-500/20 text-green-400" 
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {curr.toUpperCase()} {growth > 0 ? "+" : ""}{growth.toFixed(1)}%
              </span>
            ))}
          </div>
        </div>
      ))}
      
      <div className="pt-3 border-t">
        <Button variant="secondary" className="w-full">
          View All Products
        </Button>
      </div>
    </div>
  )
}

export default TopProducts

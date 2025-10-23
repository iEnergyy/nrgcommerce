import React, { useState, useEffect } from "react"
import { Text, Button } from "@medusajs/ui"

interface Product {
  id: string
  name: string
  sales: number
  revenue: number
  growth: number
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
            sales: 156,
            revenue: 12480,
            growth: 12.5
          },
          {
            id: "2", 
            name: "Smart Fitness Watch",
            sales: 98,
            revenue: 19600,
            growth: 8.3
          },
          {
            id: "3",
            name: "Bluetooth Speaker",
            sales: 87,
            revenue: 4350,
            growth: -2.1
          },
          {
            id: "4",
            name: "Wireless Charging Pad",
            sales: 76,
            revenue: 3040,
            growth: 15.7
          },
          {
            id: "5",
            name: "USB-C Cable Set",
            sales: 65,
            revenue: 1300,
            growth: 5.2
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
                {product.sales} sales • ${product.revenue.toLocaleString()} revenue
              </Text>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span 
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                product.growth > 0 
                  ? "bg-green-500/20 text-green-400" 
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {product.growth > 0 ? "+" : ""}{product.growth.toFixed(1)}%
            </span>
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

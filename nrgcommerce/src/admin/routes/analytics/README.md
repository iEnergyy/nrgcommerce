# Analytics Dashboard

This analytics dashboard provides comprehensive insights into your e-commerce store performance.

## Features

- **Metrics Overview**: Total revenue, orders, customers, and conversion rates
- **Revenue Trends**: Visual charts showing revenue trends over time
- **Sales Overview**: Key performance indicators and sales metrics
- **Top Products**: Best-performing products with growth indicators
- **Interactive Charts**: Customizable date ranges and real-time data

## Components

### Main Page (`page.tsx`)
The main analytics dashboard that orchestrates all components and handles data fetching.

### Components
- `MetricsCard`: Displays key metrics with growth indicators
- `AnalyticsChart`: Placeholder for chart visualizations
- `RevenueChart`: Simple bar chart for revenue data
- `SalesOverview`: Sales performance metrics
- `TopProducts`: List of best-performing products

## API Integration

The dashboard connects to `/admin/analytics` API endpoint which provides:
- Mock analytics data (replace with real database queries)
- Date range filtering
- Growth calculations
- Chart data generation

## Customization

### Adding Real Chart Libraries
Replace the placeholder chart components with real charting libraries:

1. **Chart.js**: Popular and feature-rich
2. **Recharts**: React-specific charting library
3. **D3.js**: For custom visualizations

### Database Integration
Update the API route (`/src/api/admin/analytics/route.ts`) to:
- Query real order data
- Calculate actual metrics
- Implement caching for performance
- Add real-time updates

### Additional Metrics
Extend the analytics by adding:
- Customer acquisition metrics
- Product performance analytics
- Geographic sales data
- Seasonal trends
- Inventory analytics

## Usage

1. Navigate to the Analytics page in your Medusa admin
2. Select date range using the dropdown
3. View real-time metrics and charts
4. Use the refresh button to update data

## Development

To extend this analytics dashboard:

1. Add new components in the `components/` directory
2. Update the main page to include new components
3. Extend the API route for new data sources
4. Add new metrics and visualizations as needed

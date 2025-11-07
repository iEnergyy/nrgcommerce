# Docker Deployment Guide for Medusa Backend

This guide covers deploying the Medusa backend using Docker for both local development and Railway production deployment.

## Project Structure

```
medusa/
├── nrgcommerce/           # Medusa backend
│   ├── Dockerfile         # Production Docker image
│   ├── .dockerignore      # Files to exclude from Docker build
│   ├── env.example        # Environment variables template
│   └── medusa-config.ts   # Updated with Redis support
├── docker-compose.yml     # Local development setup
└── railway.json          # Railway deployment config
```

## Local Development

### Prerequisites

- Docker and Docker Compose installed
- Supabase database connection string

### Setup

1. **Copy environment variables:**
   ```bash
   cp nrgcommerce/env.example nrgcommerce/.env
   ```

2. **Update environment variables in `nrgcommerce/.env`:**
   ```env
   DATABASE_URL=postgresql://username:password@db.supabase.co:5432/postgres
   JWT_SECRET=your-super-secret-jwt-key-here
   COOKIE_SECRET=your-super-secret-cookie-key-here
   # ... other variables
   ```

3. **Start the services:**
   ```bash
   docker-compose up -d
   ```

4. **View logs:**
   ```bash
   docker-compose logs -f medusa
   ```

### Services

- **Medusa Backend**: http://localhost:9000
- **Admin Panel**: http://localhost:9000/admin
- **API**: http://localhost:9000/store
- **Redis**: localhost:6379

### Development Features

- **Hot reload**: Source code changes are reflected automatically
- **Volume mounts**: `src/` and `static/` directories are mounted
- **Health checks**: Both Redis and Medusa have health monitoring

## Railway Deployment

### Prerequisites

- Railway account
- Supabase database
- Railway Redis add-on (optional, can use external Redis)

### Setup

1. **Connect Repository:**
   - Connect your GitHub repository to Railway
   - Set root directory to `nrgcommerce/`

2. **Add Services:**
   - **PostgreSQL**: Use your Supabase connection string
   - **Redis**: Add Railway Redis add-on or use external Redis service

3. **Environment Variables:**
   Set these in Railway dashboard:
   ```
   DATABASE_URL=postgresql://username:password@db.supabase.co:5432/postgres
   REDIS_URL=redis://redis.railway.internal:6379
   NODE_ENV=production
   JWT_SECRET=your-production-jwt-secret
   COOKIE_SECRET=your-production-cookie-secret
   STORE_CORS=https://your-storefront-domain.com
   ADMIN_CORS=https://your-admin-domain.com
   AUTH_CORS=https://your-storefront-domain.com
   STRIPE_API_KEY=sk_live_your_stripe_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

4. **Deploy:**
   - Railway will automatically detect the Dockerfile
   - Build and deploy the container
   - Health checks will ensure the service is running

### Railway Configuration

The `railway.json` file is configured for Docker deployment:
- Uses `DOCKERFILE` builder
- No custom build commands (Docker handles everything)
- Automatic restart policies

## Docker Image Details

### Base Image
- **Node.js 20 Alpine**: Lightweight and secure
- **Non-root user**: Runs as `medusa` user for security

### Build Process
1. Install production dependencies with `npm ci`
2. Copy source code
3. Build admin panel with `npm run build`
4. Create non-root user
5. Set proper permissions

### Health Checks
- **Endpoint**: `/health`
- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3 attempts

## Redis Integration

### Configuration
Redis is configured in `medusa-config.ts`:
```typescript
projectConfig: {
  redisUrl: process.env.REDIS_URL,
  // ... other config
}
```

### Usage
- **Caching**: Session storage and API response caching
- **Job Queues**: Background task processing
- **Real-time Features**: WebSocket connections

### Local vs Production
- **Local**: `redis://redis:6379` (Docker service name)
- **Production**: Railway Redis URL or external Redis service

## Troubleshooting

### Common Issues

1. **Build Failures:**
   - Check Dockerfile syntax
   - Ensure all dependencies are in package.json
   - Verify .dockerignore excludes unnecessary files

2. **Connection Issues:**
   - Verify DATABASE_URL format
   - Check Redis URL configuration
   - Ensure CORS settings match your domains

3. **Health Check Failures:**
   - Check if Medusa is starting properly
   - Verify port 9000 is exposed
   - Check application logs

### Logs

**Local Development:**
```bash
docker-compose logs medusa
docker-compose logs redis
```

**Railway:**
- View logs in Railway dashboard
- Use Railway CLI: `railway logs`

### Performance Optimization

1. **Multi-stage builds**: Already implemented for smaller images
2. **Layer caching**: Package files copied first for better caching
3. **Alpine Linux**: Smaller base image
4. **Production dependencies**: Only install production packages

## Security Considerations

- **Non-root user**: Container runs as `medusa` user
- **Environment variables**: Sensitive data in environment variables
- **Health checks**: Monitor service health
- **CORS configuration**: Restrict cross-origin requests
- **JWT secrets**: Use strong, unique secrets

## Scaling

### Horizontal Scaling
- Deploy multiple Medusa instances
- Use load balancer (Railway handles this)
- Shared Redis for session storage

### Vertical Scaling
- Increase Railway plan resources
- Optimize Docker image size
- Monitor resource usage

## Monitoring

### Health Endpoints
- **Application**: `/health`
- **Railway**: Built-in health monitoring
- **Docker**: Container health checks

### Metrics
- **Railway**: Built-in metrics dashboard
- **Application**: Medusa admin panel
- **Redis**: Redis monitoring tools

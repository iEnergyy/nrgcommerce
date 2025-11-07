# Railway Deployment Guide for Medusa Ecommerce

This guide will help you deploy your Medusa backend to Railway.

## Project Structure

Your project contains:
- `nrgcommerce/` - Medusa backend (Node.js)
- `nrgcommerce-storefront/` - Next.js storefront
- `STRIPE_INSTALLATION_GUIDE.md` - Stripe setup guide

## Deployment Steps

### 1. Railway Configuration

The following files have been created to help Railway understand your project:

- `railway.json` - Railway deployment configuration
- `Procfile` - Process definition for Railway
- `railway.env.example` - Environment variables template

### 2. Environment Variables

You need to set the following environment variables in Railway:

#### Required Variables:
```
DATABASE_URL=postgresql://username:password@host:port/database
STORE_CORS=https://your-storefront-domain.com
ADMIN_CORS=https://your-admin-domain.com
AUTH_CORS=https://your-storefront-domain.com
JWT_SECRET=your-super-secret-jwt-key-here
COOKIE_SECRET=your-super-secret-cookie-key-here
```

#### Stripe Variables (if using Stripe):
```
STRIPE_API_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 3. Database Setup

1. Add a PostgreSQL database service in Railway
2. Copy the connection string to `DATABASE_URL` environment variable
3. Run migrations: Railway will automatically run `medusa build` during deployment

### 4. Deployment Process

1. Connect your GitHub repository to Railway
2. Railway will detect the Node.js application in the `nrgcommerce/` directory
3. The `railway.json` file tells Railway to:
   - Use the `nrgcommerce` directory as the root
   - Run `npm start` as the start command
   - Use `/health` as the health check endpoint

### 5. Post-Deployment

1. Your Medusa backend will be available at: `https://your-app-name.railway.app`
2. Admin panel: `https://your-app-name.railway.app/admin`
3. API: `https://your-app-name.railway.app/store` and `https://your-app-name.railway.app/admin`

### 6. Storefront Deployment

For the storefront (`nrgcommerce-storefront`), you'll need to:

1. Create a separate Railway project for the storefront
2. Update the `STORE_CORS` environment variable to include your storefront URL
3. Deploy the Next.js app separately

### 7. Troubleshooting

If deployment fails:

1. Check the Railway logs for specific error messages
2. Ensure all environment variables are set correctly
3. Verify the database connection string
4. Make sure the `nrgcommerce` directory contains a valid Node.js application

### 8. Health Check

The deployment includes a health check at `/health`. Make sure your Medusa app responds to this endpoint.

## Notes

- Railway will automatically detect this as a Node.js application
- The `Procfile` and `railway.json` ensure Railway knows to deploy the backend from the `nrgcommerce/` directory
- Environment variables should be set in the Railway dashboard under your project settings


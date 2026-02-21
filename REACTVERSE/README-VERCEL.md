# Vercel Serverless Deployment Guide

## Prerequisites

1. MongoDB Atlas account (or MongoDB instance)
2. Google OAuth credentials (for Google login)
3. Vercel account

## Setup Steps

### 1. Environment Variables

Add these environment variables in Vercel Dashboard (Settings → Environment Variables):

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_jwt_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=https://your-app.vercel.app
NODE_ENV=production
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://your-app.vercel.app/auth/google/callback`
4. Copy Client ID and Client Secret to Vercel environment variables

### 3. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

#### Option B: Using GitHub Integration

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Vite
   - Root Directory: `REACTVERSE` (or leave blank if root)
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variables
7. Deploy

### 4. Build Configuration

The project is configured with:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x (or higher)

### 5. API Routes

All API routes are handled by `/api/index.js` which exports an Express app. Vercel automatically converts this to serverless functions.

Available endpoints:
- `/api/*` - All API routes
- `/auth/*` - Authentication routes
- `/health` - Health check
- `/test` - Test endpoint

### 6. MongoDB Connection

The MongoDB connection is optimized for serverless:
- Connection pooling enabled
- Connection caching across function invocations
- Automatic reconnection handling

### 7. Troubleshooting

#### Database Connection Issues
- Check `MONGO_URI` is correct
- Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0` (or Vercel IPs)
- Check MongoDB user has proper permissions

#### CORS Issues
- Update `CLIENT_URL` in environment variables
- Check CORS settings in `api/index.js`

#### Build Failures
- Check Node version (should be 18+)
- Ensure all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### 8. Local Development

For local development with serverless functions:

```bash
# Install Vercel CLI
npm i -g vercel

# Run locally
vercel dev
```

This will start a local server that mimics Vercel's serverless environment.

### 9. Production Checklist

- [ ] All environment variables set in Vercel
- [ ] MongoDB connection string configured
- [ ] Google OAuth redirect URI updated
- [ ] CORS settings updated for production domain
- [ ] Build passes successfully
- [ ] Health check endpoint works (`/health`)
- [ ] API routes tested

## Project Structure

```
REACTVERSE/
├── api/
│   ├── _lib/
│   │   └── mongodb.js      # MongoDB connection utility
│   └── index.js            # Main serverless function
├── backend/
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   └── middleware/         # Middleware functions
├── src/                    # React frontend
├── dist/                   # Build output
├── vercel.json             # Vercel configuration
└── package.json
```

## Support

For issues:
1. Check Vercel deployment logs
2. Check MongoDB connection
3. Verify environment variables
4. Test API endpoints individually

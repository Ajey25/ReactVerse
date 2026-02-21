# Vercel Serverless Deployment Guide

## Quick Start

### 1. Environment Variables Setup

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-app.vercel.app/auth/google/callback
CLIENT_URL=https://your-app.vercel.app
NODE_ENV=production
```

### 2. Deploy to Vercel

#### Using Vercel CLI:
```bash
npm i -g vercel
vercel login
vercel --prod
```

#### Using GitHub:
1. Push code to GitHub
2. Go to vercel.com/dashboard
3. Import repository
4. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables
6. Deploy

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://your-app.vercel.app/auth/google/callback`
4. Copy credentials to Vercel environment variables

### 4. MongoDB Atlas Setup

1. Create MongoDB Atlas cluster
2. Add network access: `0.0.0.0/0` (allow all IPs)
3. Create database user
4. Get connection string
5. Add to Vercel as `MONGO_URI`

## Project Structure

```
REACTVERSE/
├── api/
│   ├── _lib/
│   │   └── mongodb.js      # Serverless-optimized MongoDB connection
│   └── index.js            # Main serverless function
├── backend/
│   ├── controllers/        # Business logic
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   └── middleware/         # Auth middleware
├── src/                    # React frontend
├── dist/                   # Build output
└── vercel.json            # Vercel configuration
```

## Features

✅ Serverless-optimized MongoDB connection with connection pooling
✅ All Express routes converted to serverless functions
✅ CORS configured for production
✅ Health check endpoint (`/health`)
✅ Test endpoint (`/test`)

## Troubleshooting

**Database Connection Issues:**
- Check `MONGO_URI` format
- Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify database user permissions

**Build Failures:**
- Check Node.js version (18+)
- Verify all dependencies in `package.json`
- Check Vercel build logs

**CORS Errors:**
- Update `CLIENT_URL` in environment variables
- Check CORS settings in `api/index.js`

## Local Testing

```bash
# Install Vercel CLI
npm i -g vercel

# Run locally (mimics Vercel environment)
vercel dev
```

## Production Checklist

- [ ] All environment variables set
- [ ] MongoDB connection working
- [ ] Google OAuth configured
- [ ] CORS settings correct
- [ ] Build succeeds
- [ ] Health check works
- [ ] API endpoints tested

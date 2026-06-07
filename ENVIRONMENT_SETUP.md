# QuickChat - Environment Setup Guide

## Overview
This guide explains how to configure QuickChat for both **local development** and **production** environments.

---

## **Local Development Setup**

### Server Configuration

1. **Create `.env.local` file** (already created):
   ```
   PORT=5000
   MONGO_URI=mongodb://[your_connection_string]
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

2. **Start development server**:
   ```bash
   cd server
   npm run dev
   ```
   - Uses `.env.local` configuration
   - Runs with `nodemon` for auto-reload
   - Server listens on `http://localhost:5000`

### Client Configuration

1. **Create `.env.local` file** (already created):
   ```
   VITE_API_URL=http://localhost:5000
   ```

2. **Start development client**:
   ```bash
   cd client
   npm run dev
   ```
   - Runs on `http://localhost:5173`
   - API calls are proxied to `http://localhost:5000`
   - Automatically uses `VITE_API_URL` from `.env.local`

---

## **Production Environment Setup**

### Server Configuration

1. **Update `.env` file** with production values:
   ```
   PORT=5000
   MONGO_URI=mongodb://[production_connection_string]
   JWT_SECRET=[strong_random_secret]
   NODE_ENV=production
   CLIENT_URL=https://quick-chat-client.netlify.app
   ```

2. **Build and deploy**:
   ```bash
   cd server
   npm run build
   NODE_ENV=production npm start
   ```
   - Server serves built client from `../client/dist`
   - Implements SPA fallback routing
   - Uses production MongoDB URI

### Client Configuration

1. **`.env.production` file** (already configured):
   ```
   VITE_API_URL=https://quickchat-6agq.onrender.com
   ```

2. **Build for production**:
   ```bash
   cd client
   npm run build
   ```
   - Creates optimized build in `dist/` folder
   - Automatically uses `VITE_API_URL` from `.env.production`
   - Ready for deployment to Netlify

3. **Deploy to Netlify**:
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables are set in Netlify dashboard

---

## **Environment Variables Reference**

### Server (.env and .env.local)

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `random_strong_string` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `CLIENT_URL` | Allowed client origin for CORS | `http://localhost:5173` or `https://domain.com` |

### Client (.env.local and .env.production)

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` or `https://api.domain.com` |

---

## **How Environment Variables Work**

### In Development Mode
- **Server**: Reads from `.env.local`
  - Command: `npm run dev`
  - Uses nodemon for auto-reload
  - CORS allows `http://localhost:5173`

- **Client**: Reads from `.env.local` and `.vite.config.js` proxies to server
  - Command: `npm run dev`
  - API requests to `/api/*` proxy to `VITE_API_URL`

### In Production Mode
- **Server**: Reads from `.env`
  - Command: `NODE_ENV=production npm start`
  - Uses production MongoDB URI
  - CORS allows `https://quick-chat-client.netlify.app`
  - Serves static client files from `../client/dist`

- **Client**: Reads from `.env.production` during build
  - `npm run build` creates optimized bundle
  - `VITE_API_URL` baked into the build
  - Direct API calls to production backend

---

## **Deployment Instructions**

### Deploying Server
1. Push code to your hosting platform (Render, Heroku, Railway, etc.)
2. Set environment variables in platform dashboard:
   - Copy values from `.env` file
   - Use production MongoDB URI
   - Set `NODE_ENV=production`
3. Platform automatically runs `npm start`

### Deploying Client
1. Update `VITE_API_URL` in `.env.production` with production backend URL
2. Push to GitHub (connected to Netlify)
3. Netlify automatically:
   - Runs `npm run build`
   - Deploys `dist/` folder
4. Or manually deploy: `npm run build` then upload `dist/` folder

---

## **Common Issues & Solutions**

### CORS Error
- **Issue**: API calls fail with CORS error
- **Solution**: Ensure `CLIENT_URL` in server `.env` matches your client URL exactly

### API URL not updating in production
- **Issue**: Client still calls localhost in production
- **Solution**: 
  - Ensure `.env.production` has correct `VITE_API_URL`
  - Rebuild client: `npm run build`
  - Clear browser cache

### Socket.IO connection fails
- **Issue**: Real-time messages not working
- **Solution**: Socket.IO uses same URL as API, ensure CORS origin is correct

### MongoDB connection error
- **Issue**: Server fails to start
- **Solution**: 
  - Verify `MONGO_URI` is correct
  - Check IP whitelist in MongoDB Atlas
  - Ensure database user credentials are correct

---

## **Quick Start Commands**

### Local Development (Terminal 1 - Backend)
```bash
cd server
npm run dev
```

### Local Development (Terminal 2 - Frontend)
```bash
cd client
npm run dev
```

### Production Build & Test Locally
```bash
cd client
npm run build

cd server
NODE_ENV=production npm start
# Server will serve client from dist/
```

---

## **Summary of Changes**

✅ Added `.env.local` for local development  
✅ Added `.env.example` templates  
✅ Updated `server/index.js` to handle production static files  
✅ Updated `socket/socket.js` with environment loading  
✅ Updated `client/vite.config.js` to use `VITE_API_URL`  
✅ Added NODE_ENV detection for conditional logic  
✅ Added environment variable validation  
✅ Added SPA fallback routing for production  
✅ Updated npm scripts with environment support  

---

## **Verify Setup**

### Development Mode
- [ ] Backend running: `http://localhost:5000` (check with `curl http://localhost:5000`)
- [ ] Frontend running: `http://localhost:5173`
- [ ] Socket.IO connecting: Check browser console for socket connection
- [ ] API calls working: Check Network tab in DevTools

### Production Mode
- [ ] Client build: `npm run build` completes without errors
- [ ] Backend serves client: `http://localhost:5000/` shows frontend
- [ ] Production API URL: Set correctly in `.env.production`
- [ ] Environment variables: Set in hosting platform dashboard

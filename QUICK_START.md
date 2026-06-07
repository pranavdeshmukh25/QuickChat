# QuickChat - Quick Start Guide

## 🚀 First Time Setup

### Step 1: Install Dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd client
npm install
```

### Step 2: Environment Files (Already Created!)
- ✅ `server/.env` - Production config
- ✅ `server/.env.local` - Local dev config  
- ✅ `client/.env.local` - Local dev config
- ✅ `client/.env.production` - Production config

**No need to create these - they're ready to use!**

### Step 3: Update Values (If Needed)
Update these in `.env.local` files if using different ports/URLs:
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - Any secret string
- `PORT` - Server port (default: 5000 is fine)

---

## 💻 Running Locally

### Terminal 1 - Start Backend
```bash
cd server
npm run dev
```
✅ Listens on: `http://localhost:5000`  
✅ Uses: `.env.local`  
✅ Serves API at: `/api/*`

### Terminal 2 - Start Frontend
```bash
cd client
npm run dev
```
✅ Listens on: `http://localhost:5173`  
✅ Uses: `.env.local`  
✅ Proxy API to: `http://localhost:5000`

### Open in Browser
```
http://localhost:5173
```

---

## 🎯 How Environment Variables Work

### Development Mode
```
Client (5173) 
    ↓ (proxy /api to)
Server (5000)
    ↓ (CORS allows localhost:5173)
MongoDB
```

**Files used**:
- Server: `.env.local`
- Client: `.env.local`

### Production Mode
```
Client (built in dist/)
    ↓ (served by)
Server (5000)
    ↓ (CORS allows netlify.app)
MongoDB
```

**Files used**:
- Server: `.env`
- Client: `.env.production` (baked into build)

---

## 🌐 Production Deployment

### Backend (Render/Heroku/Railway)
1. Add environment variables to hosting platform:
   ```
   NODE_ENV=production
   MONGO_URI=your_production_uri
   JWT_SECRET=strong_random_string
   CLIENT_URL=https://quick-chat-client.netlify.app
   PORT=5000
   ```

2. Deploy from GitHub
3. Platform runs: `NODE_ENV=production npm start`
4. Backend serves frontend + API

### Frontend (Netlify)
1. Push to GitHub
2. Netlify auto-builds with: `npm run build`
3. Uses `.env.production` with production API URL
4. Deploys to `https://quick-chat-client.netlify.app`

---

## 📋 Environment Variables Cheat Sheet

### Server Variables
| Variable | Dev Value | Prod Value |
|----------|-----------|-----------|
| `PORT` | 5000 | 5000 |
| `NODE_ENV` | development | production |
| `CLIENT_URL` | http://localhost:5173 | https://quick-chat-client.netlify.app |
| `MONGO_URI` | Local or Atlas | Atlas Production |
| `JWT_SECRET` | Any string | Strong random string |

### Client Variables
| Variable | Dev Value | Prod Value |
|----------|-----------|-----------|
| `VITE_API_URL` | http://localhost:5000 | https://quickchat-6agq.onrender.com |

---

## ✅ Checklist Before Deploying

- [ ] MongoDB URI works
- [ ] JWT_SECRET is strong
- [ ] Production API URL set in `CLIENT_URL`
- [ ] Client `.env.production` has correct backend URL
- [ ] Built client: `npm run build`
- [ ] No sensitive data in git (check .gitignore)
- [ ] Backend can serve `../client/dist`
- [ ] CORS origin matches exactly

---

## 🆘 Common Errors & Fixes

### ❌ "Cannot find module 'dotenv'"
```bash
npm install dotenv
```

### ❌ CORS error
Check `CLIENT_URL` in `.env` matches frontend URL exactly (including https://)

### ❌ API 404 in production
Build frontend first: `cd client && npm run build`

### ❌ Socket.IO connection fails
Check WebSocket URL in browser console - should match API URL

### ❌ "Missing required environment variable"
Add missing variable to `.env` or `.env.local`

---

## 📞 Need Help?

1. Check `ENVIRONMENT_SETUP.md` - Comprehensive guide
2. Check `CHANGES_SUMMARY.md` - All changes made
3. Check browser DevTools - Network tab for API calls
4. Check server console - Look for error messages

---

## 🎉 You're All Set!

Your application is now properly configured for both local and production environments. Enjoy coding! 🚀

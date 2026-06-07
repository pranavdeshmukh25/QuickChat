import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './db/dbConnect.js';
import authRoute from './route/authUser.js';
import messageRoute from './route/messageRoute.js';
import userRoute from './route/userRoute.js';
import cookieParser from 'cookie-parser';
import {app, server} from './socket/socket.js';
import path from 'path';
import cors from 'cors';

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env' });
} else {
    dotenv.config({ path: '.env.local' });
}

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'CLIENT_URL'];
requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
});

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/user', userRoute);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    const clientDistPath = path.join(__dirname, '../client/dist');
    app.use(express.static(clientDistPath));
    
    // SPA fallback route
    app.get('*', (req, res) => {
        res.sendFile(path.join(clientDistPath, 'index.html'));
    });
} else {
    // Health check for development
    app.get('/', (req, res) => {
        res.send("Server is working - Development Mode");
    });
}

server.listen(PORT, () => {
    dbConnect();
    console.log(`Server is running on port ${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
});
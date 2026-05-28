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

dotenv.config();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

const __dirname = path.resolve();


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Server is working");
});

app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/user', userRoute);

server.listen(PORT, () => {
    dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
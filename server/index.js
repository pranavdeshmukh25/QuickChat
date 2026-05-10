import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './db/dbConnect.js';
import authRoute from './route/authUser.js';
import messageRoute from './route/messageRoute.js';
import userRoute from './route/userRoute.js';
import cookieParser from 'cookie-parser';
import {app, server} from './socket/socket.js';
import path from 'path';

dotenv.config();

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

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get("", (req,res)=>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

server.listen(PORT, () => {
    dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
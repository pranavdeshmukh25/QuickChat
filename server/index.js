import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './db/dbConnect.js';
import authRoute from './route/authUser.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server is working");
});

app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './db/dbConnect.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
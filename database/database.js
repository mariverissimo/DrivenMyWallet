import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const client = new MongoClient(process.env.DATABASE_URL);
const DB_URI = process.env.MONGODB_URI;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas Connected!'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));



async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

connectDB();

export const db = client.db();

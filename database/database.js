import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();
const client = new MongoClient(process.env.DATABASE_URL);
const DB_URI = process.env.MONGO_URI;

mongoose.connect(DB_URI)
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

import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/config.js';

export const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

// config.js
import { config } from 'dotenv';

// Load environment variables
config();

export const PORT = process.env.PORT || 5000;
export const MongoDBURL = process.env.MongoDBURL || 'your_default_mongodb_url_here';

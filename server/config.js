// config.js
import { config } from 'dotenv';

// config from dotenv will take up PORT and MongoDBURL from .env and put that into process.env here
config();

export const PORT = process.env.PORT || 5000;
export const MongoDBURL = process.env.MongoDBURL || 'your_default_mongodb_url_here';

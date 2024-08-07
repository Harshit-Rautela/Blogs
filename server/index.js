import express from 'express';
import { PORT,MongoDBURL } from './config.js';
import Blogrouter from './routes/Routes.js';
import Userrouter from './routes/auth.js'
import mongoose from 'mongoose';
import { User } from './models/Model.js';
import cors from 'cors'
const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To Blogging');
  });
  
  app.use('/api/blogs',[Userrouter])
  app.use('/api/blogs',[Blogrouter])

mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log('App connected to MongoDB database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
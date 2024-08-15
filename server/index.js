import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

import { MongoDBURL } from "./config.js";
import Blogrouter from "./routes/Routes.js";
import Userrouter from "./routes/auth.js";
import mongoose from "mongoose";
import { User } from "./models/Model.js";
import cors from "cors";
import env from "dotenv/config.js";
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To Blogging");
});

app.use("/auth", [Userrouter]);
app.use("/", [Blogrouter]);

mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("App connected to MongoDB database");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

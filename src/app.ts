import express from 'express';
//import dotenv from 'dotenv';
import cors from 'cors';
//import { routes } from "./routes";

if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then(dotenv => dotenv.config());
}

const app = express();

app.use(cors());
app.use(express.json());
//app.use(routes);

export default app;

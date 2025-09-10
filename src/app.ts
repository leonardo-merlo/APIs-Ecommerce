import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { routes } from "./routes";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['*'] 
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

app.use(express.json());
app.use(routes);

export default app;

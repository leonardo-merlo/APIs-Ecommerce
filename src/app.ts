import express from 'express';
import cors from 'cors';
import { routes } from "./routes"; // Import direto - sem dinâmico

// Carrega dotenv apenas em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then(dotenv => dotenv.config());
}

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Aplica rotas diretamente
app.use(routes);

console.log('✅ Routes aplicadas no app');

export default app;
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

// Tenta importar as rotas normalmente e vê se dá erro
console.log('🔍 Tentando importar routes...');
try {
  import('./routes/index.js').then(module => {
    console.log('✅ Routes module carregado:', !!module.routes);
    if (module.routes) {
      app.use(module.routes);
      console.log('✅ Routes aplicadas no app');
    }
  }).catch(error => {
    console.error('❌ ERRO ao importar routes:', error);
  });
} catch (error) {
  console.error('❌ ERRO no import das routes:', error);
}


export default app;

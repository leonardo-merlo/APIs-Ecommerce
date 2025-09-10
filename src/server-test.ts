import express from 'express';
import cors from 'cors';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Tratamento de erros
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

console.log('🚀 Iniciando servidor MÍNIMO...');
console.log('📍 Porta:', PORT);
console.log('🌍 Ambiente:', process.env.NODE_ENV);

// Rota super simples
app.get('/', (req, res) => {
  console.log('📥 Rota / acessada');
  res.send('Hello World - API funcionando!');
});

app.get('/health', (req, res) => {
  console.log('📥 Health check');
  res.send('OK');
});

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error('❌ Erro capturado:', err);
  res.status(500).send('Erro interno');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor MÍNIMO rodando na porta ${PORT}`);
});
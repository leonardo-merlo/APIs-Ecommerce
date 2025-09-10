import app from './app';

const PORT = parseInt(process.env.PORT || '3000', 10);


// ADICIONE TRATAMENTO DE ERRO GLOBAL
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
});

console.log('🚀 Iniciando servidor...');
console.log('📍 Porta:', PORT);
console.log('🌍 Ambiente:', process.env.NODE_ENV);

app.get('/health', (req, res) => {
  console.log('📥 Health check acessado');
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando',
    timestamp: new Date().toISOString() 
  });
});

app.get('/', (req, res) => {
  console.log('📥 Rota / acessada');
  try {
    res.json({ 
      message: 'API rodando!',
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      port: PORT
    });
  } catch (error) {
    console.error('❌ Erro na rota /:', error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
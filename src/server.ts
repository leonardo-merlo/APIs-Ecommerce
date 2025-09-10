import app from './app';

const PORT = parseInt(process.env.PORT || '3000', 10);

console.log('🚀 Iniciando servidor...');
console.log('📍 Porta:', PORT);
console.log('🌍 Ambiente:', process.env.NODE_ENV);

console.log('🔍 Debug das variáveis:');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'EXISTE' : 'NÃO EXISTE');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('Total de variáveis:', Object.keys(process.env).length);

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
  res.json({ 
    message: 'API rodando!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    port: PORT,
    databaseConfigured: !!process.env.DATABASE_URL
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
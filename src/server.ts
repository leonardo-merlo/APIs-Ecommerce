import app from './app';

const PORT = parseInt(process.env.PORT || '3000', 10);

// Debug completo das variáveis
console.log('🔍 TODAS as variáveis process.env:');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'EXISTE' : 'NÃO EXISTE');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

// Lista todas as variáveis (cuidado, pode vazar dados sensíveis)
console.log('Variáveis disponíveis:', Object.keys(process.env).length);

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
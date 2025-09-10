import app from './app';

const PORT = parseInt(process.env.PORT || '3000', 10);

console.log('🔍 Todas as variáveis de ambiente disponíveis:');
Object.keys(process.env).filter(key => 
  key.includes('DATABASE') || key.includes('DB')
).forEach(key => {
  console.log(`  ${key}: ${process.env[key] ? 'CONFIGURADA' : 'NÃO ENCONTRADA'}`);
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'API rodando!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    databaseConfigured: !!process.env.DATABASE_URL
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
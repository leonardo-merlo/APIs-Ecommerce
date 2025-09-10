import app from './app';

const PORT = parseInt(process.env.PORT || '3000', 10);

console.log('🚀 Iniciando servidor...');
console.log('📍 Porta:', PORT);
console.log('🌍 Ambiente:', process.env.NODE_ENV);
console.log('💾 Database URL configurada:', !!process.env.DATABASE_URL);

app.get('/', (req, res) => {
  res.json({ 
    message: 'API rodando!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
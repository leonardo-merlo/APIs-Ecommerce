import app from './app';

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ 
    message: 'API rodando!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});



import { PrismaClient } from '@prisma/client';

console.log('🔍 DEBUG DATABASE_URL:', process.env.DATABASE_URL ? 'EXISTE' : 'NÃO EXISTE');
console.log('🔍 DATABASE_URL length:', process.env.DATABASE_URL?.length || 0);

let prisma: PrismaClient;

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL não configurada no ambiente');
  console.error('👉 Configure no Railway: Variables → DATABASE_URL');
  
  // Em produção, isso deve ser um erro fatal
  if (process.env.NODE_ENV === 'production') {
    process.exit(1); // Para a aplicação
  }
  
  // Em dev, cria um mock (só para não quebrar)
  prisma = {} as PrismaClient;
} else {
  try {
    prisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });
    console.log('✅ Prisma Client inicializado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao inicializar Prisma:', error);
    throw error; // Propaga o erro
  }
}

export { prisma };
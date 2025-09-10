import { PrismaClient } from '@prisma/client';

console.log('🔍 DEBUG DATABASE_URL:', process.env.DATABASE_URL ? 'EXISTE' : 'NÃO EXISTE');
console.log('🔍 DATABASE_URL length:', process.env.DATABASE_URL?.length || 0);

let prisma: PrismaClient;

try {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL não encontrada');
    throw new Error('DATABASE_URL não configurada');
  }
  
  prisma = new PrismaClient();
  console.log('✅ Prisma Client inicializado com sucesso');
} catch (error) {
  console.error('❌ Erro ao inicializar Prisma:', error);
  prisma = {} as PrismaClient;
}

export { prisma };
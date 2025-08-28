import { z } from 'zod';

export const criarProdutoSchema = z.object({
  nome: z.string().min(3).max(100),
  descricao: z.string().min(10).max(500),
  preco: z.number().positive(),
  estoque: z.number().int().nonnegative(),
});

export type CriarProdutoDTO = z.infer<typeof criarProdutoSchema>;
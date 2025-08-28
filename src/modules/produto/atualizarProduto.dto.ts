import { z } from 'zod';

export const AtualizarProdutoSchema = z.object({
  nome: z.string().min(3).max(100).optional(),
  descricao: z.string().max(255).optional(),
  preco: z.number().positive().optional(),
  estoque: z.number().min(0).optional(),
});

export type AtualizarProdutoDTO = z.infer<typeof AtualizarProdutoSchema>;
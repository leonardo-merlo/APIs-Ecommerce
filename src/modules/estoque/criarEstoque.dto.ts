import { z } from 'zod';

export const criarEstoqueSchema = z.object({
    produtoId: z.string().uuid(),
    quantidade: z.number().int().nonnegative(),
});

export type CriarEstoqueDTO = z.infer<typeof criarEstoqueSchema>;
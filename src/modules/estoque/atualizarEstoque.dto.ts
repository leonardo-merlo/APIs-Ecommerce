import { z } from 'zod';

export const atualizarEstoqueSchema = z.object({
    produtoId: z.string().uuid(),
    quantidade: z.number().int().nonnegative().optional(),
});

export type AtualizarEstoqueDTO = z.infer<typeof atualizarEstoqueSchema>;
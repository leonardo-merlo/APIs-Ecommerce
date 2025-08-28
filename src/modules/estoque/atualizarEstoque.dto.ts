import { z } from 'zod';

export const atualizarEstoqueSchema = z.object({
    quantidade: z.number().int().nonnegative(),
});

export type AtualizarEstoqueDTO = z.infer<typeof atualizarEstoqueSchema>;
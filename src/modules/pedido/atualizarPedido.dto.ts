import { z } from 'zod';

export const atualizarPedidoSchema = z.object({
  quantidade: z.number().min(1),
});

export type AtualizarPedidoDTO = z.infer<typeof atualizarPedidoSchema>;
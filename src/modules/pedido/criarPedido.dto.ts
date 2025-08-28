import { z } from 'zod';

export const criarPedidoSchema = z.object({
  vendaId: z.string().uuid(), 
  produtoId: z.string().uuid(),
  quantidade: z.number().min(1),
});

export type CriarPedidoDTO = z.infer<typeof criarPedidoSchema>;
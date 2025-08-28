import { z } from 'zod';
import { StatusVenda } from "../../generated/prisma";

export const criarVendaSchema = z.object({
  clienteId: z.number().int().positive(),
  produtoId: z.string().uuid(),
  quantidade: z.number().int().positive(),
  status: z.nativeEnum(StatusVenda).optional(),
  
});

export type CriarVendaDTO = z.infer<typeof criarVendaSchema>;
import { z } from 'zod';
import { StatusVenda } from '@prisma/client';

export const criarVendaSchema = z.object({
  clienteId: z.string(),
  status: z.nativeEnum(StatusVenda).optional(),
  
});

export type CriarVendaDTO = z.infer<typeof criarVendaSchema>;
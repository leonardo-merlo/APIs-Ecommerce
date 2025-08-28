import { z } from 'zod';
import { StatusVenda } from "../../generated/prisma";

export const criarVendaSchema = z.object({
  clienteId: z.string(),
  status: z.nativeEnum(StatusVenda).optional(),
  
});

export type CriarVendaDTO = z.infer<typeof criarVendaSchema>;
import { z } from 'zod';
import { StatusVenda } from '@prisma/client';

export const atualizarVendaSchema = z.object({
    status: z.nativeEnum(StatusVenda),
});

export type AtualizarVendaDTO = z.infer<typeof atualizarVendaSchema>;
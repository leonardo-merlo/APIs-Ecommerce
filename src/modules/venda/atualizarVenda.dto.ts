import { z } from 'zod';
import { StatusVenda } from "../../generated/prisma";

export const atualizarVendaSchema = z.object({
    status: z.nativeEnum(StatusVenda),
});

export type AtualizarVendaDTO = z.infer<typeof atualizarVendaSchema>;
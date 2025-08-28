import { z } from 'zod';

export const CriarClienteSchema = z.object({
  nome: z.string().min(3).max(100),
  email: z.string().email(),
  telefone: z.string().min(10).max(15),
});

export type CriarClienteDTO = z.infer<typeof CriarClienteSchema>;
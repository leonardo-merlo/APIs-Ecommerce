import { z } from 'zod';        

export const AtualizarClienteSchema = z.object({  
  nome: z.string().min(3).max(100).optional(),  
  email: z.string().email().optional(),  
  telefone: z.string().min(10).max(15).optional(),  
});

export type AtualizarClienteDTO = z.infer<typeof AtualizarClienteSchema>;
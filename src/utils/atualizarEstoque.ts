import { prisma } from "../prisma";

export async function atualizarEstoque(produtoId: string, quantidade: number) {
  return prisma.estoque.update({
    where: { produtoId }, 
    data: {
      quantidade: {
        increment: quantidade,
      },
    },
  });
}
import { prisma } from "../../prisma";
import { AtualizarEstoqueDTO } from "./atualizarEstoque.dto";

export class EstoqueService {
   async listarEstoques() {
    return prisma.estoque.findMany();
  }

  async obterEstoquePorId(id: string) {
    return prisma.estoque.findUnique({
      where: { id },
    });
  }

  async atualizarEstoque(id: string, data: AtualizarEstoqueDTO) {
    return prisma.estoque.update({
      where: { id },
      data,
    });
  }

}
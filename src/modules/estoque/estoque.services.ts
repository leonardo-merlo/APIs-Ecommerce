import { prisma } from "../../prisma";
import { CriarEstoqueDTO } from "./criarEstoque.dto";
import { AtualizarEstoqueDTO } from "./atualizarEstoque.dto";

export class EstoqueService {
  async criarEstoque(data: CriarEstoqueDTO) {
    return prisma.estoque.create({
      data,
    });
  }

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

  async deletarEstoque(id: string) {
    return prisma.estoque.delete({
      where: { id },
    });
  }
}
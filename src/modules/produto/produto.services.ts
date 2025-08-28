import { prisma } from '../../prisma';
import { CriarProdutoDTO } from './criarProduto.dto'
import { AtualizarProdutoDTO } from './atualizarProduto.dto'

export class ProdutoService {
  async criarProduto(data: CriarProdutoDTO) {
    return prisma.produto.create({
      data,
    });
  }

  async listarProdutos() {
    return prisma.produto.findMany();
  }

  async obterProdutoPorId(id: string) {
    return prisma.produto.findUnique({
      where: { id },
    });
  }

  async atualizarProduto(id: string, data: AtualizarProdutoDTO) {
    return prisma.produto.update({
      where: { id },
      data,
    });
  }

  async deletarProduto(id: string) {
    return prisma.produto.delete({
      where: { id },
    });
  }
}
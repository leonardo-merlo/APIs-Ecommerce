import { prisma } from '../../prisma';
import { CriarProdutoDTO } from './criarProduto.dto'
import { AtualizarProdutoDTO } from './atualizarProduto.dto'

export class ProdutoService {
  async criarProduto(data: CriarProdutoDTO) {
    return prisma.produto.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
        estoque: {
          create: { quantidade: data.estoque } 
        }
      },
      include: { estoque: true }
    });
  }

  async listarProdutos() {
    return prisma.produto.findMany({
      include: { estoque: true }
    });
  }

  async obterProdutoPorId(id: string) {
    return prisma.produto.findUnique({
      where: { id },
      include: { estoque: true } 
    });
  }

  async atualizarProduto(id: string, data: AtualizarProdutoDTO) {
    return prisma.produto.update({
      where: { id },
      data: {
      ...(data.nome !== undefined && { nome: data.nome }),
      ...(data.descricao !== undefined && { descricao: data.descricao }),
      ...(data.preco !== undefined && { preco: data.preco })
    }
    });
  }

  async deletarProduto(id: string) {
    return prisma.produto.delete({
      where: { id },
    });
  }
}
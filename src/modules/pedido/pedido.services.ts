import { prisma } from '../../prisma';
import { CriarPedidoDTO } from './criarPedido.dto';
import { AtualizarPedidoDTO } from './atualizarPedido.dto';

export class PedidoService {
  async criarPedido(data: CriarPedidoDTO) {
    return prisma.pedido.create({
      data: {
        quantidade: data.quantidade,
        produto: { connect: { id: data.produtoId } },
        venda: { connect: { id: data.vendaId } },
      },
      include: {
        produto: true,
        venda: true,
      },
    });
  }

  async listarPedidos() {
    return prisma.pedido.findMany({
      include: {
        produto: true,
        venda: true,
      },
    });
  }

  async obterPedidoPorId(id: string) {
    return prisma.pedido.findUnique({
      where: { id },
      include: {
        produto: true,
        venda: true,
      },
    });
  }

  async atualizarPedido(id: string, data: AtualizarPedidoDTO) {
    return prisma.pedido.update({
      where: { id },
      data,
      include: {
        produto: true,
        venda: true,
      },
    });
  }

  async deletarPedido(id: string) {
    return prisma.pedido.delete({
      where: { id },
      include: {
        produto: true,
        venda: true,
      },
    });
  }
}
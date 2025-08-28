import { prisma } from '../../prisma';
import { CriarPedidoDTO } from './criarPedido.dto';
import { AtualizarPedidoDTO } from './atualizarPedido.dto';
import { atualizarTotalVenda } from '../../utils/atualizarTotalVenda';
import { atualizarEstoque } from '../../utils/atualizarEstoque';

export class PedidoService {
  async criarPedido(data: CriarPedidoDTO) {
  const pedido = await prisma.pedido.create({
    data: {
      quantidade: data.quantidade,
      produto: { connect: { id: data.produtoId } },
      venda: { connect: { id: data.vendaId } },
    },
  });

  await atualizarEstoque(data.produtoId, -data.quantidade);
  await atualizarTotalVenda(data.vendaId);

  return pedido;
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
    const pedidoAntigo = await prisma.pedido.findUnique({
      where: { id },
    });

    if (!pedidoAntigo) {
      throw new Error("Pedido não encontrado");
    }

    const pedido = await prisma.pedido.update({
      where: { id },
      data,
      include: {
        produto: true,
        venda: true,
      },
    });

    const novaQuantidade = data.quantidade ?? pedidoAntigo.quantidade;
    const diferenca = novaQuantidade - pedidoAntigo.quantidade;

    if (diferenca !== 0) {
      await atualizarEstoque(pedidoAntigo.produtoId, -diferenca);
    }

    await atualizarTotalVenda(pedido.vendaId);

    return pedido;
}

  async deletarPedido(id: string) {
    const pedido = await prisma.pedido.delete({
      where: { id },
    });

    await atualizarEstoque(pedido.produtoId, pedido.quantidade);
    await atualizarTotalVenda(pedido.vendaId);

    return pedido;
  }
}
import { prisma } from '../../prisma';
import { CriarVendaDTO } from './criarVenda.dto';
import { AtualizarVendaDTO } from './atualizarVenda.dto';

export class VendaService {
  async criarVenda(data: CriarVendaDTO) {
    return prisma.venda.create({
      data: {
        cliente: { connect: { id: data.clienteId } },
        ...(data.status !== undefined && { status: data.status }),
      },
      include: {
        cliente: true,
        pedidos: { include: { produto: true } },
      },
    });
  }

  async listarVendas() {
    return prisma.venda.findMany({
      include: {
        cliente: true,
        pedidos: { include: { produto: true } },
      },
    });
  }

  async obterVendaPorId(id: string) {
    return prisma.venda.findUnique({
      where: { id },
      include: {
        cliente: true,
        pedidos: { include: { produto: true } },
      },
    });
  }

  async atualizarVenda(id: string, data: AtualizarVendaDTO) {
    return prisma.venda.update({
      where: { id },
      data,
      include: {
        cliente: true,
        pedidos: { include: { produto: true } },
      },
    });
  }

  async deletarVenda(id: string) {
    return prisma.venda.delete({
      where: { id },
      include: {
        cliente: true,
        pedidos: { include: { produto: true } },
      },
    });
  }
}   
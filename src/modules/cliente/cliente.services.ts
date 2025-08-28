import { prisma } from '../../prisma';
import { CriarClienteDTO } from './criarCliente.dto';
import { AtualizarClienteDTO } from './atualizarCliente.dto';

export class ClienteService {
  async criarCliente(data: CriarClienteDTO) {
    return prisma.cliente.create({
      data,
    });
  }

  async listarClientes() {
    return prisma.cliente.findMany();
  }

  async obterClientePorId(id: string) {
    return prisma.cliente.findUnique({
      where: { id },
    });
  }

  async atualizarCliente(id: string, data: AtualizarClienteDTO) {
    return prisma.cliente.update({
      where: { id },
      data,
    });
  }

  async deletarCliente(id: string) {
    return prisma.cliente.delete({
      where: { id },
    });
  }
}
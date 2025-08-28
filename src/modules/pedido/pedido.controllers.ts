import { Request, Response } from 'express';
import { PedidoService } from './pedido.services';
import { CriarPedidoDTO } from './criarPedido.dto';
import { AtualizarPedidoDTO } from './atualizarPedido.dto';

const pedidoService = new PedidoService();

export async function criarPedido(req: Request, res: Response) {
  try {
    const data: CriarPedidoDTO = req.body;
    const novoPedido = await pedidoService.criarPedido(data);
    res.status(201).json(novoPedido);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Erro desconhecido' });
    }
  }
}

export async function listarPedidos(req: Request, res: Response) {
  try {
    const pedidos = await pedidoService.listarPedidos();
    res.status(200).json(pedidos);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Erro desconhecido' });
    }
  }
}

export async function obterPedidoPorId(req: Request, res: Response) {
  try {
    const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID do produto é obrigatório' });
        }
    const pedido = await pedidoService.obterPedidoPorId(id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.status(200).json(pedido);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Erro desconhecido' });
    }
  }
}

export async function atualizarPedido(req: Request, res: Response) {
  try {
    const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID do produto é obrigatório' });
        }
    const data: AtualizarPedidoDTO = req.body;
    const pedidoAtualizado = await pedidoService.atualizarPedido(id, data);
    res.status(200).json(pedidoAtualizado);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Erro desconhecido' });
    }
  }
}

export async function deletarPedido(req: Request, res: Response) {
  try {
    const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID do produto é obrigatório' });
        }
    const pedidoDeletado = await pedidoService.deletarPedido(id);
    res.status(200).json(pedidoDeletado);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Erro desconhecido' });
    }
  }
}


import { Request, Response } from 'express';
import { ClienteService } from './cliente.services';
import { CriarClienteDTO } from './criarCliente.dto';
import { AtualizarClienteDTO } from './atualizarCliente.dto';

const clienteService = new ClienteService();

export async function criarCliente(req: Request, res: Response) {
    try {
        const data: CriarClienteDTO = req.body;
        const novoCliente = await clienteService.criarCliente(data);
        res.status(201).json(novoCliente);
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
    }
}   

    export async function listarClientes(req: Request, res: Response) {
    try {
        const clientes = await clienteService.listarClientes();
        res.status(200).json(clientes);
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
    }
}   

    export async function obterClientePorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID do produto é obrigatório' });
            }
            const cliente = await clienteService.obterClientePorId(id);
            if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
            res.status(200).json(cliente);
        } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Erro desconhecido' });
        }
    }
}   

    export async function atualizarCliente(req: Request, res: Response) {
    try {
        const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID do produto é obrigatório' });
            }
        const data: AtualizarClienteDTO = req.body;
        const clienteAtualizado = await clienteService.atualizarCliente(id, data);
        res.status(200).json(clienteAtualizado);
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
    }
}   

    export async function deletarCliente(req: Request, res: Response) {
    try {
        const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID do produto é obrigatório' });
            }
        await clienteService.deletarCliente(id);
        res.status(204).send();
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
}   

}
import { Request, Response } from 'express';
import { VendaService } from './venda.services';
import { CriarVendaDTO } from './criarVenda.dto';
import { AtualizarVendaDTO } from './atualizarVenda.dto';

export const vendaService = new VendaService();

export async function criarVenda(req: Request, res: Response) {
    try {
        const data: CriarVendaDTO = req.body;
        const novaVenda = await vendaService.criarVenda(data);
        res.status(201).json(novaVenda);
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
    }
}   

    export async function listarVendas(req: Request, res: Response) {
    try {
        const vendas = await vendaService.listarVendas();
        res.status(200).json(vendas);
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
    }
}   

    export async function obterVendaPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID do produto é obrigatório' });
            }
            const venda = await vendaService.obterVendaPorId(id);
            if (!venda) return res.status(404).json({ error: 'Venda não encontrada' });
            res.status(200).json(venda);
        } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Erro desconhecido' });
        }
    }
}   

    export async function atualizarVenda(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID do produto é obrigatório' });
        }
        const data: AtualizarVendaDTO = req.body;
        const vendaAtualizada = await vendaService.atualizarVenda(id, data);
        res.status(200).json(vendaAtualizada);
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
    }
}   

    export async function deletarVenda(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID do produto é obrigatório' });
        }
        const vendaDeletada = await vendaService.deletarVenda(id);
        res.status(200).json(vendaDeletada);
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
    }
}
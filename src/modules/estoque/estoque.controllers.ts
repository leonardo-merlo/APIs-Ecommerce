import { Request, Response } from 'express';
import { EstoqueService } from './estoque.services';
import { CriarEstoqueDTO } from './criarEstoque.dto';
import { AtualizarEstoqueDTO } from './atualizarEstoque.dto';

const estoqueService = new EstoqueService();

export async function criarEstoque(req: Request, res: Response) {
    try {
        const data: CriarEstoqueDTO = req.body;
        const novoEstoque = await estoqueService.criarEstoque(data);
        res.status(201).json(novoEstoque);
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
    }
}

export async function listarEstoques(req: Request, res: Response) {
    try {
        const estoques = await estoqueService.listarEstoques();
        res.status(200).json(estoques);
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
    }
}

export async function obterEstoquePorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID do produto é obrigatório' });
            }
            const estoque = await estoqueService.obterEstoquePorId(id);
            if (!estoque) return res.status(404).json({ error: 'Estoque não encontrado' });
            res.status(200).json(estoque);
        } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Erro desconhecido' });
        }
    }
}

export async function atualizarEstoque(req: Request, res: Response) {
    try {
        const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID do produto é obrigatório' });
            }
        const data: AtualizarEstoqueDTO = req.body;
        const estoqueAtualizado = await estoqueService.atualizarEstoque(id, data);
        res.status(200).json(estoqueAtualizado);
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
    }
}

export async function deletarEstoque(req: Request, res: Response) {
    try {
        const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID do produto é obrigatório' });
            }
        await estoqueService.deletarEstoque(id);
        res.status(204).send();
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
    }
}
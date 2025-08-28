import { Request, Response } from 'express';
import { ProdutoService } from './produto.services';
import { CriarProdutoDTO } from './criarProduto.dto';
import { AtualizarProdutoDTO } from './atualizarProduto.dto';

const produtoService = new ProdutoService();

export async function criarProduto(req: Request, res: Response) {
    try {
        const data: CriarProdutoDTO = req.body;
        const novoProduto = await produtoService.criarProduto(data);
        res.status(201).json(novoProduto);
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
    }
}   

    export async function listarProdutos(req: Request, res: Response) {
    try {
        const produtos = await produtoService.listarProdutos();
        res.status(200).json(produtos);
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
    }
}   

    export async function obterProdutoPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID do produto é obrigatório' });
        }
            const produto = await produtoService.obterProdutoPorId(id);
            if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
            res.status(200).json(produto);
        } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Erro desconhecido' });
        }
    }
}   

    export async function atualizarProduto(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID do produto é obrigatório' });
        }
        const data: AtualizarProdutoDTO = req.body;
        const produtoAtualizado = await produtoService.atualizarProduto(id, data);
        res.status(200).json(produtoAtualizado);
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
    }
}   

export async function deletarProduto(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID do produto é obrigatório' });
        }
        await produtoService.deletarProduto(id);
        res.status(204).send();
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: 'Erro desconhecido' });
    }
    }
}
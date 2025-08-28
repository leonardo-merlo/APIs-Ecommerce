import { Router } from 'express';
import { criarProduto, listarProdutos, obterProdutoPorId, atualizarProduto, deletarProduto } from './produto.controllers';

const produtoRoutes = Router();

produtoRoutes.post('/', criarProduto);
produtoRoutes.get('/', listarProdutos);
produtoRoutes.get('/:id', obterProdutoPorId);
produtoRoutes.put('/:id', atualizarProduto);
produtoRoutes.delete('/:id', deletarProduto);

export { produtoRoutes };
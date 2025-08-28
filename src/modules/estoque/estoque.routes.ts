import { Router } from "express";
import { criarEstoque, listarEstoques, obterEstoquePorId, atualizarEstoque, deletarEstoque } from "./estoque.controllers";

const estoqueRoutes = Router();

estoqueRoutes.post('/', criarEstoque);
estoqueRoutes.get('/', listarEstoques);
estoqueRoutes.get('/:id', obterEstoquePorId);
estoqueRoutes.put('/:id', atualizarEstoque);
estoqueRoutes.delete('/:id', deletarEstoque);

export { estoqueRoutes };
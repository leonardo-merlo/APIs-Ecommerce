import { Router } from "express";
import { listarEstoques, obterEstoquePorId, atualizarEstoque } from "./estoque.controllers";

const estoqueRoutes = Router();

estoqueRoutes.get('/', listarEstoques);
estoqueRoutes.get('/:id', obterEstoquePorId);
estoqueRoutes.put('/:id', atualizarEstoque);

export { estoqueRoutes };
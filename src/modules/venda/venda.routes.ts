import { Router } from "express";
import { criarVenda, listarVendas, obterVendaPorId, atualizarVenda, deletarVenda } from "./venda.controllers";

const vendaRoutes = Router();

vendaRoutes.post('/', criarVenda);
vendaRoutes.get('/', listarVendas);
vendaRoutes.get('/:id', obterVendaPorId);
vendaRoutes.put('/:id', atualizarVenda);
vendaRoutes.delete('/:id', deletarVenda);

export { vendaRoutes };
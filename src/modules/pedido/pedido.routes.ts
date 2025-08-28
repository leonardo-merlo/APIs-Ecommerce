import { Router } from "express";
import { criarPedido, listarPedidos, obterPedidoPorId, atualizarPedido, deletarPedido } from "./pedido.controllers";

const pedidoRoutes = Router();

pedidoRoutes.post('/', criarPedido);
pedidoRoutes.get('/', listarPedidos);
pedidoRoutes.get('/:id', obterPedidoPorId);
pedidoRoutes.put('/:id', atualizarPedido);
pedidoRoutes.delete('/:id', deletarPedido);

export { pedidoRoutes };
import { Router } from "express";
import { criarCliente, listarClientes, obterClientePorId, atualizarCliente, deletarCliente } from "./cliente.controllers";

const clienteRoutes = Router();

clienteRoutes.post('/', criarCliente);
clienteRoutes.get('/', listarClientes);
clienteRoutes.get('/:id', obterClientePorId);
clienteRoutes.put('/:id', atualizarCliente);
clienteRoutes.delete('/:id', deletarCliente);

export { clienteRoutes };
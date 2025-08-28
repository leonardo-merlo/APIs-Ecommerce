import { Router } from "express";
import { clienteRoutes } from "../modules/cliente/cliente.routes";
import { produtoRoutes } from "../modules/produto/produto.routes";
import { estoqueRoutes } from "../modules/estoque/estoque.routes";
import { pedidoRoutes } from "../modules/pedido/pedido.routes";
import { vendaRoutes } from "../modules/venda/venda.routes";

const routes = Router();

routes.use("/clientes", clienteRoutes);
routes.use("/produtos", produtoRoutes);
routes.use("/estoques", estoqueRoutes);
routes.use("/pedidos", pedidoRoutes);
routes.use("/vendas", vendaRoutes);

export { routes };

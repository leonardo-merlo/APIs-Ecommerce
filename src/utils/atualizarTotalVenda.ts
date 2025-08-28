import { prisma } from "../prisma";
export async function atualizarTotalVenda(vendaId: string) {
    const pedidos = await prisma.pedido.findMany({
    where: { vendaId },
    include: { produto: true },
  });

  const total = pedidos.reduce(
    (acc, pedido) => acc + pedido.quantidade * pedido.produto.preco,
    0
  );

  await prisma.venda.update({
    where: { id: vendaId },
    data: { total },
  });

  return total;
}

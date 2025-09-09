import { useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'

type Pedido = {
  id: number
  vendaId?: number
  produtoId?: number
  quantidade?: number
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(false)
  const [vendaId, setVendaId] = useState('')
  const [produtoId, setProdutoId] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editQuantidade, setEditQuantidade] = useState('')
  const [produtos, setProdutos] = useState<{ id: number; nome: string }[]>([])

  async function fetchPedidos() {
    setLoading(true)
    try {
      const { data } = await api.get('/pedidos')
      setPedidos(data)
    } finally {
      setLoading(false)
    }
  }

  async function fetchProdutos() {
    const { data } = await api.get('/produtos')
    setProdutos(data)
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    const vid = Number(vendaId)
    const pid = Number(produtoId)
    const q = Number(quantidade)
    await api.post('/pedidos', { vendaId: vid, produtoId: pid, quantidade: q })
    setVendaId('')
    setProdutoId('')
    setQuantidade('')
    fetchPedidos()
  }

  useEffect(() => {
    fetchProdutos()
    fetchPedidos()
  }, [])

  const produtoIdToNome = useMemo(() => {
    const map = new Map<number, string>()
    for (const p of produtos) map.set(p.id, p.nome)
    return map
  }, [produtos])

  function startEdit(p: Pedido) {
    setEditId(p.id)
    setEditQuantidade(String(p.quantidade ?? ''))
  }

  async function confirmEdit(e: React.FormEvent) {
    e.preventDefault()
    if (editId == null) return
    const q = Number(editQuantidade)
    await api.put(`/pedidos/${editId}`, { quantidade: q })
    setEditId(null)
    fetchPedidos()
  }

  async function deletePedido(id: number) {
    await api.delete(`/pedidos/${id}`)
    fetchPedidos()
  }

  return (
    <div>
      <h2>Pedidos</h2>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <input placeholder="Venda ID" value={vendaId} onChange={(e) => setVendaId(e.target.value)} />
        <input placeholder="Produto ID" value={produtoId} onChange={(e) => setProdutoId(e.target.value)} />
        <input placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
        <button type="submit">Criar</button>
      </form>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <ul>
          {pedidos.map((p) => {
            const nomeProduto = p.produtoId != null ? produtoIdToNome.get(p.produtoId) ?? `Produto ${p.produtoId}` : 'Produto'
            return (
              <li key={p.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <span>Pedido {p.id} - Venda {p.vendaId} - {nomeProduto} - Qtd {p.quantidade}</span>
                <button onClick={() => startEdit(p)}>Editar quantidade</button>
                <button onClick={() => deletePedido(p.id)}>Excluir</button>
              </li>
            )
          })}
        </ul>
      )}

      {editId != null && (
        <form onSubmit={confirmEdit} style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
          <strong>Editar pedido #{editId}</strong>
          <input placeholder="Quantidade" value={editQuantidade} onChange={(e) => setEditQuantidade(e.target.value)} />
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setEditId(null)}>Cancelar</button>
        </form>
      )}
    </div>
  )
}



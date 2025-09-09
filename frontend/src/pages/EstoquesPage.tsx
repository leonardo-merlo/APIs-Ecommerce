import { useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'

type Estoque = {
  id: number
  produtoId?: number
  quantidade?: number
}

type Produto = {
  id: number
  nome: string
}

export default function EstoquesPage() {
  const [itens, setItens] = useState<Estoque[]>([])
  const [loading, setLoading] = useState(false)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [produtoId, setProdutoId] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editQuantidade, setEditQuantidade] = useState('')

  async function fetchEstoques() {
    setLoading(true)
    try {
      const { data } = await api.get('/estoques')
      setItens(data)
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
    const pid = Number(produtoId)
    const q = Number(quantidade)
    await api.post('/estoques', { produtoId: isNaN(pid) ? undefined : pid, quantidade: isNaN(q) ? undefined : q })
    setProdutoId('')
    setQuantidade('')
    fetchEstoques()
  }

  function startEdit(item: Estoque) {
    setEditId(item.id)
    setEditQuantidade(String(item.quantidade ?? ''))
  }

  async function confirmEdit(e: React.FormEvent) {
    e.preventDefault()
    if (editId == null) return
    const q = Number(editQuantidade)
    await api.put(`/estoques/${editId}`, { quantidade: q })
    setEditId(null)
    fetchEstoques()
  }

  useEffect(() => {
    fetchProdutos()
    fetchEstoques()
  }, [])

  const produtoIdToNome = useMemo(() => {
    const map = new Map<number, string>()
    for (const p of produtos) map.set(p.id, p.nome)
    return map
  }, [produtos])

  return (
    <div>
      <h2>Estoques</h2>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input placeholder="Produto ID" value={produtoId} onChange={(e) => setProdutoId(e.target.value)} />
        <input placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
        <button type="submit">Criar</button>
      </form>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <ul>
          {itens.map((i) => {
            const nomeProduto = i.produtoId != null ? produtoIdToNome.get(i.produtoId) ?? `Produto ${i.produtoId}` : 'Produto'
            return (
              <li key={i.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <span>{nomeProduto} - Quantidade {i.quantidade}</span>
                <button onClick={() => startEdit(i)}>Atualizar quantidade</button>
              </li>
            )
          })}
        </ul>
      )}

      {editId != null && (
        <form onSubmit={confirmEdit} style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
          <strong>Atualizar estoque #{editId}</strong>
          <input placeholder="Quantidade" value={editQuantidade} onChange={(e) => setEditQuantidade(e.target.value)} />
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setEditId(null)}>Cancelar</button>
        </form>
      )}
    </div>
  )
}



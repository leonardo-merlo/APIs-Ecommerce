import { useEffect, useState } from 'react'
import { api } from '../lib/api'

type Produto = {
  id: number
  nome: string
  descricao: string
  preco: number
  estoque?: number | { quantidade?: number } | null
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(false)
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [estoque, setEstoque] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editNome, setEditNome] = useState('')
  const [editDescricao, setEditDescricao] = useState('')
  const [editPreco, setEditPreco] = useState('')

  async function fetchProdutos() {
    setLoading(true)
    try {
      const { data } = await api.get('/produtos')
      setProdutos(data)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim() || !descricao.trim() || !preco.trim() || !estoque.trim()) return
    const precoNumber = Number(preco)
    const estoqueNumber = Number(estoque)
    await api.post('/produtos', { nome, descricao, preco: precoNumber, estoque: estoqueNumber })
    setNome('')
    setDescricao('')
    setPreco('')
    setEstoque('')
    fetchProdutos()
  }

  function startEdit(p: Produto) {
    setEditId(p.id)
    setEditNome(p.nome)
    setEditDescricao(p.descricao)
    setEditPreco(String(p.preco))
  }

  async function confirmEdit(e: React.FormEvent) {
    e.preventDefault()
    if (editId == null) return
    const precoNumber = Number(editPreco)
    await api.put(`/produtos/${editId}`, { nome: editNome, descricao: editDescricao, preco: precoNumber })
    setEditId(null)
    fetchProdutos()
  }

  async function deleteProduto(id: number) {
    await api.delete(`/produtos/${id}`)
    fetchProdutos()
  }

  useEffect(() => {
    fetchProdutos()
  }, [])

  return (
    <div>
      <h2>Produtos</h2>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        <input placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
        <input placeholder="Estoque" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
        <button type="submit">Criar</button>
      </form>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <ul>
          {produtos.map((p) => {
            const estoqueQtd = typeof p.estoque === 'object' && p.estoque !== null
              ? (p.estoque as any).quantidade
              : p.estoque
            return (
              <li key={p.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <span>{p.id} - {p.nome} - {p.descricao} - R$ {p.preco} - Estoque: {estoqueQtd}</span>
                <button onClick={() => startEdit(p)}>Editar</button>
                <button onClick={() => deleteProduto(p.id)}>Excluir</button>
              </li>
            )
          })}
        </ul>
      )}

      {editId != null && (
        <form onSubmit={confirmEdit} style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
          <strong>Editar produto #{editId}</strong>
          <input placeholder="Nome" value={editNome} onChange={(e) => setEditNome(e.target.value)} />
          <input placeholder="Descrição" value={editDescricao} onChange={(e) => setEditDescricao(e.target.value)} />
          <input placeholder="Preço" value={editPreco} onChange={(e) => setEditPreco(e.target.value)} />
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setEditId(null)}>Cancelar</button>
        </form>
      )}
    </div>
  )
}



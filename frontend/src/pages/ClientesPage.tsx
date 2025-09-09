import { useEffect, useState } from 'react'
import { api } from '../lib/api'

type Cliente = {
  id: number
  nome: string
  email?: string
  telefone: string
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editNome, setEditNome] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editTelefone, setEditTelefone] = useState('')

  async function fetchClientes() {
    setLoading(true)
    try {
      const { data } = await api.get('/clientes')
      setClientes(data)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim() || !telefone.trim()) return
    await api.post('/clientes', { nome, email, telefone })
    setNome('')
    setEmail('')
    setTelefone('')
    fetchClientes()
  }

  function startEdit(c: Cliente) {
    setEditId(c.id)
    setEditNome(c.nome ?? '')
    setEditEmail(c.email ?? '')
    setEditTelefone(c.telefone ?? '')
  }

  async function confirmEdit(e: React.FormEvent) {
    e.preventDefault()
    if (editId == null) return
    await api.put(`/clientes/${editId}`, { nome: editNome, email: editEmail, telefone: editTelefone })
    setEditId(null)
    fetchClientes()
  }

  async function deleteCliente(id: number) {
    await api.delete(`/clientes/${id}`)
    fetchClientes()
  }

  useEffect(() => {
    fetchClientes()
  }, [])

  return (
    <div>
      <h2>Clientes</h2>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        <button type="submit">Criar</button>
      </form>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <ul>
          {clientes.map((c) => (
            <li key={c.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <span>{c.id} - {c.nome} {c.email ? `(${c.email})` : ''} - {c.telefone}</span>
              <button onClick={() => startEdit(c)}>Editar</button>
              <button onClick={() => deleteCliente(c.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}

      {editId != null && (
        <form onSubmit={confirmEdit} style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
          <strong>Editar cliente #{editId}</strong>
          <input placeholder="Nome" value={editNome} onChange={(e) => setEditNome(e.target.value)} />
          <input placeholder="Email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
          <input placeholder="Telefone" value={editTelefone} onChange={(e) => setEditTelefone(e.target.value)} />
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setEditId(null)}>Cancelar</button>
        </form>
      )}
    </div>
  )
}



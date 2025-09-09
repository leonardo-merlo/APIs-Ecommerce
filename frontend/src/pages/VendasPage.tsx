import { useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'

type Venda = {
  id: number
  clienteId?: number
  status?: 'pendente' | 'pago' | 'cancelado'
}

export default function VendasPage() {
  const [vendas, setVendas] = useState<Venda[]>([])
  const [loading, setLoading] = useState(false)
  const [clienteId, setClienteId] = useState('')
  const [status, setStatus] = useState<'pendente' | 'pago' | 'cancelado'>('pendente')
  const [editId, setEditId] = useState<number | null>(null)
  const [editStatus, setEditStatus] = useState<'pendente' | 'pago' | 'cancelado'>('pendente')
  const [clientes, setClientes] = useState<{ id: number; nome: string }[]>([])

  async function fetchVendas() {
    setLoading(true)
    try {
      const { data } = await api.get('/vendas')
      setVendas(data)
    } finally {
      setLoading(false)
    }
  }

  async function fetchClientes() {
    const { data } = await api.get('/clientes')
    setClientes(data)
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    const cid = Number(clienteId)
    await api.post('/vendas', { clienteId: cid, status })
    setClienteId('')
    setStatus('pendente')
    fetchVendas()
  }

  function startEdit(v: Venda) {
    setEditId(v.id)
    setEditStatus((v.status as any) ?? 'pendente')
  }

  async function confirmEdit(e: React.FormEvent) {
    e.preventDefault()
    if (editId == null) return
    await api.put(`/vendas/${editId}`, { status: editStatus })
    setEditId(null)
    fetchVendas()
  }

  async function deleteVenda(id: number) {
    await api.delete(`/vendas/${id}`)
    fetchVendas()
  }

  useEffect(() => {
    fetchClientes()
    fetchVendas()
  }, [])

  const clienteIdToNome = useMemo(() => {
    const map = new Map<number, string>()
    for (const c of clientes) map.set(c.id, c.nome)
    return map
  }, [clientes])

  return (
    <div>
      <h2>Vendas</h2>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <input placeholder="Cliente ID" value={clienteId} onChange={(e) => setClienteId(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
          <option value="pendente">pendente</option>
          <option value="pago">pago</option>
          <option value="cancelado">cancelado</option>
        </select>
        <button type="submit">Criar</button>
      </form>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <ul>
          {vendas.map((v) => {
            const nomeCliente = v.clienteId != null ? clienteIdToNome.get(v.clienteId) ?? `Cliente ${v.clienteId}` : 'Cliente'
            return (
              <li key={v.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <span>Venda {v.id} - {nomeCliente} - Status {v.status}</span>
                <button onClick={() => startEdit(v)}>Editar status</button>
                <button onClick={() => deleteVenda(v.id)}>Excluir</button>
              </li>
            )
          })}
        </ul>
      )}

      {editId != null && (
        <form onSubmit={confirmEdit} style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
          <strong>Editar venda #{editId}</strong>
          <select value={editStatus} onChange={(e) => setEditStatus(e.target.value as any)}>
            <option value="pendente">pendente</option>
            <option value="pago">pago</option>
            <option value="cancelado">cancelado</option>
          </select>
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setEditId(null)}>Cancelar</button>
        </form>
      )}
    </div>
  )
}



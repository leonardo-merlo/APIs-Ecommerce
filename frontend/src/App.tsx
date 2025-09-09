import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom'
import ClientesPage from './pages/ClientesPage'
import ProdutosPage from './pages/ProdutosPage'
import EstoquesPage from './pages/EstoquesPage'
import PedidosPage from './pages/PedidosPage'
import VendasPage from './pages/VendasPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <div className="app-header-inner">
          <img src="./src/assets/avatar-leo.png" alt="Logo Leonardo" className="logo-box" />
          <nav className="nav">
            <Link to="/clientes">Clientes</Link>
            <Link to="/produtos">Produtos</Link>
            <Link to="/estoques">Estoques</Link>
            <Link to="/vendas">Vendas</Link>
            <Link to="/pedidos">Pedidos</Link>
          </nav>
        </div>
      </header>
      <div className="page">
        <Routes>
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/estoques" element={<EstoquesPage />} />
          <Route path="/pedidos" element={<PedidosPage />} />
          <Route path="/vendas" element={<VendasPage />} />
          <Route path="*" element={<Navigate to="/clientes" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

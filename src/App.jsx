import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SobreNos from './pages/SobreNos';
import Suporte from './pages/Suporte';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Eventos from './pages/Eventos';
import CriarEvento from './pages/CriarEvento';
import DetalhesEvento from './pages/DetalhesEvento';
import EditarEvento from './pages/EditarEvento';
import LoginAdmin from './pages/LoginAdmin';
import GerenciamentoAdmin from './pages/GerenciamentoAdmin';
import TrocarSenhaAdmin from './pages/TrocarSenhaAdmin';
import PerfilAdmin from './pages/PerfilAdmin';
import EsqueceuSenha from './pages/EsqueceuSenha';
import PerfilUsuario from './pages/PerfilUsuario';
import GerenciarUsuarios from './pages/GerenciarUsuarios';
import EditarUsuario from './pages/EditarUsuario';
import ChatSuporte from './pages/ChatSuporte';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<SobreNos />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/eventos/criar" element={
            <ProtectedRoute adminOnly={true}>
              <CriarEvento />
            </ProtectedRoute>
          } />
          <Route path="/eventos/detalhes/:id" element={<DetalhesEvento />} />
          <Route path="/eventos/editar/:id" element={
            <ProtectedRoute adminOnly={true}>
              <EditarEvento />
            </ProtectedRoute>
          } />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}>
              <GerenciamentoAdmin />
            </ProtectedRoute>
          } />
          <Route path="/admin/trocar-senha" element={<TrocarSenhaAdmin />} />
          <Route path="/admin/perfil" element={
            <ProtectedRoute adminOnly={true}>
              <PerfilAdmin />
            </ProtectedRoute>
          } />
          <Route path="/admin/usuarios" element={
            <ProtectedRoute adminOnly={true}>
              <GerenciarUsuarios />
            </ProtectedRoute>
          } />
          <Route path="/admin/usuarios/editar/:id" element={
            <ProtectedRoute adminOnly={true}>
              <EditarUsuario />
            </ProtectedRoute>
          } />
          <Route path="/admin/chat" element={
            <ProtectedRoute adminOnly={true}>
              <ChatSuporte />
            </ProtectedRoute>
          } />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/login" element={<Login />} />
          <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/perfil" element={
            <ProtectedRoute>
              <PerfilUsuario />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
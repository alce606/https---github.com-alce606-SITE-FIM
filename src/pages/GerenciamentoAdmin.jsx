import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminChatManager from '../components/AdminChatManager';

const GerenciamentoAdmin = () => {
  const navigate = useNavigate();

  const handleCriarEvento = () => {
    navigate('/eventos/criar');
  };

  const handleGerenciarEventos = () => {
    navigate('/eventos');
  };

  const handleGerenciarUsuarios = () => {
    alert('👥 Gerenciar Usuários:\n\n• 150 usuários cadastrados\n• 25 ONGs ativas\n• 5 administradores\n\nFuncionalidade em desenvolvimento...');
  };

  const handleRelatorios = () => {
    alert('📊 Relatórios:\n\n• Eventos por mês: 12\n• Taxa de participação: 85%\n• Arrecadação total: R$ 45.000\n• Usuários ativos: 120\n\nRelatórios detalhados em breve...');
  };

  const [showChatManager, setShowChatManager] = useState(false);

  const handleConfiguracoes = () => {
    alert('⚙️ Configurações do Sistema:\n\n• Backup automático: Ativo\n• Notificações: Habilitadas\n• Modo manutenção: Desativo\n• Última atualização: Hoje\n\nPainel de configurações em desenvolvimento...');
  };

  const handleTrocarSenha = () => {
    navigate('/admin/trocar-senha');
  };

  const handleChatSupport = () => {
    setShowChatManager(!showChatManager);
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span style={{ fontSize: '3rem' }}>⚙️</span>
          <h1 style={{ color: '#dc143c', marginTop: '10px' }}>Gerenciamento Geral - Admin</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Painel de controle administrativo</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div 
            className="card" 
            style={{ 
              background: '#fff0f0', 
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onClick={handleCriarEvento}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <h3 style={{ color: '#dc143c', marginBottom: '15px' }}>➕ Criar Evento</h3>
            <p style={{ marginBottom: '15px' }}>Adicionar novos eventos beneficentes ao sistema</p>
            <button style={{
              padding: '10px 20px',
              background: '#dc143c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Novo Evento</button>
          </div>

          <div 
            className="card" 
            style={{ 
              background: '#fff0f0', 
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onClick={handleGerenciarEventos}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <h3 style={{ color: '#dc143c', marginBottom: '15px' }}>📋 Gerenciar Eventos</h3>
            <p style={{ marginBottom: '15px' }}>Editar, excluir e visualizar todos os eventos</p>
            <button style={{
              padding: '10px 20px',
              background: '#dc143c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Ver Eventos</button>
          </div>

          <div 
            className="card" 
            style={{ 
              background: '#fff0f0', 
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onClick={handleGerenciarUsuarios}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <h3 style={{ color: '#dc143c', marginBottom: '15px' }}>👥 Gerenciar Usuários</h3>
            <p style={{ marginBottom: '15px' }}>Administrar usuários, ONGs e permissões</p>
            <button style={{
              padding: '10px 20px',
              background: '#dc143c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Ver Usuários</button>
          </div>

          <div 
            className="card" 
            style={{ 
              background: '#fff0f0', 
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onClick={handleRelatorios}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <h3 style={{ color: '#dc143c', marginBottom: '15px' }}>📊 Relatórios</h3>
            <p style={{ marginBottom: '15px' }}>Estatísticas e relatórios do sistema</p>
            <button style={{
              padding: '10px 20px',
              background: '#dc143c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Ver Relatórios</button>
          </div>

          <div 
            className="card" 
            style={{ 
              background: '#fff0f0', 
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onClick={handleConfiguracoes}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <h3 style={{ color: '#dc143c', marginBottom: '15px' }}>⚙️ Configurações</h3>
            <p style={{ marginBottom: '15px' }}>Configurações gerais do sistema</p>
            <button style={{
              padding: '10px 20px',
              background: '#dc143c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Configurar</button>
          </div>

          <div 
            className="card" 
            style={{ 
              background: '#fff0f0', 
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onClick={handleChatSupport}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <h3 style={{ color: '#dc143c', marginBottom: '15px' }}>💬 Chat Suporte</h3>
            <p style={{ marginBottom: '15px' }}>Gerenciar conversas do chatbot</p>
            <button style={{
              padding: '10px 20px',
              background: '#dc143c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Ver Conversas</button>
          </div>

          <div 
            className="card" 
            style={{ 
              background: '#fff0f0', 
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onClick={handleTrocarSenha}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <h3 style={{ color: '#dc143c', marginBottom: '15px' }}>🔐 Trocar Senha</h3>
            <p style={{ marginBottom: '15px' }}>Alterar senha de administrador</p>
            <button style={{
              padding: '10px 20px',
              background: '#dc143c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Alterar Senha</button>
          </div>

          <div 
            className="card" 
            style={{ 
              background: '#f0fff0', 
              border: '2px solid #28a745'
            }}
          >
            <h3 style={{ color: '#28a745', marginBottom: '15px' }}>📈 Status do Sistema</h3>
            <div style={{ fontSize: '0.9rem' }}>
              <p>🟢 Sistema Online</p>
              <p>📅 Eventos Ativos: 8</p>
              <p>👤 Usuários Online: 23</p>
              <p>💾 Backup: Atualizado</p>
            </div>
          </div>
        </div>
        
        {showChatManager && (
          <div style={{ marginTop: '30px' }}>
            <AdminChatManager />
          </div>
        )}
      </div>
    </div>
  );
};

export default GerenciamentoAdmin;
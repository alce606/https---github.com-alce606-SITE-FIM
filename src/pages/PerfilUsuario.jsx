import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(11) 99999-9999',
    cidade: 'São Paulo',
    organizacao: 'ONG Esperança'
  });

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    setEditMode(false);
    alert('Perfil atualizado com sucesso!');
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    // Dispara evento para atualizar Header
    window.dispatchEvent(new Event('userTypeChanged'));
    alert('Logout realizado com sucesso!');
    navigate('/');
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span style={{ fontSize: '3rem' }}>👤</span>
          <h1 style={{ color: '#dc143c', marginTop: '10px' }}>Meu Perfil</h1>
          <p style={{ color: '#666' }}>Gerencie suas informações pessoais</p>
        </div>

        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="form-group">
            <label>Nome Completo</label>
            <input
              type="text"
              name="nome"
              value={userData.nome}
              onChange={handleChange}
              disabled={!editMode}
              style={{ 
                background: editMode ? 'white' : '#f5f5f5',
                cursor: editMode ? 'text' : 'not-allowed'
              }}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled={!editMode}
              style={{ 
                background: editMode ? 'white' : '#f5f5f5',
                cursor: editMode ? 'text' : 'not-allowed'
              }}
            />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input
              type="tel"
              name="telefone"
              value={userData.telefone}
              onChange={handleChange}
              disabled={!editMode}
              style={{ 
                background: editMode ? 'white' : '#f5f5f5',
                cursor: editMode ? 'text' : 'not-allowed'
              }}
            />
          </div>

          <div className="form-group">
            <label>Cidade</label>
            <input
              type="text"
              name="cidade"
              value={userData.cidade}
              onChange={handleChange}
              disabled={!editMode}
              style={{ 
                background: editMode ? 'white' : '#f5f5f5',
                cursor: editMode ? 'text' : 'not-allowed'
              }}
            />
          </div>

          <div className="form-group">
            <label>Organização</label>
            <input
              type="text"
              name="organizacao"
              value={userData.organizacao}
              onChange={handleChange}
              disabled={!editMode}
              style={{ 
                background: editMode ? 'white' : '#f5f5f5',
                cursor: editMode ? 'text' : 'not-allowed'
              }}
            />
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            justifyContent: 'center',
            marginTop: '30px'
          }}>
            {!editMode ? (
              <button 
                onClick={handleEdit}
                style={{
                  padding: '12px 24px',
                  background: '#dc143c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                ✏️ Editar Perfil
              </button>
            ) : (
              <>
                <button 
                  onClick={handleSave}
                  style={{
                    padding: '12px 24px',
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  ✅ Salvar
                </button>
                <button 
                  onClick={() => setEditMode(false)}
                  style={{
                    padding: '12px 24px',
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  ❌ Cancelar
                </button>
              </>
            )}
          </div>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '40px',
            paddingTop: '20px',
            borderTop: '1px solid #eee'
          }}>
            <h3 style={{ color: '#dc143c', marginBottom: '15px' }}>Estatísticas</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
              gap: '15px',
              marginBottom: '20px'
            }}>
              <div style={{ background: '#fff0f0', padding: '15px', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', color: '#dc143c' }}>5</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Eventos Participados</div>
              </div>
              <div style={{ background: '#fff0f0', padding: '15px', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', color: '#dc143c' }}>12</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Horas Voluntárias</div>
              </div>
              <div style={{ background: '#fff0f0', padding: '15px', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', color: '#dc143c' }}>R$ 250</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Doações</div>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              style={{
                padding: '10px 20px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              🚪 Sair da Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
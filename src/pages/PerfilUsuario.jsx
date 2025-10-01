import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuarioService from '../services/UsuarioService';

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    nome: '',
    email: ''
  });
  const [foto, setFoto] = useState(null);
  const [novaSenha, setNovaSenha] = useState('');
  const [alterarSenha, setAlterarSenha] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const currentUser = UsuarioService.getCurrentUser();
      if (currentUser) {
        const response = await UsuarioService.findById(currentUser.id);
        setUserData({
          nome: response.data.nome || '',
          email: response.data.email || ''
        });
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!userData.nome) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (alterarSenha) {
      if (!novaSenha) {
        newErrors.novaSenha = 'Nova senha é obrigatória';
      } else if (novaSenha.length < 6) {
        newErrors.novaSenha = 'A senha deve ter pelo menos 6 caracteres';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      const currentUser = UsuarioService.getCurrentUser();
      const dataToSend = { ...userData };
      if (foto) {
        dataToSend.foto = foto;
      }
      
      await UsuarioService.alterar(currentUser.id, dataToSend);
      
      if (alterarSenha && novaSenha) {
        await UsuarioService.alterarSenha(currentUser.id, { senha: novaSenha });
      }
      
      setEditMode(false);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil');
    }
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
          {userData.foto ? (
            <img 
              src={userData.foto} 
              alt="Foto do Usuário" 
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #dc143c'
              }}
            />
          ) : (
            <span style={{ fontSize: '3rem' }}>👤</span>
          )}
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
                cursor: editMode ? 'text' : 'not-allowed',
                border: `1px solid ${errors.nome ? '#dc3545' : '#ddd'}`
              }}
            />
            {errors.nome && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                {errors.nome}
              </div>
            )}
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
              readOnly
            />
          </div>

          {editMode && (
            <>
              <div className="form-group">
                <label>Foto (opcional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFoto(e.target.files[0])}
                />
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={alterarSenha}
                    onChange={(e) => setAlterarSenha(e.target.checked)}
                    style={{ marginRight: '8px' }}
                  />
                  Alterar senha
                </label>
              </div>

              {alterarSenha && (
                <div className="form-group">
                  <label>Nova Senha</label>
                  <input
                    type="password"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    placeholder="Digite a nova senha"
                    required={alterarSenha}
                    style={{
                      border: `1px solid ${errors.novaSenha ? '#dc3545' : '#ddd'}`
                    }}
                  />
                  {errors.novaSenha && (
                    <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                      {errors.novaSenha}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

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
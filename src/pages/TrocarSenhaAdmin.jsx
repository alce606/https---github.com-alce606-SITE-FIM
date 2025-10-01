import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuarioService from '../services/UsuarioService';

const TrocarSenhaAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.senhaAtual) {
      newErrors.senhaAtual = 'Senha atual é obrigatória';
    }
    
    if (!formData.novaSenha) {
      newErrors.novaSenha = 'Nova senha é obrigatória';
    } else if (formData.novaSenha.length < 6) {
      newErrors.novaSenha = 'A nova senha deve ter pelo menos 6 caracteres';
    }
    
    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
    } else if (formData.novaSenha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const currentUser = UsuarioService.getCurrentUser();
      await UsuarioService.alterarSenha(currentUser.id, {
        senha: formData.novaSenha
      });
      
      setMessage('Senha alterada com sucesso!');
      setTimeout(() => navigate('/admin'), 2000);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span style={{ fontSize: '3rem' }}>🔐</span>
          <h1 style={{ color: '#dc143c', marginTop: '10px' }}>Trocar Senha</h1>
          <p style={{ color: '#666' }}>Altere sua senha de administrador</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Senha Atual:
            </label>
            <input
              type="password"
              name="senhaAtual"
              value={formData.senhaAtual}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.senhaAtual ? '#dc3545' : '#ddd'}`,
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
            {errors.senhaAtual && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                {errors.senhaAtual}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Nova Senha:
            </label>
            <input
              type="password"
              name="novaSenha"
              value={formData.novaSenha}
              onChange={handleChange}
              required
              minLength="6"
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.novaSenha ? '#dc3545' : '#ddd'}`,
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
            {errors.novaSenha && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                {errors.novaSenha}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Confirmar Nova Senha:
            </label>
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
              minLength="6"
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.confirmarSenha ? '#dc3545' : '#ddd'}`,
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
            {errors.confirmarSenha && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                {errors.confirmarSenha}
              </div>
            )}
          </div>

          {message && (
            <div style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              backgroundColor: message.includes('sucesso') ? '#d4edda' : '#f8d7da',
              color: message.includes('sucesso') ? '#155724' : '#721c24',
              border: `1px solid ${message.includes('sucesso') ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              {message}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: loading ? '#ccc' : '#dc143c',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Alterando...' : 'Alterar Senha'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/admin')}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrocarSenhaAdmin;
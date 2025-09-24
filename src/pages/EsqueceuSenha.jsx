import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';

const EsqueceuSenha = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await authService.forgotPassword(email);
      setMessage('Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '70vh' 
      }}>
        <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <span style={{ fontSize: '3rem' }}>🔑</span>
            <h1 style={{ color: '#dc143c', marginTop: '10px' }}>Esqueceu a Senha?</h1>
            <p style={{ color: '#666', marginTop: '10px' }}>
              Digite seu email para receber instruções de recuperação
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
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

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginBottom: '20px' }}
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Email de Recuperação'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#666' }}>
                Lembrou da senha? <Link to="/login" style={{ color: '#dc143c' }}>Fazer login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EsqueceuSenha;
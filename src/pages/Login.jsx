import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userType', 'user');
    // Dispara evento para atualizar Header
    window.dispatchEvent(new Event('userTypeChanged'));
    alert('Login de usuário realizado com sucesso!');
    navigate('/');
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
            <span style={{ fontSize: '3rem' }}>👤</span>
            <h1 style={{ color: '#dc143c', marginTop: '10px' }}>Login Usuário</h1>
            <p style={{ color: '#666', marginTop: '10px' }}>
              Acesse para visualizar eventos e informações
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                placeholder="Sua senha"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '20px' }}>
              Entrar
            </button>

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                Esqueceu sua senha? <Link to="/esqueceu-senha" style={{ color: '#dc143c' }}>Clique aqui</Link>
              </p>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                Não tem uma conta? <Link to="/cadastro" style={{ color: '#dc143c' }}>Cadastre-se</Link>
              </p>
              <p style={{ color: '#666' }}>
                É administrador? <Link to="/login-admin" style={{ color: '#dc143c' }}>Login Admin</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
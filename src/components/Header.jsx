import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const checkUserType = () => {
      const type = localStorage.getItem('userType');
      setUserType(type);
    };
    
    checkUserType();
    
    // Escuta mudanças no localStorage
    const handleStorageChange = () => {
      checkUserType();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Escuta mudanças customizadas (para mesma aba)
    window.addEventListener('userTypeChanged', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userTypeChanged', handleStorageChange);
    };
  }, []);

  return (
    <header style={{
      background: 'white',
      padding: '15px 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <div className="container">
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#333'
          }}>
            <span className="heart-logo">❤️</span>
            <h1 style={{ color: '#dc143c', fontSize: '1.8rem' }}>Coração Generoso</h1>
          </Link>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link to="/sobre" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
              Sobre Nós
            </Link>
            <Link to="/eventos" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
              Eventos
            </Link>
            <Link to="/suporte" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
              Suporte
            </Link>
            {userType === 'user' ? (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Link to="/perfil" className="btn btn-secondary">
                  👤 Meu Perfil
                </Link>
                <button 
                  onClick={() => {
                    localStorage.removeItem('userType');
                    localStorage.removeItem('userToken');
                    window.dispatchEvent(new Event('userTypeChanged'));
                  }}
                  className="btn btn-primary"
                >
                  Sair
                </button>
              </div>
            ) : userType === 'admin' ? (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Link to="/admin/perfil" className="btn btn-secondary">
                  👨‍💼 Perfil Admin
                </Link>
                <Link to="/admin" className="btn btn-secondary">
                  ⚙️ Gerenciar
                </Link>
                <button 
                  onClick={() => {
                    localStorage.removeItem('userType');
                    localStorage.removeItem('adminToken');
                    window.dispatchEvent(new Event('userTypeChanged'));
                  }}
                  className="btn btn-primary"
                >
                  Sair
                </button>
              </div>
            ) : (
              <>
                <Link to="/login-admin" className="btn btn-secondary" style={{ marginRight: '10px' }}>
                  Admin
                </Link>
                <Link to="/login" className="btn btn-secondary" style={{ marginRight: '10px' }}>
                  Login
                </Link>
                <Link to="/cadastro" className="btn btn-primary">
                  Cadastro
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';

const SobreNos = () => {
  return (
    <div className="container">
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span style={{ fontSize: '3rem' }}>❤️</span>
          <h1 style={{ color: '#dc143c', marginTop: '10px' }}>Sobre o Coração Generoso</h1>
        </div>
        
        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
          <p style={{ marginBottom: '20px' }}>
            O <strong>Coração Generoso</strong> é um site dedicado ao <strong>gerenciamento e divulgação </strong> 
            de eventos beneficentes e projetos sociais. Nossa plataforma está disponível para ONGs 
            e organizações que desejam organizar e promover suas ações solidárias.
          </p>
          
          <h3 style={{ color: '#dc143c', marginBottom: '15px', marginTop: '30px' }}>Nossa Missão</h3>
          <p style={{ marginBottom: '20px' }}>
            Disponibilizar uma plataforma online para o <strong>gerenciamento eficiente</strong> de eventos 
            beneficentes e a <strong>divulgação</strong> de ações sociais, conectando organizações 
            com a comunidade interessada em participar e contribuir.
          </p>
          
          <h3 style={{ color: '#dc143c', marginBottom: '15px', marginTop: '30px' }}>O que Oferecemos</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{ background: '#fff0f0', padding: '20px', borderRadius: '10px' }}>
              <h4 style={{ color: '#dc143c', marginBottom: '10px' }}>📋 Gerenciamento</h4>
              <p>Sistema completo para criar, editar e organizar eventos beneficentes</p>
            </div>
            
            <div style={{ background: '#fff0f0', padding: '20px', borderRadius: '10px' }}>
              <h4 style={{ color: '#dc143c', marginBottom: '10px' }}>📢 Divulgação</h4>
              <p>Plataforma para promover e dar visibilidade aos seus eventos</p>
            </div>
          </div>
          
          <h3 style={{ color: '#dc143c', marginBottom: '15px', marginTop: '30px' }}>Nossa Equipe</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{ background: '#fff0f0', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>👨‍💻</div>
              <h4 style={{ color: '#dc143c', marginBottom: '5px' }}>Arthur Silva</h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Desenvolvedor </p>
            </div>
            
            <div style={{ background: '#fff0f0', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>👩‍💻</div>
              <h4 style={{ color: '#dc143c', marginBottom: '5px' }}>Pedro Oliveira</h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Desenvolvedora </p>
            </div>
            
            <div style={{ background: '#fff0f0', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🎨</div>
              <h4 style={{ color: '#dc143c', marginBottom: '5px' }}>Rafaela Kolle</h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Time-Skrull Designer </p>
            </div>
            
            <div style={{ background: '#fff0f0', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📊</div>
              <h4 style={{ color: '#dc143c', marginBottom: '5px' }}>Nicolly Costa</h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Time-Skrull Designer</p>
            </div>
            
            <div style={{ background: '#fff0f0', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔧</div>
              <h4 style={{ color: '#dc143c', marginBottom: '5px' }}>Isabela Marques </h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Gerente</p>
            </div>
            
            <div style={{ background: '#fff0f0', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🛡️</div>
              <h4 style={{ color: '#dc143c', marginBottom: '5px' }}>Guilherme Félix</h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Product-owner</p>
            </div>
          </div>
          
          <h3 style={{ color: '#dc143c', marginBottom: '15px', marginTop: '30px' }}>Disponibilidade</h3>
          <div style={{ background: '#fff0f0', padding: '25px', borderRadius: '10px', textAlign: 'center' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '15px' }}>🌐</span>
            <h4 style={{ color: '#dc143c', marginBottom: '10px' }}>Site Ativo!!!!!!</h4>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              Nossa plataforma está <strong> destinado </strong> para ONGs e organizações 
              que desejam gerenciar seus eventos e divulgar suas ações beneficentes. 
              
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreNos;
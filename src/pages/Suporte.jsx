import React, { useState, useEffect } from 'react';
import MensagemService from '../services/MensagemService';
import UsuarioService from '../services/UsuarioService';

const Suporte = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });

  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showMySupports, setShowMySupports] = useState(false);
  const [mySupports, setMySupports] = useState([]);
  const [loadingSupports, setLoadingSupports] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    const user = UsuarioService.getCurrentUser();
    setUsuarioLogado(user);
  }, []);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFeedback('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.assunto || !formData.mensagem) {
      setFeedback('Preencha todos os campos.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setFeedback('Email inválido.');
      return;
    }

    setSending(true);
    setFeedback('');

    const mensagem = {
      dataMensagem: new Date().toISOString(),
      nome: formData.nome,
      email: formData.email,
      telefone: '',
      texto: formData.mensagem,
      statusMensagem: 'ativa',
      usuario: { id: usuarioLogado?.id || 1 }
    };

    try {
      await MensagemService.save(mensagem);
      setFeedback('Mensagem enviada com sucesso!');
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
    } catch (error) {
      console.error('Erro ao enviar:', error);
      setFeedback('Erro ao enviar. Tente novamente.');
    } finally {
      setSending(false);
    }
  };

  const handleShowMySupports = async () => {
    if (!usuarioLogado) return;
    
    setLoadingSupports(true);
    try {
      const response = await MensagemService.findAll();
      const userSupports = response.data.filter(msg => msg.usuario?.id === usuarioLogado.id);
      setMySupports(userSupports);
      setShowMySupports(true);
    } catch (error) {
      console.error('Erro ao buscar suportes:', error);
      setFeedback('Erro ao carregar seus suportes.');
    } finally {
      setLoadingSupports(false);
    }
  };

  const handleBackToForm = () => {
    setShowMySupports(false);
    setFeedback('');
  };

  const estiloCampo = {
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    width: '100%',
    marginBottom: '20px'
  };

  const estiloBotao = {
    backgroundColor: '#dc143c',
    color: '#fff',
    padding: '14px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '8px',
    cursor: sending ? 'not-allowed' : 'pointer',
    width: '100%',
    opacity: sending ? 0.7 : 1
  };

  if (showMySupports) {
    return (
      <div style={{ maxWidth: 800, margin: '40px auto', fontFamily: 'Segoe UI, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <button 
            onClick={handleBackToForm}
            style={{
              backgroundColor: '#6c757d',
              color: '#fff',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginRight: '15px'
            }}
          >
            ← Voltar
          </button>
          <h2 style={{ color: '#dc143c', margin: 0 }}>Meus Suportes</h2>
        </div>
        
        {mySupports.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>Você ainda não enviou nenhum suporte.</p>
        ) : (
          <div>
            {mySupports.map((support, index) => (
              <div key={index} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '15px',
                backgroundColor: '#f9f9f9'
              }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#dc143c' }}>Data:</strong> {new Date(support.dataMensagem).toLocaleDateString('pt-BR')}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#dc143c' }}>Status:</strong> 
                  <span style={{
                    marginLeft: '8px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: support.statusMensagem === 'ativa' ? '#28a745' : '#6c757d',
                    color: '#fff',
                    fontSize: '12px'
                  }}>
                    {support.statusMensagem === 'ativa' ? 'Em Análise' : 'Finalizado'}
                  </span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#dc143c' }}>Mensagem:</strong>
                </div>
                <div style={{
                  backgroundColor: '#fff',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #eee'
                }}>
                  {support.texto}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#dc143c', margin: 0 }}>Suporte</h2>
        {usuarioLogado && (
          <button
            onClick={handleShowMySupports}
            disabled={loadingSupports}
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: loadingSupports ? 'not-allowed' : 'pointer',
              opacity: loadingSupports ? 0.7 : 1
            }}
          >
            {loadingSupports ? 'Carregando...' : 'Meus Suportes'}
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          style={estiloCampo}
          disabled={sending}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={estiloCampo}
          disabled={sending}
          required
        />
        <input
          type="text"
          name="assunto"
          placeholder="Assunto"
          value={formData.assunto}
          onChange={handleChange}
          style={estiloCampo}
          disabled={sending}
          required
        />
        <textarea
          name="mensagem"
          placeholder="Mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          rows="5"
          style={{ ...estiloCampo, resize: 'vertical' }}
          disabled={sending}
          required
        />
        <button type="submit" style={estiloBotao} disabled={sending}>
          {sending ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      {feedback && (
        <p style={{
          marginTop: '10px',
          fontWeight: '600',
          color: feedback.includes('sucesso') ? 'green' : 'red',
          textAlign: 'center'
        }}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default Suporte;

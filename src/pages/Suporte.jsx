import React, { useState } from 'react';
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

    const usuarioLogado = UsuarioService.getCurrentUser();
    const mensagem = {
      dataMensagem: new Date().toISOString(),
      nome: formData.nome,
      email: formData.email,
      telefone: '', // opcional
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

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ color: '#dc143c', marginBottom: '20px' }}>Suporte</h2>
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

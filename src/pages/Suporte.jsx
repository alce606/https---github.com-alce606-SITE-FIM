import React, { useState } from 'react';
import ChatBot from '../components/ChatBot';

const Suporte = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });

  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState('');

  const styles = {
    container: {
      maxWidth: 960,
      margin: '40px auto',
      padding: '0 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      background: '#fff',
      padding: 30,
      borderRadius: 12,
      boxShadow: '0 0 12px rgba(0,0,0,0.1)',
    },
    header: {
      textAlign: 'center',
      marginBottom: 40,
    },
    headerEmoji: {
      fontSize: '3rem',
    },
    headerTitle: {
      color: '#dc143c',
      marginTop: 10,
    },
    headerSubtitle: {
      color: '#666',
      marginTop: 10,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 40,
    },
    contactBlock: {
      background: '#fff0f0',
      padding: 15,
      borderRadius: 8,
      marginBottom: 20,
    },
    contactTitle: {
      color: '#dc143c',
      marginBottom: 10,
    },
    sectionTitle: {
      color: '#dc143c',
      marginBottom: 20,
    },
    formGroup: {
      marginBottom: 20,
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: 6,
      fontWeight: 600,
    },
    input: {
      padding: 12,
      border: '2px solid #ddd',
      borderRadius: 8,
      fontSize: 16,
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    inputFocus: {
      borderColor: '#dc143c',
    },
    textarea: {
      padding: 12,
      border: '2px solid #ddd',
      borderRadius: 8,
      fontSize: 16,
      resize: 'vertical',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    button: {
      backgroundColor: '#dc143c',
      color: '#fff',
      padding: 14,
      fontSize: 18,
      border: 'none',
      borderRadius: 8,
      cursor: 'pointer',
      width: '100%',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#b0122b',
    },
    feedbackMessage: {
      marginTop: 10,
      fontWeight: 600,
      color: 'green',
      textAlign: 'center',
    },
    feedbackError: {
      marginTop: 10,
      fontWeight: 600,
      color: 'red',
      textAlign: 'center',
    }
  };

  // Small helper for email validation
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFeedback('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.email.trim() || !formData.assunto.trim() || !formData.mensagem.trim()) {
      setFeedback('Por favor, preencha todos os campos.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setFeedback('Por favor, insira um email válido.');
      return;
    }

    setSending(true);
    setFeedback('');

    // Simula envio de mensagem
    setTimeout(() => {
      setSending(false);
      setFeedback('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
    }, 2000);
  };

  return (
    <>
      <ChatBot />
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>
            <span style={styles.headerEmoji}>🆘</span>
            <h1 style={styles.headerTitle}>Suporte - Coração Generoso</h1>
            <p style={styles.headerSubtitle}>Estamos aqui para ajudar você! Entre em contato conosco.</p>
          </div>

          <div style={styles.grid}>
            <div>
              <h3 style={styles.sectionTitle}>Formas de Contato</h3>

              <div style={styles.contactBlock}>
                <h4 style={styles.contactTitle}>📧 Email</h4>
                <p></p>
              </div>

              <div style={styles.contactBlock}>
                <h4 style={styles.contactTitle}>📱 WhatsApp</h4>
                <p>(11) 986350216</p>
              </div>

              <div style={styles.contactBlock}>
                <h4 style={styles.contactTitle}>🕒 Horário de Atendimento</h4>
                <p>
                  Segunda a Sexta: 8h às 18h<br />
                  Sábado: 8h às 12h
                </p>
              </div>
            </div>

            <div>
              <h3 style={styles.sectionTitle}>Envie sua Mensagem</h3>
              <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                  <label htmlFor="nome" style={styles.label}>Nome Completo</label>
                  <input
                    id="nome"
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    style={styles.input}
                    disabled={sending}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="email" style={styles.label}>Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    disabled={sending}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="assunto" style={styles.label}>Assunto</label>
                  <input
                    id="assunto"
                    type="text"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    style={styles.input}
                    disabled={sending}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="mensagem" style={styles.label}>Mensagem</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    rows="5"
                    style={styles.textarea}
                    disabled={sending}
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    ...styles.button,
                    ...(sending ? { cursor: 'not-allowed', opacity: 0.7 } : {})
                  }}
                  disabled={sending}
                >
                  {sending ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
              </form>
              {feedback && (
                <p style={feedback.includes('sucesso') ? styles.feedbackMessage : { ...styles.feedbackMessage, color: 'red' }}>
                  {feedback}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Suporte;

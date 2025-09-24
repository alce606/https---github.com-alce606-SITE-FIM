import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const EditarEvento = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: 'Almoço Solidário',
    data: '2024-02-15',
    horario: '12:00',
    local: 'Centro Comunitário',
    descricao: 'Almoço beneficente para arrecadar fundos para a comunidade local',
    tipoEvento: 'almoco',
    metaArrecadacao: '5000.00',
    responsavel: 'Maria Silva',
    status: 'Ativo'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Evento atualizado com sucesso!');
    navigate('/eventos');
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      alert('Evento excluído com sucesso!');
      navigate('/eventos');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ marginBottom: '30px' }}>
          <Link to="/eventos" style={{ color: '#dc143c', textDecoration: 'none' }}>
            ← Voltar para Eventos
          </Link>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <span style={{ fontSize: '3rem' }}>✏️</span>
            <h1 style={{ color: '#dc143c', marginTop: '10px' }}>Editar Evento</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div>
              <div className="form-group">
                <label>Nome do Evento</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Tipo de Evento</label>
                <select
                  name="tipoEvento"
                  value={formData.tipoEvento}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                  required
                >
                  <option value="almoco">Almoço Beneficente</option>
                  <option value="jantar">Jantar Solidário</option>
                  <option value="bazar">Bazar</option>
                  <option value="festa">Festa Junina</option>
                  <option value="caminhada">Caminhada</option>
                  <option value="palestra">Palestra</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label>Data</label>
                  <input
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Horário</label>
                  <input
                    type="time"
                    name="horario"
                    value={formData.horario}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Local</label>
                <input
                  type="text"
                  name="local"
                  value={formData.local}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                  required
                >
                  <option value="Planejando">Planejando</option>
                  <option value="Ativo">Ativo</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>
            </div>

            <div>
              <div className="form-group">
                <label>Descrição do Evento</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Meta de Arrecadação (R$)</label>
                <input
                  type="number"
                  name="metaArrecadacao"
                  value={formData.metaArrecadacao}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>Responsável pelo Evento</label>
                <input
                  type="text"
                  name="responsavel"
                  value={formData.responsavel}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
            <button 
              type="button" 
              onClick={handleDelete}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              🗑️ Excluir
            </button>
            <Link to="/eventos" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center' }}>
              Cancelar
            </Link>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              💾 Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarEvento;
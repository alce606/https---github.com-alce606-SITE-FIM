import api from '../config/api';

export const userService = {
  // Buscar todos os usuários
  getAll: async (params = {}) => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  // Buscar usuário por ID
  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Criar novo usuário
  create: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Atualizar usuário
  update: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Deletar usuário
  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Buscar estatísticas de usuários
  getStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },

  // Buscar ONGs
  getOngs: async () => {
    const response = await api.get('/users/ongs');
    return response.data;
  }
};
import api from '../config/api';

export const authService = {
  // Login de administrador
  loginAdmin: async (credentials) => {
    try {
      const response = await api.post('/auth/admin/login', credentials);
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(user));
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login de administrador');
    }
  },

  // Login de usuário comum
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem('userToken', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
  },

  // Verificar se está autenticado como admin
  isAdminAuthenticated: () => {
    return !!localStorage.getItem('adminToken');
  },

  // Verificar se está autenticado como usuário
  isAuthenticated: () => {
    return !!localStorage.getItem('userToken');
  },

  // Obter usuário atual
  getCurrentUser: () => {
    const adminUser = localStorage.getItem('adminUser');
    const user = localStorage.getItem('user');
    
    if (adminUser) return JSON.parse(adminUser);
    if (user) return JSON.parse(user);
    
    return null;
  },

  // Trocar senha do administrador
  changeAdminPassword: async (passwordData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await api.put('/auth/admin/change-password', passwordData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao alterar senha');
    }
  },

  // Esqueceu senha
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao enviar email de recuperação');
    }
  }
};
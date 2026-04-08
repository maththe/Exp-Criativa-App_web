import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', 
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || error.message || 'Erro ao conectar com a API';

    return Promise.reject({
      message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export const carroService = {

  listarCarros: async (pagina, limite) => {
    try {
      const response = await api.get('/carros', {
        params: { page: pagina, limit: limite }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  obterCarro: async (id) => {
    try {
      const response = await api.get(`/carros/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  criarCarro: async (dados) => {
    try {
      const response = await api.post('/carros', dados);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  atualizarCarro: async (id, dados) => {
    try {
      const response = await api.put(`/carros/${id}`, dados);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deletarCarro: async (id) => {
    try {
      const response = await api.delete(`/carros/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
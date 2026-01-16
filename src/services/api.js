import axios from 'axios';

/* Instância base do Axios com a URL da API */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/* Interceptor de requisição para envio automático do token */
api.interceptors.request.use((config) => {
  /* Ignora autenticação em requisições públicas */
  if (config.headers?.skipAuth) {
    return config;
  }

  /* Recuperação do token armazenado localmente */
  const token = localStorage.getItem('token');

  /* Inclusão do token no header Authorization */
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* Interceptor de resposta para tratamento de token inválido ou expirado */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    /* Verifica se a requisição é pública */
    const isPublicRequest = error.config?.headers?.skipAuth;

    /* Tratamento global de erro 401 para rotas protegidas */
    if (error.response?.status === 401 && !isPublicRequest) {
      /* Limpeza dos dados de autenticação */
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      /* Redirecionamento para a tela de login */
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;

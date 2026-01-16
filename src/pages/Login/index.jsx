import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style.css';
import api from '../../services/api';

export default function Login() {
  /* Estados responsáveis pela mensagem de retorno da API */
  const [resposta, setResposta] = useState('');
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [tipoMensagem, setTipoMensagem] = useState('success');

  /* Referências dos campos de login */
  const loginEmail = useRef(null);
  const loginSenha = useRef(null);

  const navigate = useNavigate();

  /* Tratamento do estado e do tempo de exibição da resposta do servidor */
  function mostrarMensagem(msg, tipo = 'success') {
    setResposta(msg);
    setTipoMensagem(tipo);
    setMostrarResposta(true);

    setTimeout(() => {
      setMostrarResposta(false);
      setResposta('');
    }, 4000);
  }

  async function loginUsers() {
    try {
      /* Envio dos dados de login para a API */
      const response = await api.post(
        '/usuarios/login',
        {
          email: loginEmail.current.value,
          senha: loginSenha.current.value,
        },
        {
          headers: {
            skipAuth: true
          }
        }
      );

      /* Desestruturação da resposta retornada pela API */
      const { mensagem, dados } = response.data;

      /* Validação da existência do token retornado */
      if (!dados?.token) {
        throw new Error('Login inválido');
      }

      /* Persistência do token e dados básicos do usuário */
      localStorage.setItem('token', dados.token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: dados.id,
          nome: dados.nome,
          email: dados.email,
        })
      );

      /* Envio da mensagem de sucesso para função de tratamento */
      mostrarMensagem(mensagem);

      /* Redirecionamento após login bem-sucedido */
      setTimeout(() => {
        navigate('/home');
      }, 1000);

    } catch (error) {
      let msg = 'E-mail ou senha inválidos';

      /* Tratamento de mensagem de erro retornada pela API */
      if (error.response?.data?.mensagem) {
        msg = error.response.data.mensagem;
      }

      /* Envio da mensagem de erro para função de tratamento */
      mostrarMensagem(msg, 'error');
    }
  }

  return (
    <div className="container">
      <form
        className="card mt-5 p-4 shadow-sm col-10 col-md-8 col-lg-6 col-4"
        onSubmit={(e) => {
          e.preventDefault();
          loginUsers();
        }}
      >
        <h1>Login</h1>

        <input
          className="form-control mb-2"
          placeholder="E-mail"
          type="email"
          ref={loginEmail}
        />

        <input
          className="form-control mb-3"
          placeholder="Senha"
          type="password"
          ref={loginSenha}
        />

        <button type="submit" className="btn btn-primary w-100">
          Entrar
        </button>

        <p
          style={{ cursor: 'pointer', marginTop: '10px' }}
          onClick={() => navigate('/cadastro')}
        >
          Criar conta
        </p>

        {mostrarResposta && (
          <div
            className={`alert ${
              tipoMensagem === 'error'
                ? 'alert-danger'
                : 'alert-success'
            } mt-3`}
          >
            {resposta}
          </div>
        )}
      </form>
    </div>
  );
}

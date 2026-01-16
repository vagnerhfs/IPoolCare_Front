import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Cadastro() {
  /* Estados responsáveis pela mensagem de retorno da API */
  const [resposta, setResposta] = useState('');
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [tipoMensagem, setTipoMensagem] = useState('success');

  /* Referências dos campos do formulário de cadastro */
  const cadastroNome = useRef(null);
  const cadastroEmail = useRef(null);
  const cadastroSenha = useRef(null);

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

  async function createUsers() {
    try {
      /* Coleta dos dados do formulário e envio para a API */
      const response = await api.post('/usuarios/cadastro', {
        nome: cadastroNome.current.value,
        email: cadastroEmail.current.value,
        senha: cadastroSenha.current.value,
      });

      /* Envio do texto da resposta para função de tratamento */
      mostrarMensagem(response.data);

      /* Redirecionamento após cadastro realizado com sucesso */
      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (error) {
      /* Tratamento da mensagem de erro retornada pela API */
      const msg =
        error.response?.data?.message ||
        error.response?.data ||
        'Erro ao cadastrar usuário';

      /* Envio do texto da resposta para função de tratamento */
      mostrarMensagem(msg, 'error');
    }
  }

  return (
    <div className="container">
      <form
        className="card p-4 shadow-sm col-10 col-md-8 col-lg-6"
        onSubmit={(e) => {
          e.preventDefault();
          createUsers();
        }}
      >
        <h1>Cadastro de usuários</h1>

        <input
          className="form-control mb-2"
          placeholder="Nome"
          type="text"
          ref={cadastroNome}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="E-mail"
          type="email"
          ref={cadastroEmail}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Senha"
          type="password"
          ref={cadastroSenha}
          minLength={6}
          maxLength={12}
          required
        />

        <button type="submit" className="btn btn-primary w-100">
          Cadastrar
        </button>

        <p
          style={{ cursor: 'pointer', marginTop: '10px' }}
          onClick={() => navigate('/')}
        >
          Voltar para login
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

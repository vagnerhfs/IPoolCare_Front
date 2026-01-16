import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Home() {
  /* Estado responsável pela lista de usuários */
  const [users, setUsers] = useState([]);

  /* Estado responsável pelo tratamento de erro na requisição */
  const [erro, setErro] = useState('');

  async function getUsers() {
    try {
      /* Requisição para buscar a lista de usuários cadastrados */
      const response = await api.get('/usuarios');
      setUsers(response.data);
    } catch {
      /* Definição da mensagem de erro em caso de falha */
      setErro('Erro ao carregar usuários');
    }
  }

  /* Execução da busca de usuários ao carregar o componente */
  useEffect(() => {
    getUsers();
  }, []);

  function logout() {
    /* Limpeza dos dados de autenticação armazenados */
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    /* Redirecionamento para a tela de login */
    window.location.href = '/';
  }

  return (
    <div className="container">
      <button
        className="btn btn-outline-light w-20"
        type="button"
        onClick={logout}
      >
        Sair
      </button>

      <h1>Usuários cadastrados</h1>

      {erro && (
        <div className="resposta">
          {erro}
        </div>
      )}

      {/* Exibição da lista de usuários em ordem inversa (mais recentes primeiro) */}
      {users
        .slice()
        .reverse()
        .map(user => (
          <div key={user.id} className="card">
            <div>
              <p>
                Nome: <span>{user.nome}</span>
              </p>
              <p>
                Email: <span>{user.email}</span>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

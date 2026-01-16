import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  /* Recuperação do token de autenticação armazenado */
  const token = localStorage.getItem('token');

  /* Redirecionamento para login caso o usuário não esteja autenticado */
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

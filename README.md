<<<<<<< HEAD
# IPoolCare_Front
=======
# IPoolCare

Frontend desenvolvido em React (Vite) para autenticação, cadastro e listagem de usuários,
consumindo uma API .NET com autenticação via JWT.

O projeto foi estruturado com foco em organização, boas práticas e clareza de código.

----------------------------------------------------------------

OBJETIVO DO PROJETO

Desenvolver um frontend em React para autenticação e cadastro de usuários,
integrando com uma API REST, utilizando JWT para controle de acesso
e proteção de rotas.

----------------------------------------------------------------

TECNOLOGIAS UTILIZADAS

- React (Vite)
- React Router DOM
- Axios
- Bootstrap
- Node.js v24.13.0
- NPM v11.6.2

----------------------------------------------------------------

COMO RODAR O PROJETO

PRÉ-REQUISITOS
- Node.js instalado
- API .NET em execução

PASSOS

No terminal, navegue até a pasta raiz do projeto React e execute:

npm install
npm run dev

A aplicação estará disponível no endereço exibido no terminal.

----------------------------------------------------------------

ROTAS DA APLICAÇÃO

/         -> Login
/cadastro -> Cadastro de usuário
/home     -> Home (rota protegida)

----------------------------------------------------------------

FUNCIONALIDADES

- Login com JWT
- Cadastro de usuário
- Proteção de rotas privadas
- Interceptor Axios para envio automático do token
- Logout com limpeza de sessão

----------------------------------------------------------------

VARIÁVEIS DE AMBIENTE

PASSOS

1) Renomeie o arquivo:
.env.example para .env

2) Informe a URL da API no arquivo .env:

VITE_API_URL=

Observação:
Após qualquer alteração no arquivo .env, reinicie o projeto com:
npm run dev

----------------------------------------------------------------

OBSERVAÇÕES

Projeto desenvolvido para teste técnico.
Código organizado, comentado e estruturado para fácil manutenção e evolução.
>>>>>>> f5b639a (Commit inicial)

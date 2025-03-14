O **Web Project API Full** é uma aplicação web completa que integra uma API para gerenciamento de usuários e cards. A aplicação permite que os usuários se cadastrem, façam login, editem seus perfis e avatares, além de criar, visualizar, curtir e excluir cards. O projeto utiliza autenticação via JWT e conecta-se a um banco de dados MongoDB para persistência dos dados.

A aplicação está implantada e acessível pelo seguinte link:  
[https://web-project-api-full-nine.vercel.app](https://web-project-api-full-nine.vercel.app)

## Funcionalidades

- **Autenticação de Usuários:** Cadastro, login e proteção de rotas com JWT.
- **Gerenciamento de Perfil:** Edição de dados do usuário e avatar.
- **Operações com Cards:** Criação, visualização, curtida e remoção de cards.
- **Integração com API:** Comunicação com o backend para operações CRUD.
- **Deploy em Nuvem:** Frontend implantado no Vercel e backend (possivelmente) em outra plataforma de nuvem.

## Tecnologias Utilizadas

- **Frontend:** React.js
- **Backend:** Node.js (com Express ou outra framework similar)
- **Autenticação:** JWT (JSON Web Token)
- **Banco de Dados:** MongoDB (utilizando o MongoDB Atlas)
- **Gerenciamento de Processos:** PM2 (para manter o backend em execução)
- **Servidor Web:** Nginx (como proxy reverso, se necessário)
- **Deploy:** Vercel para o frontend e serviços como Google Cloud ou Render para o backend


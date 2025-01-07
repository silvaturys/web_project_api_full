EUA Afora - Sprint 17: Autenticação e Autorização Front-End
Este projeto implementa autenticação e autorização no front-end do aplicativo "EUA Afora". O projeto utiliza React para gerenciar a interface do usuário e conecta-se a uma API externa para gerenciar registro, login e validação de token.

🚀 Funcionalidades
Registro de novos usuários.
Autenticação de usuários existentes.
Proteção de rotas para usuários não autorizados.
Validação de token e exibição do email do usuário logado.
Armazenamento de token no localStorage para manter a sessão ativa.
📁 Estrutura de Arquivos
Componentes Principais
Login: Gerencia a autenticação do usuário.
Register: Gerencia o registro de novos usuários.
ProtectedRoute: Garante o acesso às rotas apenas para usuários autorizados.
InfoTooltip: Exibe mensagens de sucesso ou erro em um modal.
Módulos Utilitários
auth.js: Gerencia as chamadas para os endpoints de autenticação e autorização da API.
🌐 API Integrada
Base URL:
https://se-register-api.en.tripleten-services.com/v1

Endpoints
Registro de Usuário

POST /signup
Envia:
json
Copiar código
{
  "email": "email@example.com",
  "password": "senhaSegura123"
}
Retorna:
json
Copiar código
{
  "data": {
    "email": "email@example.com",
    "_id": "userId"
  }
}
Autenticação de Usuário

POST /signin
Envia:
json
Copiar código
{
  "email": "email@example.com",
  "password": "senhaSegura123"
}
Retorna:
json
Copiar código
{
  "token": "jwtTokenGerado"
}
Validação de Token

GET /users/me
Cabeçalho:
css
Copiar código
Authorization: Bearer {jwtTokenGerado}
Retorna:
json
Copiar código
{
  "data": {
    "email": "email@example.com",
    "_id": "userId"
  }
}
🛠 Tecnologias Utilizadas
React
CSS
LocalStorage para armazenamento do token JWT
📋 Checklist de Implementação
 Criar as rotas /signup e /signin para registro e login.
 Implementar redirecionamento automático para /signin caso o usuário não esteja autenticado.
 Proteger a rota / usando ProtectedRoute.
 Criar componentes de formulário (Login, Register) para registro e autenticação.
 Implementar o componente modal InfoTooltip.
 Armazenar o token JWT no localStorage e verificar sua validade ao carregar o aplicativo.
 Integrar com a API fornecida para autenticação e registro.
🖥 Como Rodar o Projeto
Clone o repositório:

bash
Copiar código
git clone https://github.com/seu-usuario/web_project_around_auth.git
cd web_project_around_auth
Instale as dependências:

bash
Copiar código
npm install
Inicie o servidor de desenvolvimento:

bash
Copiar código
npm start
🔒 Segurança
O token JWT é armazenado de forma segura no localStorage.
Todas as requisições protegidas incluem o cabeçalho Authorization com o token.
📑 Notas
Mobile-First: A interface é responsiva, seguindo o design fornecido no Figma.
Conexão Temporária com a API: Este projeto usa o back-end fornecido pelo TripleTen. No próximo sprint, a funcionalidade será migrada para um back-end Express personalizado.
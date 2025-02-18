<div align="center">
  
[English](README.md) | [Português](README.pt-br.md)
  
<pre>
██╗     ██╗██████╗ ██████╗  █████╗ ██████╗ ██╗   ██╗██╗  ██╗██╗   ██╗██████╗ 
██║     ██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝██║  ██║██║   ██║██╔══██╗
██║     ██║██████╔╝██████╔╝███████║██████╔╝ ╚████╔╝ ███████║██║   ██║██████╔╝
██║     ██║██╔══██╗██╔══██╗██╔══██║██╔══██╗  ╚██╔╝  ██╔══██║██║   ██║██╔══██╗
███████╗██║██████╔╝██║  ██║██║  ██║██║  ██║   ██║   ██║  ██║╚██████╔╝██████╔╝
╚══════╝╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ 
---------------------------------------------------------------------------
Um Sistema Moderno de Gerenciamento de Biblioteca Full-Stack
</pre>

[![Licença: MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.1-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)

</div>

O LibraryHub é um sistema completo de gerenciamento de bibliotecas construído com Spring Boot e React, projetado para simplificar o gerenciamento de inventário de livros e os processos de empréstimo.

## Funcionalidades

- 📚 Gerenciamento completo do inventário de livros
- 🔍 Funcionalidade de busca avançada por título, autor e categoria
- 👥 Autenticação e autorização de usuários
- 📊 Insights estatísticos e relatórios
- 📱 Interface de usuário moderna e responsiva
- 🔐 Endpoints de API seguros com autenticação JWT

## Tecnologias Utilizadas

### Backend
- Java 21
- Spring Boot 3.4.1
- Spring Security com JWT
- JPA/Hibernate
- Banco de dados H2 (Desenvolvimento)
- PostgreSQL (Produção)
- Documentação OpenAPI

### Frontend
- React 18.3.1
- TypeScript
- Axios para comunicação com a API
- Bootstrap para estilização
- Zustand para gerenciamento de estado

## Instalação

### Pré-requisitos
- Java 21 ou superior
- Node.js 16 ou superior
- Docker (para implantação em produção)
- Maven

### Variáveis de Ambiente

Backend

APP_PROFILE=dev
JWT_SECRET=sua-chave-secreta
JWT_EXPIRATION=86400000
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

Frontend

Copie o código
VITE_API_URL=http://localhost:8080/api

### Documentação da API
Assim que o backend estiver em execução, acesse a documentação OpenAPI em:
http://localhost:8080/swagger-ui.html

### Configuração de Desenvolvimento

1. Clone o repositório
git clone https://github.com/bernardoadca18/libraryhub.git
cd libraryhub

2. Configuração do Backend
cd backend
mvn clean install
mvn spring-boot:run

3. Configuração do Frontend
cd frontend
npm install
npm run dev

O servidor de desenvolvimento do frontend será iniciado em http://localhost:5173

### Implantação com Docker

1. Construa a imagem Docker do backend
cd backend
docker build -t libraryhub-backend .

2. Construa a imagem Docker do frontend
cd frontend
docker build -t libraryhub-frontend .

3. Execute com Docker Compose
docker-compose up -d


### Diretrizes de Desenvolvimento
Estrutura do Backend
controllers/: Endpoints da API REST
services/: Lógica de negócios
repositories/: Camada de acesso a dados
models/: Definições de entidades
config/: Classes de configuração
security/: Configurações de segurança

Estrutura do Frontend
src/components/: Componentes de UI reutilizáveis
src/pages/: Componentes de página
src/services/: Chamadas de serviço da API
src/hooks/: Hooks personalizados do React
src/utils/: Funções utilitárias


### Testes

Backend
cd backend
mvn test

Frontend
cd frontend
npm test


### Contribuição
Faça um fork do repositório
Crie um branch para sua feature (git checkout -b feature/NovaFeature)
Faça commit das suas alterações (git commit -m 'Adiciona uma NovaFeature')
Envie o branch (git push origin feature/NovaFeature)
Abra um Pull Request


### Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

### Meta
Criado por bernardoadca18 - Perfil no GitHub

Link do Projeto: https://github.com/bernardoadca18/libraryhub


Este README fornece uma visão geral abrangente do projeto, mantendo uma estrutura profissional e organizada. Ele inclui todas as informações necessárias para configuração, desenvolvimento e implantação, destacando as principais funcionalidades e tecnologias utilizadas no projeto.

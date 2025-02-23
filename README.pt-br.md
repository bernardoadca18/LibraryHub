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
Um Sistema Moderno de Gerenciamento de Bibliotecas Full-Stack
</pre>

[![Licença: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.1-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue.svg)](https://www.postgresql.org/)

</div>

LibraryHub é um sistema abrangente de gerenciamento de bibliotecas desenvolvido com Spring Boot e React, projetado para otimizar o gerenciamento de inventário de livros e os processos de empréstimo.

## Recursos

- 📚 Gerenciamento completo do inventário de livros com rastreamento em tempo real
- 🔍 Funcionalidade avançada de pesquisa por título, autor e categoria
- 👥 Autenticação e autorização de usuários com JWT
- 📊 Insights estatísticos e relatórios com dashboards dinâmicos
- 📱 Interface moderna responsiva com TailwindCSS e Bootstrap
- 🔐 Endpoints de API seguros com autenticação JWT
- 📖 Gerenciamento de empréstimo e devolução de livros
- 📈 Rastreamento dos livros mais emprestados
- 👤 Gerenciamento de perfil de usuário
- 🔄 Atualizações de disponibilidade em tempo real

## Tech Stack

### Backend
- Java 21
- Spring Boot 3.4.1
- Spring Security com JWT
- JPA/Hibernate
- PostgreSQL (Desenvolvimento e Produção)
- H2 Database (Testes)
- Documentação OpenAPI
- Implementação de caching para melhor desempenho
- Gerenciamento de transações

### Frontend
- React 18.3.1
- TypeScript
- Axios para comunicação com API com interceptors
- TailwindCSS para estilização e design responsivo
- Bootstrap para componentes adicionais de UI
- Zustand para gerenciamento de estado
- Gerenciamento de token JWT
- Tratamento de erros e validação

## Configuração com Docker

### Serviços
- Banco de Dados PostgreSQL
- pgAdmin para gerenciamento do banco de dados
- Aplicação backend Spring Boot
- Aplicação frontend React
- Serviço de demonstração ORM

### Configuração de Ambiente

Backend:
```properties
SPRING_PROFILES_ACTIVE=prod
DB_URL=jdbc:postgresql://postgres:5432/librarydb
DB_USERNAME=postgres
DB_PASSWORD=sua-senha
JWT_SECRET=sua-chave-secreta
JWT_EXPIRATION=86400000
CORS_ORIGINS=http://localhost:3000
```

Frontend:
```properties
VITE_API_URL=http://localhost:8080/api
```

Banco de Dados:
```properties
POSTGRES_DB=librarydb
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua-senha
```

## Instalação

### Pré-requisitos
- Java 21 ou superior
- Node.js 16 ou superior
- Docker (para deploy em produção)
- Maven

### Configuração de Variáveis de Ambiente

Backend:
```properties
APP_PROFILE=dev
JWT_SECRET=sua-chave-secreta
JWT_EXPIRATION=86400000
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

Frontend:
```properties
VITE_API_URL=http://localhost:8080/api
```

### Documentação da API
Com o backend em execução, acesse a documentação OpenAPI em:
http://localhost:8080/swagger-ui.html

### Configuração para Desenvolvimento

1. Clone o repositório
```bash
git clone https://github.com/bernardoadca18/LibraryHub.git
cd libraryhub
```
2. Configuração do Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

3. Configuração do Frontend
```bash
cd frontend
npm install
npm run dev
```
O servidor de desenvolvimento iniciará em http://localhost:5173

### Deploy com Docker

1. Configure as variáveis de ambiente no docker-compose.yaml

2. Compile e execute com Docker Compose
```bash
cd LibraryHub
docker-compose build
docker-compose up -d
```

Os serviços estarão disponíveis em:
- Frontend: http://localhost:3000
- API Backend: http://localhost:8080
- pgAdmin: http://localhost:5050
- Banco de Dados: localhost:5433

### Serviços da API

Serviço de Livros
- Gerenciamento de inventário de livros
- Pesquisa e filtragem
- Rastreamento de disponibilidade
- Estatísticas de empréstimos
- Gerenciamento de categorias e autores

Serviço de Usuários
- Gerenciamento de usuários
- Autenticação e autorização
- Gerenciamento de perfis
- Controle de acesso baseado em funções

### Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.

### Meta
Criado por bernardoadca18 - Perfil GitHub

Link do Projeto: https://github.com/bernardoadca18/libraryhub

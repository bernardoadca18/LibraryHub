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

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.1-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue.svg)](https://www.postgresql.org/)

</div>

LibraryHub é um sistema abrangente de gerenciamento de biblioteca construído com Spring Boot e React, projetado para otimizar o gerenciamento de inventário de livros e processos de empréstimo.

## Funcionalidades

- 📚 Gerenciamento completo do inventário de livros
- 🔍 Funcionalidade avançada de busca por título, autor e categoria
- 👥 Autenticação e autorização de usuários
- 📊 Relatórios estatísticos e insights
- 📱 Interface moderna e responsiva
- 🔐 Endpoints seguros com autenticação JWT

## Stack Tecnológico

### Backend
- Java 21
- Spring Boot 3.4.1
- Spring Security com JWT
- JPA/Hibernate
- H2 Database (Desenvolvimento)
- PostgreSQL (Produção)
- Documentação OpenAPI

### Frontend
- React 18.3.1
- TypeScript
- Axios para comunicação com API
- TailwindCSS para estilização e design responsivo
- Bootstrap para estilização
- Zustand para gerenciamento de estado

## Instalação

### Pré-requisitos
- Java 21 ou superior
- Node.js 16 ou superior
- Docker (para deploy em produção)
- Maven

### Variáveis de Ambiente

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
Após iniciar o backend, acesse a documentação OpenAPI em:
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
O servidor de desenvolvimento do frontend iniciará em http://localhost:5173

### Implantação com Docker

1. Construa a imagem Docker do backend
```bash
cd backend
docker build -t libraryhub-backend .
```

2. Construa a imagem Docker do frontend
```bash
cd frontend
docker build -t libraryhub-frontend .
```

3. Execute com Docker Compose
```bash
docker-compose up -d
```

### Diretrizes de Desenvolvimento

Estrutura do Backend:
- `controllers/`: Endpoints da API REST
- `services/`: Lógica de negócios
- `repositories/`: Camada de acesso aos dados
- `models/`: Definições de entidade
- `config/`: Classes de configuração
- `security/`: Configurações de segurança

Estrutura do Frontend:
- `src/components/`: Componentes reutilizáveis da UI
- `src/pages/`: Componentes de página
- `src/services/`: Chamadas de serviço da API
- `src/hooks/`: Hooks personalizados do React
- `src/utils/`: Funções utilitárias

### Testes

Backend:
```bash
cd backend
mvn test
```

Frontend:
```bash
cd frontend
npm test
```

### Contribuindo

1. Faça um fork do repositório
2. Crie sua branch de funcionalidade (`git checkout -b feature/MinhaFuncionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adicionar MinhaFuncionalidade'`)
4. Faça push para a branch (`git push origin feature/MinhaFuncionalidade`)
5. Abra um Pull Request

### Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.

### Meta
Criado por bernardoadca18 - Perfil no GitHub

Link do Projeto: https://github.com/bernardoadca18/libraryhub


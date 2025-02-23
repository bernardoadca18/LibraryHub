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
A Modern Full-Stack Library Management System
</pre>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.1-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue.svg)](https://www.postgresql.org/)

</div>

LibraryHub is a comprehensive library management system built with Spring Boot and React, designed to streamline book inventory management and borrowing processes.

## Features

- 📚 Complete book inventory management with real-time tracking
- 🔍 Advanced search functionality by title, author, and category
- 👥 User authentication and authorization with JWT
- 📊 Statistical insights and reporting with dynamic dashboards
- 📱 Responsive modern UI with TailwindCSS and Bootstrap
- 🔐 Secure API endpoints with JWT authentication
- 📖 Book borrowing and return management
- 📈 Most borrowed books tracking
- 👤 User profile management
- 🔄 Real-time availability updates

## Technology Stack

### Backend
- Java 21
- Spring Boot 3.4.1
- Spring Security with JWT
- JPA/Hibernate
- PostgreSQL (Both Development and Production)
- H2 Database (Test)
- OpenAPI Documentation
- Caching implementation for improved performance
- Transaction management

### Frontend
- React 18.3.1
- TypeScript
- Axios for API communication with interceptors
- TailwindCSS for styling and responsive design
- Bootstrap for additional UI components
- Zustand for state management
- JWT token management
- Error handling and validation

## Docker Configuration

### Services
- PostgreSQL Database
- pgAdmin for database management
- Backend Spring Boot application
- Frontend React application
- ORM demo service

### Environment Configuration

Backend:
```properties
SPRING_PROFILES_ACTIVE=prod
DB_URL=jdbc:postgresql://postgres:5432/librarydb
DB_USERNAME=postgres
DB_PASSWORD=your-password
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000
CORS_ORIGINS=http://localhost:3000
```

Frontend:
```properties
VITE_API_URL=http://localhost:8080/api
```

Database:
```properties
POSTGRES_DB=librarydb
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
```

## Installation

### Prerequisites
- Java 21 or higher
- Node.js 16 or higher
- Docker (for production deployment)
- Maven

### Environment Variables

Backend:
```properties
APP_PROFILE=dev
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

Frontend:
```properties
VITE_API_URL=http://localhost:8080/api
```

### API Documentation
Once the backend is running, access the OpenAPI documentation at:
http://localhost:8080/swagger-ui.html

### Development Setup

1. Clone the repository
```bash
git clone https://github.com/bernardoadca18/LibraryHub.git
cd libraryhub
```
2. Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend development server will start at http://localhost:5173

### Docker Deployment

1. Configure environment variables in docker-compose.yaml
```bash

```

2. Build and run with Docker Compose
```bash
cd LibraryHub
docker-compose build
docker-compose up -d
```

Services will be available at:
-Frontend: http://localhost:3000
-Backend API: http://localhost:8080
-pgAdmin: http://localhost:5050
-Database: localhost:5433

### API Services

Book Service
-Book inventory management
-Search and filtering
-Availability tracking
-Borrowing statistics
-Category and author management

User Service
-User management
-Authentication and authorization
-Profile management
-Role-based access control


### Development Guidelines

Backend Structure:
- `controllers/`: REST API endpoints
- `services/`: Business logic
- `repositories/`: Data access layer
- `models/`: Entity definitions
- `config/`: Configuration classes
- `security/`: Security configurations

Frontend Structure:
- `src/components/`: Reusable UI components
- `src/pages/`: Page components
- `src/services/`: API service calls with authentication
- `src/hooks/`: Custom React hooks
- `src/utils/`: Utility functions
- `src/auth/`: Authentication and token management

### Testing

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

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Meta
Created by bernardoadca18 - GitHub Profile

Project Link: https://github.com/bernardoadca18/libraryhub


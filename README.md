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

</div>

LibraryHub is a comprehensive library management system built with Spring Boot and React, designed to streamline book inventory management and borrowing processes.

## Features

- 📚 Complete book inventory management
- 🔍 Advanced search functionality by title, author, and category
- 👥 User authentication and authorization
- 📊 Statistical insights and reporting
- 📱 Responsive modern UI
- 🔐 Secure API endpoints with JWT authentication

## Technology Stack

### Backend
- Java 21
- Spring Boot 3.4.1
- Spring Security with JWT
- JPA/Hibernate
- H2 Database (Development)
- PostgreSQL (Production)
- OpenAPI Documentation

### Frontend
- React 18.3.1
- TypeScript
- Axios for API communication
- Bootstrap for styling
- Zustand for state management

## Installation

### Prerequisites
- Java 21 or higher
- Node.js 16 or higher
- Docker (for production deployment)
- Maven

### Environment Variables

Backend

APP_PROFILE=dev
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

Frontend

Copy code
VITE_API_URL=http://localhost:8080/api

### API Documentation
Once the backend is running, access the OpenAPI documentation at:
http://localhost:8080/swagger-ui.html

### Development Setup

1. Clone the repository
git clone https://github.com/bernardoadca18/libraryhub.git
cd libraryhub

2. Backend Setup
cd backend
mvn clean install
mvn spring-boot:run

3. Frontend Setup
cd frontend
npm install
npm run dev

The frontend development server will start at http://localhost:5173

### Docker Deployment

1. Build the backend Docker image
cd backend
docker build -t libraryhub-backend .

2. Build the frontend Docker image
cd frontend
docker build -t libraryhub-frontend .

3. Run with Docker Compose
docker-compose up -d


### Development Guidelines
Backend Structure
controllers/: REST API endpoints
services/: Business logic
repositories/: Data access layer
models/: Entity definitions
config/: Configuration classes
security/: Security configurations

Frontend Structure
src/components/: Reusable UI components
src/pages/: Page components
src/services/: API service calls
src/hooks/: Custom React hooks
src/utils/: Utility functions


### Testing

Backend
cd backend
mvn test

Frontend
cd frontend
npm test


### Contributing
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request


### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Meta
Created by bernardoadca18 - GitHub Profile

Project Link: https://github.com/bernardoadca18/libraryhub

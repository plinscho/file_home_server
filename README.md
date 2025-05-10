# File Home Server Documentation

## Project Overview
File Home Server is a self-hosted file storage and management solution built with modern web technologies. It enables users to securely store, manage, and access their files from anywhere. The application includes features such as user authentication, file uploads/downloads, and a clean, responsive interface.

## Architecture
The project adopts a modern client-server architecture:

- **Frontend**: React.js application built with Vite
- **Backend**: FastAPI Python application
- **Database**: PostgreSQL for data persistence
- **Containerization**: Docker and Docker Compose for deployment

## Key Features
- User authentication (registration and login)
- File upload and download capabilities
- File listing and management
- Secure password storage with bcrypt hashing
- Containerized setup for easy deployment

## Technical Stack

### Backend
- **FastAPI**: Modern, high-performance web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **Uvicorn**: ASGI server for FastAPI
- **Passlib**: Password hashing library
- **Python-dotenv**: Environment variable management

### Frontend
- **React**: JavaScript library for building user interfaces
- **React Router**: Navigation for React applications
- **Vite**: Next-generation frontend tooling

### Database
- **PostgreSQL**: Advanced open-source relational database

### Testing
- **pytest**: Python testing framework
- **TestClient**: FastAPI's testing utility

### Deployment
- **Docker**: Container platform
- **Docker Compose**: Multi-container Docker applications

## Project Structure

```
.
├── app/                   # Backend FastAPI application
│   ├── routes/            # API route definitions
│   │   ├── files.py       # File management endpoints
│   │   └── users.py       # User authentication endpoints
│   ├── database.py        # Database connection and setup
│   ├── main.py            # Application entry point
│   └── models.py          # SQLAlchemy data models
│
├── frontend/              # React frontend application
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   │   ├── App.jsx    # Main application component
│   │   │   ├── AuthProvider/ # Authentication context
│   │   │   ├── HomePage/  # Dashboard component
│   │   │   └── LoginRegister/ # Authentication UI
│   │   └── main.jsx       # Frontend entry point
│   └── vite.config.js     # Vite configuration
│
├── storage/               # File storage directory
├── tests/                 # Backend tests
├── docker-compose.yml     # Multi-container setup
├── Dockerfile             # Backend container configuration
└── requirements.txt       # Python dependencies
```

## API Endpoints

### User Authentication
- **POST /users/register**: Register a new user
- **POST /users/login**: Authenticate and log in a user

### File Management
- **GET /files/list/**: List all files in the system
- **POST /files/upload/**: Upload a new file
- **GET /files/download/{file_id}**: Download a specific file
- **GET /files/sync**: Synchronize storage directory with database

## Setup and Installation

### Prerequisites
- Docker and Docker Compose

### Steps to Run
1. Clone the repository.
2. Navigate to the project directory.
3. Run `docker-compose up` to start the application.
4. Access the application via the provided URL.

### Future Enhancements
- File sharing capabilities
- User roles and permissions
- File preview functionality
- Search and filtering options
- Enhanced file metadata support
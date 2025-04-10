# DOCUMENTATION 

Collecting workspace informationCertainly! Based on your workspace structure and the technologies used in your project, here are some references and tutorials to help you understand how the project behaves and how the technologies work together:

---

### **1. FastAPI**
FastAPI is the core framework used to build the API in your project. It is a modern, fast (high-performance) web framework for building APIs with Python.

- **Official Documentation**: [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/)
- **Tutorials**:
  - [FastAPI Crash Course by FreeCodeCamp](https://www.youtube.com/watch?v=0sOvCWFmrtA)
  - [FastAPI Beginner's Guide](https://testdriven.io/blog/fastapi-intro/)
- **Key Concepts in Your Project**:
  - **Routing**: Defined in users.py and files.py.
  - **Dependency Injection**: Used in database.py with `Depends`.
  - **Pydantic Models**: Used for request validation in users.py.

---

### **2. SQLAlchemy**
SQLAlchemy is used as the ORM (Object Relational Mapper) to interact with the PostgreSQL database.

- **Official Documentation**: [https://docs.sqlalchemy.org/](https://docs.sqlalchemy.org/)
- **Tutorials**:
  - [SQLAlchemy ORM Tutorial for Beginners](https://auth0.com/blog/sqlalchemy-orm-tutorial-for-python-developers/)
  - [RealPython SQLAlchemy Guide](https://realpython.com/python-sqlalchemy/)
- **Key Concepts in Your Project**:
  - **Models**: Defined in models.py using `Base`.
  - **Session Management**: Handled in database.py with `SessionLocal`.
  - **Database Initialization**: Handled in init.sql.

---

### **3. PostgreSQL**
PostgreSQL is the database used in your project, managed via Docker.

- **Official Documentation**: [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)
- **Tutorials**:
  - [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
  - [DigitalOcean PostgreSQL Guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04)
- **Key Concepts in Your Project**:
  - **Database Schema**: Defined in init.sql.
  - **Connection**: Managed via `DATABASE_URL` in .env.

---

### **4. Docker and Docker Compose**
Docker is used to containerize your application, and Docker Compose is used to manage multi-container setups.

- **Official Docker Documentation**: [https://docs.docker.com/](https://docs.docker.com/)
- **Docker Compose Documentation**: [https://docs.docker.com/compose/](https://docs.docker.com/compose/)
- **Tutorials**:
  - [Docker for Beginners](https://docker-curriculum.com/)
  - [Docker Compose Tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)
- **Key Concepts in Your Project**:
  - **Services**: Defined in docker-compose.yml for db and `api`.
  - **Dockerfile**: Used to build the `api` service.

---

### **5. Testing with Pytest**
Pytest is used for testing your application, as seen in test_user.py.

- **Official Documentation**: [https://docs.pytest.org/](https://docs.pytest.org/)
- **Tutorials**:
  - [Pytest Tutorial for Beginners](https://realpython.com/pytest-python-testing/)
  - [Testing FastAPI Applications](https://fastapi.tiangolo.com/tutorial/testing/)
- **Key Concepts in Your Project**:
  - **Fixtures**: Used for setting up the database and client in test_user.py.
  - **TestClient**: Used to test FastAPI endpoints.

---

### **6. Uvicorn**
Uvicorn is the ASGI server used to run your FastAPI application.

- **Official Documentation**: [https://www.uvicorn.org/](https://www.uvicorn.org/)
- **Tutorials**:
  - [Deploying FastAPI with Uvicorn](https://fastapi.tiangolo.com/deployment/)
- **Key Concepts in Your Project**:
  - **Command**: `uvicorn app.main:app --host 0.0.0.0 --reload` in docker-compose.yml.

---

### **7. Environment Variables with Python Dotenv**
The .env file is used to manage environment variables like `DATABASE_URL` and `SECRET_KEY`.

- **Official Documentation**: [https://pypi.org/project/python-dotenv/](https://pypi.org/project/python-dotenv/)
- **Tutorials**:
  - [Managing Environment Variables in Python](https://realpython.com/python-dotenv/)

---

### **8. Password Hashing with Passlib**
Passlib is used for securely hashing passwords in your project.

- **Official Documentation**: [https://passlib.readthedocs.io/](https://passlib.readthedocs.io/)
- **Tutorials**:
  - [Password Hashing with Passlib](https://www.geeksforgeeks.org/password-hashing-in-python-with-passlib/)

---

### **9. File Uploads and Storage**
Your project handles file uploads and stores them in the storage directory.

- **FastAPI File Upload Documentation**: [https://fastapi.tiangolo.com/tutorial/request-files/](https://fastapi.tiangolo.com/tutorial/request-files/)
- **Pathlib Documentation**: [https://docs.python.org/3/library/pathlib.html](https://docs.python.org/3/library/pathlib.html)

---

### **10. Makefile**
The Makefile provides shortcuts for managing your project.

- **Makefile Tutorial**: [https://opensource.com/article/18/8/what-how-makefile](https://opensource.com/article/18/8/what-how-makefile)
- **Key Commands in Your Project**:
  - `make all`: Build and start the Docker containers.
  - `make clean`: Stop and remove all containers, images, volumes, and networks.

---

### 
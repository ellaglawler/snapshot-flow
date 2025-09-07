# Background Check System

A comprehensive background check system built with modern technologies for candidate verification and screening.

## 🏗️ Architecture

This project follows a microservices architecture with the following components:

```
├── frontend/          # React + Vite frontend application
├── api/              # FastAPI backend service
├── worker/           # Celery background worker service
├── docker-compose.yml # Container orchestration
└── .github/          # CI/CD workflows
```

### Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL, Redis
- **Worker**: Celery, Redis
- **Infrastructure**: Docker, Docker Compose
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd snapshot-flow
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Local Development

1. **Start infrastructure services**
   ```bash
   docker-compose up -d postgres redis
   ```

2. **Setup and run the API**
   ```bash
   cd api
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp env.example .env
   # Edit .env with your configuration
   uvicorn main:app --reload
   ```

3. **Setup and run the worker**
   ```bash
   cd worker
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp env.example .env
   # Edit .env with your configuration
   celery -A celery_app worker --loglevel=info
   ```

4. **Setup and run the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📁 Project Structure

### Frontend (`/frontend`)
- React application with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- shadcn/ui components
- React Router for navigation

### API (`/api`)
- FastAPI REST API
- SQLAlchemy ORM with PostgreSQL
- Pydantic for data validation
- JWT authentication
- Comprehensive API documentation

### Worker (`/worker`)
- Celery background tasks
- Redis as message broker
- Background check processing
- Scheduled tasks (cleanup, monitoring)

## 🔧 Configuration

### Environment Variables

#### API Configuration (`/api/.env`)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/background_check_db
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key-here
CRIMINAL_CHECK_API_KEY=your-api-key
EDUCATION_VERIFICATION_API_KEY=your-api-key
EMPLOYMENT_VERIFICATION_API_KEY=your-api-key
```

#### Worker Configuration (`/worker/.env`)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/background_check_db
REDIS_URL=redis://localhost:6379
CRIMINAL_CHECK_API_KEY=your-api-key
EDUCATION_VERIFICATION_API_KEY=your-api-key
EMPLOYMENT_VERIFICATION_API_KEY=your-api-key
IDENTITY_VERIFICATION_API_KEY=your-api-key
SOCIAL_MEDIA_API_KEY=your-api-key
```

## 🧪 Testing

### Run Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd api
pytest

# Worker tests
cd worker
pytest
```

### Run with Docker

```bash
# Run all tests
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 🚀 Deployment

### Production Deployment

1. **Build production images**
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

2. **Deploy to production**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### CI/CD Pipeline

The project includes GitHub Actions workflows for:

- **Continuous Integration**: Automated testing, linting, and security scanning
- **Docker Build**: Automated Docker image building and pushing
- **Deployment**: Automated deployment to staging/production environments

## 📊 API Documentation

Once the API is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Key Endpoints

- `GET /api/v1/candidates` - List all candidates
- `POST /api/v1/candidates` - Create a new candidate
- `GET /api/v1/background-checks` - List background checks
- `POST /api/v1/background-checks` - Start a new background check
- `GET /health` - Health check endpoint

## 🔒 Security

- JWT-based authentication
- Input validation with Pydantic
- SQL injection protection with SQLAlchemy
- CORS configuration
- Environment-based secrets management

## 📈 Monitoring

- Health check endpoints
- Structured logging
- Error tracking
- Performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@example.com or create an issue in the repository.

## 🔄 Changelog

### v1.0.0
- Initial release
- Complete background check system
- Docker containerization
- CI/CD pipeline
- Comprehensive API documentation
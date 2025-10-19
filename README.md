# Shelf Scanner Application

A book identification and recommendation system that uses AI to analyze bookshelf images and provide personalized recommendations.

## Features

- Image processing for book identification
- AI-powered book recommendations
- Rate limiting for API endpoints
- Environment-driven configuration
- Docker containerization
- Security headers implementation

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Python 3.8+ (for local development)

## Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
# Server Configuration
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
BACKEND_PORT=8000
FRONTEND_PORT=80

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost
ALLOW_CREDENTIALS=true
ALLOW_METHODS=*
ALLOW_HEADERS=*

# Rate Limiting
PROCESS_IMAGE_RATE_LIMIT=10/minute

# Client Configuration
VITE_API_BASE_URL=http://localhost:8000

# Trusted Hosts (for production)
TRUSTED_HOSTS=localhost,127.0.0.1
```

## Running with Docker

The easiest way to run the application is using Docker Compose:

```bash
# Build and start the services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

The application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:8000

## Local Development

### Backend

```bash
cd server
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## API Endpoints

- `POST /process-image` - Process an image and extract book information
- `POST /books/recommendations` - Get recommendations based on provided books
- `POST /logging/level` - Set logging level
- `GET /logging/level` - Get current logging level

## Rate Limiting

The `/process-image` endpoint is rate-limited to prevent abuse. The default limit is 10 requests per minute per IP address. This can be configured using the `PROCESS_IMAGE_RATE_LIMIT` environment variable.

## Security Features

- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, HSTS)
- CORS configuration with environment-driven allowed origins
- Trusted host middleware
- Rate limiting

## Docker Configuration

The application is configured with a multi-container setup:

- `backend` - FastAPI server with Python 3.11
- `frontend` - Nginx server serving the React application

## Deployment

For production deployment, make sure to:

1. Set appropriate environment variables
2. Configure SSL certificates
3. Set up a reverse proxy (nginx, Apache)
4. Configure proper logging and monitoring
5. Set up a database if needed
6. Ensure the GEMINI_API_KEY is properly secured

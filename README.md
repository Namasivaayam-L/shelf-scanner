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

- Docker
- Node.js (for local development)
- Python 3.11+ (for local development)

## Environment Variables

### Backend (`server/.env`)
Create a `.env` file in the `server/` directory:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
PROCESS_IMAGE_RATE_LIMIT=10/minute
ALLOWED_ORIGINS=http://localhost:8000
ALLOW_CREDENTIALS=true
ALLOW_METHODS=*
ALLOW_HEADERS=*
TRUSTED_HOSTS=localhost,127.0.0.1
```

### Frontend (`client/.env`)
Create a `.env` file in the `client/` directory:

```bash
VITE_API_BASE_URL=/api
```

## Running with Docker

Build and run the single-container application:

```bash
# Build the Docker image
docker build -t shelf-scanner:latest .

# Run the container
docker run -p 8000:8000 shelf-scanner:latest
```

The application will be available at:
- **Frontend & API**: http://localhost:8000

The container includes:
- React frontend (built as static assets)
- FastAPI backend serving both frontend and API endpoints
- All dependencies pre-installed

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

- `POST /api/process-image` - Process an image and extract book information
- `POST /api/books/recommendations` - Get recommendations based on provided books
- `POST /api/logging/level` - Set logging level
- `GET /api/logging/level` - Get current logging level
- `GET /ping` - Health check endpoint

## Rate Limiting

The `/process-image` endpoint is rate-limited to prevent abuse. The default limit is 10 requests per minute per IP address. This can be configured using the `PROCESS_IMAGE_RATE_LIMIT` environment variable.

## Security Features

- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, HSTS)
- CORS configuration with environment-driven allowed origins
- Trusted host middleware
- Rate limiting

## Docker Configuration

The application is built as a single Docker container using a multi-stage build:

1. **Frontend Build Stage** - Compiles React/TypeScript using Node 20
2. **Backend Stage** - Runs Python 3.11 with FastAPI serving both the static frontend and API endpoints

## Deployment

For production deployment:

1. Build the Docker image: `docker build -t shelf-scanner:latest .`
2. Configure `server/.env` with your API keys
3. Run the container with appropriate port mapping
4. (Optional) Set up SSL/TLS with a reverse proxy (nginx, Traefik, etc.)
5. Ensure the `GEMINI_API_KEY` is properly secured (preferably via environment variables, not in .env)

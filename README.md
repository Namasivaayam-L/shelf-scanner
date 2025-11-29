# 📚 Shelf Scanner: AI Book Identification & Recommendation

**Shelf Scanner** is an innovative application that leverages AI to **analyze bookshelf images**, identify books, and provide **personalized recommendations**. Built with a **React frontend** and a **FastAPI backend**, it's fully containerized with **Docker** for easy deployment.

---

## ✨ Features

-   📸 **Image Processing**: Intelligently identifies books from uploaded images.
-   🧠 **AI-Powered Recommendations**: Provides personalized book suggestions using advanced AI.
-   🔒 **API Rate Limiting**: Prevents abuse with configurable rate limits for endpoints.
-   ⚙️ **Environment Configuration**: Flexible setup using environment variables for both frontend and backend.
-   🐳 **Docker Containerization**: Seamless deployment with a single Docker container.
-   🛡️ **Enhanced Security**: Implements critical security headers and CORS configurations.

---

## 🧰 Tech Stack

| Component            | Tech                                     |
|----------------------|------------------------------------------|
| Frontend             | React.js, TypeScript                     |
| Backend              | FastAPI, Python 3.11+                    |
| AI/ML                | Gemini API (for image analysis/recommendations) |
| Containerization     | Docker                                   |
| Package Management   | npm (frontend), pip (backend)            |
| Web Server           | Uvicorn (for FastAPI)                    |
| Security             | CORS, HSTS, Rate Limiting                |

---

## 🚀 Setup Instructions

### Prerequisites

-   **Docker**
-   **Node.js** (for frontend local development)
-   **Python 3.11+** (for backend local development)

### Environment Variables

**Backend (`server/.env`)**
Create a `.env` file in the `server/` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here # 👈 REQUIRED for AI features
GEMINI_MODEL=gemini-2.5-flash
PROCESS_IMAGE_RATE_LIMIT=10/minute
ALLOWED_ORIGINS=http://localhost:8000,http://your-frontend-domain.com # 👈 Update as needed
ALLOW_CREDENTIALS=true
ALLOW_METHODS=*
ALLOW_HEADERS=*
TRUSTED_HOSTS=localhost,127.0.0.1,your-backend-domain.com
```

**Frontend (`client/.env`)**
Create a `.env` file in the `client/` directory:

```env
VITE_API_BASE_URL=/api # Or your full API URL in production (e.g., https://api.yourdomain.com/api)
```

---

## 🐳 Running with Docker (Recommended)

For the simplest setup and deployment, use Docker:

```bash
# 1. Clone the repository (if you haven't already)
git clone https://github.com/Namasivaayam-L/shelf-scanner.git # Replace with actual repo URL if different
cd shelf-scanner

# 2. Build the Docker image
docker build -t shelf-scanner:latest .

# 3. Run the container
# Ensure your server/.env is configured before running
docker run -p 8000:8000 shelf-scanner:latest
```

The application will be accessible at `http://localhost:8000`. This single container includes the React frontend (as static assets) and the FastAPI backend.

---

## 🧑‍💻 Local Development (Alternative)

To run the frontend and backend separately for development:

### Backend

```bash
cd server
python -m venv .venv
source .venv/bin/activate # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The backend API will run, typically on `http://localhost:8000` (check `main.py` for port).

### Frontend

```bash
cd client
npm install
npm run dev
```

The frontend development server will typically run on `http://localhost:5173` (or similar).

---

## 🔌 API Endpoints

-   `POST /api/process-image`: Processes an image to identify books.
-   `POST /api/books/recommendations`: Provides book recommendations.
-   `POST /api/logging/level`: Sets the server's logging level.
-   `GET /api/logging/level`: Retrieves the current logging level.
-   `GET /ping`: Health check endpoint.

---

## 📂 Project Structure

```
.
├── client/                     # Frontend React.js application (TypeScript)
│   ├── public/                 # Static assets
│   ├── src/                    # React components, pages, services, styles
│   ├── package.json            # Client-side dependencies
│   └── ...
├── server/                     # Backend FastAPI application (Python)
│   ├── core/                   # Core application logic, dependencies
│   ├── api/                    # API routers and endpoint definitions
│   ├── models/                 # Pydantic models for data validation
│   ├── services/               # Business logic, AI integration
│   ├── main.py                 # FastAPI application entry point
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # Environment variables for backend
│   └── ...
├── Dockerfile                  # Docker build instructions for the combined application
├── README.md                   # Project overview and documentation
└── .gitignore                  # Git ignore rules

# Development with Docker Watch

This project supports Docker-based development with file watching capabilities. Changes to your source code will be automatically reflected in the running containers without requiring a rebuild.

## Development Setup

### Prerequisites
- Docker Engine
- Docker Compose v2.23 or later (for watch functionality)

### Starting Development Environment

To start the development environment with file watching:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

This will:
- Start both the backend (Python FastAPI) and frontend (React/Vite) services
- Enable hot-reloading for both services
- Mount your source code as volumes in the containers
- Automatically restart services when code changes are detected

### Development Commands

#### Start development environment:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

#### Start in detached mode:
```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

#### Stop development environment:
```bash
docker-compose -f docker-compose.dev.yml down
```

#### View logs:
```bash
docker-compose -f docker-compose.dev.yml logs -f
```

## How It Works

### Backend (Python/FastAPI)
- Uses `Dockerfile.dev` in the `server/` directory
- Runs uvicorn with the `--reload` flag for auto-reload on file changes
- Mounts the server source code as a volume
- Installs additional development dependencies like `watchfiles`

### Frontend (React/Vite)
- Uses `Dockerfile.dev` in the `client/` directory
- Runs the Vite development server instead of building a static site
- Mounts the client source code as a volume
- Enables hot module replacement (HMR) for instant updates

## File Watching Configuration

The development setup includes:

1. **Volume Mounts**: Source code is mounted as volumes in both containers, allowing changes to be immediately visible.

2. **Auto-reload**: Both services are configured to restart/reload when files change:
   - Backend: uvicorn's `--reload` flag
   - Frontend: Vite's hot module replacement

3. **Ignored Files**: Python cache files and node_modules are excluded from the volume mounts to prevent conflicts.

## Production vs Development

- **Production**: Use `docker-compose.yml` for production builds (`docker-compose up --build`)
- **Development**: Use `docker-compose.dev.yml` for development with file watching (`docker-compose -f docker-compose.dev.yml up --build`)

## Troubleshooting

### If changes aren't being detected:
1. Make sure you're using the development compose file: `docker-compose -f docker-compose.dev.yml`
2. Check that your Docker Compose version supports the watch functionality
3. Verify that the volumes are properly mounted by checking the container logs

### If you encounter permission issues:
1. Make sure your user has the necessary permissions to run Docker
2. Check that the appuser in the containers has appropriate access to the mounted volumes

### Frontend not connecting to backend:
1. Make sure the backend service is named `backend` in the compose file
2. Check that the VITE_API_BASE_URL environment variable is set correctly
3. Verify that both services are on the same Docker network (they are by default in compose)

## Stopping Development

To stop the development environment and clean up containers:

```bash
docker-compose -f docker-compose.dev.yml down

# Backend Setup and Usage

## Quick Start

### 1. Setup Environment (First time only)

```bash
./setup.sh
```

### 2. Run Server

```bash
./run.sh
```

## What the Scripts Do

### `setup.sh`

- 🧹 Removes any existing broken virtual environment
- 🏗️ Creates a fresh Python virtual environment
- ⬆️ Upgrades pip to latest version
- 📦 Installs all required dependencies from `requirements.txt`
- ✅ Provides clear feedback during setup

### `run.sh`

- 🔄 Activates the virtual environment
- 🚀 Starts the FastAPI server with hot reload
- 📍 Server runs on `http://127.0.0.1:8000`

## Troubleshooting

### SSL Certificate Issues

The scripts automatically handle SSL certificate issues on macOS by using trusted hosts.

### Port Already in Use

If port 8000 is already in use, stop other processes or modify the port in `run.sh`.

### Permission Issues

Make sure the scripts are executable:

```bash
chmod +x setup.sh run.sh
```

## API Endpoints

- **Health Check**: `GET /health` - Returns `{"status":"ok"}`
- **API Docs**: `GET /docs` - Interactive Swagger UI
- **Auth Endpoints**: `/auth/*`
- **AI Endpoints**: `/ai/*`

## Development

The server runs with hot reload enabled, so changes to Python files will automatically restart the server.

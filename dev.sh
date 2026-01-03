#!/usr/bin/env bash
set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Get the script directory (project root)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

# PID variables for cleanup
BACKEND_PID=""
FRONTEND_PID=""

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${CYAN}[STEP]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to cleanup background processes on exit
cleanup() {
    if [ -n "${BACKEND_PID:-}" ] && kill -0 "$BACKEND_PID" 2>/dev/null; then
        kill "$BACKEND_PID" 2>/dev/null || true
    fi

    if [ -n "${FRONTEND_PID:-}" ] && kill -0 "$FRONTEND_PID" 2>/dev/null; then
        kill "$FRONTEND_PID" 2>/dev/null || true
    fi

    exit 0
}

# Trap signals to cleanup
trap cleanup SIGINT SIGTERM

# Function to setup backend environment
setup_backend() {
    cd "$BACKEND_DIR"

    # Check if requirements.txt exists
    if [ ! -f "requirements.txt" ]; then
        print_error "requirements.txt not found in backend directory"
        exit 1
    fi

    # Clean up any existing broken virtual environment
    if [ -d ".venv" ]; then
        rm -rf .venv
    fi

    python3 -m venv .venv

    source .venv/bin/activate

    python3 -m pip install --upgrade pip \
        --trusted-host pypi.org \
        --trusted-host files.pythonhosted.org \
        --quiet

    # Prefer system certificates if present (avoids SSL issues on some macOS setups)
    if [ -f "/etc/ssl/cert.pem" ]; then
        export SSL_CERT_FILE="/etc/ssl/cert.pem"
    fi

    python3 -m pip install -r requirements.txt \
        --trusted-host pypi.org \
        --trusted-host files.pythonhosted.org \
        --quiet

    cd "$SCRIPT_DIR"
}

# Function to setup frontend environment
setup_frontend() {
    cd "$FRONTEND_DIR"

    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in frontend directory"
        exit 1
    fi

    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        npm install --silent
    fi

    cd "$SCRIPT_DIR"
}

# Function to start backend server
start_backend() {
    cd "$BACKEND_DIR"

    # Activate virtual environment and start server
    (
        source .venv/bin/activate
        python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 --log-level warning
    ) &
    BACKEND_PID=$!

    cd "$SCRIPT_DIR"

    # Wait a moment for backend to start
    sleep 2

    # Check if backend is still running
    if ! kill -0 "$BACKEND_PID" 2>/dev/null; then
        print_error "Backend server failed to start"
        exit 1
    fi
}

# Function to start frontend server
start_frontend() {
    cd "$FRONTEND_DIR"

    npm run dev --silent &
    FRONTEND_PID=$!

    cd "$SCRIPT_DIR"

    # Wait a moment for frontend to start
    sleep 3

    # Check if frontend is still running
    if ! kill -0 "$FRONTEND_PID" 2>/dev/null; then
        print_error "Frontend development server failed to start"
        cleanup
        exit 1
    fi
}

# Main script
main() {
    # Check required commands
    if ! command_exists python3; then
        print_error "Python 3 is not installed or not in PATH"
        exit 1
    fi

    if ! command_exists node; then
        print_error "Node.js is not installed or not in PATH"
        exit 1
    fi

    if ! command_exists npm; then
        print_error "npm is not installed or not in PATH"
        exit 1
    fi

    # Check directories
    if [ ! -d "$BACKEND_DIR" ]; then
        print_error "Backend directory not found: $BACKEND_DIR"
        exit 1
    fi

    if [ ! -d "$FRONTEND_DIR" ]; then
        print_error "Frontend directory not found: $FRONTEND_DIR"
        exit 1
    fi

    # Setup backend if virtual environment doesn't exist
    if [ ! -d "$BACKEND_DIR/.venv" ]; then
        setup_backend
    fi

    # Setup frontend if node_modules doesn't exist
    if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
        setup_frontend
    fi

    # Start servers
    start_backend
    start_frontend

    # Display URLs
    echo
    echo "Frontend: http://localhost:5173/"
    echo "Backend API: http://localhost:8000/"
    echo "API Documentation: http://localhost:8000/docs"
    echo
    echo "Press Ctrl+C to stop all servers"
    echo

    # Wait for background processes
    wait
}

# Run main function
main "$@"

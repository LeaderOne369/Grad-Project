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
    echo
    print_warning "Shutting down development servers..."
    
    if [ -n "${BACKEND_PID:-}" ] && kill -0 "$BACKEND_PID" 2>/dev/null; then
        kill "$BACKEND_PID" 2>/dev/null || true
        print_info "Backend server stopped"
    fi
    
    if [ -n "${FRONTEND_PID:-}" ] && kill -0 "$FRONTEND_PID" 2>/dev/null; then
        kill "$FRONTEND_PID" 2>/dev/null || true
        print_info "Frontend server stopped"
    fi
    
    print_success "All servers stopped. Goodbye! 👋"
    exit 0
}

# Trap signals to cleanup
trap cleanup SIGINT SIGTERM

# Function to setup backend environment
setup_backend() {
    print_step "Setting up backend environment..."
    
    cd "$BACKEND_DIR"
    
    # Check if requirements.txt exists
    if [ ! -f "requirements.txt" ]; then
        print_error "requirements.txt not found in backend directory"
        exit 1
    fi
    
    # Clean up any existing broken virtual environment
    if [ -d ".venv" ]; then
        print_warning "Removing existing virtual environment..."
        rm -rf .venv
    fi
    
    print_info "Creating new virtual environment..."
    python3 -m venv .venv
    
    source .venv/bin/activate
    
    print_info "Upgrading pip..."
    python3 -m pip install --upgrade pip \
        --trusted-host pypi.org \
        --trusted-host files.pythonhosted.org \
        --quiet
    
    # Prefer system certificates if present (avoids SSL issues on some macOS setups)
    if [ -f "/etc/ssl/cert.pem" ]; then
        export SSL_CERT_FILE="/etc/ssl/cert.pem"
    fi
    
    print_info "Installing Python dependencies..."
    python3 -m pip install -r requirements.txt \
        --trusted-host pypi.org \
        --trusted-host files.pythonhosted.org \
        --quiet
    
    print_success "Backend environment setup complete!"
    
    cd "$SCRIPT_DIR"
}

# Function to setup frontend environment
setup_frontend() {
    print_step "Setting up frontend environment..."
    
    cd "$FRONTEND_DIR"
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in frontend directory"
        exit 1
    fi
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        print_info "Installing frontend dependencies..."
        npm install --silent
        print_success "Frontend dependencies installed!"
    fi
    
    cd "$SCRIPT_DIR"
}

# Function to start backend server
start_backend() {
    print_step "Starting backend server..."
    
    cd "$BACKEND_DIR"
    
    # Activate virtual environment and start server
    (
        source .venv/bin/activate
        python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
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
    
    print_success "Backend server started (PID: $BACKEND_PID)"
}

# Function to start frontend server
start_frontend() {
    print_step "Starting frontend development server..."
    
    cd "$FRONTEND_DIR"
    
    npm run dev &
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
    
    print_success "Frontend development server started (PID: $FRONTEND_PID)"
}

# Main script
main() {
    echo
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║${NC}       🎨 ${CYAN}GOZU Development Environment${NC}       🎨         ${GREEN}║${NC}"
    echo -e "${GREEN}║${NC}       AI-Powered 3D Printing Design Platform              ${GREEN}║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo
    
    # Check required commands
    print_step "Checking system requirements..."
    
    if ! command_exists python3; then
        print_error "Python 3 is not installed or not in PATH"
        exit 1
    fi
    print_info "✓ Python 3 found: $(python3 --version)"
    
    if ! command_exists node; then
        print_error "Node.js is not installed or not in PATH"
        exit 1
    fi
    print_info "✓ Node.js found: $(node --version)"
    
    if ! command_exists npm; then
        print_error "npm is not installed or not in PATH"
        exit 1
    fi
    print_info "✓ npm found: $(npm --version)"
    
    echo
    
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
        print_warning "Backend virtual environment not found. Running first-time setup..."
        setup_backend
        echo
    else
        print_info "✓ Backend environment ready"
    fi
    
    # Setup frontend if node_modules doesn't exist
    if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
        print_warning "Frontend dependencies not found. Installing..."
        setup_frontend
        echo
    else
        print_info "✓ Frontend dependencies ready"
    fi
    
    echo
    
    # Start servers
    start_backend
    start_frontend
    
    echo
    echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
    print_success "🎉 GOZU Development Environment is running!"
    echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
    echo
    print_info "🌐 Frontend:          http://localhost:5173/"
    print_info "🔗 Backend API:       http://localhost:8000/"
    print_info "📚 API Documentation: http://localhost:8000/docs"
    echo
    print_info "Press ${YELLOW}Ctrl+C${NC} to stop all servers"
    echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
    echo
    
    # Wait for background processes
    wait
}

# Run main function
main "$@"

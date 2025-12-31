#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

# Clean up any existing broken virtual environment
if [ -d ".venv" ]; then
  echo "🧹 Removing existing virtual environment..."
  rm -rf .venv
fi

echo "🏗️  Creating new virtual environment..."
python3 -m venv .venv

source .venv/bin/activate

echo "⬆️  Upgrading pip..."
python3 -m pip install --upgrade pip \
  --trusted-host pypi.org \
  --trusted-host files.pythonhosted.org

# Prefer system certificates if present (avoids SSL issues on some macOS setups)
if [ -f "/etc/ssl/cert.pem" ]; then
  export SSL_CERT_FILE="/etc/ssl/cert.pem"
fi

echo "📦 Installing Python dependencies..."
python3 -m pip install -r requirements.txt \
  --trusted-host pypi.org \
  --trusted-host files.pythonhosted.org

echo "✅ Backend environment ready!"
echo "💡 You can now run './run.sh' to start the server."

#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
source .venv/bin/activate

# Use python -m uvicorn to avoid shebang path issues
python -m uvicorn app.main:app --reload

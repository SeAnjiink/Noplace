#!/bin/bash

# NoPlace - Development Setup Script

echo "🚀 NoPlace Setup Started..."

# Check dependencies
echo "📋 Checking dependencies..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 20+"
    exit 1
fi

if ! command -v go &> /dev/null; then
    echo "❌ Go not found. Please install Go 1.21+"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker not found. Install Docker for easier setup."
fi

echo "✅ Dependencies OK"

# Setup backend env
echo ""
echo "📦 Setting up Backend..."
cd backend
cp .env.example .env
echo "✅ Backend .env created"
cd ..

# Setup web env
echo ""
echo "📦 Setting up Web..."
cd web
cp .env.example .env.local
cd ..

# Setup Node dependencies from root (monorepo workspaces)
echo ""
echo "📦 Installing Node dependencies (all workspaces)..."
npm install
echo "✅ All Node dependencies installed"

# Download Go dependencies
echo ""
echo "📦 Downloading Go dependencies..."
cd backend
go mod download
cd ..
echo "✅ Go dependencies downloaded"

# Create .env.example files if missing
echo ""
echo "📝 Setting up environment files..."
if [ ! -f web/.env.example ]; then
    echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > web/.env.example
fi
if [ ! -f mobile/.env.example ]; then
    echo "EXPO_PUBLIC_API_URL=http://localhost:3001" > mobile/.env.example
fi
echo "✅ Environment files ready"

echo ""
echo "✅ Setup complete! You can now run:"
echo "   Backend:  cd backend && go run main.go"
echo "   Web:      cd web && npm run dev"
echo "   Mobile:   cd mobile && npm start"
echo "   All:      docker compose up"
# Install root dependencies
echo ""
echo "📦 Installing root dependencies..."
npm install 2>/dev/null || npm install
echo "✅ Root dependencies installed"

echo ""
echo "================================"
echo "✅ Setup Completed Successfully!"
echo "================================"
echo ""
echo "Next steps:"
echo ""
echo "🐳 Option 1: Using Docker (Recommended)"
echo "   docker-compose up -d"
echo ""
echo "🖥️  Option 2: Manual Development"
echo "   # In separate terminals:"
echo "   cd backend && go run main.go"
echo "   cd web && npm run dev"
echo "   cd mobile && npm run web"
echo ""
echo "📖 Docs:"
echo "   - API: See API.md"
echo "   - Deploy: See DEPLOYMENT.md"
echo ""

#!/bin/bash

# NoPlace - One-Command Setup
# Run this script to set up and start the entire NoPlace application

set -e

echo "🚀 NoPlace - Complete Setup & Start"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check requirements
echo -e "${BLUE}📋 Checking requirements...${NC}"

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from https://nodejs.org/"
    exit 1
fi

if ! command -v go &> /dev/null; then
    echo "❌ Go not found. Install from https://golang.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node $(node -v)${NC}"
echo -e "${GREEN}✅ Go $(go version | cut -d' ' -f3)${NC}"

# Setup
echo ""
echo -e "${BLUE}📦 Installing dependencies...${NC}"

# Install Node dependencies from root (monorepo)
npm install --legacy-peer-deps

# Install Go dependencies
echo -e "${BLUE}📦 Downloading Go modules...${NC}"
cd backend
go mod download
go mod tidy
cd ..

# Setup env files
echo -e "${BLUE}📝 Setting up environment files...${NC}"
cd backend
[ ! -f .env ] && cp .env.example .env && echo "✅ .env created"
cd ../web
[ ! -f .env.local ] && cp .env.example .env.local && echo "✅ .env.local created"
cd ../mobile
[ ! -f .env ] && cp .env.example .env && echo "✅ Mobile .env created"
cd ..

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${YELLOW}🎯 Ready to start services:${NC}"
echo ""
echo "Open 3 separate terminals and run:"
echo ""
echo -e "${BLUE}Terminal 1 (Backend - Port 3001):${NC}"
echo "  cd backend && go run main.go"
echo ""
echo -e "${BLUE}Terminal 2 (Web - Port 3000):${NC}"
echo "  cd web && npm run dev"
echo ""
echo -e "${BLUE}Terminal 3 (Mobile):${NC}"
echo "  cd mobile && npm start"
echo "  (Press 'w' for web preview, 'a' for Android, 'i' for iOS)"
echo ""
echo -e "${YELLOW}Or use Docker:${NC}"
echo "  docker compose up -d"
echo ""
echo -e "${YELLOW}View logs:${NC}"
echo "  docker compose logs -f"
echo ""
echo -e "${YELLOW}Stop services:${NC}"
echo "  docker compose down"
echo ""

exit 0

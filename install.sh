#!/bin/bash

# NoPlace - Clean Installation Script
# Safe to run multiple times

set -e  # Exit on error

echo "🚀 NoPlace Clean Installation"
echo "=============================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Verify we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found in current directory${NC}"
    echo "Run this script from /workspaces/Noplace"
    exit 1
fi

echo -e "${BLUE}📍 Installing from: $(pwd)${NC}"
echo ""

# Step 2: Verify Node and npm
echo -e "${BLUE}📋 Checking requirements...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found${NC}"
    exit 1
fi
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node $(node --version)${NC}"
echo -e "${GREEN}✅ npm $(npm --version)${NC}"
echo ""

# Step 3: Clean npm cache
echo -e "${BLUE}🧹 Cleaning npm cache...${NC}"
npm cache clean --force
echo -e "${GREEN}✅ Cache cleaned${NC}"
echo ""

# Step 4: Remove existing node_modules (optional but safer)
if [ "$1" = "--clean" ]; then
    echo -e "${YELLOW}🗑️  Removing existing node_modules...${NC}"
    rm -rf node_modules
    rm -rf web/node_modules
    rm -rf mobile/node_modules
    rm -rf packages/*/node_modules
    rm -rf package-lock.json
    echo -e "${GREEN}✅ Cleaned${NC}"
    echo ""
fi

# Step 5: Install dependencies
echo -e "${BLUE}📦 Installing npm dependencies (monorepo)...${NC}"
echo -e "${YELLOW}This may take 3-10 minutes...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ npm install failed${NC}"
    echo ""
    echo "Try these fixes:"
    echo "  1. npm cache clean --force"
    echo "  2. npm install --legacy-peer-deps"
    echo "  3. $0 --clean  (clean all and reinstall)"
    exit 1
fi

echo -e "${GREEN}✅ npm dependencies installed${NC}"
echo ""

# Step 6: Setup Go
echo -e "${BLUE}📦 Setting up Go modules...${NC}"
cd backend
go mod download
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Go mod download failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Go modules ready${NC}"
cd ..
echo ""

# Step 7: Setup environment files
echo -e "${BLUE}📝 Setting up environment files...${NC}"
cd backend
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ backend/.env created${NC}"
else
    echo -e "${YELLOW}⚠️  backend/.env already exists${NC}"
fi
cd ..

if [ ! -f "web/.env.local" ]; then
    cp web/.env.example web/.env.local
    echo -e "${GREEN}✅ web/.env.local created${NC}"
else
    echo -e "${YELLOW}⚠️  web/.env.local already exists${NC}"
fi
echo ""

# Step 8: Verify installation
echo -e "${BLUE}✅ Verifying installation...${NC}"
echo ""
echo "Installed packages:"
echo -e "  root: $(ls node_modules | wc -l) modules"
echo -e "  web: $([ -d web/node_modules ] && echo '✅' || echo '❌')"
echo -e "  mobile: $([ -d mobile/node_modules ] && echo '✅' || echo '❌')"
echo ""
echo -e "Environment files:"
echo -e "  backend/.env: $([ -f backend/.env ] && echo '✅' || echo '❌')"
echo -e "  web/.env.local: $([ -f web/.env.local ] && echo '✅' || echo '❌')"
echo ""

echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ Setup Complete!                   ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo "🎯 Next Steps:"
echo ""
echo "Open 3 separate terminals:"
echo ""
echo "  Terminal 1 (Backend - Port 3001):"
echo "    ${BLUE}cd backend && go run main.go${NC}"
echo ""
echo "  Terminal 2 (Web - Port 3000):"
echo "    ${BLUE}cd web && npm run dev${NC}"
echo ""
echo "  Terminal 3 (Mobile):"
echo "    ${BLUE}cd mobile && npm start${NC}"
echo "    (Press 'w' for web preview)"
echo ""
echo "Or use Docker:"
echo "    ${BLUE}docker compose up -d${NC}"
echo ""

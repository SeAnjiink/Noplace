# 🚀 NoPlace Installation Guide

## Prerequisites

- Node.js 20+ ([Download](https://nodejs.org/))
- Go 1.21+ ([Download](https://golang.org/))
- Docker & Docker Compose (Optional, for containerized setup)
- Git

Verify installation:
```bash
node --version
npm --version
go version
docker --version
```

## Quick Start (Recommended)

### 1️⃣ Install All Dependencies

From the root directory:
```bash
cd /workspaces/Noplace

# Install all Node.js dependencies (web, mobile, packages)
npm install

# Download Go dependencies
cd backend
go mod download
cd ..
```

### 2️⃣ Setup Environment Files

```bash
# Backend
cd backend
cp .env.example .env
cd ..

# Web
cd web
cp .env.example .env.local
cd ..

# Mobile
cd mobile
cp .env.example .env
cd ..
```

### 3️⃣ Start Services

Open the project root and use **three separate terminals**:

#### Terminal 1: Backend (Port 3001)
```bash
cd backend
go run main.go
# Output: 🚀 Server starting on port 3001
```

#### Terminal 2: Web Landing Page (Port 3000)
```bash
cd web
npm run dev
# Open: http://localhost:3000
```

#### Terminal 3: Mobile App (Expo)
```bash
cd mobile
npm start

# Press 'w' for web preview
# Press 'a' for Android simulator (if installed)
# Press 'i' for iOS simulator (Mac only)
```

## Docker Setup (Alternative)

If you have Docker installed:

```bash
# Start all services at once
docker compose up -d

# Services:
# - PostgreSQL: localhost:5432
# - Redis: localhost:6379
# - Backend API: http://localhost:3001
# - Web: http://localhost:3000
# - Logs: docker compose logs -f

# Stop services
docker compose down
```

## Troubleshooting

### ❌ npm install fails with permission errors
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### ❌ Go compilation errors
```bash
cd backend

# Clean and retry
go clean -modcache
go mod tidy
go mod download
go run main.go
```

### ❌ Port 3000 or 3001 already in use
```bash
# Find what's using the port (Linux/Mac)
lsof -i :3000
lsof -i :3001

# Kill the process
kill -9 <PID>

# Or use different ports
# Web: PORT=3002 npm run dev
# Backend: PORT=3002 go run main.go
```

### ❌ Expo metro bundler issues
```bash
cd mobile

# Clear cache
rm -rf node_modules .expo
npm install

# Start fresh
npm start -- --clear
```

### ❌ Database connection errors
Make sure PostgreSQL is running:
```bash
# If using Docker
docker compose up -d postgres redis

# If local:
# Stop: brew services stop postgresql
# Start: brew services start postgresql
```

## API Testing

Once backend is running:

```bash
# Health check
curl http://localhost:3001/health

# Create account
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "SecurePassword123"
  }'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123"
  }'
```

Full API docs: [See API.md](./API.md)

## Project Structure

```
/workspaces/Noplace/
├── backend/           # Go REST API (Port 3001)
├── web/              # Next.js landing page (Port 3000)
├── mobile/           # React Native Expo app
├── packages/
│   ├── types/        # Shared TypeScript types
│   └── utils/        # Shared utilities
├── docker-compose.yml    # Development containers
└── README.md         # Project documentation
```

## Next Steps

- 📖 Read [SUMMARY.md](./SUMMARY.md) for project overview
- 🔌 Check [API.md](./API.md) for endpoint documentation
- 🚀 See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
- 💻 View [README.md](./README.md) for feature details

## Need Help?

- Check error logs: `docker compose logs backend`
- Verify environment: Copy `.env.example` to `.env`
- Clear caches: `npm cache clean` + `go clean -modcache`
- Restart services: `docker compose restart`

---

**Version**: 1.0.0 | **Last Updated**: March 2026 | **Status**: MVP Ready ✅

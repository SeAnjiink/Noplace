# NoPlace - Anti-Social Media for Gen Z 🔒

> A safe space where nobody is watching. No algorithms. No endless scrolling. No performative social pressure.

![Status](https://img.shields.io/badge/Status-MVP%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-0.1.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 About

NoPlace is a revolutionary social platform designed for Gen Z that prioritizes **emotional safety** over engagement metrics. Unlike traditional social media, NoPlace:

- ✅ **No Algorithm** - Posts appear in random order, preventing parasocial relationships
- ✅ **Anonymous & Private** - Share without fear of judgment
- ✅ **24-Hour Auto-Delete** - Messages disappear automatically
- ✅ **Emotional Reactions** - "Relate", "Too Real", "Chaos" instead of cold "likes"
- ✅ **Mood-Based Communities** - Find people with similar energy (3AM Thoughts, Existential Crisis, etc.)
- ✅ **No Infinite Scroll** - Designed for healthy engagement
- ✅ **No Tracking** - Complete privacy by default

## 🏗️ Tech Stack

### Frontend
- **Web**: Next.js 15 (App Router) + Tailwind CSS v4 + Framer Motion
- **Mobile**: React Native + Expo Router
- **State**: Zustand (mobile), React Hooks (web)

### Backend
- **Language**: Go 1.21
- **Framework**: Fiber v2.52
- **Database**: PostgreSQL 16 + GORM
- **Cache**: Redis 7
- **Authentication**: JWT (7-day expiry) + bcrypt

### DevOps
- **Containerization**: Docker & Docker Compose
- **Monorepo**: npm Workspaces + Turbo
- **Deployment**: Railway, Render, or DigitalOcean ready

## 🚀 Quick Start

### 📋 Requirements
- Node.js 20+
- Go 1.21+
- Docker (Optional)

### 1️⃣ Install Dependencies
```bash
# Clone the repository
git clone <repo-url>
cd Noplace

# Install all dependencies
npm install
cd backend && go mod download && cd ..
```

### 2️⃣ Setup Environment
```bash
# Copy example configs
cd backend && cp .env.example .env && cd ..
cd web && cp .env.example .env.local && cd ..
```

### 3️⃣ Start Services

**Option A: Manual (3 Terminals)**
```bash
# Terminal 1: Backend (Port 3001)
cd backend && go run main.go

# Terminal 2: Web (Port 3000)
cd web && npm run dev

# Terminal 3: Mobile
cd mobile && npm start
```

**Option B: Docker**
```bash
docker compose up -d
# Services start automatically
```

**Access:**
- 🌐 **Web**: http://localhost:3000
- 📱 **Mobile**: Expo (press 'w')
- 🔧 **API**: http://localhost:3001

### More Details
See [INSTALL.md](./INSTALL.md) for complete setup guide and troubleshooting

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [**INSTALL.md**](./INSTALL.md) | 📋 Detailed installation & troubleshooting |
| [**API.md**](./API.md) | 🔌 Complete API endpoint reference |
| [**DEPLOYMENT.md**](./DEPLOYMENT.md) | 🚀 Production deployment guide |
| [**SUMMARY.md**](./SUMMARY.md) | 📊 Project structure overview |

## 📁 Architecture

```
Noplace/
├── backend/              ← Go REST API (Port 3001)
├── web/                  ← Next.js landing (Port 3000)
├── mobile/               ← React Native app
├── packages/             ← Shared code
│   ├── types/
│   └── utils/
└── docker/               ← Container configs
```

**Backend** (Go):
- `handlers/` - API endpoints
- `models/` - Database schemas
- `middleware/` - Auth & CORS
- `database/` - PostgreSQL setup

**Web** (Next.js):
- `app/` - Landing page with animations
- `src/` - Components and hooks

**Mobile** (React Native):
- `app/(tabs)/` - 5-tab navigation
- `store/` - Zustand state management

## 🎨 Design Philosophy

**Glitchcore Aesthetic**
- Colors: Magenta (#c71585), Cyan (#00ffff), Dark (#0a0a0a)
- Animations: Glitch, pulse, fade effects
- Typography: Bold, expressive, Gen Z friendly

**Core Principles**
- Privacy first, engagement optional
- Anonymous by default
- Real human connection over metrics
- Mental health conscious design

## ✨ Key Features

### Posts
- Random (not algorithmic) feed
- Mood/energy categories
- Anonymous option
- 24-hour expiry option

### Reactions
- Relate ❤️ - I feel seen
- Too Real 😭 - This hits different
- Chaos 🔥 - This is wild

### Messages
- 24-hour auto-delete
- No read receipts
- No typing indicators
- Direct & group chats

### Profile
- Energy badge
- Mood statistics
- Journal streak
- Aura display

## 🔌 API Quick Reference

```bash
# Auth
POST   /api/auth/signup          # Create account
POST   /api/auth/login           # Login & get JWT

# Posts (Protected)
POST   /api/posts                # Create post
GET    /api/posts                # Get random feed
GET    /api/posts/{id}           # Get post details
DELETE /api/posts/{id}           # Delete post

# Reactions (Protected)
POST   /api/reactions            # Add/remove reaction
GET    /api/posts/{id}/reactions # List reactions

# Messages (Protected)
POST   /api/messages             # Send message
GET    /api/messages/inbox       # Get conversations
GET    /api/messages/{userId}    # Get conversation

# Health
GET    /health                   # Server status
GET    /api/user/profile         # User info
```

## 🚀 Deployment

### Docker Compose (Local)
```bash
docker compose up -d                    # Start all services
docker compose logs -f                  # View logs
docker compose down                     # Stop services
```

### Production
See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Railway setup
- Render deployment
- DigitalOcean guide
- Environment variables
- Database backups
- Monitoring

## 🛠️ Development

### Build
```bash
npm run build                           # Build all
go build .                              # Build backend
npm run build -w web                    # Build web only
```

### Lint & Format
```bash
npm run lint                            # Check code
npm run format                          # Format code
go fmt ./...                            # Format Go
go vet ./...                            # Lint Go
```

### Testing
```bash
npm test                                # Test all
go test ./...                           # Test Go
npm test -w mobile                      # Test mobile
```

## 📊 Status

- ✅ MVP Complete
- ✅ All core features working
- ✅ Go backend functioning
- ✅ Web landing page live
- ✅ Mobile UI complete
- 🔄 WebSocket (Phase 2)
- 🔄 AI mood detection (Phase 2)

## 🙌 Contributing

We're building this in public. Check issues for ways to help.

## 📝 License

MIT © 2026 NoPlace

---

**Built for Gen Z. By people who get it.** 💜

*A platform where nobody is watching, and that's the whole point.*
# NoPlace - Deployment Guide

## Production Deployment

### Prerequisites

- Docker & Docker Compose
- PostgreSQL 16 (managed service recommended)
- Redis (managed service recommended)
- Domain name (e.g., noplace.app)
- SSL certificate (auto with Let's Encrypt)

### Platforms

#### Option 1: Railway.app (Recommended)

```bash
# Install Railway CLI
npm install -g railway

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# Set environment variables in dashboard
```

#### Option 2: Render.com

1. Create account on Render.com
2. Create PostgreSQL database
3. Create Redis instance
4. Deploy backend & web

#### Option 3: DigitalOcean App Platform

1. Create DigitalOcean account
2. Connect GitHub repo
3. Configure services:
   - Backend (Go)
   - Web (Next.js)
   - PostgreSQL
   - Redis

### Database Migration

```bash
# Connect to production database
psql postgresql://<user>:<pass>@<host>:5432/<dbname>

# Migrations auto-run on backend startup
```

### Environment Variables Setup

**Backend (.env)**
```
ENV=production
JWT_SECRET=<generate-strong-key>
DB_HOST=<managed-db-host>
DB_USER=<db-user>
DB_PASS=<db-pass>
DB_NAME=noplace
REDIS_URL=<managed-redis-url>
```

**Web (.env.local)**
```
NEXT_PUBLIC_API_URL=https://api.noplace.app/api
```

### Docker Compose Deploy

```bash
# Copy production compose file
cp docker-compose.prod.yml docker-compose.yml

# Set environment variables
export DB_USER=...
export DB_PASS=...
export JWT_SECRET=...

# Deploy
docker-compose up -d

# View logs
docker-compose logs -f
```

### Domain & SSL

**With Railway/Render:**
- Automatic SSL certificates
- Custom domain setup in dashboard

**With DigitalOcean:**
- Use Let's Encrypt
- Auto-renewal configured

### Monitoring & Logging

**Sentry (Error tracking)**
```bash
# Create Sentry project
# Add SENTRY_DSN to environment
```

**Logging**
```bash
# View container logs
docker-compose logs backend
docker-compose logs web

# Persistent logs to file
docker-compose logs -f > logs.txt
```

### Performance Optimization

1. **CDN**: Use Cloudflare for static assets
2. **Database**: Enable read replicas for high traffic
3. **Caching**: Redis for session/cache
4. **Image Optimization**: Cloudflare R2 for blur photos

### Security Checklist

- [x] HTTPS enabled
- [x] JWT secrets strong (32+ chars)
- [x] Database backups enabled
- [x] CORS properly configured
- [x] Rate limiting in place
- [x] Environment secrets managed
- [x] Database credentials rotated
- [x] VPN for admin access

### Backup & Recovery

```bash
# Backup database
pg_dump postgresql://<user>:<pass>@<host>:5432/<dbname> > backup.sql

# Restore
psql postgresql://<user>:<pass>@<host>:5432/<dbname> < backup.sql
```

### Scaling Strategy

1. **Immediate (0-10k users)**
   - Single server setup
   - Managed database
   - CDN for assets

2. **Growth (10k-100k users)**
   - Database read replicas
   - API load balancing
   - Redis clustering

3. **Scale (100k+ users)**
   - Kubernetes orchestration
   - Database sharding
   - Distributed caching

### Troubleshooting

**Port already in use**
```bash
lsof -i :3001
kill -9 <PID>
```

**Database connection failed**
```bash
# Check connection string
# Verify firewall rules
# Ensure database service is running
```

**WebSocket not connecting**
```bash
# Verify WS endpoint
# Check CORS headers
# Enable WebSocket in reverse proxy
```

## Local Testing Before Deploy

```bash
# Test with production environment
cp docker-compose.prod.yml docker-compose.yml

# Set dummy env vars
export DB_USER=postgres
export DB_PASS=test123
export JWT_SECRET=$(openssl rand -base64 32)

# Run locally
docker-compose up -d

# Test endpoints
curl http://localhost:3001/health
curl http://localhost:3000
```

---

**Deployment checklist:** ✅ All systems ready for production!

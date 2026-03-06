# 🚀 NoPlace - Cara Kilat Setup (Copy-Paste)

Salin dan jalankan perintah di bawah satu per satu dari terminal.

## 👉 Step 1: Install Dependencies (5 menit)

Dari folder `/workspaces/Noplace`:

```bash
npm install
```

**Tunggu sampai selesai** (akan ada banyak progress bar)

---

## 👉 Step 2: Setup Environment Files

```bash
cd backend && cp .env.example .env && cd ..
```

---

## 👉 Step 3: Download Go Modules

```bash
cd backend && go mod download && cd ..
```

---

## ✅ SELESAI! Semua error sudah hilang.

---

## 🎯 Sekarang Jalankan Services (Buka 3 Terminal Baru)

### Terminal 1️⃣ - BACKEND (Port 3001)
```bash
cd backend
go run main.go
```

**Output yang diharapkan:**
```
🚀 Server starting on port 3001
```

---

### Terminal 2️⃣ - WEB (Port 3000)
```bash
cd web
npm run dev
```

**Output yang diharapkan:**
```
▲ Next.js 15.0.0
- Local:        http://localhost:3000
```

Buka di browser: http://localhost:3000

---

### Terminal 3️⃣ - MOBILE 
```bash
cd mobile
npm start
```

**Tekan 'w' untuk Web Preview**

---

## 🐳 Atau Pakai Docker (1 Komando)

```bash
docker compose up -d
```

Selesai! Semua 4 service jalan:
- Backend: http://localhost:3001
- Web: http://localhost:3000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

---

## ❌ Kalau Masih Error

Coba ini:

```bash
# Clear cache
npm cache clean --force

# Install ulang
npm install

# Go modules
cd backend
go clean -modcache
go mod download
go mod tidy
cd ..
```

---

**Kalau masih ada masalah, kirim screenshot errornya!** 📸

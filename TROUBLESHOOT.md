# 🚨 npm Install Error - Troubleshooting Guide

Your `npm install` failed. Here's how to fix it:

## 🔍 Step 1: See the Full Error

Run this to see what went wrong:

```bash
npm install 2>&1 | tee npm-error.log
```

This saves the full error to `npm-error.log`. **Send me screenshot of the error!**

---

## 🛠️ Step 2: Try These Fixes (In Order)

### Option A: Clean Install (Recommended)
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Option B: Legacy Peer Dependencies
```bash
npm install --legacy-peer-deps
```

### Option C: Use Different Registry
```bash
npm config set registry https://registry.npm.org
npm install
```

### Option D: Exact Node Version
Check your Node version - must be 18 or higher:
```bash
node --version
```

If older, upgrade Node.js from https://nodejs.org/

---

## 📋 Checklist Before Installing

Make sure you're in the right folder:

```bash
# Must be here:
pwd
# Output should end with: /workspaces/Noplace

# Check files exist:
ls package.json
ls web/package.json
ls mobile/package.json
```

All three files must exist. If any missing, something went wrong.

---

## 🔧 If Still Failing

Check for common issues:

```bash
# 1. Check npm version (need 9+)
npm --version

# 2. Check Node (need 18+)
node --version

# 3. Check disk space (need 500MB+ free)
df -h /workspaces

# 4. Check internet (can you ping google?)
ping -c 1 google.com

# 5. Try installing just one workspace
npm install -w web
npm install -w mobile
```

---

## 💾 Nuclear Option (Final Resort)

If absolutely nothing works:

```bash
# Stop everything
pkill -f node
pkill -f npm

# Clean everything
rm -rf node_modules
rm -rf web/node_modules
rm -rf mobile/node_modules
rm -rf packages/*/node_modules
rm -rf package-lock.json

# Clear all npm cache
npm cache clean --force
npm cache verify

# Try again from fresh
npm install
```

---

## ⚠️ Common Errors & Solutions

### "ERESOLVE unable to resolve dependency"
```bash
npm install --legacy-peer-deps
```

### "ERR! 404 Not Found"
```bash
npm config set registry https://registry.npmjs.org
npm cache clean --force
npm install
```

### "EACCES: permission denied"
```bash
# Do NOT use sudo! Instead:
npm cache clean --force
npm install
```

### "npm ERR! code ENOENT"
Make sure you're in `/workspaces/Noplace` directory:
```bash
cd /workspaces/Noplace
npm install
```

---

## 📱 If npm fails, can still run backend+mobile!

Backend is Go (not Node):
```bash
cd backend
go mod download
go run main.go
```

Mobile can be run without npm (use Expo Go):
```bash
cd mobile
npx expo-cli start  # or just 'npx expo start'
```

---

## 📞 Tell Me:

When you run `npm install 2>&1 | tee error.log`:
1. **Screenshot the error** (take screenshot in terminal)
2. **Send full error message**
3. **Tell me your node version** (node --version)
4. **Tell me your npm version** (npm --version)

Then I can help fix it faster! 🚀

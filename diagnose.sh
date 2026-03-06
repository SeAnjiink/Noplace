#!/bin/bash

# NoPlace Debug Helper
# Jalankan di terminal untuk diagnostic

echo "📋 NoPlace System Diagnostic"
echo "============================"
echo ""

# Check Node
echo "Node:"
node --version
npm --version
echo ""

# Check Go
echo "Go:"
go version
echo ""

# Check disk space
echo "Disk Space:"
df -h /workspaces | tail -2
echo ""

# Check files exist
echo "Files Check:"
echo "  backend/ : $([ -d backend ] && echo '✅' || echo '❌')"
echo "  web/ : $([ -d web ] && echo '✅' || echo '❌')"
echo "  mobile/ : $([ -d mobile ] && echo '✅' || echo '❌')"
echo "  packages/ : $([ -d packages ] && echo '✅' || echo '❌')"
echo ""

# Check node_modules
echo "node_modules:"
echo "  root/ : $([ -d node_modules ] && echo '✅ Installed' || echo '❌ Missing')"
echo "  web/ : $([ -d web/node_modules ] && echo '✅ Installed' || echo '❌ Missing')"
echo "  mobile/ : $([ -d mobile/node_modules ] && echo '✅ Installed' || echo '❌ Missing')"
echo ""

# Check package.json
echo "package.json files:"
echo "  root/ : $([ -f package.json ] && echo '✅' || echo '❌')"
echo "  web/ : $([ -f web/package.json ] && echo '✅' || echo '❌')"
echo "  mobile/ : $([ -f mobile/package.json ] && echo '✅' || echo '❌')"
echo ""

# Check environment files
echo "Environment Files:"
echo "  backend/.env : $([ -f backend/.env ] && echo '✅' || echo '❌')"
echo "  web/.env.local : $([ -f web/.env.local ] && echo '✅' || echo '❌')"
echo ""

# Check Go modules
echo "Go Setup:"
echo "  go.mod exists : $([ -f backend/go.mod ] && echo '✅' || echo '❌')"
echo "  go.sum exists : $([ -f backend/go.sum ] && echo '✅' || echo '❌')"
echo ""

echo "============================"
echo "Diagnostic complete!"

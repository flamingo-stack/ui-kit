#!/bin/bash

# Development setup script for local testing
echo "Setting up UI Kit for local development..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if yalc is installed
if ! command -v yalc &> /dev/null; then
    echo "Installing yalc globally..."
    npm install -g yalc
fi

# Check if tsup is installed
if ! command -v tsup &> /dev/null; then
    echo "Installing tsup globally..."
    npm install -g tsup
fi

# Check if typescript is installed
if ! command -v typescript &> /dev/null; then
    echo "Installing typescript globally..."
    npm install -g typescript
fi

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install

# Build the library
echo -e "${BLUE}Building library...${NC}"
npm run build

# Publish to yalc
echo -e "${BLUE}Publishing to yalc store...${NC}"
yalc publish

echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "To use in your app:"
echo "  1. cd into your React app"
echo "  2. Run: yalc add @flamingo/ui-kit"
echo "  3. Run: npm install"
echo ""
echo "To start watch mode:"
echo "  Run: npm run yalc:watch"
echo ""
echo "Your app will auto-reload when you run 'yalc update' after changes."
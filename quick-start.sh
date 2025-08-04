#!/bin/bash

echo "🚀 Fusiox Contact Form Backend - Quick Start"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file with your email settings before starting the server"
    echo "   See SETUP.md for detailed instructions"
    echo ""
    echo "For Gmail setup:"
    echo "1. Enable 2-factor authentication"
    echo "2. Generate an App Password"
    echo "3. Update .env with your Gmail and app password"
    echo ""
    read -p "Press Enter to continue after editing .env file..."
else
    echo "✅ .env file exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Start the server
echo "🚀 Starting the server..."
echo "   Server will be available at: http://localhost:3000"
echo "   Contact form: http://localhost:3000/contact.html"
echo "   Health check: http://localhost:3000/api/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev 
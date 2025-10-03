#!/bin/bash

# Deployment script for EC2 server
echo "Starting deployment process..."

# Pull latest changes
echo "Pulling latest changes from git..."
git pull origin main

# Install dependencies
echo "Installing dependencies..."
npm install
npm install --prefix backend
npm install --prefix frontend

# Build frontend
echo "Building frontend..."
npm run build --prefix frontend

# Install serve globally if not already installed
echo "Installing serve globally..."
npm install -g serve

# Restart PM2 processes
echo "Restarting PM2 processes..."
pm2 restart ecosystem.config.js

# Show PM2 status
echo "PM2 Status:"
pm2 status

echo "Deployment completed successfully!"

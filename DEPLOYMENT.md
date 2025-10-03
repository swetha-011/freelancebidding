# Deployment Guide

## Prerequisites

1. EC2 instance running Ubuntu
2. Node.js and npm installed
3. PM2 installed globally (`npm install -g pm2`)
4. Git repository cloned on server
5. MongoDB running on server or accessible

## Server Setup

### 1. Install Dependencies

```bash
# Install Node.js (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install serve for static file serving
sudo npm install -g serve
```

### 2. Clone Repository

```bash
git clone https://github.com/yourusername/freelancebidding.git
cd freelancebidding
```

### 3. Install Project Dependencies

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 4. Build Frontend

```bash
npm run build --prefix frontend
```

### 5. Start with PM2

```bash
# Start all processes
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

## GitHub Actions Secrets

Add these secrets to your GitHub repository:

- `EC2_HOST`: Your EC2 public IP address
- `EC2_USERNAME`: Your EC2 username (usually `ubuntu`)
- `EC2_SSH_KEY`: Your private SSH key content

## Manual Deployment

To deploy manually:

```bash
# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## PM2 Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs

# Restart all processes
pm2 restart all

# Stop all processes
pm2 stop all

# Delete all processes
pm2 delete all
```

## Environment Variables

Create a `.env` file in the backend directory:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/freelancebidding
JWT_SECRET=your_jwt_secret_here
```

## Security Groups

Ensure your EC2 security group allows:
- Port 22 (SSH)
- Port 3000 (Frontend)
- Port 5000 (Backend)
- Port 27017 (MongoDB) - if external access needed

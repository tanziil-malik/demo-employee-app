# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files first (for caching optimization)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
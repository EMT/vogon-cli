# Dockerfile

# Use an official Node.js runtime as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Set environment variables (can be overridden by .env file during docker-compose)
ENV API_ENDPOINT=https://vogon.app/api

# Command to run the CLI in development mode
CMD ["npm", "run", "dev"]

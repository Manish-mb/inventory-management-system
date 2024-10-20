# Base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port
EXPOSE 3000

# Set environment variables
ENV NEXT_PUBLIC_BACKEND_API="http://backend:8000"

# Start the Next.js application
CMD ["npm", "start"]
# Use a Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app/Server

# Copy package.json and package-lock.json
COPY Server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server code
COPY Server/dist .
COPY Server/.env .

# Expose the server port
EXPOSE 8000

# Start the server
CMD ["node", "index.js"]

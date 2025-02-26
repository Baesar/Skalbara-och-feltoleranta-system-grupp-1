# Use Node.js Alpine for a smaller image
FROM node:19.9.0-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Set the default command to start the service
CMD ["node", "server.js"]

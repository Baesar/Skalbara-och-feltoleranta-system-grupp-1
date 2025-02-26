# Use Node.js Alpine for a smaller image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy application source code
COPY . .

EXPOSE 5001

# Set the default command to start the service
CMD ["node", "server.js"]

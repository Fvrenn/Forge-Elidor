FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose ports
EXPOSE 9000 7001

# Start Medusa in development mode
CMD ["npm", "run", "dev"]

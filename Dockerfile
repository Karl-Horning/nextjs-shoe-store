# Get latest version of Node.js
FROM node:latest

# Put files in app folder
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build production app using build arguments for environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_KEY
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_KEY=$NEXT_PUBLIC_API_KEY
RUN npm run build

# Ensure NODE_ENV is set to production
ENV NODE_ENV=production

# Start the application
CMD [ "npm", "start" ]

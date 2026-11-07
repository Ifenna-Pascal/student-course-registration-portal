# Base image
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the app
RUN npm run build

# Set the host environment variable
ENV HOST=0.0.0.0

# Copy the entrypoint script
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# Start the app using the entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
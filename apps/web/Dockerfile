# Use an official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining files to the container
COPY . .

# Build the application
RUN npm run build

# Set the command to run the application
CMD ["npm", "run", "dev"]

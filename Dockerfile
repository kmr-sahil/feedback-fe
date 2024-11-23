# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) first
# This allows us to install dependencies without copying the whole project initially
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your Next.js app's code into the container
COPY . .

# Build the Next.js app (to prepare for production)
RUN npm run build

# Expose the port that Next.js runs on
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "start"]

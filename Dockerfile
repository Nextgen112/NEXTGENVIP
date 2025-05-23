# Use Node.js v16 image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]

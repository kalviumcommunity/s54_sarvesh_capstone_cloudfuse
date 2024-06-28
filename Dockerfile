# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:latest

# Set the working directory
WORKDIR /app

# Install dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json .

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Build the Next.js app
# RUN npm run build

# Command to run the app
CMD ["npm", "run", "dev"]

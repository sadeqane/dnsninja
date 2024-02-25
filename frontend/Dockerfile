FROM node:18-alpine AS builder
#
#WORKDIR /app
#
#COPY package*.json ./
#RUN npm install
#
#COPY . .
#
#EXPOSE 3000
#
#CMD ["npm", "run", "dev"]

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
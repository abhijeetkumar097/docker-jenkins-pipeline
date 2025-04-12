FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && ls -la node_modules && cat package.json

COPY src ./src


FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

CMD npm i

COPY src ./src


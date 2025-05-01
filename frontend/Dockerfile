# frontend Dockerfile
FROM node:23-slim

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

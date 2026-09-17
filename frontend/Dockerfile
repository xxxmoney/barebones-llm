
FROM node:26-alpine AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm clean-install

COPY . .

CMD ["npm", "run", "dev"]

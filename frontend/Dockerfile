
FROM node:26-alpine AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm clean-install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

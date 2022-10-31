FROM node:lts-buster

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --save --legacy-peer-deps

COPY . .
EXPOSE 3000

CMD ["npm", "start"]

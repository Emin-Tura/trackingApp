FROM node:lts-buster as builder

WORKDIR /

COPY package.json package-lock.json ./

RUN npm install --save --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# FROM nginx


# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/build /usr/share/nginx/html
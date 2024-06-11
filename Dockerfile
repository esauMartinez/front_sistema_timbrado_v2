# etapa de compilacion
FROM node:16

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3100

CMD ["yarn dev"]


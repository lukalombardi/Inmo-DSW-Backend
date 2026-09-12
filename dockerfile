FROM node:22-alpine


RUN apk add --no-cache openssl

WORKDIR /home/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npx", "nodemon", "src/index.js"]
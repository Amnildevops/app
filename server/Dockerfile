FROM node:alpine

WORKDIR /app

COPY package-lock.json ./

COPY package.json ./

COPY ./ ./

RUN npm install

CMD [ "npm", "run", "start" ]
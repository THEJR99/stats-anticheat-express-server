FROM node:22-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5050

CMD [ "npm", "start" ]
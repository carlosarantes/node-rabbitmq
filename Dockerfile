FROM node:alpine

WORKDIR /usr/rabbitmqapp

COPY . .
RUN npm install

CMD [ "npm", "run", "start" ]
FROM node:8.7.0-alpine

WORKDIR /usr/src/app

RUN npm install && npm cache clean --force

ENV NODE_ENV production

EXPOSE 4000

CMD [ "npm", "start" ]
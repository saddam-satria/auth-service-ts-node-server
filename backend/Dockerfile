FROM node:14.16-alpine

WORKDIR /home/authentiate-server

COPY package*.json ./

RUN yarn install

COPY . ./

COPY ormconfig.js ./

RUN yarn run build

CMD [ "yarn", "start" ]
# pull official base image

FROM node:17.3.0-alpine

WORKDIR /poster

COPY ./package.json ./

RUN yarn install

COPY  . .

CMD ["npm", "run", "yarn"]



FROM node:16.14.0-alpine3.15
RUN mkdir /expenzo-fe
WORKDIR /expenzo-fe
COPY . .
RUN npm install
RUN npm rebuild node-sass
RUN npm run build

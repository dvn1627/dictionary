FROM node:12.11.0-buster

RUN mkdir -p /home/server/node_modules

COPY server/* /home/server/

WORKDIR /home/server
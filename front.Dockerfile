FROM node:8.16.0-jessie

WORKDIR /home/front/

COPY front/package*.json /home/front/

COPY front/* /home/front/
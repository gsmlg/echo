FROM node:alpine

MAINTAINER GSMLG < me@gsmlg.org >

ENV NODE_PORT=80 \
    NAME=echo

EXPOSE 80

COPY server.js /

ENTRYPOINT ["node", "/server.js"]

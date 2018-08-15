FROM node:alpine

MAINTAINER GSMLG < me@gsmlg.org >

ENV NODE_PORT=80 \
    NAME=echo \
    SERVER_NAME=echo.gsmlg.org

EXPOSE 80

COPY server.js entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]

FROM node:alpine

MAINTAINER GSMLG < me@gsmlg.org >

ENV NODE_PORT 80
ENV NAME echo

EXPOSE 80

COPY server.js entrypoint.sh echo.conf /

ENTRYPOINT ["/entrypoint.sh"]

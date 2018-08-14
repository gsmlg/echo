#!/bin/sh

set -e

NODE_PORT=${PORT:-80}

export NODE_PORT

[ ! -d /sites ] && mkdir /sites

sed "s/SERVER_NAME/${NAME:-echo}/g" "/echo.conf" | \
    sed "s/HOSTNAME/${HOSTNAME}/g" > "/sites/echo"

"node" "/server.js"


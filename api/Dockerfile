FROM node:7-alpine

RUN apk add --no-cache bash make git openssh python g++
RUN npm cache clean && npm install -g node-gyp

WORKDIR /opt/api

EXPOSE 3000

ENTRYPOINT ["/opt/api/entrypoint.sh"]
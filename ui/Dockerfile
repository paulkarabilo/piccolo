FROM node:7-alpine

RUN npm install -g @angular/cli@1.0.0 && npm cache clean

WORKDIR /opt/ui

EXPOSE 4200

ENTRYPOINT ["ng", "serve", "--proxy-config", "proxyconf.json", "--host", "0.0.0.0"]
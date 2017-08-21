FROM node:7-alpine

WORKDIR /opt/ui

RUN npm install -g @angular/cli@1.0.0 && npm cache clean

EXPOSE 4200

ENTRYPOINT ["/opt/ui/entrypoint.sh"]
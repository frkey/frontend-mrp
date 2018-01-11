FROM node:8.1-alpine

ADD dist /app

RUN cd app && npm install --global spa-serve

EXPOSE 8082

CMD cd app && spa-serve -p 8082

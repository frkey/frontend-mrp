FROM node:8.1-alpine

ADD dist /app

RUN npm install --global spa-serve

EXPOSE 8082

CMD cd app && spa-serve -p 8082

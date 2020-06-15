FROM node:current-slim

WORKDIR /usr/src/app
COPY package.json .
COPY /firebase/health-scheduler-server-1fa3e527711b.json .
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]

COPY . .
# # Use a lighter version of Node as a parent image
# FROM mhart/alpine-node:8.11.4

# # Set the working directory to /api
# WORKDIR /sentry-scheduler-server

# # copy package.json into the container at /api
# COPY package*.json /sentry-scheduler-server

# # install dependencies
# RUN npm install

# # Copy the current directory contents into the container at /api
# COPY . /sentry-scheduler-server

# # Make port 80 available to the world outside this container
# EXPOSE 8080

# # Run the app when the container launches
# CMD ["npm", "start"]

FROM node:current-slim

WORKDIR /usr/src/app
COPY package.json .
COPY /firebase/health-scheduler-server-1fa3e527711b.json .
RUN npm install

# EXPOSE 8080
# CMD [ "npm", "start" ]

# COPY . .
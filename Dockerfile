FROM ubuntu:xenial
MAINTAINER rob@computerlab.io
WORKDIR /opt/slack-deep-state/

# Installs system deps
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash
RUN apt-get install -y nodejs
RUN npm i -g pm2

# Installs application deps
COPY app/ .
RUN npm i

# Runs the application
CMD pm2 start --no-daemon --restart-delay 1000 ./bin/slack-deep-state.js

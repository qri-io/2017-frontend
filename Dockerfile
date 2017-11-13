FROM node:9.1.0

RUN mkdir -p ~/frontend
ADD . ~/frontend
# RUN yarn add
WORKDIR ~/frontend
RUN yarn test

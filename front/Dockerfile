FROM node:lts-alpine as builder

WORKDIR /front

ENV PATH /front/node_modules/.bin:$PATH

ENV REACT_APP_SIGNALING_SERVER=http://k10c109.p.ssafy.io:3001

# COPY package.json /front-edu/package.json
COPY . .

RUN npm install
# RUN npm install typescript @types/node @types/react @types/react-dom @types/jest react-router-dom redux react-redux

CMD ["npm", "start"]

EXPOSE 3000
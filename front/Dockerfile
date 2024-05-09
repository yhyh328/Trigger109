FROM node:lts-alpine as builder

WORKDIR /front

ENV PATH /front/node_modules/.bin:$PATH

ENV REACT_APP_SIGNALING_SERVER = http://k10c109.p.ssafy.io/live
ENV REACT_APP_STUN_SERVERS=stun:stun4.l.google.com:19302
ENV REACT_APP_TURN_SERVERS=turn:numb.viagenie.ca
ENV CORS_ORIGIN=http://k10c109.p.ssafy.io:3000
ENV DB=mongodb://k10c109.p.ssafy.io:27017/kakao-talk
# COPY package.json /front-edu/package.json
COPY . .

RUN npm install
# RUN npm install typescript @types/node @types/react @types/react-dom @types/jest react-router-dom redux react-redux

CMD ["npm", "start"]

EXPOSE 3000
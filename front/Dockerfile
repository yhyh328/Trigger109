FROM node:lts-alpine as builder

WORKDIR /front

ENV PATH /front/node_modules/.bin:$PATH

ENV REACT_APP_SIGNALING_SERVER=https://k10c109.p.ssafy.io
ENV REACT_APP_STUN_SERVERS=stun:stun4.l.google.com:19302
ENV REACT_APP_TURN_SERVERS=turn:numb.viagenie.ca
ENV CORS_ORIGIN=https://k10c109.p.ssafy.io
ENV DB=mongodb://k10c109.p.ssafy.io:27017/kakao-talk
# COPY package.json /front-edu/package.json
COPY . .

# RUN npm install
RUN npm install --legacy-peer-deps

# RUN npm install typescript @types/node @types/react @types/react-dom @types/jest react-router-dom redux react-redux

CMD ["npm", "start"]

EXPOSE 3000
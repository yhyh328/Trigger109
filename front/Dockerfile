FROM node:14-alpine as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_SIGNALING_SERVER=https://k10c109.p.ssafy.io
ENV REACT_APP_STUN_SERVERS=stun:stun4.l.google.com:19302
ENV REACT_APP_TURN_SERVERS=turn:numb.viagenie.ca
ENV CORS_ORIGIN=https://k10c109.p.ssafy.io
ENV DB=mongodb://k10c109.p.ssafy.io:27017/kakao-talk

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g serve

RUN npm run build

FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules/serve ./node_modules/serve

EXPOSE 3000

CMD ["serve", "-s", "build"]

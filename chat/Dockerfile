# 기반 이미지 설정
FROM node:latest

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 소스 코드 복사
COPY . .

# 의존성 설치
RUN npm install

# 포트 설정
EXPOSE 3000

# 어플리케이션 실행
CMD ["node", "index.js"]
# 이미지 빌드를 위한 베이스 이미지
FROM node:lts-alpine as builder

# 앱 디렉토리 생성
WORKDIR /app

# 앱 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 앱 빌드
RUN npm run build

# nginx 이미지를 이용하여 앱 배포를 위한 Docker 이미지 생성
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
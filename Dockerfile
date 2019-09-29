# build
FROM node:8.7.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install && npm cache clean --force && npm run build

# sttic file server
FROM nginx:1.17.0

WORKDIR /usr/src/app

COPY --from=0 /usr/src/app/public ./public
COPY --from=0 /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]

FROM godotdotdot/blog-base

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

RUN yarn build

# 暴露端口
EXPOSE 9000

CMD yarn serve
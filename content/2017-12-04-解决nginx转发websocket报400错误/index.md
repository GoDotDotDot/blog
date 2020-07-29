---
title: 解决nginx转发websocket报400错误
path: blog/解决nginx转发websocket报400错误
date: 2017-12-04
tags: [nginx]
cover: ./cover.png
categories: 填坑
description: "解决nginx转发websocket报failed: Error during WebSocket handshake: Unexpected response code: 400错误"
excerpt: "解决nginx转发websocket报failed: Error during WebSocket handshake: Unexpected response code: 400错误"
---

## 说明

由于个人服务器上面有多个项目，配置了二级域名，需要对二级域名进行转发，在转发工作这快采取了大名鼎鼎的`nginx`。在这之前所有的项目运行转发都没问题，然而今天在部署一个具有`websocket`通信的项目时，却意外的报错了，错误消息如下：

```javascript
failed: Error during WebSocket handshake: Unexpected response code: 400
```

。这个错误在本地测试环境以及访问非`nginx`转发都没有问题，由此推断出问题应该出现在`nginx`转发这个环节。

于是，在`google`的帮助下，看到了`socket.io` 官方`issues`有关于这个问题的讨论，链接：https://github.com/socketio/socket.io/issues/1942

## 解决方案

看了下讨论区说的方案，问题出现在`nginx`的配置文件，需要修改`nginx.conf`文件。在`linux`终端中敲入`vim /etc/nginx/nginx.conf`，找到`location`这个位置，配置文件如下所示：

```shell
server {
        listen       80;
        server_name  school.godotdotdot.com;
        charset utf-8;

        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_set_header Host $host;
            proxy_http_version 1.1; 
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_connect_timeout 60;
            proxy_read_timeout 600;
            proxy_send_timeout 600;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }
```

其中最重要的是下面这三行

```shell
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
```

其中第一行是告诉`nginx`使用`HTTP/1.1`通信协议，这是`websoket`必须要使用的协议。

第二行和第三行告诉`nginx`，当它想要使用WebSocket时，响应`http`升级请求。


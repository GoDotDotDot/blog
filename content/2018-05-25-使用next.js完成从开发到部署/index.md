---
title: 使用next.js完成从开发到部署
path: blog/使用next.js完成从开发到部署
date: 2018-05-25
tags: [reactjs, nodejs, nextjs]
cover: ./cover.png
categories: 2018·前端
description: 使用next.js完成从开发到部署。next.js 是一个非常棒的轻量级的react同构框架，使用它可以快速的开发出基于服务端渲染的react应用。在next.js 官网推荐的是使用now来部署应用，但是对于国内用户或者说是有特殊需求的用户来说，部署到自定义服务器也许是大多数人希望的。借着近期公司官网改版，顺便分享下自己从开发到部署过程中所经历的点点滴滴。
excerpt: 使用next.js完成从开发到部署。next.js 是一个非常棒的轻量级的react同构框架，使用它可以快速的开发出基于服务端渲染的react应用。
---

# 使用next.js完成从开发到部署

[next.js](https://github.com/zeit/next.js) 是一个非常棒的轻量级的`react`同构框架，使用它可以快速的开发出基于服务端渲染的`react`应用。在[next.js](https://github.com/zeit/next.js) 官网推荐的是使用`now`来部署应用，但是对于国内用户或者说是有特殊需求的用户来说，部署到自定义服务器也许是大多数人希望的。借着近期公司官网改版，顺便分享下自己从开发到部署过程中所经历的点点滴滴。

依稀还记得第一次使用[next.js](https://github.com/zeit/next.js) 是在去年（2017年），那个时候使用的是[next.js](https://github.com/zeit/next.js)  2.x版本，`react`还是15版本，一年过去，现在`react`已经发展到16版本，而[next.js](https://github.com/zeit/next.js) 已经发展到6.0版本了，迭代速度瞠目结舌，在使用新版本的过程中也是遇到不少的坑。

## 用到的技术

先说下这次用到了哪些技术，下面列举了项目中主要用到的技术或工具库。

- [Koa 2](https://koajs.com/) 

> 由express原班人马开发的下一代web框架，用来提供web服务。

- [nginx](http://nginx.org/)

> 是一个高性能的HTTP和反向代理服务器，也是一个IMAP/POP3/SMTP服务器（摘自百度百科），由俄罗斯人开发。用来提供静态文件服务、https证书、代理服务。

- [react](https://reactjs.org/) 16.3

> 一个javascript ui库


- [next.js ](https://nextjs.org/) 6.0.1

> 一个轻量级的[react](https://reactjs.org/)同构应用框架


- [ant design](https://ant.design)

> 由蚂蚁金服开发的基于`react的`一套中后台产品组件库

- [react-motion](https://github.com/chenglou/react-motion)

> 基于`react`的动画解决方案

- [react-waypoint](https://github.com/brigade/react-waypoint)

> 判断组件是否在当前可视区的`react` 组件

- [pm2](https://github.com/Unitech/pm2)

> 一个带有负载均衡功能的Node应用的进程管理器  

- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)

> 同构WHATWG Fetch API

## 开发阶段 

讲了这么多，让我们进入开发阶段，第一步构建项目架构，这里分享下自己的项目结构：

📁 **.vscode**

> `vscode` 配置文件

📁  **component**

> [react](https://reactjs.org/)组件

📁 **common**

> 公共部分，我放置的是导航栏信息、全局变量和全局样式等等

📁  **pages**

> 项目所有页面入口，也是[next.js ](https://nextjs.org/) 各页面入口文件

📁 **static**

> 静态文件

📁 **styles**

> 各页面样式表

🗄  **index.js** 

> node启动文件

🗄 **.babelrc**

> [babel](http://babeljs.io/)配置文件

🗄 **.gitignore**

> git 配置文件

🗄 **ecosystem.config.js**

> [pm2](https://github.com/Unitech/pm2)配置文件

🗄 **next.config.js**

> [next.js ](https://nextjs.org/)配置文件

🗄 **postcss.config.js**

> [postcss ](https://postcss.org/)配置文件

🗄 **nginx.conf**

> [nginx](http://nginx.org/)配置文件

🗄**package.json**

> npm配置文件

在完成了项目结构配置之后，假设你已经在`package.json`中保存了我们所需要的所有依赖，让我们尝试着输入`yarn`来安装依赖。这里假设安装一切顺利，下面继续我们的开发之旅。

首先，在`pages`文件下新建一个`index.js`，这里就随便从我真实项目中抽取部分代码来作师范。

```javascript
export default class HomePage extends React.Component {
  static async getInitialProps({ req, pathname }) {
    const data = await fetch(`${ctx}/api/projects/common/list`).then(res => res.json())
    .then(dt => dt)
    .catch(err => {
      return {
        success: false,
        message: err.message
      }
    })
    return { pathname,data };
  }

  render() {
    const { pathname, data } = this.props;
    return (
      <div>
         <Head>
          <title>首页-易科捷（武汉）生态科技有限公司</title>
        </Head>
        <div>Welcome to next.js!</div>
    	{/*这里省略代码*/}
      </div>
    );
  }
}

```

如果你的`package.json`中没有配置`next`启动脚本，请访问[setup](https://github.com/zeit/next.js#setup)进行配置，下面我们在控制台运行`npm run dev`，如果一切顺利，打开浏览器，你将会看到`Welcome to next.js!`

在`next.js`中开发体验和`react`几乎没有什么区别，但是在`webpack`配置这块可能需要下点功夫。一些常用的插件像`sass`、`css `等，  `next.js`都已经给你提供了，你也可以使用社区开源的插件来完成你的开发之旅。详情请查看[next.js官网](https://github.com/zeit/next.js)。

## 部署

在经历了开发阶段、测试等等一系列流程，现在终于等到了部署阶段。在`next.js`中生产阶段打包只需要运行`npm run build`即可，官方推荐不修改打包的文件夹名字（原名称为`.next`），这里个人推荐修改成`build`或者`dist`这些名称。在打包完成之后，需要编写`nodejs`启动入口文件，下面贴出实例代码：

```javascript
const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()
	// 首页
    router.get('/', async ctx => {
      await app.render(ctx.req, ctx.res, '/', ctx.query)
      ctx.respond = false
    })
	// 关于
    router.get('/about', async ctx => {
      await app.render(ctx.req, ctx.res, '/about', ctx.query)
      ctx.respond = false
    })
	// 产品
    router.get('/products/:id', async ctx => {
      const {id} = ctx.params
      await app.render(ctx.req, ctx.res, `/products/${id}`, ctx.query)
      ctx.respond = false
    })
	// 案例
    router.get('/case', async ctx => {
      await app.render(ctx.req, ctx.res, '/case', ctx.query)
      ctx.respond = false
    })
	// 联系我们
    router.get('/contact', async ctx => {
      await app.render(ctx.req, ctx.res, '/contact', ctx.query)
      ctx.respond = false
    })
	// 详情
    router.get('/view/:type/:id', async ctx => {
      const {id, type} = ctx.params
      await app.render(ctx.req, ctx.res, `/view`, {id, type})
      ctx.respond = false
    })
    // 如果没有配置nginx做静态文件服务，下面代码请务必开启
   /* router.get('*', async ctx => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })*/
    // 防止出现控制台报404错误
    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })
    server.use(router.routes())
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })

```

一般的静态文件、gzip压缩无需交给`nodejs`来做，个人一直认为专业的事交给专业的人。这里将该项任务转移给`nginx`，特别注意上面实例代码中我注释的部分代码，若果你没有使用`nginx`来做静态文件服务，请务必开启，否则像`next.js`打包出来的`js`、`css`、图片文件等，都将报`404`。

在`next.js`生产打包阶段打包出来的`js`文件请求路径中带有版本号，而真实打包出来的文件夹却没有实际对应的目录，也就是打包出来的是虚拟目录，这里如果使用`nginx`就需要特别注意。好在`next.js`提供配置项来修改`build id`，以下是我的真实代码：

```javascript
// next.config.js
module.exports = {
  generateBuildId: async () => {
    // For example get the latest git commit hash here
    return 'v1'
  }
}
```

这样打包出来的虚拟路径大概是`_next/v1/page/xxx.js`，如果你使用`cdn`前缀，这里有一点区别，但是版本号依然存在。

还有一个坑就是`next.js`打包出来的有三个文件夹：`bundles`、`dist`、`static`，对于不知道源码的人来说，根本不知道实际请求文件在哪一个文件夹。于是我就看`next.js`源码，发现其实找的是`bundle`文件下的`page`，源码位置：[L214](https://github.com/zeit/next.js/blob/e9242705a3c75fa480250ef623b926b6140b1bf5/server/index.js#L214)

所以在配置`nginx`就需要使用别名。下面给出一段我的`nginx`真实配置代码：

```nginx
		# 网站根目录文件
        location ~ ^/(robots.txt|humans.txt|favicon.ico|sw.js|baidu_verify_7Kj6tQjI3v.html) {
            root /home/website/eco_website_pc/static/;
            if ($request_filename ~* sw.js){
                    expires -1s;
                }
            expires 10m;

	    }
        # static下的文件
        location ^~ /static/ {
            alias /home/website/eco_website_pc/static/;
            if ($request_filename ~* sw.js){
                    expires -1s;
                }
            expires 10m;

	    }
        # next pages页面下的脚本
        location ~ ^/(/_next/v1/) {
            alias /home/website/eco_website_pc/build/bundles/;
            if ($request_filename ~* sw.js){
                    expires -1s;
                }
            expires 10m;

	    }
        # next static下的静态文件
        location ~ ^/(/_next/static/) {
            root /home/website/eco_website_pc/build;
            if ($request_filename ~* sw.js){
                    expires -1s;
                }
            expires 10m;

	    }
```

静态文件配置好了就需要配置`https`证书了，因为我们这次项目是公司官网，证书我就自己去免费弄了一个，这里我使用的[freessl](https://freessl.org/)上面提供的亚洲诚信的证书。在申请完`ssl`证书之后需要去域名提供商那里去配置`TXT`记录，我这里使用的是阿里云，在完成验证后，[freessl](https://freessl.org/)将会下载证书，拿到该证书之后需要去配置`nginx` `ssl`证书，下面贴出我的完整配置：

```nginx
server {
        listen       80;
        listen       443 ssl;
        server_name  wh-eco.com;
        charset utf-8;
        ssl_certificate /home/website/ssl/www/full_chain.pem;
        ssl_certificate_key /home/website/ssl/www/private.key;
        fastcgi_param   HTTPS               on;
        fastcgi_param   HTTP_SCHEME         https;

        if ($scheme = http ) {
          return 301 https://$host$request_uri;
        }
        access_log      /var/log/nginx/www.wh-eco.com.access.log;
        error_log       /var/log/nginx/www.wh-eco.com.error.log;
        location / {
            proxy_pass http://127.0.0.1:xxxx; #保密 0.0
            proxy_set_header Host $host;
            #proxy_redirect off;
            proxy_set_header    REMOTE-HOST $remote_addr;
        	# 网站可能后期会使用websocket 特次升级请求协议
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	        proxy_connect_timeout 60;
            proxy_read_timeout 600;
            proxy_send_timeout 600;
        }
        # 网站根目录文件
        location ~ ^/(robots.txt|humans.txt|favicon.ico|sw.js|baidu_verify_7Kj6tQjI3v.html) {
            root /home/website/eco_website_pc/static/;
            if ($request_filename ~* sw.js){
                    expires -1s;
                }
            expires 10m;

	    }
        # static下的文件
        location ^~ /static/ {
            alias /home/website/eco_website_pc/static/;
            if ($request_filename ~* sw.js){
                    expires -1s;
                }
            expires 10m;

	    }
        # next pages页面下的脚本
        location ~ ^/(/_next/v1/) {
            alias /home/website/eco_website_pc/build/bundles/;
            if ($request_filename ~* sw.js){
                    expires -1s;
                }
            expires 10m;

	    }
        # next static下的静态文件
        location ~ ^/(/_next/static/) {
            root /home/website/eco_website_pc/build;
            if ($request_filename ~* sw.js){
                    expires -1s;
                }
            expires 10m;

	    }
        error_page   500 502 503 504 = /error.html;
        error_page  404 = /notfound.html;
        location = /error.html {
                root   /home;
            }
        location = /notfound.html{
            root  /home;
        }
    }
```

至于`gzip`你可以根据你要求来做配置，贴一个我的示例配置：

```nginx
 	gzip  on;
    gzip_comp_level 6;
    gzip_vary on;
    gzip_types
        application/atom+xml
        application/javascript
        application/json
        application/rss+xml
        application/vnd.ms-fontobject
        application/x-font-ttf
        application/x-web-app-manifest+json
        application/xhtml+xml
        application/xml
        font/opentype
        image/svg+xml
        image/x-icon
        image/jpeg 
        image/gif 
        image/png
        text/css
        text/plain
        text/x-component;
```

在完成`nginx`配置之后需要做的是以`pm2`方式启动整个应用

```shell
pm2 start ecosystem.config.js
```

在运行完上述命令后，如果一切顺利，你就可以输入域名来访问你的应用了（假设你已经完成了域名解析工作）。

## 总结

一入前端深似海

--------------------

[Github](https://github.com/GoDotDotDot)  |  [博客](https://blog.godotdotdot.com/)






---
title: 基于webpack 3.x + react v16 + antdesign开发环境配置
date: 2017-12-01 18:00:19
tags: [react,webpack,antdesign]
categories: 2017·前端
description: webpack 3、react 16、antdesign开发环境配置
---

## 基于webpack 3.x + react v16 + antdesign开发环境配置

## 说明

**这篇文章比较适合刚入门react或者webpack的同学，目的为了减少大家在学习如何配置webpack开发环境时花费的大量时间。**

学习一个新的开发模式对于功底不是很厚的同学来说是有一定的技术难度的，尤其在配置一些复杂的开发环境时显得非常疲软，新手应该更专注于学习新的技术栈，而不是投入大量的时间精力在工具上。因此我结合自己的开发经验，配置了一份比较完整的react开发配置，希望能够给同学们提供一个舒适的环境，在自己有能力配置一套完整的开发环境时，最好还是回过头配置一份属于你自己的开发环境。

本开发环境采用使用了如下产品：

- webpack 3.x
- react （版本不限制）
- ant design（蚂蚁金服的基于react开发的一套UI库，非常棒，力推）

## 配置地址

https://github.com/MeteDesign/Webpack 

该库具有两个分支，分别是`master`和`antdesign`，详细差别将会在下面的**分支说明**部分解释。

### 安装

```powershell
$ git clone https://github.com/MeteDesign/Webpack.git
$ cd Webpack
```

在下载好之后，需要安装下依赖文件：

```powershell
$ yarn
```

或者

```powershell
$ npm install
```

**切记：请在开始你的项目之前，请先运行 `npm run generdll`，该命令是为了生成DLL文件，提升开发环境的编译速度 **

### 开发环境

```powershell
$ npm run dev
```

### 生产环境

```powershell
$ npm run build
```

运行该命令之后，你将会在根目录看到一个`dist`文件夹，如果需要部署，请将它放到你的服务器上。

## 分支说明

### master

该分支是一个比较基础的react开发环境，项目架构比较单一，适合刚入门的同学使用。

#### 说明

当你运行`npm run dev`，然后在浏览器上输入 `localhost:4000`，如果你看到如下图所示的界面，那么恭喜你，可以继续你的学习之旅。如果报错，请以`issues`的形式向我报告，有时间我会第一时间回复你。

![img](https://camo.githubusercontent.com/7a73290e05d361d0399ec4a9b624193ae72450cc/687474703a2f2f626c6f672e676f646f74646f74646f742e636f6d2f7374617469632f6d65746564657369676e5f62617369632e706e67)](https://camo.githubusercontent.com/7a73290e05d361d0399ec4a9b624193ae72450cc/687474703a2f2f626c6f672e676f646f74646f74646f742e636f6d2f7374617469632f6d65746564657369676e5f62617369632e706e67)

##### 特性

在该配置下，你能够使用以下的特性

- 公共chunk抽取
- DLL 支持
- 提取css到一个单一文件中
- 多入口文件支持
- 热替换支持
- 长期缓存支持
- Postcss 支持
- sass/less/css css预处理器支持
- 压缩优化代码支持
- ...

更多的特性请前往 `webpack.config.js`查询。

### antdesign

该分支适配了`ant design` ui库，是一个比较完整的开发环境，项目架构基本完善，适合已经入门，想要一些更高层次的调整的同学。

#### 说明

当你运行`npm run dev`，然后在浏览器上输入 `localhost:4000`，如果你看到如下图所示的界面，那么恭喜你，可以继续你的学习之旅。如果报错，请以`issues`的形式向我报告，有时间我会第一时间回复你。

![](http://blog.godotdotdot.com/static/metedesign_antd.png)

当你输入 `localhost:4000/login.html`, 你会看到如下所示的登录页面，同样如果有错，请向我提`issues`。

![](http://blog.godotdotdot.com/static/metedesign_login.png)

该配置文件使用了多入口文件，分别是`main`和`login`，如果使用过`ant-design-pro`的同学不难会发现，样式非常相似。在搭建项目时，我参考了 [ant-design-pro](https://preview.pro.ant.design/#/dashboard/analysis)的设计风格。但是在侧边栏部分，我添加了代码使得侧边栏不会随着页面滑动而变化。

##### 特性

在该配置中，你能够使用到以下特性：

- 公共chunk抽取
- DLL 支持
- 懒加载支持
- 提取css到一个单一文件中
- 多入口文件支持
- 热替换支持
- 长期缓存支持
- Postcss 支持
- sass/less/css css预处理器支持
- 压缩优化代码支持
- ...

更多的特性请前往 `webpack.config.js`查询。其中懒加载功能请按照`commom/nav.js`中所示，添加你的路由文件来实现懒加载功能。

**请大家能够批评指出，共勉。**
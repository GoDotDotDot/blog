---
title: 我们应该做些力所能及的优化
path: blog/我们应该做些力所能及的优化
date: 2018-09-24
cover: ./cover.jpeg
tags: [杂谈]
categories: 探讨
description: "在web应用开发过程中，我们经常谈及到的就是优化，而优化往往又是既简单而又复杂的过程，优化这个命题很广，最终体现出来的都是用户体验问题，我们一切优化都是为了用户体验。为什么说简单？在现代web开发生态中，有非常优秀的工具链帮助我们做一些很实际的优化工作，例如`webpack`。这些工具可以很好的帮助我们解决包之间的依赖、减小包大小、提取公共模块等等问题。为什么说复杂？优化这个话题我们谈了很多年，只要有用户群，优化问题就会一直存在。而优化工作涉及的领域特别广，包含的因素又特别多，有时候需要针对特定的场景做特殊的优化工作，所以说又很复杂。不管是简单还是复杂，作为程序员，我们应当做一些我们力所能及的优化工作，本文属于探讨性话题，希望广大网友能够在留言区留下您的一些思考"
excerpt: "在web应用开发过程中，我们经常谈及到的就是优化，而优化往往又是既简单而又复杂的过程，优化这个命题很广，最终体现出来的都是用户体验问题，我们一切优化都是为了用户体验。"
---

本文2941字，预计阅读时间5分钟。

在web应用开发过程中，我们经常谈及到的就是优化，而优化往往又是既简单而又复杂的过程，优化这个命题很广，最终体现出来的都是用户体验问题，我们一切优化都是为了用户体验。为什么说简单？在现代web开发生态中，有非常优秀的工具链帮助我们做一些很实际的优化工作，例如`webpack`。这些工具可以很好的帮助我们解决包之间的依赖、减小包大小、提取公共模块等等问题。为什么说复杂？优化这个话题我们谈了很多年，只要有用户群，优化问题就会一直存在。而优化工作涉及的领域特别广，包含的因素又特别多，有时候需要针对特定的场景做特殊的优化工作，所以说又很复杂。不管是简单还是复杂，作为程序员，我们应当做一些我们力所能及的优化工作，本文属于探讨性话题，希望广大网友能够在留言区留下您的一些思考。

## Code Splitting

这里不探讨如何书写高性能的代码，而是探讨下我们书写的代码该如何被构建。这里以[webpack](https://webpack.js.org/)为构建工具（版本为4.19），来阐述下在[webpack](https://webpack.js.org/)我们该做的优化工作。

[webpack](https://webpack.js.org/)从`v4`版本开始，做了很多的优化工作，详情请看[这里](https://medium.com/webpack/webpack-4-beta-try-it-today-6b1d27d7d7e2) 。我们就拿`Code Splitting`说起，`Code Splitting`是[webpack](https://webpack.js.org)一项重要的编译特性，能够帮助我们将代码进行拆包，抽取出公共代码。利用这项特性我们可以做更多的优化工作，减少加载时间，例如可以做按需加载。而在[webpack](https://webpack.js.org)中开启`Code Splitting``Code Splitting`也很简单，它是一项开箱即用的插件，示例代码如下：

```javascript
module.export = {
    // ...
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}
```

上面的`chunks`配置建议大家配置为`all`，详细配置请参考：[splitChunks.chunks](https://webpack.js.org/plugins/split-chunks-plugin/#splitchunks-chunks)

这里给出个参考结果：分别为配置前和配置后

![配置前](https://blog.godotdotdot.com/public/images/code_splitting_before.png)

![配置后](https://blog.godotdotdot.com/public/images/code_splitting_after.png)

这里明显多出了几个包含`vendors~`字样的文件，而且你会发现`app`这个文件被提取出了`vendors~app~react_vendor`和`vendors_app_redux_vendor`这两个文件。至于最大的文件为什么还有**1.02M**，我们可以使用`analyze`来分析下包的结构，这里是由于包含了`antd`的文件。

在实际开发过程中，路由也是需要进行`Code Splitting`，在过去我们经常使用[bundle-loader](https://webpack.js.org/loaders/bundle-loader)，来帮助我们进行代码分割，它是基于[require.ensure](https://webpack.js.org/api/module-methods/#require-ensure)接口进行实现。既然我们可以对路由进行代码分割，那么路由页面中的组件我们是否可以按需加载，实现代码分割呢？答案是显然的。

这种业务场景也是非常的多，这里我举一个例子，就是一个登录页面，登录有多种方式，其中最常见的就是账号登录和扫码登录，默认为扫码登录。当用户没有选择账号登录，那么按道理这部分代码我们可以不进行加载，从而减少加载时间，优化用户体验。我们建议能进行**组件级**分割就分割，最大化减小页面大小。

在`React`中虽然也可以使用[bundle-loader](https://webpack.js.org/loaders/bundle-loader)来实现组件级代码分割，但是也会有一些[问题](https://github.com/ReactTraining/react-router/issues/5418)。在后来，`React Router`官方也推荐使用[react-loadable](https://github.com/jamiebuilds/react-loadable)来进行代码分割。强烈建议`React`使用者使用此库，该库的功能很强大，是基于[import()](https://github.com/tc39/proposal-dynamic-import) 实现。它可以实现预加载、重新加载等等强大功能。

![](https://blog.godotdotdot.com/public/images/react_loadable.png)

## Tree Shaking

如果你对自己编写的代码很了解，你可以通过在`package.json`中添加`sideEffects`来启用`Tree Shaking`，即摇树优化，帮助我们删掉一些不用的代码。这里不再赘述，详情可以点击[Tree Shaking](https://webpack.js.org/guides/tree-shaking/)。

## Dynamic import

在谈到`Code Spliting`时，我们不得不想到`dynamic import`，在之前版本的[webpack](https://webpack.js.org)中，我们想实现动态加载使用的是[require.ensure](https://webpack.js.org/api/module-methods/#require-ensure) ，而在新版本中，取而代之的[import()](https://github.com/tc39/proposal-dynamic-import) ，这是TC39关于使用[import()](https://github.com/tc39/proposal-dynamic-import)的提案，而目前[import()](https://github.com/tc39/proposal-dynamic-import)兼容性如下：

![import()](https://blog.godotdotdot.com/public/images/caniuse_dynamic_import.png)

[import()](https://github.com/tc39/proposal-dynamic-import)返回一个`Promise`，如果你想使用它请确保支持`Promise`或者使用`Polyfill`，在想使用[import()](https://github.com/tc39/proposal-dynamic-import)前，我们还得使用预处理器，我们可以使用[@babel/plugin-syntax-dynamic-import ](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import/#installation)插件来帮助[webpack](https://webpack.js.org)解析。[webpack](https://webpack.js.org)官方给了我们一个`dynamic import` 的[示例](https://webpack.js.org/guides/code-splitting/#dynamic-imports)，这里我就不做举例。使用[import()](https://github.com/tc39/proposal-dynamic-import)我们可以很方便的实现`preload`预加载、懒加载以及上面谈到的`Code Splitting`。

## Polyfill

`Polyfill`现在对于大家来说应该并不陌生，他可以帮助我们使用一些浏览器目前并不支持的特性，例如`Promise`。在[Babel](https://babeljs.io/)中，官方建议使用[babel-preset-env](https://babeljs.io/docs/en/babel-preset-env)配合[.browserslistrc](https://github.com/browserslist/browserslist)，开发人员可以无需关心目标环境，提升开发体验。尤其在`Polyfill`方面，只要我们配置好[.browserslistrc](https://github.com/browserslist/browserslist)，[Babel](https://babeljs.io/) 就可以智能的根据我们配置的浏览器列表来帮助我们自注入`Polyfill`，比如：

.babelrc

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ]
  ]
}
```

[useBuiltIns](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) 告诉[babel-preset-env](https://babeljs.io/docs/en/babel-preset-env)如何配置`Polyfill` ，这里我配置为：`entry`，然后在[webpack](https://webpack.js.org)入口文件中引入`import '@babel/polyfill'`即可，这里注意不能多次引入`import '@babel/polyfill'`，否则会报错。

.browserslistrc

```
> 1%
Last 2 versions
```

这样就完成了自动根据[.browserslistrc](https://github.com/browserslist/browserslist)注入`Polyfill`，**但是这样有一个问题，就是所有的浏览器都会有`Polyfill`的并集**。每个浏览器之间的特性具有很大的差异，为了尽可能的减小包的大小，我们可以为每个主流浏览器单独生成`Polyfill`，不同的浏览器加载不同的`Polyfill`。

## 首屏文件

SPA程序打包出来的html文件一般都是很小的，也就2kb左右，似乎我们还可以利用下这个大小做个优化，有了解[初始拥塞窗口](https://tylercipriani.com/blog/2016/09/25/the-14kb-in-the-tcp-initial-window/) 的同学应该知道，通常是14.6KB，也就意味着这我们还能利用剩下的12KB左右的大小去干点什么，这了我建议内联一些首屏关键的css文件（可以使用[criticalCSS](https://github.com/filamentgroup/criticalCSS)），或者将css初始化文件内联进去，当然你也可以放其他东西，这里只是充分利用下[初始拥塞窗口](https://tylercipriani.com/blog/2016/09/25/the-14kb-in-the-tcp-initial-window/) 特性。

这里顺便讲下css初始化，css初始化有很多种选择，其中有三种比较出名的，分别是：[normalize.css](https://github.com/csstools/normalize.css) 、[sanitize.css](https://github.com/csstools/sanitize.css) 和 [reset.css](http://meyerweb.com/eric/tools/css/reset/) 。关于这三种的区别我就直接[引用](https://www.npmjs.com/package/sanitize.css#differences)了。

> [normalize.css](https://github.com/csstools/normalize.css) and [sanitize.css](https://github.com/csstools/sanitize.css) correct browser bugs while carefully testing and documenting changes. normalize.css styles adhere to css specifications. sanitize.css styles adhere to common developer expectations and preferences. [reset.css](http://meyerweb.com/eric/tools/css/reset/) unstyles all elements. Both sanitize.css and normalize.css are maintained in sync. 

## 缓存

在利用[webpack](https://webpack.js.org)打包完之后，我们有些文件几乎不会变更，比如我这里列举的`react`、`redux`、`polyfill`相关的文件。

```javascript
 entry: {
    react_vendor: ['react', 'react-dom', 'react-router-dom'],
    redux_vendor: ['react-redux','redux', 'redux-immutable','redux-saga', 'immutable'],
    polyfill: '@babel/polyfill',
    app: path.join(process.cwd(),'app/app.js')
  }
```

这些不变的文件我们就可以好好的利用下，常见(http 1.1)的就是设置`Etag`，`Last-Modified`和`Cache-Control` 。前面两种属于对比缓存，还是需要和服务器通信一次，只有当服务器返回`304`，浏览器才会去读取缓存文件。而`Cache-Control`属于强制缓存，服务器设定`max-age` 当过了设定的时间后才会向服务器发起请求。这里打包再配上`chunk-hash`几乎可以完美的配置缓存。

当然还可以利用[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage)来做缓存，这里提出一种思路，是我以前在效仿百度首页缓存机制想的。我们可以在把js文件版本号弄成一个配置，同时存储在服务端和客户端，比如：

```json
{
    "react_version": 16.4,
    "redux_version": 5.0.6,
    "web_version": 1.0
}
```

客户端将该版本号存储在`cookie`或其他存储引擎中，这里推荐[localForage](https://github.com/localForage/localForage)来做存储。服务端将最新版本号渲染到html文件中，然后通过js脚本对比版本号，如若版本号不同，则进行加载对应的js文件，加载成功后再存储到本地存储中。如果相同，则直接取本地存储文件。

还有一种缓存的场景，就是有一些api服务端更新的进度很慢，比如一天之内访问的数据都是一样的，这样就可以对客户端进行请求缓存并拦截请求，从而优化速度，减小服务器压力。

## 其他

还有其他很多可以优化的地方，比如减少http请求、图片懒加载等等，就不一一列举了，大家可以看雅虎34条军规：

>尽量减少 HTTP 请求个数——须权衡
>
>使用 **CDN**（内容分发网络）
>
>为文件头指定 Expires 或 Cache-Control ，使内容具有缓存性。
>
>避免空的 src 和 href
>
>使用 gzip 压缩内容
>
>把 CSS 放到顶部
>
>把 JS 放到底部
>
>避免使用 CSS 表达式
>
>将 CSS 和 JS 放到外部文件中
>
>减少 DNS 查找次数
>
>精简 CSS 和 JS
>
>避免跳转
>
>剔除重复的 JS 和 CSS
>
>配置 ETags
>
>使 AJAX 可缓存
>
>尽早刷新输出缓冲
>
>使用 GET 来完成 AJAX 请求
>
>延迟加载
>
>预加载
>
>减少 DOM 元素个数
>
>根据域名划分页面内容
>
>尽量减少 iframe 的个数
>
>避免 404
>
>减少 Cookie 的大小
>
>使用无 cookie 的域
>
>减少 DOM 访问
>
>开发智能事件处理程序
>
>用  代替 @import
>
>避免使用滤镜
>
>优化图像
>
>优化 CSS Spirite
>
>不要在 HTML 中缩放图像——须权衡
>
>favicon.ico要小而且可缓存
>
>保持单个内容小于25K
>
>打包组件成复合文本

## 写在最后

关于优化的文章网上太多太多，这篇文章并不是告诉大家如何优化，而是在平时写代码时能够培养一种习惯、一种意识，就是**做我们力所能及的优化**以及要**知其所以然**。

------




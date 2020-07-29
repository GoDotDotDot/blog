---
title: next.js报style-jsx错误
path: blog/next.js报style-jsx错误
date: 2017-11-30
tags: [reactjs,nodejs, nextjs]
cover: ./cover.png
categories: 填坑
description: "app.js:12 Error: StyleSheetRegistry: styleId: `jsx-1771141567` not found."
excerpt: "今天在部署生产版本时，却突然发现页面报错，而在开发环境下并未出现任何异常，出现的异常错误信息如下: app.js:12 Error: StyleSheetRegistry: styleId: `jsx-1771141567` not found."
---

## 错误代码

今天在部署生产版本时，却突然发现页面报错，而在开发环境下并未出现任何异常，出现的异常错误信息如下：

```javascript
app.js:12 Error: StyleSheetRegistry: styleId: `jsx-1771141567` not found.
```

上面的错误代码导致页面渲染时被渲染成`next.js`错误页面

## 解决方案

通过查找`next.js`官方`issues`，原因是由于项目代码中出现空的`style-jsx`标签，如

```react
<style jsx>{`

`}</style>
```

`next.js`在打包生产版本时会对`css`文件进行优化，而空的标签内容将会被移除，但是会存在`style-jsx`模块化`ID`，所以在页面加载时会导致`next.js`找不到`styleId`。

要想解决此问题，只要将项目中所有的空`style`标签全部移除即可。
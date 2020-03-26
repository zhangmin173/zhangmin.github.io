---
title: 网站性能优化指南
date: 2019-05-14 18:20:37
categories:
  - javascript
tags:
  - javascript
  - performance
---

## 从浏览器打开到页面渲染完成，发生了什么事情。这个问题网上很多回答

浏览器解析->查询缓存->dns查询->建立链接->服务器处理请求->服务器发送响应->客户端收到页面->解析HTML->构建渲染树->开始显示内容(白屏时间)->首屏内容加载完成(首屏时间)->用户可交互(DOMContentLoaded)->加载完成(load)

- 等待 HTML 文档返回，此时处于白屏状态。
- 对 HTML 文档解析完成后进行首屏渲染，此时呈现的是背景色。
- 进行文件加载、JS 解析等过程，导致界面长时间出于灰屏中。
- 调用 API 获取到业务数据后才能展示出最终的页面内容。

因为要等待文件加载、CSSOM 构建、JS 解析等过程，而这些过程比较耗时，导致用户会长时间出于不可交互的首屏灰白屏状态，从而给用户一种网页很“慢”的感觉。

![图解](https://user-gold-cdn.xitu.io/2019/1/17/16859c7682e30f29?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 页面加载时间监控

performance.timing
```
APP cache：domainLookupStart - fetchStart
DNS解析时间： domainLookupEnd - domainLookupStart
TCP建立连接时间： connectEnd - connectStart
网络请求耗时（白屏时间）： responseStart - requestStart
数据传输耗时：responseEnd - responseStart
dom解析耗时：domContentLoadedEventStart - domLoading
domContentLoaded函数耗时：domContentLoadedEventEnd - domContentLoadedEventStart
资源加载耗时：domComplete - domContentLoadedEventEnd
load函数耗时：loadEventEnd - loadEventStart

白屏时间：domContentLoadedEventEnd - fetchStart
加载完成时间： loadEventEnd - fetchStart
```

## 预热连接以加快分发速度

### dns-prefetch

就是一项使浏览器主动去执行域名解析的功能
```
<link rel="dns-prefetch" href="//example.com">
```

### preconnet

浏览器要建立一个连接，一般需要经过DNS查找，TCP三次握手和TLS协商（如果是https的话），这些过程都是需要相当的耗时的，所以preconnet，就是一项使浏览器能够预先建立一个连接，等真正需要加载资源的时候就能够直接请求了

```
<link rel="preconnect" href="//example.com">
<link rel="preconnect" href="//cdn.example.com" crossorigin>
```

浏览器会进行以下步骤：

- 解释href的属性值，如果是合法的URL，然后继续判断URL的协议是否是http或者https否则就结束处理
- 如果当前页面host不同于href属性中的host,crossorigin其实被设置为anonymous(就是不带cookie了)，如果希望带上cookie等信息可以加上crossorign属性,corssorign就等同于设置为use-credentials

### Preload

浏览器会在遇到如下link标签时，立刻开始下载main.js(不阻塞parser)，并放在内存中，但不会执行其中的JS语句。
只有当遇到script标签加载的也是main.js的时候，浏览器才会直接将预先加载的JS执行掉。

```
<link rel="preload" href="/main.js" as="script">
```

### prefetch

能够让浏览器预加载一个资源（HTML，JS，CSS或者图片等），可以让用户跳转到其他页面时，响应速度更快。虽然是预加载了，但是页面是不会解析或者JS是不会直接执行的

```
<link rel="prefetch" href="//example.com/next-page.html" as="html" crossorigin="use-credentials">
<link rel="prefetch" href="/library.js" as="script">
```

如果prefetch还没下载完之前，浏览器发现script标签也引用了同样的资源，浏览器会再次发起请求，这样会严重影响性能的，加载了两次，，所以不要在当前页面马上就要用的资源上用prefetch，要用preload

### JS在什么时候执行的（defer和async）

defer的执行时间是在所有元素解析完成之后，DOMContentLoaded 事件触发之前。

async的执行时间是在当前JS脚本下载完成后，所以多个async script是执行顺序是不固定的，只能用于加载一些独立无依赖的代码。

## 减少资源体积

### 基础资源

css+js+html 压缩&&响应头GZIP
减少html大小，即dom数量

### 图片

图片进行压缩，支持webp
禁用无大小的img标签，避免重绘重排

## cookie

cookie 注意cookie体积，合理设置过期时间

## 控制请求数

### js合并

万年不变的工具库单独外链引入，以最大化缓存效果
其他统计类工具库进行合并，通过外链引入

### css合并

首屏css内联
其他css进行合并，通过外链引入

### 图片合并

特别小的图片转成base64，其他图片可以合并为雪碧图

## 按需加载

### 图片懒加载

优先加载可视区域内的图片

### 模块异步加载

非首屏操作模块等待用户首次操作后进行加载

## 接口优化

### 接口合并

一些不必要的接口进行合并，一次请求返回所有数据

## 完美的页面结构

```HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Faster</title>
  <link rel="dns-prefetch" href="//tuia.cn">
  <link rel="dns-prefetch" href="//yun.tuia.cn">
  <link rel="preconnect" href="//tuia.cn">
  <link rel="preconnect" href="//yun.tuia.cn">
  <link rel="preload" href="//yun.tuia.cn/base.js" as="script">
  <link rel="preload" href="//yun.tuia.cn/common.js" as="script">
  <style>
    /* 首屏内联样式 */
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/javascript" src="//yun.tuia.cn/base.js"></script>
  <script type="text/javascript" src="//yun.tuia.cn/common.js"></script>
  <script type="text/javascript" src="//yun.tuia.cn/skin.js"></script>
</body>
</html>
```

---
title: XMLHttpRequest 对象
date: 2019-04-01 18:05:02
categories:
- javascript
tags:
- javascript
- window
- XMLHttpRequest
- ajax
---

XMLHttpRequest 对象用于在后台与服务器交换数据，是开发者的梦想，因为您能够：

- 在不重新加载页面的情况下更新网页
- 在页面已加载后从服务器请求数据
- 在页面已加载后从服务器接收数据
- 在后台向服务器发送数据

所有现代的浏览器都支持 XMLHttpRequest 对象。

## 基本用法

```javascript
  var xhr = new window.XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // success
      } else {
        // error
      }
    } else {
      // error
    }
  }
  // 第三个参数设置是否异步，false会阻塞后续的代码执行
  xhr.open('get', '/get', true)
  xhr.send()
```

## ajax 源码解读

未完
---
title: 跨域和跨页面通信
date: 2019-03-18 19:50:07
categories:
- javascript
tags:
- javascript
- window
- postMessage
- web worker
- WebSocket
---

postMessage 解决跨域和跨页面通信的问题

## 概述

发送消息
targetWindow.postMessage（message，targetOrigin，[ transfer ]）

targetWindow
- Window.open （生成一个新窗口然后引用它）
- Window.opener （引用产生这个的窗口）
- HTMLIFrameElement.contentWindow（从其父窗口引用嵌入式）
- Window.parent（从嵌入式内部引用父窗口）
- Window.frames +索引值（命名或数字）。

message
- 要发送到其他窗口的数据，支持格式数据，如对象/数组等

targetOrigin
- 始终提供具体的targetOrigin，而不是*，以防止恶意第三方拦截

transfer
- 是与消息一起传输的Transferable对象序列。这些对象的所有权将提供给目标端，并且它们在发送端不再可用

接收消息
window.addEventListener("message", event => { }, false);

event.data
- 从另一个窗口传递的对象

event.origin
- 调用当时发送消息的窗口的原点

event.source
- 对发送消息的window对象的引用；你可以使用它来建立两个不同来源的窗口之间的双向通信。

## 基本用法

```javascript
  /** main page */
  window.addEventListener('load', () => {
    window.frames[0].postMessage({ msg: 'hello' })
  })
  /** iframe page */
  window.addEventListener('message', e => {
    console.log(e.data.msg) // hello
  })
```

## 引申

web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。所有主流浏览器均支持 web worker，除了 Internet Explorer。

### 基本用法

主进程

```javascript
  // 创建进程
  var worker = new Worker('work.js');
  // 发送消息
  worker.postMessage({method: 'echo', data: { msg: 'hello' }});
  // 接收消息
  worker.onmessage = function (event) {
    console.log('Received message ' + event.data);
    // doSomething 
  }
  // 关闭进程
  worker.terminate();
```

子进程

```javascript
  // 监听消息 或者 self.onmessage
  self.addEventListener('message', function (e) {
    var data = e.data;
    switch (data.method) {
      case 'start':
        self.postMessage('WORKER STARTED: ' + data.msg);
        break;
      case 'stop':
        self.postMessage('WORKER STOPPED: ' + data.msg);
        self.close(); // Worker 内部关闭自身
        break;
      default:
        self.postMessage('Unknown command: ' + data.msg);
    };
  }, false);
  // 内部如果要加载其他脚本
  importScripts('script1.js', 'script2.js');
```

同页面创建子进程

```javascript
  <script id="worker" type="app/worker">
    addEventListener('message', function () {
      postMessage('some message');
    }, false);
  </script>
  // 转为二进制文件
  var blob = new Blob([document.querySelector('#worker').textContent]);
  // 创建文件链接
  var url = window.URL.createObjectURL(blob);
  // 创建子进程
  var worker = new Worker(url);
```

更多内容参考
[Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

## WebSocket

WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

### 基本用法

```javascript
  // 创建连接
  var ws = new WebSocket('ws://localhost:8080')
  // ws.readyState
  // 0 表示连接尚未建立
  // 1 表示连接已建立，可以进行通信
  // 2 表示连接正在进行关闭
  // 3 表示连接已经关闭或者连接不能打开

  // 连接建立时触发 ws.onopen
  ws.addEventListener('open', function (event) {
    ws.send('success'); // 发送消息
  })
  // 客户端接收服务端数据时触发 ws.onmessage
  ws.addEventListener('message', function (event) {
    var data = Json.parse(event.data) // 数据传输只支持字符串，所以需要开发者自己格式化
    ws.send('Hello Server!');
  })
  // 通信发生错误时触发 ws.onerror
  ws.addEventListener('error', function (event) {
    ws.send('Hello Server!');
  })
  // 连接关闭时触发 ws.onclose
  ws.addEventListener('close', function (event) {
    ws.send('Hello Server!');
  })
```

更多内容参考
[WebSocket：5分钟从入门到精通](https://segmentfault.com/a/1190000012709475)

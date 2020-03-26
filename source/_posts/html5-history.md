---
title: hitory中关于路由的事情
date: 2019-03-19 10:07:19
keywords: history pushState popState
description: hitory中关于路由的事情
categories:
- javascript
tags:
- javascript
- window.history
---

History 对象包含用户（在浏览器窗口中）访问过的 URL。

## length 属性
返回浏览器历史列表中的 URL 数量，注意：一般pc浏览器打开访问时，length = 2，因为一般tab页已经是第一个页面了。

## 对象方法

后退：back()
加载 history 列表中的前一个 URL。

前进：forward()
加载 history 列表中的下一个 URL。

go(number|URL)
加载 history 列表中的某个具体页面。URL 参数使用的是要访问的 URL，或 URL 的子串。而 number 参数使用的是要访问的 URL 在 History 的 URL 列表中的相对位置。

## 新特效

新增属性：
history.state

新增方法：
history.pushState(stateData, title, url)
history.replaceState(stateData, title, url)

新增事件：
window.onpopstate
window.onhashchange

## 浏览器history变化与浏览器的行为

如图
![image](/images/history.png)

## 基本用法

1.实现多次返回拦截：用户返回到目标页，前进不生效（visited标识位）

```javascript
  // 保存当前访问地址
  var currentUrl = location.href
  // 返回拦截目标页面
  var urls = ['/test1.html', '/test2.html']
  // 目标页推入栈
  urls.forEach((url, i) => {
    if (i === 0) {
      history.replaceState({ name: url, visited: false }, null, url)
    } else {
      history.pushState({ name: url, visited: false }, null, url)
    }
  })
  // 当前页推入栈
  history.pushState({ name: currentUrl, visited: true }, null, currentUrl)
  // 监听页面导航操作
  window.addEventListener('popstate', function(e) {
    console.log(e)
    // 如果没有访问过
    if (!e.state.visited) {
      history.replaceState({name: e.state.name, visited: true}, null, location.href)
      // url发生变化，页面内容未更新，通过刷新展现
      location.reload()
    }
  });
```

2.恶意拦截，不允许用户退出

```javascript
  history.pushState(null, null, location.href);
  window.addEventListener('popstate', function(event) {
    history.pushState(null, null, location.href );
    //此处加入回退时你要执行的代码
  }); 
```

3.onhashchange
```javascript
  window.addEventListener('hashchange', function(e) {
    const { newURL, oldURL } = e
  }); 
```

## 前端路由实现原理

感兴趣的同学可以阅读一下源码，[vue-router](https://github.com/vuejs/vue-router/tree/dev/src/history)。支持三种模式，hash，html5，abstract。

大概说明一下三种实现方式的不同，hash 利用的是 hashchange 事件，html5 利用的是 popstate 事件，但两种之间有做兼容处理；abstract 框架自身维护了一个路由栈。

```javascript
  // 路由
  var routers = {
    '/home': 'home',
    '/user': 'user'
  }

  // 获取hash
  function gethash(url) {
    return url.split('#')[1]
  }

  // 监听hash改变，其实应该兼容一下popstate
  window.onhashchange = e => {
    if (gethash(e.oldURL) !== gethash(e.newURL) && routers[gethash(e.newURL)]) {
      document.getElementById('root').innerHTML = routers[gethash(e.newURL)]
    }
  }

  // 避免刷新页面导致内容不显示的问题
  window.addEventListener('load', () => {
    if (routers[gethash(document.URL)]) document.getElementById('root').innerHTML = routers[gethash(document.URL)]
  })
```

上面仅仅是简单的实现，细节方面并未处理，比如参数、缓存、栈深等等。

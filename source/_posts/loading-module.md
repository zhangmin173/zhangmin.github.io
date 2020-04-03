---
title: loading模块的设计
description: '随着应用越来越庞大，一个优秀的loading模块应该是可以减缓业务压力的，其次应该是有趣的'
categories:
  - javascript
date: 2020-04-03 11:33:18
keywords:
tags:
  - js
  - module
---

为什么要有loading

我认为是为了减缓用户白屏等待时间，为了更好的用户体验。

## 白屏时间的影响因素

其实有很多因素，但是对于我们游戏场景来说，最主要的就是资源大小，包含css样式、js脚本、img图片等其他资源。但从业务的角度考虑，我们不可能去减少这些资源，当然除了日常开发中的基本优化。

### 日常优化

#### 图片合并

1、首屏图片合并，因为这一项影响用户体验，在loading中预加载
1、公共图片合并，因为这些图片资源可能在整个游戏的生命周期中都要用到，在loading中不一定要预加载
2、关卡资源合并，在loading中只预加载本关卡资源，下一关卡可以在本关卡准备就绪后空闲加载

#### 脚本异步加载

1、主模块（首屏/核心），在loading中预加载，加载完毕loading结束
2、局部模块，可以在满足特定条件的情况下（比如点击）再进行异步加载

#### 样式优化

同脚本异步加载

## loading模块设计

通过上面的介绍，那么我们loading主要加载的内容就是主模块和首屏资源，等待这些内容加载完成则loading结束

### 与业务接耦

真正的loading应该与业务模块接耦，而不是在业务中做一个虚拟的loading，那样是没有意义的。

```javascript
// loading开始
loading.start()
// 业务模块预加载
await module.preload()
// 加载结束，通知loading结束
loading.end()
```

### 如何快速进入loading

loading模块要足够小，尽量不使用图片，尽量用代码去实现效果，尽量给予用户加载反馈。

伪代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>游戏页面</title>
  <style>
    /* loading样式 */
  </style>
</head>
<body>
  <div id="app">游戏场景</div>
  <div id="loading">loading场景</div>
  <script>
  !(function(win) {
    // loading场景
    var loading = {
      start () {
        // 启动加载
        preload(loading)
      },

      update () {
        // loading反馈更新
      },

      end () {
        // 启动游戏场景
        win.GAME.init()
      }
    }

    // 预加载
    function preload (loading) {
      // 资源加载，在每个资源加载完成之后，给予反馈 loading.update()
      // 资源全部加载完，loading.end()
    }

    // 开始
    loading.start()
  })(window)
  </script>
</body>
```

## 通用loading解决方案

为什么要上升到解决方案，原因如下：

1、任何一款游戏都可能需要loading场景
2、每款游戏需要的loading场景大概率是不一样的
3、同款游戏不同媒体甚至需要的都不一样

所以我们要解决上述三个问题

第一个问题，游戏开发工程中，将是否需要loading场景，作为打包项目的可选项之一，并且提供默认的loading场景

第二个问题，根据不同的游戏皮肤可以有不同程度的定制，最小到配置项，最大到UI表现

第三个问题，如果游戏皮肤本身的loading不满足该媒体，那只能进行皮肤的复制进行loading的定制
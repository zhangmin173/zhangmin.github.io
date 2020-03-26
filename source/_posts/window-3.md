---
title: 定时任务
date: 2019-03-18 10:33:40
description: window上的定时任务
categories:
- javascript
tags:
- javascript
- window
- requestAnimationFrame
---

三者用法非常简单，没什么特别之处。setInterval 可以简单看作是 setTimeout 的递归调用，requestanimationframe 可以简单等价于 setTimeout。三者返回值为定时器ID，用于清除时使用。

> setTimeout 和 setInterval 的ID是从 1 累加，而 requestanimationframe 自成一家，也是从 1 累加

## setTimeout clearTimeout

```javascript
  var t1 = setTimeout(() => {
    console.log("t1: " + t1) // 1
  }, 100)
  clearTimeout(t1)
```

## setInterval clearInterval

```javascript
  var t2 = setInterval(() => {
    console.log("t2: " + t2) // 2
  }, 100)
  clearInterval(t2)
```

## requestanimationframe cancelAnimationFrame

```javascript
  var t3 = requestanimationframe(() => {
    console.log("t3: " + t3) // 1
  }, 100)
  cancelAnimationFrame(t3)
```

递归调用实现 setInterval 效果

```javascript
  var t4
  function dothing() {
    // do your thing
    t4 = requestanimationframe(dothing)
  }
  dothing()
  // 或者 requestanimationframe(dothing)，两者有差别，包括dothing内部的代码先后顺序也是影响因素
```

与 setTimeout 相比，requestAnimationFrame 最大的优势是由系统来决定回调函数的执行时机。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。
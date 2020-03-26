---
title: window 对象解读（1）
date: 2019-03-15 15:34:34
categories:
- javascript
tags:
- javascript
- window
---

今日解读：name closed open close

## 说明

window.name 返回当前窗口的名称

window.closed 可返回一个布尔值，该值声明了窗口是否已经关闭。该属性为只读。
- 当浏览器窗口关闭时，表示该窗口的 Windows 对象并不会消失，它将继续存在，不过它的 closed 属性将设置为 true。

window.open(URL,name,features,replace)  
- url 一个可选的字符串，声明了要在新窗口中显示的文档的 URL。如果省略了这个参数，或者它的值是空字符串，那么新窗口就不会显示任何文档。
- name 一个可选的字符串，该字符串是一个由逗号分隔的特征列表，其中包括数字、字母和下划线，该字符声明了新窗口的名称。这个名称可以用作标记 <a> 和 <form> 的属性 target 的值。如果该参数指定了一个已经存在的窗口，那么 open() 方法就不再创建一个新窗口，而只是返回对指定窗口的引用。在这种情况下，features 将被忽略
- features 一个可选的字符串，声明了新窗口要显示的标准浏览器的特征。如果省略该参数，新窗口将具有所有标准特征。在窗口特征这个表格中，我们对该字符串的格式进行了详细的说明。
- replace 一个可选的布尔值。规定了装载到窗口的 URL 是在窗口的浏览历史中创建一个新条目，还是替换浏览历史中的当前条目。支持下面的值：true - URL 替换浏览历史中的当前条目。false - URL 在浏览历史中创建新的条目。

> features 属性只在非全屏模式下才会生效

window.close 关闭窗口
- 只有通过 JavaScript 代码打开的窗口才能够由 JavaScript 代码关闭。这阻止了恶意的脚本终止用户的浏览器。

## 应用

1 创建和关闭窗口

```javascript
  /** a page **/
  var myWin = window.open('', 'myblank', 'width=200,height=200')
  myWin.closed // false
  myWin.close() // myblank 被关闭
  myWin.closed // true

  window.close() // Scripts may close only the windows that were opened by it.
  // 只能关闭通过脚本打开的窗口

  /** b page **/
  window.close() // 可以关闭
```

2 tagert属性指向的是窗口的名称

```javascript
  /** a page **/
  var myWin = window.open('', 'myblank', 'width=200,height=200')
  myWin.name // myblank

  var a = document.createElement('a')
  a.href = ''
  a.target = 'myblank'
  a.click()

  // 此时打开的窗口 myblank 和 a标签跳转的是同一个窗口，targert 属性就是窗口 name 属性
  // name不变时，浏览器不会打开新的窗口
```

3 利用 window.name 属性的特征，实现同窗口下，不同页面的跨页面传值

```javascript
  /** a page **/
  window.name = 123

  location.href = 'b.html'

  /** b page **/
  window.name // 123
```
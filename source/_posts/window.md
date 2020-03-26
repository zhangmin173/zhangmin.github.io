---
title: 重新认识 window 对象
date: 2019-03-15 15:04:16
description: window 对象集合
categories:
- javascript
tags:
- javascript
- window
---

window 对象表示浏览器中打开的窗口，是我们开发过程中用的较多的浏览器对象。没有应用于 window 对象的公开标准，不过所有浏览器都支持该对象。但是对于上百个属性和方法，你真的都认识吗？

## 属性集合

|属性|含义|解读|
|--|--|--|
|closed|返回窗口是否已被关闭。|[解读1](/2019/window-1.html)|
|defaultStatus|设置或返回窗口状态栏中的默认文本|基于安全原因，不少浏览器已经关闭了脚本化它们的状态栏的功能，或者像 Chrome 已经取消了窗口状态栏，所以该属性仅供参考使用。|
|document|对 Document 对象的只读引用||
|history|对 History 对象的只读引用|[解读5](/2019/history.html)|
|innerheight|返回窗口的文档显示区的高度|[解读2](/2019/window-2.html)|
|innerwidth|返回窗口的文档显示区的宽度|[解读2](/2019/window-2.html)|
|length|设置或返回窗口中的框架数量|返回当前窗口中包含的框架数量(框架包括frame和iframe两种元素).|
|location|用于窗口或框架的 Location 对象||
|name|设置或返回窗口的名称|[解读1](/2019/window-1.html)|
|Navigator|对 Navigator 对象的只读引用||
|opener|返回对创建此窗口的窗口的引用|返回对创建该窗口的 Window 对象的引用|
|outerheight|返回窗口的外部高度|[解读2](/2019/window-2.html)|
|outerwidth|返回窗口的外部宽度|[解读2](/2019/window-2.html)|
|pageXOffset|设置或返回当前页面相对于窗口显示区左上角的 X 位置|[解读2](/2019/window-2.html)|
|pageYOffset|设置或返回当前页面相对于窗口显示区左上角的 Y 位置|[解读2](/2019/window-2.html)|
|parent|返回父窗口|返回当前窗口的父窗口|
|Screen|对 Screen 对象的只读引用|[解读2](/2019/window-2.html)|
|self|返回对当前窗口的引用。等价于 Window 属性。|这个感觉没有什么意义啊|
|status|设置窗口状态栏的文本。|同 defaultStatus，仅仅 IE 支持|
|top|返回最顶层的先辈窗口。|最顶层，不同于 parent|
|window|window 属性等价于 self 属性，它包含了对窗口自身的引用。|这个感觉没有什么意义啊|
|screenLeft screenTop screenX screenY|只读整数。声明了窗口的左上角在屏幕上的的 x 坐标和 y 坐标|[解读2](/2019/window-2.html)|

## 方法集合

|方法|作用|解读|
|--|--|--|
|alert()|显示带有一段消息和一个确认按钮的警告框。|这个没什么好说的|
|blur()|把键盘焦点从顶层窗口移开。|和 focus 一对|
|clearInterval()|取消由 setInterval() 设置的 timeout。|[解读3](/2019/window-3.html)|
|clearTimeout()|取消由 setTimeout() 方法设置的 timeout。|[解读3](/2019/window-3.html)|
|close()|关闭浏览器窗口。|[解读1](/2019/window-1.html)|
|confirm()|显示带有一段消息以及确认按钮和取消按钮的对话框。|var c = confirm('msg')，返回值 确定：true，取消：false|
|createPopup()|创建一个 pop-up 窗口。|只有 IE 浏览器支持 createPopup() 方法|
|focus()|把键盘焦点给予一个窗口。|和 blur 一对|
|moveBy()|可相对窗口的当前坐标把它移动指定的像素。|myWindow.moveBy(50,50)|
|moveTo()|把窗口的左上角移动到一个指定的坐标。|myWindow.moveTo(50,50)|
|open()|打开一个新的浏览器窗口或查找一个已命名的窗口。|[解读1](/2019/window-1.html)|
|print()|打印当前窗口的内容。|相当于用户单击浏览器的打印按钮|
|prompt()|显示可提示用户输入的对话框。|var p = prompt('你的姓名','默认值张三')|
|resizeBy()|按照指定的像素调整窗口的大小。|window.resizeBy(-100,-100)|
|resizeTo()|把窗口的大小调整到指定的宽度和高度。|window.resizeTo(500,300)|
|scrollBy()|按照指定的像素值来滚动内容。|window.scrollBy(100,100)|
|scrollTo()|把内容滚动到指定的坐标。|window.scrollTo(100,100)|
|setInterval()|按照指定的周期（以毫秒计）来调用函数或计算表达式。|[解读3](/2019/window-3.html)|
|setTimeout()|在指定的毫秒数后调用函数或计算表达式。|[解读3](/2019/window-3.html)|
|requestanimationframe()|浏览器在下次重绘之前调用指定的回调函数更新|[解读3](/2019/window-3.html)|
|cancelAnimationFrame()|取消 requestanimationframe|[解读3](/2019/window-3.html)|
|postMessage()|安全地实现跨源通信|[解读4](/2019/window-4.html)|

## 对象

|对象|作用|解读|
|--|--|--|
|XMLHttpRequest()|用于在后台与服务器交换数据|[解读5](/2019/window-5.html)|
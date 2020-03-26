---
title: window 对象解读（2）
date: 2019-03-15 16:23:48
categories:
- javascript
tags:
- javascript
- window
---

各种尺寸和坐标问题，你懵不懵？了解之前，有两个概念必须弄清楚：
窗口 - 浏览器的可见区域
屏幕 - 设备的可见区域
当前页面 - 窗口内的某可见内容区域


## innerWidth innerHeight
浏览器视口（viewport）宽度（单位：像素），如果存在垂直滚动条则包括它。

## outerWidth outerheight
获取浏览器窗口外部的宽度。表示整个浏览器窗口的宽度，包括侧边栏（如果存在）、窗口镶边（window chrome）和调正窗口大小的边框

## screen
返回当前window的screen对象。screen对象实现了Screen接口，它是个特殊的对象，返回当前渲染窗口中和屏幕有关的属性。

|属性|解读|
|--|--|
|width|屏幕宽度|
|height|屏幕高度|
|availWidth|可用的屏幕宽度|
|availHeight|可用的屏幕高度|
|colorDepth|目标设备或缓冲器上的调色板的比特深度|
|pixelDepth|返回显示屏幕的颜色分辨率（比特每像素）|

## pageXOffset pageYOffset
设置或返回当前页面相对于窗口显示区左上角的位置

## screenLeft screenTop screenX screenY
窗口距离屏幕左上角的位置
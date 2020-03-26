---
title: CSS3之动画
date: 2019-03-13 15:50:30
keywords: aniamtion,transition,桢动画
description: 在我的理解中，前端动画大概分为三类：过渡（属性）动画、帧动画、路径动画
categories:
- css
tags:
- css
- animation
- transition
---

再说动画之前，我们先来了解一下视觉暂留原理：通过分解后的瞬间画幅，再用摄影机连续拍摄成一系列画面，给视觉造成连续变化的图画。据统计，平均每个人的停留时间在0.34秒，所以对于同一段动画，不同人的视觉感受是有差别的。在我的理解中，前端动画大概分为三类：过渡（属性）动画、帧动画、路径动画。

## 过渡动画

CSS3 中用的最广泛动画：transition，它有如下四个属性
- transition-property 动画属性
- transition-duration 动画时间
- transition-timing-function 速度函数
- transition-delay 动画开始之前的延迟时间

```css3
  .animate {
    transition: width 2s liner 1s;
  }
```

## 帧动画

帧动画相对复杂一些，主要由 animation 和 @keyframe 构成，animation有如下属性
- animation-name 动画名称
- animation-duration 动画时间
- animation-timing-function 速度函数
- animation-delay 动画开始之前的延迟时间
- animation-iteration-count 重复次数
- animation-direction 运动方向
- animation-play-state 动画状态
- animation-fill-mode 决定了动画结束时运用的样式

```css3
  .animate {
    animation: move 2s;
  }

  @keyframe {
    0% {
      left: 0px;
    }
    50% {
      left: 50px;
    }
    100% {
      left: 50px;
    }
  }
```

## 路径动画

路径动画官方无处查找，至于兼容性方面无从考察，主要由 offset-path 和 offset-distance 组成。
- offset-path 支持path函数，等同 svg 里面的path
- offset-rotate 支持 auto | deg
- offset-distance 标记路径动画运动的距离，百分比

```css3
  .animate {
    offset-path: path("M100 100 L200 300 L100 300Z");
    animation: move 3s linear infinite;
    offset-rotate: 30deg;
  }

  @keyframes move {
    0% { offset-distance: 0%;}
    100% { offset-distance: 100%;}
  }
```

> 说完了三种动画，我们说一点别的有意思的

## 动画中用的比较多的属性 transform

transform 属性向元素应用 2D 或 3D 转换，该属性允许我们对元素进行旋转、缩放、移动或倾斜。虽然该属性提供了很多内置函数，如：translate、scale 等等，但归根到底其实是 matrix 函数的变种，所以掌握 matrix 函数，也就掌握了 transform 的精髓。

### 矩阵变换原理

![image](/images/matrix.jpg)

- 移动100px：translate：matrix(1, 0, 0, 1, 100, 100)
- x方向放大3倍，y方向缩小0.5：scale：matrix(3, 0, 0, 0.5, 0, 0)
- 旋转θ角度：rotate：matrix(cosθ,sinθ,-sinθ,cosθ,0,0)
- 拉伸：skew：matrix(1,tan(θy),tan(θx),1,0,0)

### 缩放+旋转？

变换过程其实也比较简单，按照缩放是一个乘积的操作，其他都是相加的操作，很轻易的就可以进行复杂的变换叠加。

### 什么情况下会用到这么复杂的矩阵变换呢

比如镜像变换：

```
已只坐标点（x, y），对称轴为y = kx，求对称点 (x1, y1)

解：
 
怎么解？？？

得：

x1 = ax + cy + e
y1 = bx + dy + f

我们可以得到 a, b, c, d, e, f 的值
```

## 动画中都会用到的 timing-function

timing-function 用的好，动画更逼真。

- steps(n, start|end) start跳过0%，end跳过100%，一般用于帧动画
- cubic-bezier(a, b, c, d) 三次贝塞尔，用四个点（p0,p1,p2,p3）描绘一条曲线

![image](/images/cubic-bezier.jpg)

## 动画调试神器

大部分开发情况下，都支持样式的热更新，但是对于动画调试来说，依然是不方便的。可喜的是Chrome DevTools Animations很好用，特别对于组合型动画，可以很方便的调节各个动画时间和相互之间的延迟，也可以很方便的重复播放和暂停动画，甚至对于速度函数也有可视化的调节方式。

![image](/images/Chrome-DevTools-Animations.png)

## svg 动画

SVG 意为可缩放矢量图形（Scalable Vector Graphics）,使用 XML 格式定义图像。svg 动画主要有三种，animate、animateTransform、animateMotion

``` html
<svg class="move" width="100%" height="100%" version="1.1"
  xmlns="http://www.w3.org/2000/svg">
    <text font-family="microsoft yahei" font-size="40" x="0" y="0" fill="#cd0000">animate
      <animate 
        attributeName="x" 
        rotate="auto" 
        values="100;200;100;100" 
        dur="3s" 
        repeatCount="indefinite" />
      <animateTransform 
       attributeName="transform" 
       begin="0s" 
       dur="5s" 
       type="rotate" 
       from="20 60 60" 
       to="360 100 60" 
       repeatCount="indefinite" />
      <animateMotion 
       path="M 0 0 H 300 Z"
       dur="3s" 
       repeatCount="indefinite" />
    </text>
  </svg>
```

至于动画就说这么多，差不多包括了所有动画的基础内容，好的动画不在于api的运用，在于大家的创造力。


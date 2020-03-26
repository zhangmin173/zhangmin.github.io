---
title: Array 对象
date: 2019-03-22 10:24:20
categories:
- javascript
tags:
- javascript
- array
---

Array 对象用于在单个的变量中存储多个值

## 创建一个 Array 对象

```javascript
  // 使用 Array 构造函数
  var array = new Array(1,10,3,5,6)
  // 使用 Array 字面量 - 推荐
  var array = [1,10,3,5,6]
```

## 属性

|属性|含义|
|--|--|
|length|返回数组长度|
|prototype|使您有能力向对象添加属性和方法|

## 方法

|方法|含义|
|--|--|
|concat()|连接两个或更多的数组，并返回结果。|
|join()|把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。|
|pop()|删除并返回数组的最后一个元素。|
|push()|向数组的末尾添加一个或更多元素，并返回新的长度。|
|reverse()|颠倒数组中元素的顺序。|
|shift()|删除并返回数组的第一个元素。|
|slice()|从某个已有的数组返回选定的元素。|
|sort()|对数组的元素进行排序。|
|splice()|删除元素，并向数组添加新元素。|
|unshift()|向数组的开头添加一个或更多元素，并返回新的长度。|
|forEach()|对数组进行遍历循环，对数组中的每一项运行给定函数。这个方法没有返回值。参数都是function类型，默认有传参，参数分别为：遍历的数组内容；第对应的数组索引，数组本身|
|map()|对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组|
|filter()|“过滤”功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组。|
|every()|判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回true|
|some()|判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true。|
|reduce()|从数组的第一项开始，逐个遍历到最后|
|reduceRight()|从数组的最后一项开始，向前遍历到第一项。|

## 应用

```javascript
  // concat 该参数可以是具体的值，也可以是数组对象。可以是任意多个
  var a = [1, 2].concat(3, 4)
  var b = [1, 2].concat([3, 4])

  // join 指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符。
  var s = [1, 2].join()
  var s = new Array(3).join('abc') // 创建重复字符串

  // pop shift 一对
  var array = [1, 2]
  array.pop() // 2
  array.pop() // 1
  array.pop() // undefined

  // push unshift 一对
  var array = []
  array.push(2)
  array.push(3,4)
  array.unshift(1)
  array.unshift(2, 3)

  // reverse 反转数组项的顺序
  var array = [1, 2]
  array.reverse() // [2, 1]

  // sort 按升序排列数组项——即最小的值位于最前面，最大的值排在最后面
  // 在排序时，sort()方法会调用每个数组项的 toString()转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值， sort()方法比较的也是字符串
  var array = [3, 1, 2]
  array.sort((a, b) => a - b) // [1,2,3]
  array.sort((a, b) => b - a) // [3,2,1]

  // slice 返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素
  var array = [1,3,2]
  array.slice(1) // [3,2]
  array.slice(-1,-2) // [] ？ why

  // splice 从数组中添加/删除项目，然后返回被删除的项目
  array.splice(1,1,5) // [3]

  // indexOf()：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的开头（位置 0）开始向后查找
  // lastIndexOf 同上，不过从是向前查找
  var array = [1,3,2]
  array.indexOf(3, 0) // 1

  // filter
  var array = [1,3,2,4]
  array.filter((item, index) => index % 3 === 0) // [1,4]

  // every some
  var array = [1,2,3]
  array.every(item => item > 0) // true
  array.some(item => item > 2) // true

  // reduce reduceRight
  array.reduce((pre,cur) => pre + cur, 0) // 6
  array.reduceRight((pre,cur) => pre + cur, 10) // 16
```

## 函数式编程

```javascript
  var compose = (...args) => {
    return res => args.reduceRight((result, fn) => fn(result), res)
  }

  var pipe = (...args) => {
    return res => args.reduce((result, fn) => fn(result), res)
  }

  var addOne = n => n + 1

  var double = n => n * 2

  var add1 = compose(addOne, double)
  var add2 = pipe(addOne, double)

  add1(1) // 3
  add2(1) // 4
```

---
title: vim 基本操作
date: 2019-04-23 14:41:16
description: vim的基本指令记录
categories:
  linux
tags:
  linux
  vim
---

vim 选择文本，删除，复制，粘贴

文本的选择，对于编辑器来说，是很基本的东西，也经常被用到，总结如下：

v 从光标当前位置开始，光标所经过的地方会被选中，再按一下v结束。 

V 从光标当前行开始，光标经过的行都会被选中，再按一下Ｖ结束

选中后就可以用编辑命令对其进行编辑，如 

d  删除 

y  复制 （默认是复制到"寄存器） 

p  粘贴 （默认从"寄存器取出内容粘贴） 

+y  复制到系统剪贴板(也就是vim的+寄存器） 

+p  从系统剪贴板粘贴

:set nu 显示行号
:d 删除一行
:u 撤销
:j 删除换行符
:x 删除字符
CTRL-R 重做
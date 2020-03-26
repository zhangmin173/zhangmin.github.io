---
title: mysql 基本指令和操作
date: 2019-03-28 14:49:04
categories:
- mysql
tags:
- linux
- mysql
---

## 基本指令

启动：systemctl start mysqld.service
重启：systemctl restart mysqld.service

登录：mysql -u root -p

显示数据库列表：show databases;
打开mysql数据库：use mysql;
显示数据库表：show tables;
显示表结构：describe 表名

建库：create database 库名;
建表：create table 表名(字段设定列表);

删库：drop database 库名;
删表：drop table 表名;

清空表：truncate table 表名;

重命名表：alter table t1 rename t2;

修改密码：update user set authentication_string=password("test") where user='root';

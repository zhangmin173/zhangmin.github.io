---
title: 服务器上的基本操作 
date: 2019-04-02 09:03:37
description: linux服务器上的常用指令记录
categories:
- Linux
tags:
- nginx
- docker
---

Linux 是一套免费使用和自由传播的类 Unix 操作系统，是一个基于 POSIX 和 UNIX 的多用户、多任务、支持多线程和多 CPU 的操作系统。博主购买的是阿里云centos7，所有软件和配置全部自己搞定，期间学习的基本操作在此做个记录。

## 基本指令

远程链接 ssh root@0.0.0.0
拷贝文件 cp a.css b.css
拷贝文件夹 cp -r app app1
移动文件 mv file1/a.css file2/a.css
进入目录 cd /etc
列出文件 ls /etc
查找文件 find a.css
执行程序 systemctl start nginx.service

拷贝远程文件到本地 scp root@0.0.0.0:/srv/test.js ./
拷贝远程文件夹app到本地 scp -r root@0.0.0.0:/srv/app ./app
上传本地文件到远程 scp ./test.js root@0.0.0.0:/srv/

## 服务器基本目录结构

- etc 配置文件目录，比如 nginx/conf.d
- usr 应用程序存放目录
- srv 服务器启动之后访问的数据目录，一般用于存放自己的网站资源
- var 存放日志目录
- tmp 临时文件目录

## 安装软件

安装包 yum install packageName
搜索包 yum search packageName
移除包 yum remove packageName (正式环境慎用)
例举包 yum list

修改repo源为国内，提高下载速度
wget http://mirrors.163.com/.help/CentOS6-Base-163.repo
yum makecache

## nginx基础配置

```conf
server {
  listen 80; // 监听端口
  server_name xxx.com; // 访问域名
  root /srv/xxx; // 访问根目录
  index index.html index.php; // 网站初始页
  location ~ \.php$ { // 定位，支持正则
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    include        fastcgi_params;
 }
}
```

## docker基本命令

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

创建镜像 docker build -t test/node .
删除镜像 docker rmi imageId

创建新容器并运行 docker run -d --name nodewebsite -p 8888:8888 test/node
运行容器 docekr start containerId
暂停容器 docker stop containerId
删除容器 docker rm containerId

```conf
# 设置基础镜像，如果本地没有该镜像，会从Docker.io服务器pull镜像
FROM node

# 创建容器工作目录,保存我们的代码
RUN mkdir -p /srv/www/test

# 复制所有文件到容器工作目录。
COPY . /srv/www/test

# 设置工作目录
WORKDIR /srv/www/test

# 编译运行node项目，使用npm安装程序的所有依赖,利用taobao的npm安装
RUN npm install --registry=https://registry.npm.taobao.org

# 暴露container的端口
EXPOSE 8888

# 运行命令
ENTRYPOINT node server.js
```

## node npm

全局包命令不生效的情况，创建软链接
ln -s /root/nodejs/bin/pm2 /usr/local/bin/pm2
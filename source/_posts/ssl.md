---
title: ssl证书nginx服务器配置
date: 2019-02-11 17:56:42
categories:
- nginx
tags:
- nginx
- ssl
---

1.申请证书下载，一般审核时间为1个星期，费用为4K-12K每年不等
2.证书下载上传至nginx安装目录下，新建cert目录存放pem和key
3.修改conf下的host文件，填写如下代码

```
listen 443 ssl;
ssl_certificate cert/xxx.pem;
ssl_certificate_key cert/xxx.key;
ssl_session_timeout 5m;
```

4.重启服务器
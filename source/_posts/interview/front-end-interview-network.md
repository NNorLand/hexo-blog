---
title: 前端面试之计算机网络
categories:
  - interview
date: 2019-07-23 22:37:59
updated: 2019-07-23 22:37:59
tags:
---
## CSRF

CSRF（Cross-site request forgery），中文名称：跨站请求伪造，也被称为：one click attack/session riding，缩写为：CSRF/XSRF。

## CORS

跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器  让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。

## 应用层传输协议

**开放式系统互联通信参考模型**（英语：Open System Interconnection Reference Model，缩写：OSI；简称为OSI模型）是一种概念模型，由国际标准化组织提出，一个试图使各种计算机在世界范围内互连为网络的标准框架。定义于ISO/IEC 7498-1。

第7层 应用层  
第6层 表达层  
第5层 会话层  
第4层 传输层  
第3层 网络层  
第2层 数据链路层  
第1层 物理层  

### 应用层协议举例

AFP
APPC
BitTorrent
CFDP
DHCP
DNS
FTAM
FTP
Gopher
HTTP
IMAP
iTMS
IRC
LDAP
Modbus
NFS
NNTP
NTP
POP3
SIP
SMB
SMTP
SNMP
SNTP
SSH
Telnet
TFTP
TSP
Whois
X.400
X.500
XMPP

### TCP三次握手 四次挥手

[TCP三次握手](https://hit-alibaba.github.io/interview/basic/network/TCP.html)

## http请求

请求头：浏览器向服务器发送请求的数据，资源。
响应头：服务器向浏览器响应数据，告诉浏览器具体操作。

### 常见的请求头

```text
Accept: text/html,image/*                                     浏览器可以接收的类型  
Accept-Charset: ISO-8859-1                                    浏览器可以接收的编码类型  
Accept-Encoding: gzip,compress                                浏览器可以接收压缩编码类型  
Accept-Language: en-us,zh-cn                                  浏览器可以接收的语言和国家类型  
Host: www.lks.cn:80                                           浏览器请求的主机和端口  
If-Modified-Since: Tue, 11 Jul 2000 18:23:51 GMT              某个页面缓存时间  
Referer: http://www.lks.cn/index.html                         请求来自于哪个页面  
User-Agent: Mozilla/4.0 compatible; MSIE 5.5; Windows NT 5.0  浏览器相关信息  
Cookie:                                                       浏览器暂存服务器发送的信息  
Connection: close1.0/Keep-Alive1.1                            HTTP请求的版本的特点  
Date: Tue, 11 Jul 2000 18:23:51GMT                            请求网站的时间  
Allow: GET                                                    请求的方法 GET 常见的还有POST  
Keep-Alive: 5                                                 连接的时间；5  
Connection: keep-alive                                        是否是长连接  
Cache-Control: max-age=300                                    缓存的最长时间 300s  
```

### 常见的响应头

```text
Location: http://www.lks.cn/index.html                 控制浏览器显示哪个页面  
Server:apache nginx                                    服务器的类型  
Content-Encoding: gzip                                 服务器发送的压缩编码方式  
Content-Length: 80                                     服务器发送显示的字节码长度  
Content-Language: zh-cn                                服务器发送内容的语言和国家名  
Content-Type: image/jpeg; charset=UTF-8                服务器发送内容的类型和编码类型  
Last-Modified: Tue, 11 Jul 2000 18:23:51GMT            服务器最后一次修改的时间  
Refresh: 1;url=http://www.lks.cn                       控制浏览器1秒钟后转发URL所指向的页面  
Content-Disposition: attachment; filename=lks.jpg      服务器控制浏览器发下载方式打开文件  
Transfer-Encoding: chunked                             服务器分块传递数据到客户端  
Set-Cookie:SS=Q0=5Lb_nQ; path=/search                  服务器发送Cookie相关的信息  
Expires: -1                                            资源的过期时间，提供给浏览器缓存数据,-1永远过期  
Cache-Control: no-cache                                告诉浏览器，一定要回服务器校验，不管有没有缓存数据。  
Pragma: no-cache                                       服务器控制浏览器不要缓存网页  
Connection: close/Keep-AliveHTTP                       请求的版本的特点  
Date: Tue, 11 Jul 2000 18:23:51 GMT                    响应网站的时间  
ETag："ihfdgkdgnp98hdfg"                               资源实体的标识(唯一标识，类似md5值，文件有修改md5就不一样)  
```

### 关于缓存相关头的解释

 Expires  
            一个GMT时间,试图告知浏览器,在此日期内,可以信任并使用对应缓存中的副本,缺点是,一旦客户端日期不准确.则可能导致失效.  
 Cache-Control (http1.1的常见头)  
       1）public  
         仅体现在响应头，通知浏览器可以无条件的缓存该响应。  
      2）private  
         仅体现在响应头，通知浏览器只针对单个用户缓存响应. 且可以具体指定某个字段.如private –“username”  
      3）no-cache  
          a) 请求头中：告诉浏览器回去服务器取数据，并验证你的缓存(如果有的话)。  
          b) 响应头中：告诉浏览器，一定要回服务器校验，不管有没有缓存数据。 如果确定没有被改，可以使用缓存中的数据  
      4）no-store  
          告诉浏览器任何情况下都不要被缓存。  
      5）max-age  
          a) 请求头中：强制响应浏览器，根据该值,校验缓存.即与自身的Age值,与请求时间做比较.如果超出max-age值,则强制去服务器端验证.以确保返回一致  

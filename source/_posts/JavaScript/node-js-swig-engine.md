---
title: swig模板引擎
date: 2016-08-19 17:30:53
categories:
- JavaScript
tags: [Nodejs,JavaScript,html]
---
现在有很多视图引擎,jade,swig等.用过jade,感觉不是很喜欢.还是`.html`看起来舒服一点.  
swig能很好的解决这一点,swig默认以`.ejs`文件结尾,但是能通过一些设置,让它更加友好.  
首先附上github地址:[swig.js](https://github.com/paularmstrong/swig)  
<!-- more -->
目前没有发现swig的文档,[github.io](http://paularmstrong.github.io/swig/)貌似挂了.可以将项目clone下来,执行
```sh
$ npm install swig
$ make docs
```
编译完成自动打开浏览器,然后能看到documentation.  
要在express框架中用swig需要进行一些设置.  
```JavaScript
// view engine setup
app.engine('html', swig.renderFile)
app.set('view cache', false);
swig.setDefaults({ cache: false });
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
//	Open and close controls for variables. Defaults to ['{{', '}}'].
swig.setDefaults({varControls: ['<%=', '%>']});
```
* 补充:这里有一个模板引擎性能的测试,不知道有没有参考价值(测试模板较少,包括[artTemplate; jCT; juicer; doT; Handlebars; tmpl; easyTemplate; underscoreTemplate; baiduTemplate; Mustache; kissyTemplate;])
> [引擎渲染速度测试](http://achun.github.io/jCT/test/test-speed.html)

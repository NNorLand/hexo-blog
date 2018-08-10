---
title: hexo第一天
date: 2016-07-02 14:44:49
updated: 2016-08-26 16:22:00
---
今天利用coding的webIDE搭建了hexo博客。回来记录一下。

**前言** 之前也在github上用过hexo搭建博客，一直感觉挺好的，除了有一个问题——搭建写作环境。
由于Hexo是基于Node.js的，所以需要在本地电脑上安装Node.js，然后再安装Hexo，还得安装Git，一步步配置环境，有点繁琐。所以很明显存在一个问题——重装电脑后，又要配置环境，或者不能在任意一终端进行写作。
现在终于找到一个方法可以实现“Set up once, write everywhere”。这就是Coding.net的`WebIDE`。

coding的webIDE出来时间不是很长，成熟度不如koding和c9，但是胜在访问速度快。。。毕竟是国内的服务器。coding webIDE使用不当的话，偶尔会出现一些问题，比如打不开等情况，可以点击反馈，让coding的官方人员帮你解决。

* 2016.08.26补充
coding时不时有很多问题,已放弃webIDE,回归github.将博客代码存放在hexo分支.

首先附上两篇搭建hexo博客的通用文档

>* [文档 | Hexo](http://hexo.io/zh-cn/docs/)
>* [Hexo静态博客使用指南](http://www.jianshu.com/p/d78eeae3d659)

<!--more-->

---
# 一、准备工作
首先，去Coding.net官网注册一个账号，接着，点击“+ 创建项目”,创建一个新项目。
如下图所示：
* 项目名称和简介随意
* 项目类型选择“私有”
* 勾选“使用README.md初始化项目”

![创建新项目]( https://ohuxfnzjy.qnssl.com/image/hexo/2016/07/1%20%285%29.png)

创建好项目后，通过导航栏到IDE界面，点击新建工作空间

![新建工作空间]( https://ohuxfnzjy.qnssl.com/image/hexo/2016/07/1%20%286%29.png)

随后，单击“同步仓库”，等待同步仓库完成。

![同步仓库]( https://ohuxfnzjy.qnssl.com/image/hexo/2016/07/1%20%287%29.png)

接着，点开我们刚刚创建的项目。会提示配置界面。webIDE是收费的，收取coding的虚拟货币--[码币](https://coding.net/help/doc/account/shop.html)。但是收费很良心，而且有各种途径能够赚取。用来写博客的话，选最低配置就可以。基本上和免费差不多。

![收费]( https://ohuxfnzjy.qnssl.com/image/hexo/2016/07/1%20%284%29.png)

![赚码币]( https://ohuxfnzjy.qnssl.com/image/hexo/2016/07/1%20%281%29.png)
[如何获取码币](https://coding.net/help/doc/account/shop.html#section-2)

回到主题，创建完webIDE，点击打开，等待webIDE载入完成。就能看到界面了。
全屏正有种带GUI的Linux的既视感~~而且terminal默认安装好了zsh和[oh-my-zsh](https://zhuanlan.zhihu.com/p/19556676)，算是附带小惊喜吧。
调整一下选项。

![webIDE]( https://ohuxfnzjy.qnssl.com/image/hexo/2016/07/1%20%283%29.png)

**有没有超酷！**装逼利器，而且巨方便。

Hexo是基于Nodejs的，所以我们将运行环境切换为Nodejs。

![切换环境]( https://ohuxfnzjy.qnssl.com/image/hexo/2016/07/1%20%282%29.png)

# 二、正式开始

打开高大上的终端，安装hexo，输入
> sudo npm install -g hexo-cli

等待安装完成。

然后使用hexo init命令初始化博客
> sudo hexo init

正常情况下，到这里hexo就安装完成了，如果出错的话，根据命令行提示进行处理。

然后，我们首先先解锁一下配置文件（将所有文件提权至777）
> sudo chmod -R 777 *

打开_config.yml博客配置文件，编辑title等属性，保存。
注意将设置语言。
> language: zh-Hans

支持多语言的主题会根据博客语言设置进行显示。

然后开启我们的hexo进行预览一下。
> hexo s

然后，我们就可以通过单击右上角的访问链接，将端口设置为4000来访问网站。

这里用的是缩写，hexo命令如下

```
hexo n "我的博客" == hexo new "我的博客" #新建文章
hexo p == hexo publish
hexo g == hexo generate#生成
hexo s == hexo server #启动服务预览
hexo d == hexo deploy#部署
```

测试成功了，那么我们先在**终端中按Ctrl+C**退出，然后按下访问链接中的垃圾桶来销毁端口。

那么大家刚才也看到了，IDE中的访问链接是测试用途，长且有时间限制，一看就非常不严谨，所以，我们要学会把博客Push到托管平台中。

那么，首先，我们先要安装Hexo Git插件以至于可以将静态页推送到托管平台上。

> sudo npm install hexo-deployer-git --save

安装完成之后，我们配置一下_config.yml文件。
修改一下最下面的deploy：
将
```
deploy:
  type:
```
修改为
```
deploy:
  type: git
  repo: [仓库地址]
branch: master
message: blog update #push message
```
注：仓库地址可以在您的项目主页找到。

将博客推送到代码托管平台，在终端中使用：
> sudo hexo g -d

如果是http的仓库地址，会提示输入用户名和密码。ssh模式，我没有成功，提示没有权限不知道是不是因为私人仓库的原因。

我们返回coding仓库，能看到代码已经推送到仓库中了。

下面，我们开启静态页服务（Pages）。

只需要单击页面上的“Pages服务”，设置部署分支为master，然后单击“立即开启”，即可访问！

# 三、添加、删除、编辑文章

## 1、创建文章
打开终端，以如下格式敲入命令：

> sudo hexo new <文章名称>

这样，我们就创建了一篇文章。

可以在目录source->_posts中找到并编辑。

完成后部署代码即可看到新的文章。
> sudo hexo g -d

如果不想博文在首页全部显示, 并能出现阅读全文按钮效果, 需要在你想在首页显示的部分下添加`<!--more-->`
```
此处及以上的内容会在首页显示
<!--more-->
以下是在首页隐藏的部分
```

## 2、删除文章
只需删除source/_posts目录下的相应md文件，重新部署即可。
部署之前最好，清空一下hexo缓存，不然可能不会生效。
> hexo clean

## 3、编辑文章
编辑文章和删除道理相同，修改相应md文件重新部署即可。

# 四、将hexo代码同步到hexo分支。

虽然我们有webIDE，能随时写博客，不受hexo环境的限制，但是还是最好将hexo的源码同步到代码仓库。由于默认deploy的是master分支。我们可以新建一个hexo分支
> gco -b hexo

将代码我们博客的原始代码push到分支中，双重保险，也方便在本地修改代码。webIDE只是多了一个更加方便的选择。
> gaa
> gcmsg "hexo"
> gp origin hexo

这样，在我们的master分支是我们的博客内容，hexo分支是我们的博客源码。非常方便。

# 五、hexo主题
由于hexo默认的主题，并不是很符合部分人的审美，hexo提供了很多主题，也可以自己编写主题文件。自己动手写主题文件就不说了。
说一下更换主题。
官方提供了一个wiki地址，里面有很多主题。

hexo主题wiki：https://github.com/hexojs/hexo/wiki/Themes

Hexo 有两份主要的配置文件（_config.yml），一份位于站点根目录下，另一份位于主题目录下。为了描述方便，在以下说明中，将前者称为 站点配置文件，后者称为 主题配置文件。
Hexo 安装主题的方式非常简单，将主题文件下载下来，然后放到theme文件夹里，然后修改下配置文件即可。打开 站点配置文件，找到 theme 字段，并将其值更改为你自己的主题文件即可。

**这里有一个坑，由于hexo主题文件都是存放在git上的，有个人会通过git clone的方式下载主题文件，但是这样就会在你自己的本地仓库加上这个操作，导致你想要push这个项目时，无法push主题文件。所以一定要`下载压缩包然后手动添加`到theme文件夹中。**

验证主题是否启用

运行 hexo s --debug ，并访问4000端口 ，确保站点正确运行。可以先clean一下再运行。

# 六、关于404页面
只需在source目录下新建404.html文件即可。
代码可以用腾讯公益的404
```html
<!DOCTYPE HTML>
<html>
<head>
  <meta http-equiv="content-type" content="text/html;charset=utf-8;"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="robots" content="all" />
  <meta name="robots" content="index,follow"/>
</head>
<body>
<script type="text/javascript" src="http://www.qq.com/404/search_children.js"
        charset="utf-8" homePageUrl="/"
        homePageName="回到我的主页">
</script>
</body>
</html>
```

# 七、使用过程遇到的问题
1. 一篇文章添加多个标签
> tags: [标签1,标签2,标签3]

2. Front-matter

| 参数	      | 描述	| 默认值  |
| :------- | -------: | :--: |
| layout      | 布局  |  |
| title	      | 标题            |  |
| date        |	建立日期	|文件建立日期|
| updated	    | 更新日期	|文件更新日期|
| comments	  |开启文章的评论功能	|true|
| tags	      | 标签（不适用于分页）| |
| categories	| 分类（不适用于分页）| |
| permalink	  | 覆盖文章网址 |  |
 
# 八、hexo 偶尔抽风
1.  
```bash
{ [Error: Cannot find module './build/Release/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
{ [Error: Cannot find module './build/default/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
{ [Error: Cannot find module './build/Debug/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
```
Try to install with --no-optional option.  
```bash
$ npm install hexo --no-optional
```
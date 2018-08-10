---
title: markdown介绍及语法
date: 2016-07-02 18:34:22
tags: [Markdown,Wiki]
---
# Markdown简介

> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。—— [维基百科](https://zh.wikipedia.org/wiki/Markdown)

正如您在阅读的这份文档，它使用简单的符号标识不同的标题，将某些文字标记为**粗体**或者*斜体*，创建一个[链接](http://www.example.com)或一个脚注[^demo]。

## 文档
>* [创始人 John Gruber 的 Markdown 语法说明](http://daringfireball.net/projects/markdown/syntax)
>* [马克飞象帮助文档](https://maxiang.io/)
>* [markdown中文语法说明](http://www.appinn.com/markdown/)

<!--more-->

## 好用的markdown工具
* 安卓端推荐*markdownX*或者*JotterPadX*。前者专用于markdown的编写，能够预览。后者是一个强大的文本编辑器，目前没有发现能够markdown文件。
* Mac推荐*MOU*。小巧强大的markdown文本编辑器。
* Windows 也有很多优秀的markdown编辑器，这里不一一列举，本人用atom，github出品的文本编辑器，打开速度堪比IDE，这点不能和sublime相比，但是git标识和markdown方面，sublime表现不如atom，尤其是git，我习惯于能辨识出哪些文件、段落进行了修改，sublime并不能做到。
  *这里安利一个atom小插件，可能大家都见过，   --[activate-power-mode](https://atom.io/packages/activate-power-mode)*

*偶尔装装逼就好，瞎了不要找我*
![activate-power-mode](https://i.github-camo.com/b1d03b9b7a9d7dc9a32d1eab307b5378f8c59a7b/68747470733a2f2f636c6f75642e67697468756275736572636f6e74656e742e636f6d2f6173736574732f3638383431352f31313631353536352f31306631363435362d396336352d313165352d386166342d3236356630316663383361302e676966)

***

# 常见语法

## 标题
标题是每篇文章都需要也是最常用的格式，在 Markdown 中，如果一段文字被定义为标题，只要在这段文字前加 # 号即可。
```
# 一级标题

## 二级标题

### 三级标题
```
以此类推，总共六级标题，建议在井号后加一个空格，这是最标准的 Markdown 语法。

## 列表

在文字前加上 - 或 * 为无序列表，有序列表则直接在文字前加1. 2. 3. 符号要和文字之间加上一个字符的空格。

* a
* b
* c
1. a
2. b
3. c

## 引用
如果你需要引用一小段别处的句子，那么就要用引用的格式。

> 例如这样

只需要在文本前加入 > 大于号即可

## 图片与链接
插入链接与插入图片的语法很像，区别在一个 !号

图片为：![图片说明--图片不可见是显示]()

链接为：[文字--显示]()

## 粗体与斜体
Markdown 的粗体和斜体也非常简单，用两个 * 包含一段文本就是粗体的语法，用一个 * 包含一段文本就是斜体的语法。

例如：**这里是粗体** *这里是斜体*

## 分割线
分割线的语法只需要三个 * 或 - 号，例如：

***

---

## 删除线  
~~删除线~~

## 高亮代码块
```html
<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>
```
## 制作一份待办事宜 [Todo 列表](https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown#13-待办事宜-todo-列表)

- [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率
- [x] 新增 Todo 列表功能
- [x] 修复 LaTex 公式渲染问题
- [x] 新增 LaTex 公式编号功能

## 表格
| Item     |    Value | Qty  |
| :------- | -------: | :--: |
| Computer | 1600 USD |  5   |
| Phone    |   12 USD |  12  |
| Pipe     |    1 USD | 234  |

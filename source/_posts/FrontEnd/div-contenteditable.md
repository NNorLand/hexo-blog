---
title: div实现高度撑开的输入框
categories:
- FrontEnd
date: 2016-08-01 09:23:22
updated: 2016-08-25 11:21:00
tags: [CSS,html]
---
> 转载  
来自[张鑫旭-鑫空间-鑫生活](http://www.zhangxinxu.com)  
原文地址： http://www.zhangxinxu.com/wordpress/2016/01/contenteditable-plaintext-only/

# contenteditable
使用input或textare时,输入框大小固定,因此采用div,在div上增加`contenteditable="true"`属性.这样的话,没有placeholder属性,通过css样式`:empty:before`,增加content解决.

<!-- more -->

下面是一个示例
```html
<div class="test_box" contenteditable="true" onpaste="return false" data-placeholder="聊聊这组照片" id="test_box" onKeyUp="showLen(this);"></div>
<div style="text-align: right;padding-right: 0.8em">
    <span id="str_length" class="str_length">0</span>
    <span>/200</span>
</div>
```
```stylus
.test_box {
    min-height: 100px;
    max-height: 300px;
    margin-left: auto;
    margin-right: auto;
    padding: 0.8em;
    padding-bottom: 0;
    outline: 0;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
}
.test_box:empty:before {
    content: attr(data-placeholder);
    color:#d3d3d3;
}
.test_box:focus:before{
    content:none;
}
```
```javascript
<script>
    showLen(document.getElementById("test_box"));
    function showLen(obj) {
        var t = document.getElementById("test_box").innerText;
        var num = document.getElementById('str_length')
        if (t.length > 200) {
            num.innerHTML = obj.innerText.length;
            num.style.color= "red";
            return false;
        }
        else {
            num.innerHTML = obj.innerText.length;
            return true;
        }
    }
</script>
```

> * 注意,在获取div的内容时,不能用value,用innerText  

---
# 温故知新
* 2016-08-25补充  

利用全浏览器都支持的contenteditable模拟文本域可以实现体验相当不错的高度跟随内容自动撑开的效果，但是呢，有个很大的问题就是HTML内容可以直接被粘贴进去.

# 提问：在HTML中，contenteditable支持的属性值是？  

图样图森破时候的我，脑中就只有contenteditable="true"和contenteditable="false"，咳咳，后来我发现自己太天真了，新的草案中明确表示还有多个其他属性值：

> The contenteditable attribute is an enumerated attribute whose keywords are the empty string (“”), “events”, “caret”, “typing”, “plaintext-only”, “true”, and “false”. There is one additional state, the inherit state, which is the missing value default (and the invalid value default).

垂直展示下就是（不包括默认的inherit继承）：
```html
contenteditable=""
contenteditable="events"
contenteditable="caret"
contenteditable="plaintext-only"
contenteditable="true"
contenteditable="false"
```
别问我，我也不知道"events"和"caret"是干什么用的，嘿，但是"plaintext-only"我是知道的，可以让编辑区域只能键入纯文本。这里就不需要demo了，直接下面的框框，大家可以试试，看看能不能搞富文本。  

`<div contenteditable="plaintext-only"></div>`

<div style='min-height:80px;border:1px solid grey' contenteditable="plaintext-only"></div>

# 与contenteditable属性无关的CSS控制法
一个div元素，要让其可编辑，也就是可读写，contenteditable属性是最常用方法，做前端的基本上都知道。但是，知道CSS中有属性可以让普通元素可读写的的同学怕是就少多了。

主角亮相：user-modify.

支持属性值如下：
```html
user-modify: read-only;
user-modify: read-write;
user-modify: write-only;
user-modify: read-write-plaintext-only;
```
其中，write-only不用在意，当下这个年代，基本上没有浏览器支持，以后估计也不会有。read-only表示只读，就是普通元素的默认状态啦。然后，read-write和read-write-plaintext-only会让元素表现得像个文本域一样，可以focus以及输入内容。  
会发现，设置了read-write和read-write-plaintext-only值的两个<p>标签元素是可以被focus的.  
而这两者的区别就在于，一个可以输入富文本，而下面一个只能输入纯文本.  
然而，抱歉地跟大家讲下，目前只有webkit内核浏览器才支持`read-write-plaintext-only`这个值，因此，我们的使用其实是：
```
-webkit-user-modify: read-write-plaintext-only
```
我们可以在移动端使用，以及，只需要兼顾webkit内容的桌面网页项目。

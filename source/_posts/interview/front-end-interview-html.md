---
title: 前端面试之HTML
categories:
  - interview
date: 2019-07-23 21:13:22
updated: 2019-07-23 21:13:22
tags: [HTML]
---
## DOM元素操作方法

### DOM 创建

DOM节点创建最常用的便是document.createElement和document.createTextNode方法：

```javascript
var el1 = document.createElement('div');
var el2 = document.createElement('input');
var node = document.createTextNode('hello world!');
```

### DOM 查询

元素查询的API返回的的结果是DOM节点或者DOM节点的列表。document提供了两种Query方法：

```js
// 返回当前文档中第一个类名为 "myclass" 的元素
var el = document.querySelector(".myclass");

// 返回一个文档中所有的class为"note"或者 "alert"的div元素
var els = document.querySelectorAll("div.note, div.alert");

// 获取元素
var el = document.getElementById('xxx');
var els = document.getElementsByClassName('highlight');
var els = document.getElementsByTagName('td');
var els = document.getElementsByName('name');

```

Element也提供了很多相对于元素的DOM导航方法：

```js
// 获取父元素、父节点
var parent = ele.parentElement;
var parent = ele.parentNode;

// 获取子节点，子节点可以是任何一种节点，可以通过nodeType来判断
var nodes = ele.children;    

// 查询子元素
var els = ele.getElementsByTagName('td');
var els = ele.getElementsByClassName('highlight');

// 当前元素的第一个/最后一个子元素节点
var el = ele.firstElementChild;
var el = ele.lastElementChild;

// 下一个/上一个兄弟元素节点
var el = ele.nextElementSibling;
var el = ele.previousElementSibling;
```
### DOM 更改
```js
// 添加、删除子元素
ele.appendChild(el);
ele.removeChild(el);

// 替换子元素
ele.replaceChild(el1, el2);

// 插入子元素
parentElement.insertBefore(newElement, referenceElement);
```
### 属性操作
```js
// 获取一个{name, value}的数组
var attrs = el.attributes;

// 获取、设置属性
var c = el.getAttribute('class');
el.setAttribute('class', 'highlight');

// 判断、移除属性
el.hasAttribute('class');
el.removeAttribute('class');

// 是否有属性设置
el.hasAttributes();     
```
### 常见的面试问题
#### innerHTML 与 outerHTML 的区别？
DOM 元素的 innerHTML, outerHTML, innerText, outerText 属性的区别也经常被面试官问到， 比如对于这样一个HTML元素：<div>content<br/></div>。

innerHTML：内部HTML，content<br/>；
outerHTML：外部HTML，<div>content<br/></div>；
innerText：内部文本，content ；
outerText：内部文本，content ；
上述四个属性不仅可以读取，还可以赋值。outerText 和 innerText 的区别在于 outerText 赋值时会把标签一起赋值掉，另外 xxText 赋值时HTML特殊字符会被转义。 
#### jQuery的html()与innerHTML的区别？
jQuery的 .html() 会调用.innerHTML来操作，但是会捕获异常，然后用 .empty(), .append() 重新操作。 这是因为IE8中有些元素的 .innerHTML 是只读的


## DOM事件
### 资源事件:
cached	manifest中列出的资源已经下载，应用程序现在已缓存。
error	资源加载失败时
abort	正在加载资源已经被中止时
load	资源及其相关资源已完成加载。
beforeunload	window，document 及其资源即将被卸载。
unload	文档或一个依赖资源正在被卸载。
### 表单事件：
reset	点击重置按钮时
submit	点击提交按钮
### 视图事件：
fullscreenchange	An element was turned to fullscreen mode or back to normal mode.
fullscreenerror	It was impossible to switch to fullscreen mode for technical reasons or because the permission was denied.
resize	The document view has been resized.
scroll	The document view or an element has been scrolled.
### 键盘事件
keydown	按下任意按键
keypress	除 Shift, Fn, CapsLock 外任意键被按住. (连续触发)
keyup	释放任意按键
### 鼠标事件
mouseenter	指针移到有事件监听的元素内
mouseover	指针移到有事件监听的元素或者它的子元素内
mousemove	指针在元素内移动时持续触发
mousedown	在元素上按下任意鼠标按钮
mouseup	在元素上释放任意鼠标按键
click	在元素上按下并释放任意鼠标按键
dblclick	在元素上双击鼠标按钮
contextmenu	右键点击 (右键菜单显示前).
wheel	滚轮向任意方向滚动
mouseleave	指针移出元素范围外（不冒泡）
mouseout	指针移出元素，或者移到它的子元素上
select	文本被选中被选中
pointerlockchange	鼠标被锁定或者解除锁定发生时
pointerlockerror	可能因为一些技术的原因鼠标锁定被禁止时。
### 媒体事件
canplay	The browser can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content.
canplaythrough	The browser estimates it can play the media up to its end without stopping for content buffering.
ended	Playback has stopped because the end of the media was reached.
emptied	The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load()method is called to reload it.
stalled	The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
suspend	Media data loading has been suspended.
play	Playback has begun.
playing	Playback is ready to start after having been paused or delayed due to lack of data.
pause	Playback has been paused.
waiting	Playback has stopped because of a temporary lack of data.


[MDN事件参考](https://developer.mozilla.org/zh-CN/docs/Web/Events)


## JavaScript 事件机制之冒泡、捕获、传播、委托
DOM事件流（event  flow ）存在三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。  
事件捕获（event  capturing）：通俗的理解就是，当鼠标点击或者触发dom事件时，浏览器会从根节点开始由外到内进行事件传播，即点击了子元素，如果父元素通过事件捕获方式注册了对应的事件的话，会先触发父元素绑定的事件。  
事件冒泡（dubbed  bubbling）：与事件捕获恰恰相反，事件冒泡顺序是由内到外进行事件传播，直到根节点。  
无论是事件捕获还是事件冒泡，它们都有一个共同的行为，就是事件传播，它就像一跟引线，只有通过引线才能将绑在引线上的鞭炮（事件监听器）引爆  

dom标准事件流的触发的先后顺序为：先捕获再冒泡，即当触发dom事件时，会先进行事件捕获，捕获到事件源之后通过事件传播进行事件冒泡。不同的浏览器对此有着不同的实现，IE10及以下不支持捕获型事件，所以就少了一个事件捕获阶段，IE11、Chrome 、Firefox、Safari等浏览器则同时存在。

说到事件冒泡与捕获就不得不提一下两个用于事件绑定的方法addEventListener、attachEvent。当然还有其它的事件绑定的方式这里不做介绍。　

　　addEventListener(event, listener, useCapture)　　

　　　　·参数定义：event---（事件名称，如click，不带on），listener---事件监听函数，useCapture---是否采用事件捕获进行事件捕捉，

　　　　　　　　默认为false，即采用事件冒泡方式

　　　　addEventListener在 IE11、Chrome 、Firefox、Safari等浏览器都得到支持。

　　attachEvent(event,listener)　　

　　　　·参数定义：event---（事件名称，如onclick，带on），listener---事件监听函数。

　　　　attachEvent主要用于IE浏览器，并且仅在IE10及以下才支持，IE11已经废了这个方法了（微软还是挺识趣的，慢慢向标准靠拢）。

### 事件委托
委托在JQuery中已经得到了实现，即通过$(selector).on(event,childSelector,data,function,map)实现委托，一般用于动态生成的元素，当然JQuery也是通过原声的js去实现的，下面举一个简单的栗子，通过js实现通过parent元素给child元素注册click事件
```js
var parent = document.getElementById("parent");
var child = document.getElementById("child");
parent.onclick = function(e){
  if(e.target.id == "child"){
    console.log("您点击了child元素")
  }
}
```
虽然没有直接只child元素注册click事件，可是点击child元素时却弹出了提示信息。

### 跨浏览器的事件对象
```js
// 针对IE10 以下的，preventDefault 和window.event
var EventUtil = {
    addHandler: function (element, type, handler) {},
    removeHandler: function (element, type, handler) {},
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
}
```
跨浏览器阻止事件冒泡：
```js
var btn = document.getElementById('myBtn');

btn.onclick = function (event) {
    alert('Clicked');
    
    event = EventUtil.getEvent(event);
    EventUtil.stopPropagation(event);
}

document.body.onclick = function (event) {
    alert('Body clicked');
}
```

> 参考链接[https://harttle.land/2015/10/01/javascript-dom-api.html](https://harttle.land/2015/10/01/javascript-dom-api.html)

## 页面重绘和重排
var bstyle = document.body.style; // cache
bstyle.padding = "20px"; // 重排+重绘
bstyle.border = "10px solid red"; // 另一次重排+重绘
bstyle.color = "blue"; // 没有尺寸变化，只重绘
bstyle.backgroundColor = "#fad"; // 重绘
bstyle.fontSize = "2em"; // 重排+重绘
// 新的DOM节点 - 重排+重绘
document.body.appendChild(document.createTextNode('dude!'));

restyle（不影响几何形状的渲染树变化）、reflow（重排，影响布局）和repaint（重绘）。

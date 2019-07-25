---
title: 前端面试总结CSS篇
categories:
  - interview
date: 2019-07-23 22:00:54
updated: 2019-07-23 22:00:54
tags: [CSS]
---

## position属性

### static

该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。

### relative

该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。position:relative 对 table-*-group, table-row, table-column, table-cell, table-caption 元素无效。

### absolute

不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。

### fixed

不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 transform  属性非 none 时，容器由视口改为该祖先。

### sticky

盒位置根据正常流计算(这称为正常流动中的位置)，然后相对于该元素在流中的 flow root（BFC）和 containing block（最近的块级祖先元素）定位。在所有情况下（即便被定位元素为 table 时），该元素定位均不对后续元素造成影响。当元素 B 被粘性定位时，后续元素的位置仍按照 B 未定位时的位置来确定。position: sticky 对 table 元素的效果与 position: relative 相同。
[MDN position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)

## display属性

display 属性使用关键字取值来指定. 关键字取值被分为六类:

```html
<display-outside>
这些关键字指定了元素的外部显示类型，实际上就是其在流式布局中的角色。
<display-inside>
这些关键字指定了元素的内部显示类型，它们定义了元素内部内容的格式化上下文的类型（假设是不可替换的元素）。
<display-listitem>
将这个元素的外部显示类型变为 block 盒，并将内部显示类型变为多个 list-item inline 盒。
<display-internal>
像 table 和 ruby 这样的布局模型有着复杂的内部结构，因此它们的孩子和后面的元素可能具有多个角色。这一类关键字就是用来定义这些“内部”显示类型，并且只有在这些特定的布局模型中才有意义。
<display-box>
这些值定义元素是否完全生成显示盒。
<display-legacy>
CSS 2 对于 display 属性使用单关键字语法, 对于相同布局模式的 block 级和 inline 级变体需要使用单独的关键字。
```

全部取值如下

```css
/* <display-outside> values */
display: block;
display: inline;
display: run-in;

/* <display-inside> values */
display: flow;
display: flow-root;
display: table;
display: flex;
display: grid;
display: ruby;

/* <display-outside> plus <display-inside> values */
display: block flow;
display: inline table;
display: flex run-in;

/* <display-listitem> values */
display: list-item;
display: list-item block;
display: list-item inline;
display: list-item flow;
display: list-item flow-root;
display: list-item block flow;
display: list-item block flow-root;
display: flow list-item block;

/* <display-internal> values */
display: table-row-group;
display: table-header-group;
display: table-footer-group;
display: table-row;
display: table-cell;
display: table-column-group;
display: table-column;
display: table-caption;
display: ruby-base;
display: ruby-text;
display: ruby-base-container;
display: ruby-text-container;

/* <display-box> values */
display: contents;
display: none;

/* <display-legacy> values */
display: inline-block;
display: inline-table;
display: inline-flex;
display: inline-grid;

/* Global values */
display: inherit;
display: initial;
display: unset;
```

[MDN display](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)

## BFC （清除浮动和解决外边距塌陷）


BFC(Block Formatting Contexts)直译为"块级格式化上下文"。Block Formatting Contexts就是页面上的一个隔离的渲染区域，容器里面的子元素不会在布局上影响到外面的元素，反之也是如此。如何产生BFC？
> 浮动元素,float的值不为none。  
overflow的值不为visible。  
绝对定位元素,position的值不为relative和static。  
display的值为table-cell, table-caption, inline-block中的任何一个。  
display的值flow-root  
...

那BFC一般有什么用呢？比如常见的多栏布局，结合块级别元素浮动，里面的元素则是在一个相对隔离的环境里运行。

[MDN BFC](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

## CSS选择器

标签名称，属性值

### 类选择器（Class selectors)

### ID选择器（ID selectors）

### 伪类选择器（Pseudo-classes selectors）

:link
:visited
:active
:hover
:focus
:first-child
:nth-child
:nth-last-child
:nth-of-type
:first-of-type
:last-of-type
:empty
:target
:checked
:enabled
:disabled

### 基于关系的选择器

A E	元素A的任一后代元素E (后代节点指A的子节点，子节点的子节点，以此类推)
A > E	元素A的任一子元素E(也就是直系后代)
E:first-child	任一是其父母结点的第一个子节点的元素E
B + E	元素B的任一下一个兄弟元素E
B ~ E	B元素后面的拥有共同父元素的兄弟元素E

[MDN 选择器](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_started/Selectors)

## 实现垂直居中

1. 绝对定位top: 50%;margin-top 负一半
2. 绝对定位top:50%; transform: translate(0, -50%);
3. 绝对定位，bottom、top 相同，margin: auto;
4. 给父元素设置相等的上下内边距，子元素自然是垂直居中的，当然这时候父元素是不能设置高度的
5. 不用绝对定位，使用一个height:50% 的元素把它挤下来
6. flex布局，flex-direction默认row, align-items: center;
7. flex布局，垂直分布，flex-direction: column;justify-content: center;
8. 使用 line-height 对单行文本进行垂直居中
9. 使用 line-height 和 vertical-align 对图片进行垂直居中
10. 使用 display: table; 和 vertical-align: middle; 对容器里的文字进行垂直居中
11. grid 布局 place-items: center;

## CSS3特性

### 选择器

[attribute^=value]: 选择某元素attribute属性是以value开头的。  
[attribute$=value]: 选择某元素attribute属性是以value结尾的。  
[attribute*=value]: 选择某元素attribute属性包含value字符串的。  
E:nth-child(n): 选择属于其父元素的第n个子元素的每个E元素。  
E:nth-last-child(n): 选择属于其父元素的倒数第n个子元素的每个E元素。  
E:disabled: 选择每个禁用的E元素。  
E:checked: 选择每个被选中的E元素。  
...

### Transition,Transform和Animation

这三个特性是CSS3新增的和动画相关的特性。

Transition可以在当元素从一种样式变换为另一种样式时为元素添加效果，而不用使用Flash动画或JavaScript。

Transform用来向元素应用各种2D和3D转换，该属性允许我们对元素进行旋转、缩放、移动或倾斜等操作。
translate(x,y): 定义2D位移转换。
rotate(angle): 定义2D旋转，在参数中规定角度。

Animation让CSS拥有了可以制作动画的功能。使用CSS3的Animation制作动画我们可以省去复杂的js代码。

### 背景

CSS3新增了几个关于背景的属性，分别是background-clip、background-origin、background-size和background-break

background-clip: border-box; 背景从border开始显示
background-clip: padding-box; 背景从padding开始显示
background-clip: content-box; 背景显content区域开始显示
background-clip: no-clip; 默认属性，等同于border-box

background-size: contain; 缩小图片以适合元素（维持像素长宽比）
background-size: cover; 扩展元素以填补元素（维持像素长宽比）
background-size: 100px 100px; 缩小图片至指定的大小
background-size: 50% 100%; 缩小图片至指定的大小，百分比是相对包含元素的尺寸

background-break: continuous; 默认值。忽略盒之间的距离（也就是像元素没有分成多个盒子，依然是一个整体一样）
background-break: bounding-box; 把盒之间的距离计算在内；
background-break: each-box; 为每个盒子单独重绘背景。

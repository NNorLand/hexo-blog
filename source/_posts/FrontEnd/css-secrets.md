---
title: CSS揭秘读书笔记
categories:
  - FrontEnd
date: 2016-11-22 16:38:56
updated: 2016-11-22 16:38:56
tags: CSS
---
# 前言

> 一项规范如果要推进到最终阶段，其中的每项特 性都必须具备两个独立的实现和全面的测试。

原先的那种方式已经玩不转 了。
因此，WC3决定跨出一步，将 CSS 打散到多个不同的规范(模块)中， 
每个模块都可以独立更新版本。
这其中，那些延续CSS 2.1已有特性的模块 会升级到 3 这个版本号。
比如:  
CSS 语法(http://w3.org/TR/css-syntax-3)  
CSS 层叠与继承(http://w3.org/TR/css-cascade-3)  
CSS 颜色(http://w3.org/TR/css3-color)  
选择符(http://w3.org/TR/selectors)  
CSS 背景与边框(http://w3.org/TR/css3-background)  
CSS 值与单位(http://w3.org/TR/css-values-3)  
CSS 文本排版(http://w3.org/TR/css-text-3)  
CSS 文本装饰效果(http://w3.org/TR/css-text-decor-3)  
CSS 字体(http://w3.org/TR/css3-fonts)  
CSS 基本 UI 特性(http://w3.org/TR/css3-ui)  
如果某个模块是前所未有的新概念，那它的版本号将从 1 开始。 比如下面这些:
CSS 变形(http://w3.org/TR/css-transforms-1)  
图像混合效果(http://w3.org/TR/compositing-1)    
滤镜效果(http://w3.org/TR/filter-effects-1)  
CSS 遮罩(http://w3.org/TR/css-masking-1)  
CSS 伸缩盒布局(http://w3.org/TR/css-flexbox-1)   
CSS 网格布局(http://w3.org/TR/css-grid-1)  

尽管“CSS3”这个名词非常流行，但它实际上并没有在任何规范中定义过。  
真正的情况是，绝大多编辑在提到这个词时，指的是一个非正式的集合，它包括 CSS 规范第三 版(Level 3)再加上一些版本号还是1的新规范。  
现在CSS有很多实验性特性,而且部分特性已经正式发布使用.  

作为一名初级前端工程师,写页面-模板工程师职责-还是目前的主要本职工作,所以最近读了一本关于CSS的书籍.
作为一门大热的编程语言,市面上新出版的关于JavaScript的书很多,但是,关于CSS的新书几乎没有,基本都是好几年前的,
加上工作中经常发现没有用过,但很巧妙的CSS语法,感觉有必要再认真学一下关于CSS的知识了.
这本书就在这时候出现了.从[CSS魔法](https://github.com/cssmagic/blog/issues)的博客得知,
魔法哥刚好翻译完了一本新的CSS书籍,便找来读了读.读起来感觉很有意思.  

# 读书笔记和内容记录  

## 第一部分

### 1. 合理简写
有时候，代码易维护和代码量少不可兼得。
来看看下面的代码片断，我们要为一个元素添加一道10px 宽的边框，但左侧不加边框。
```
border-width: 10px 10px 10px 0;  
```
只要这一条声明就可以搞定了，但如果日后要改动边框的宽度，你需要 同时改三个地方。如果把它拆成两条声明的话，改起来就容易多了，而且可 读性或许更好一些:
```
border-width: 10px; 
border-left-width: 0;  
```
又比如,
```
background: url(tr.png) no-repeat top right / 2em 2em, 
            url(br.png) no-repeat bottom right / 2em 2em,
            url(bl.png) no-repeat bottom left / 2em 2em;
```
请注意 background-size 和 background-repeat 的值被重复了三遍， 
尽管每层背景的这两个值确实是相同的。
其实我们可以从 CSS 的“`列表扩散规则`”那里得到好处。
它的意思是说，`如果只为某个属性提供一个值，那 它就会扩散并应用到列表中的每一项。`
因此，我们可以把这些重复的值从简写属性中抽出来写成一个展开式属性:
```
background: url(tr.png) top right,
            url(br.png) bottom right,
            url(bl.png) bottom left; 
background-size: 2em 2em;
background-repeat: no-repeat;
```

### 2. currentColor  
在 CSS 颜色(第三版)(http://w3.org/TR/css3-color)规范中增加了一个特殊的颜色关键字 currentColor，它是从 SVG 那里借鉴来的。
这个关键字并没有绑定到一个固定的颜色值，而是一直被解析为 color。
实际上，这个特性让它成为了 CSS 中有史以来的第一个变量。

### 3. 视觉错觉
字母的形状在两端都比较整齐，而顶部和底部则往往参差不齐，
从而导致你的眼睛把这些参差不齐的空缺部分感知为多出来的内边距。
因此，如果我们希望四边的内边距看起来是基本一致的，就需要减少顶部和底部的内边距。  
如下图,图一 边距均相等,图二并不相等,但是图二在视觉上才是相等的。
<div style="text-align:center">
<image style="display:block;margin:auto;" src ="https://ww4.sinaimg.cn/large/65e4f1e6gw1fa1v1ekvndj209m092wek.jpg"/>
【图1】
</div>  
<div style="text-align:center">
<image style="display:block;margin:auto;" src ="https://ww4.sinaimg.cn/large/006tNc79jw1fa11yztc6fj304p037746.jpg"/>
【图2】
</div>  

## 背景与边框

### 1.多重边框  
* box-shadow 方案  

box-shadow 的好处在于，它支持逗号分隔语法，我们 可以创建任意数量的投影。
```
background: yellowgreen; box-shadow: 0 0 0 10px #655,
            0 0 0 15px deeppink,
            0 2px 5px 15px rgba(0,0,0,.6);
```
效果如图:  
![](http://ww2.sinaimg.cn/large/65e4f1e6gw1fa1vgeqy20j20am07iq34.jpg)  
> 需要注意的是，box-shadow 是层层叠加的，第一层投影位于最顶 层，依次类推。因此，你需要按此规律调整扩张半径

* outline 方案

```
background: yellowgreen; 
border: 10px solid #655; 
outline: 5px solid deeppink;
```
描边的另一个好处在于，你可以通过 outline-offset 属性来控制它跟元素边缘之间的间距，
这个属性甚至可以接受负值。这对于某些效果来说非常有用。
举个例子，下图就实现了简单的缝边效果。  
![](https://ww4.sinaimg.cn/large/65e4f1e6gw1fa1visqdajj209q068weh.jpg)
>* 只适合两层边框
>* 边框不一定会贴合 border-radius 属性产生的圆角，因此如果元素是圆角的，它的描边可能还是直角的。
> `请注意，这种行 为被 CSS 工作组认为是一个 bug，因此未来可能会改为贴合 border- radius 圆角。`
>* CSS规范中,`描边可以不是矩形`,使用此方案最好做好不同浏览器的测试。 

### 2. calc() 方案
```
background-position: calc(100% - 20px) calc(100% - 10px);
```

### 3.边框内圆角
上面说过,使用outline绘制双重边框,圆角元素可能描边还是直角。  
解决办法  
1. 
```
background: tan; border-radius: .8em; 
padding: 1em;
box-shadow: 0 0 0 .6em #655; 
outline: .6em solid #655;
```
`box-shadow` + `outline`,两者叠加。  
实现效果如图  
![](http://ww1.sinaimg.cn/large/65e4f1e6gw1fa1vuf4iv8j209u03m3ym.jpg)  
但是这样,描边是直角,但是box-shadow实际上是圆角的,我们需要调整outline的扩张半径,刚好填充圆角空隙。  
此处用到勾股定理(小学知识还能用上)。  
如图  

![](http://ww1.sinaimg.cn/large/65e4f1e6gw1fa1vxvpojlj209w062aa4.jpg)  

为了让这个效果得以达成，扩张半径需要比描边的宽度值小，但它同时又要比 ( 2 −1)r 大
* 注意:如果描边的宽度比 ( 2 −1)r 小， 那我们是不可能用这个方法达成该效果的。



---
title: css3混合模式
categories:
  - FrontEnd
date: 2016-11-30 11:52:56
updated: 2016-11-30 11:52:56
tags: CSS
---
工作中,遇到这样一个问题:  
我们`可爱`的设计师问我,能不能实现下面这个图的效果
![](https://ww4.sinaimg.cn/large/006y8lVagw1fa9zv8wcbij30lo0iojts.jpg)
右边上面的二维码是从微信保存下来的二维码,左边是预期实现的效果,这里,图片采用了一中PS的混合模式:正片叠底。  
我看到的第一反应:我靠,这图片是白底的,让图片改变背景色?  
虽然出于前端和设计师之间的深厚友谊,本不应该在没有百度的情况下说没有办法实现的,但这个情况下我还是当机立断:这咋弄,没法实现。  
不过,遇到问题习惯性的问问百度,我就百度了一下,设计师所说的`正片叠底`。  
百度出的结果大跌眼镜,CSS还真的有这个属性。  
这就是CSS的[mix-blend-mode](https://www.w3.org/TR/compositing-1/#mix-blend-mode)(混合模式)属性。这个属性的作用就是让元素内容和这个元素的背景以及下面的元素发生“混合”。  
其支持的值还很多:  
```
mix-blend-mode: normal;          //正常
mix-blend-mode: multiply;        //正片叠底
mix-blend-mode: screen;          //滤色
mix-blend-mode: overlay;         //叠加
mix-blend-mode: darken;          //变暗
mix-blend-mode: lighten;         //变亮
mix-blend-mode: color-dodge;     //颜色减淡
mix-blend-mode: color-burn;      //颜色加深
mix-blend-mode: hard-light;      //强光
mix-blend-mode: soft-light;      //柔光
mix-blend-mode: difference;      //差值
mix-blend-mode: exclusion;       //排除
mix-blend-mode: hue;             //色相
mix-blend-mode: saturation;      //饱和度
mix-blend-mode: color;           //颜色
mix-blend-mode: luminosity;      //亮度

mix-blend-mode: initial;         //初始
mix-blend-mode: inherit;         //继承
mix-blend-mode: unset;           //复原
```
EXAMPLE  
Given the following sample markup:
```html
<body>
  <img src="ducky.png"/>
</body>
```
And the following style rule:
```css
body { background-color: green; }
```
... will produce the following result:
![](https://ww4.sinaimg.cn/large/006y8lVagw1fab9ycfoduj30a00b074n.jpg)
If we change the style rule to include blending:
```css
body { background-color: green; }
img { mix-blend-mode: multiply; }
```
... the output will be the image blending with the green background of the <body> element.  
![](https://ww4.sinaimg.cn/large/006y8lVagw1fab9zd6d0hj30a10b10t1.jpg)
不过目前兼容性还一般,万恶的IE全家,截止到写这篇文章的时候,兼容性是这样的

![](http://ww1.sinaimg.cn/large/006y8lVagw1faqbok44iqj30z70g2q5u.jpg)

<p class="ciu_embed" data-feature="css-mixblendmode" data-periods="future_1,current,past_1,past_2">
  <a href="http://caniuse.com/#feat=css-mixblendmode">Can I Use css-mixblendmode?</a> Data on support for the css-mixblendmode feature across the major browsers from caniuse.com.
</p>  

一片飘红有没有?包括edge。看来还是谨慎使用吧。

<script src="//cdn.jsdelivr.net/caniuse-embed/1.0.1/caniuse-embed.min.js"></script>
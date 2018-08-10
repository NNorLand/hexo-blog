---
title: CSS小技巧整理
date: 2016-08-18 15:36:09
categories:
- FrontEnd
tags: CSS
---
# CSS小技巧整理
<!-- more -->
1. 某一元素高度等于宽度
示例:
```html
<style type="text/css">
#container {
    width: 80%;
    height: 500px;
}
.attr {
    width: 50%;
    height: 0;
    padding-bottom: 50%;
    background-color: #008b57;
}
</style>
<div id='container'>
    <div class='attr'></div>
</div>
```
来源: [css中如何规定某一元素高度等于其宽度](https://segmentfault.com/q/1010000002629233 'blank')

2. iOS textarea,默认样式,字体颜色,目前未知.最好不用,采用div

3. blur 边缘发亮,可以将blur元素超过所需大小,多余部分overflow:hidden掉.  
```CSS
.blur{
    filter: blur(10px);
    margin: -10px;
    padding: 10px;
}
```
4. css中padding和margin,设置宽高,百分比是相对父元素的宽度.可以用来生成等比矩形.  
浏览器默认样式中,ol,ul,li的padding-left为像素单位,其他padding是以em为单位,不覆盖样式需要注意.
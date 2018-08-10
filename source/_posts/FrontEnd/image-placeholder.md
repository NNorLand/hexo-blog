---
title: 几个优秀的图片占位网站
date: 2016-11-18 18:02:42
categories:
- FrontEnd
tags: html
---
在开发网站时，通常需要填充一些图片来预览页面效果，如果没有合适的素材，这时我们就需要占位图片，
通过 URL 定制形如 sitename.com/width/height 的地址就可以得到一个随机的占位图片。  
下面就来细数10个优秀的占位图片生成网站。

# [Placehold.it](http://placehold.it)
A quick and simple image placeholder service.  
```html
<img src="http://placehold.it/350x200" />
<img src="http://placehold.it/300/09f/fff.png" />
<img src="http://placehold.it/300&text=placehold.it+rocks!" />
```
![](http://placehold.it/350x200)  

可定制：图片格式、背景颜色、文本、文本颜色、图像尺寸

# [lorempixel](http://lorempixel.com/)
Placeholder Images for every case.
Webdesign or Print. Just put a custom url in your html and you receive a proper placeholder picture
```html
http://lorempixel.com/400/200to get a random picture of 400 x 200 pixels
http://lorempixel.com/g/400/200to get a random gray picture of 400 x 200 pixels
http://lorempixel.com/400/200/sportsto get a random picture of the sports category
http://lorempixel.com/400/200/sports/1to get picture no. 1/10 from the sports category
http://lorempixel.com/400/200/sports/Dummy-Text...with a custom text on the random Picture
http://lorempixel.com/400/200/sports/1/Dummy-Text...with a custom text on the selected Picture
```
![](http://lorempixel.com/350/200/sports)  

可定制：图像分类、文本、图像尺寸、灰度图片

# [Fake images please?](http://fakeimg.pl)

You just have to put your image size after our URL. 
Only the first parameter is mandatory. There are options too, 
you can pass a text, or change some colors. 
Colors must be hexadecimal,
the first one is the background color. 
You can add the alpha value of the color with a comma, (hex,a).
The text can be passed with the text GET variable.
Here are some examples you can look at:
```html
<img src="http://fakeimg.pl/300/">
<img src="http://fakeimg.pl/250x100/">
<img src="http://fakeimg.pl/250x100/ff0000/">
<img src="http://fakeimg.pl/350x200/ff0000/000">
<img src="http://fakeimg.pl/350x200/ff0000,128/000,255">
<img src="http://fakeimg.pl/350x200/?text=Hello">
<img src="http://fakeimg.pl/350x200/?text=World&font=lobster">
```
![](http://fakeimg.pl/350x200/?text=World&font=lobster)  

可定制：背景颜色、文本、文本颜色、图像尺寸、文本字体

# [{placekitten}](http://placekitten.com)

A quick and simple service for getting pictures of
kittens for use as placeholders in your designs or code. 
Just put your image size (width & height) after our URL
and you'll get a placeholder.
```
Like this: http://placekitten.com/200/300
or: http://placekitten.com/g/200/300
```  
![](http://placekitten.com/g/200/300)  

可定制：图像尺寸、灰度图片

# [hhhhold!](http://hhhhold.com)
Never understimate the insanity of user-generated 
content in your projects again.
```html
<img src="http://hhhhold.com/350x200" />
<img src="http://hhhhold.com/m/w/b" />
<img src="http://hhhold.com/350x200/png" />
```
![](http://hhhold.com/350x200/png)  

可定制：图像尺寸、随机尺寸、图片格式

还有 The Random Image Generator,占位图 等等

参考: http://www.uedsc.com/the-top-10-placeholder-image-services.html
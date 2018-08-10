---
title: 移动端高清屏图片适配
date: 2016-08-04 16:48:59
categories:
- FrontEnd
tags: [移动开发,html,CSS]
---
参考[张鑫旭博客](http://www.zhangxinxu.com/wordpress/2014/10/responsive-images-srcset-size-w-descriptor/ 'blank')
---
首先我们看下我们切图的命名方式：

假设有两张图片名为：正确的命名方式应该是这样test_t@2x.png 、test_t@3x.png

这是对于ios APP 切图来说的。
HTML并不会智能匹配,但是新标准有相应的属性能够实现.

<!-- more -->

## 1. image-set

Webkit内核"safari6"和“chrome21”支持CSS4的background-image新规范草案[image-set](https://cloudfour.com/examples/image-set/)。通过Webkit内核的浏览器私有属性“-webkit”，image-set为Web前端人员提供了一种解决高分辨率图像的显示，用来解决苹果公司提出的Retian屏幕显示图片的技术问题。简而言之：这个属性用来支持Web前端人员解决不同分辨率下图片的显示，特别的（Retina屏幕）。

测试页面

```html
<div id="test"></div>
```
```CSS
#test {
        background-image: url(assets/no-image-set.png);
        background-image: -webkit-image-set(url(assets/test.png) 1x,
               url(assets/test-hires.png) 2x);
        background-image: -moz-image-set(url(assets/test.png) 1x,
               url(assets/test-hires.png) 2x);
        background-image: -o-image-set(url(assets/test.png) 1x,
               url(assets/test-hires.png) 2x);
        background-image: -ms-image-set(url(assets/test.png) 1x,
               url(assets/test-hires.png) 2x);
        width:200px;
        height:75px;
    }
```
## img srcset
```html
<img class="image" src="mm-width-128px.jpg"
     srcset="mm-width-128px.jpg 128w, mm-width-256px.jpg 256w, mm-width-512px.jpg 512w"
     sizes="(max-width: 360px) 340px, 128px">
```

```html
<img src="normal-image.jpg" srcset="better-image.jpg 2x">
```
1. srcset用来指向提供的图片资源，注意，仅仅是资源指向，没有以前的1x, 2x什么的，这个都交给浏览器了，我们不需要关心！例如这里，指向了3个尺寸图片，分别实际尺寸128像素，256像素和512像素。

2. sizes用来表示尺寸临界点，主要跟响应式布局打交道。语法如下：

> sizes="[media query] [length], [media query] [length] ... etc"

例如上述代码中，size = "(max-width: 360px) 340px, 128px"表示当视区宽度不大于360像素时候，图片的宽度限制为340像素，其他情况下，使用128像素（对应下面demo页面第1张图）。

如果sizes="128px", 则尺寸就一直是128像素，图片只会根据设备像素比发生变化。

注意，这里所有的值都是指宽度值，且单位任意，em, px, cm, vw, ...都是可以的，甚至可以CSS3的calc计算（对应下面demo页面第2张图），例如：

sizes="(max-width: 360px) calc(100vw - 20px), 128px"
表示当视区宽度不大于360像素时候，图片宽度为整个视区宽度减去20像素的大小。

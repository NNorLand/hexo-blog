---
title: 数据结构与算法JavaScript描述
categories:
  - JavaScript
date: 2019-06-11 15:22:02
updated: 2019-06-11 15:22:02
tags: JavaScript
---

## 数组
有几个操作是将数组作为一个整体进行的。首先，可以将一个数组赋给另外一个数组:
```js
var nums = [];
for (var i = 0; i < 10; ++i) {
  nums[i] = i+1;
}
var samenums = nums;
```
但是，当把一个数组赋给另外一个数组时，只是为被赋值的数组增加了一个新的引用。当 你通过原引用修改了数组的值，另外一个引用也会感知到这个变化。下面的代码展示了这 种情况:
```js
var nums = [];
for (var i = 0; i < 100; ++i) {
  nums[i] = i+1;
}
var samenums = nums;
nums[0] = 400; print(samenums[0]); // 显示 400
```
这种行为被称为浅复制，新数组依然指向原来的数组。一个更好的方案是使用深复制，将 原数组中的每一个元素都复制一份到新数组中。可以写一个深复制函数来做这件事:
```
function copy(arr1, arr2) {
  for (var i = 0; i < arr1.length; ++i) {
      arr2[i] = arr1[i];
  }
}
```
关于JavaScript的深浅拷贝，可参考[【知乎】javascript中的深拷贝和浅拷贝？](https://www.zhihu.com/question/23031215)

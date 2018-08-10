---
title: JavaScript基础巩固第一天
categories:
- JavaScript
date: 2016-07-05 14:44:49
tags: JavaScript
---
JavaScript组成部分：语法，类型，语句，关键字，保留字，操作符，对象。
标识符，就是指变量、函数、属性的名字，或者函数的参数。
按照惯例，ECMAScript标识符采用驼峰大小写格式。构造函数都以大写字母开始。
JavaScript中的实数常常只是真实值的一个近似表示。
有两种方式来访问对象的属性，点操作符或者中括号操作符。

JavaScript五种基本数据类型，Undefined,Null,Boolean,Number和string。还有一个复杂数据类型，object。
从逻辑角度来看，null值表示一个空指针对象 alert(typeof null); //=> "object"

<!--more-->

typeof是一个操作符，不是函数。
JavaScript是大小写敏感的，因此typeOf完全可以是一个有效的函数名。

如果定义的变量准备在将来用于保存对象，那么最好将该变量初始化为null而不是其他值，这样一来，只要直接检查null值就可以知道相应的变量是否已经保存了一个对象的引用，如if (car !=null) {  /* 对car对象执行某些操作*/  }
实际上，undefined值是派生自null的，因此alert(null == undefined); //true

引用类型的值都是Object的实例。因此，在检测一个引用类型值和Object构造函数时，instanceof操作符始终会返回true。
当然，如果使用instanceof操作符检测基本类型的值，则该操作符始终会返回false，因为基本类型不是对象。

使用var声明的变量会自动被添加到最接近的环境中。
在函数内部，最接近的环境就是函数的局部环境；
在with语句中，最接近的环境是函数环境。
如果初始化变量时没有使用var声明，该变量会自动被添加到全局环境。如下所示：
```js
function add(num1, num2) {
    var sum = num1 + num2;
    return sum;
}

var result = add(10, 20);    //30
alert(sum);                  //由于sum不是有效的变量，因此会导致错误
```

在初始化变量之前，一定要先声明。在严格模式下，初始化未经声明的变量会导致错误。

在for循环中,这点尤其重要
```js
for (var i=0; i < 10; i++){
    doSomething(i);
}

alert(i);      //10
```



---
title: 理解JavaScript函数参数
categories:
  - JavaScript
date: 2016-11-25 17:23:50
updated: 2016-11-25 17:23:50
tags: JavaScript
---
ECMAScript函数的参数与大多数其他语言中函数的参数有所不同。
ECMAScript函数不介意传递进来多少个参数，也不在乎传进来参数是什么数据类型。
ECMAScript中的参数在内部是用一个数组来表示的。
函数接收到的始终都是这个数组，而不关心数组中包含哪些参数（如果有参数的话）。  
在函数体内可以通过arguments对象来访问这个参数数组，从而获取传递给函数的每一个参数。

其实，arguments对象只是与数组类似（它并不是Array的实例），因为可以使用方括号语法访问它的每一个元素（即第一个元素是arguments[0]，第二个元素是argumetns[1]，以此类推），使用length属性来确定传递进来多少个参数。

不显式地使用命名参数：
```js
function sayHi() {
    alert("Hello " + arguments[0] + "," + arguments[1]);
}
```
ECMAScript函数的一个重要特点：命名的参数只提供便利，但不是必需的。
另外，在命名参数方面，其他语言可能需要事先创建一个函数签名，而将来的调用必须与该签名一致。
但在ECMAScript中，没有这些条条框框，解析器不会验证命名参数。

通过访问arguments对象的length属性可以获知有多少个参数传递给了函数。
下面这个函数会在每次被调用时，输出传入其中的参数个数：
```js
function howManyArgs() {
    alert(arguments.length);
}

howManyArgs("string", 45);  //2
howManyArgs();              //0
howManyArgs(12);            //1
```
执行以上代码会依次出现3个警告框，分别显示2、0和1。
由此可见，开发人员可以利用这一点让函数能够接收任意个参数并分别实现适当的功能。请看下面的例子：
```js
function doAdd() {
    if(arguments.length == 1) {
        alert(arguments[0] + 10);
    } else if (arguments.length == 2) {
        alert(arguments[0] + arguments[1]);
    }
}

doAdd(10);         //20
doAdd(30, 20);     //50
```
函数doAdd()会在只有一个参数的情况下给该参数加上10；如果是两个参数，则将那个参数简单相加并返回结果。
因此，doAdd(10)会返回20，而doAdd(30,20)则返回50。
虽然这个特性算不上完美的重载，但也足够弥补ECMAScript的这一缺憾了。

> 由于不存在函数签名的特性，ECMAScript函数不能重载

另一个与参数相关的重要方面，就是arguments对象可以与命名参数一起使用，如下面的例子所示：

```js
function doAdd(num1, num2) {
    if(arguments.length == 1) {
       alert(num1 + 10);
    } else if (arguments.length == 2) {
        alert(arguments[0] + num2);
    }
}
```

在重写后的这个doAdd()函数中，两个命名参数都与arguments对象一起使用。由于num1的值与arguments[0]的值相同，因此它们可以互换使用（当然，num2和arguments[1]也是如此）。

关于arguments的行为，还有一点比较有意思。那就是它的值永远与对应命名参数的值保持同步。例如：
```js
function doAdd(num1, num2) {
    arguments[1] = 10;    
    alert(arguments[0] + num2);
}
```
每次执行这个doAdd()函数都会重写第二个参数，将第二个参数的值修改为10。
因为arguments对象中的值会自动反映到对应的命名参数，所以修改arguments[1]，也就修改了num2，结果它们的值都会变成10。
不过，这并不是说读取这两个值会访问相同的内存空间；它们的内存空间是独立的，但它们的值会同步。
但这种影响是单向的：修改命名参数不会改变arguments中对应的值。
另外还要记住，如果只传入了一个参数，那么为arguments[1]设置的值不会反应到命名参数中。
这是因为arguments对象的长度是由传入的参数个数决定的，不是由定义函数时的命名参数的个数决定的。

关于参数还要记住最后一点：没有传递值的命名参数将自动被赋予undefined值。
这就跟定义了变量但又没有初始化一样。
例如，如果只给doAdd()函数传递了一个参数，则num2中就会保存undefined值。

严格模式对如何使用argumetns对象做出了一些限制。
首先，像前面例子中那样的赋值会变得无效。
也就是说，即使把arguments[1]设置为10，num2的值仍然还是undefined。
其次，重写arguments的值会导致语法错误（代码将不会执行）。

> ECMAScript中的所有参数传递的都是值，不可能通过引用传递参数。

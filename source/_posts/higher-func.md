---
title: JavaScript高阶函数
categories:
  - JavaScript
date: 2020-03-17 14:16:58
updated: 2020-03-17 14:16:58
tags: JavaScript
---
## 高阶函数定义
高阶函数英文叫 Higher-order function。高阶函数是对其他函数进行操作的函数，操作可以是将它们作为参数，或者返回它们。简单总结为高阶函数是一个接收函数作为参数或者将函数作为返回输出的函数。  
Array.prototype.map，Array.prototype.filter，Array.prototype.reduce和Array.prototype.sort是JavaScript中内置的高阶函数。它们接受一个函数作为参数，并应用这个函数到列表的每一个元素。下面是一些内置高阶函数的具体说明讲解，以及和不使用高阶函数情况下的对比

```js
let isString = obj => Object.prototype.toString.call( obj ) === '[object String]';

let isArray = obj => Object.prototype.toString.call( obj ) === '[object Array]';

let isNumber = obj => Object.prototype.toString.call( obj ) === '[object Number]';

let isType = type => obj => {
  return Object.prototype.toString.call( obj ) === '[object ' + type + ']';
}

isType('String')('123');        // true
isType('Array')([1, 2, 3]);    // true
isType('Number')(123);            // true
```


```js
//JS实现一个无限累加的add函数
add(1)  //1 
add(1)(2)  //3
add(1)(2)(3)  //6
```
```js
function add(a) {
    function sum(b) { // 使用闭包
        a = a + b; // 累加
        return sum;
     }
     sum.toString = function() { // 重写toString()方法
        return a;
    }
     return sum; // 返回一个函数
}

add(1); // 1
add(1)(2);  // 3
add(1)(2)(3)； // 6
```

```js
// 手动实现map函数
const strArray=['JavaScript','PHP','JAVA','C','Python'];
function mapForEach(arr,fn){
    const newArray = [];
    for(let i = 0; i<arr.length;i++){
        newArray.push({
            fn(arr[i])
        );
    }
    return newArray;
}
const lenArray = mapForEach(strArray,function(item){
    return item.length;
});

console.log(lenArray);//[10,3,4,1,6]
```

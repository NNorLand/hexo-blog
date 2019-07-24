---
title: 前端面试之JavaScript
categories:
  - interview
date: 2019-07-23 22:48:58
updated: 2019-07-23 22:48:58
tags:
---
## call apply bind arguments
**this 永远指向最后调用它的那个对象**
apply、call、bind 都是可以改变 this 的指向的，但是这三个函数稍有不同。

fun.apply(thisArg, [argsArray])
其实 apply 和 call 基本类似，他们的区别只是传入的参数不同。
fun.call(thisArg[, arg1[, arg2[, ...]]])
bind()方法创建一个新的函数，在bind()被调用时，这个新函数的this被bind的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。
fun.bind(thisArg[, arg1[, arg2[, ...]]])
函数调用的方法一共有 4 种

作为一个函数调用
函数作为方法调用
使用构造函数调用函数
作为函数方法调用函数（call、apply）


函数new 的过程
1. 创建一个空对象 obj;
2. 将新创建的空对象的隐式原型指向其构造函数的显示原型。
3. 使用 call 改变 this 的指向
4. 如果无返回值或者返回一个非对象值，则将 obj 返回作为新对象；如果返回值是一个新对象的话那么直接直接返回该对象。

## 原型链
## JS继承
原型链继承
## js 数据类型
六种基本 Number String Boolean Symbol Null Undefined
一种引用 Object
Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
另一个新的 API，Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
Symbol.for()，Symbol.keyFor() 


## 数组去重
```js
// 1
var array = [1,4,7,5,7,5]
Array.from(new Set(array))

// 2 循环遍历
const newArr = Array.of();
for (let item of array) {
  if (newArr.includes(item)) continue;
  newArr.push(item)
}
```

## es6 Iterator
JavaScript 原有的for...in循环，只能获得对象的键名，不能直接获取键值。ES6 提供for...of循环，允许遍历获得键值。

原生具备 Iterator 接口的数据结构如下。

Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象


## 数组API
### 修改器方法
下面的这些方法会改变调用它们的对象自身的值：

Array.prototype.copyWithin() 
在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值。
Array.prototype.fill() 
将数组中指定区间的所有元素的值，都替换成某个固定的值。
Array.prototype.pop()
删除数组的最后一个元素，并返回这个元素。
Array.prototype.push()
在数组的末尾增加一个或多个元素，并返回数组的新长度。
Array.prototype.reverse()
颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。
Array.prototype.shift()
删除数组的第一个元素，并返回这个元素。
Array.prototype.sort()
对数组元素进行排序，并返回当前数组。
Array.prototype.splice()
在任意的位置给数组添加或删除任意个元素。
Array.prototype.unshift()
在数组的开头增加一个或多个元素，并返回数组的新长度。

### 访问方法
下面的这些方法绝对不会改变调用它们的对象的值，只会返回一个新的数组或者返回一个其它的期望值。

Array.prototype.concat()  
返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。  
Array.prototype.includes()   
判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。  
Array.prototype.join()  
连接所有数组元素组成一个字符串。  
Array.prototype.slice()  
抽取当前数组中的一段元素组合成一个新数组。  
Array.prototype.toSource()   
返回一个表示当前数组字面量的字符串。遮蔽了原型链上的 Object.prototype.toSource() 方法。  
Array.prototype.toString()  
返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 Object.prototype.toString() 方法。  
Array.prototype.toLocaleString()  
返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 Object.prototype.toLocaleString() 方法。  
Array.prototype.indexOf()  
返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。  
Array.prototype.lastIndexOf()  
返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。  
### 迭代方法
在下面的众多遍历方法中，有很多方法都需要指定一个回调函数作为参数。在每一个数组元素都分别执行完回调函数之前，数组的length属性会被缓存在某个地方，所以，如果你在回调函数中为当前数组添加了新的元素，那么那些新添加的元素是不会被遍历到的。此外，如果在回调函数中对当前数组进行了其它修改，比如改变某个元素的值或者删掉某个元素，那么随后的遍历操作可能会受到未预期的影响。总之，不要尝试在遍历过程中对原数组进行任何修改，虽然规范对这样的操作进行了详细的定义，但为了可读性和可维护性，请不要这样做。

Array.prototype.forEach()  
为数组中的每个元素执行一次回调函数。  
Array.prototype.entries()  
返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。  
Array.prototype.every()  
如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。  
Array.prototype.some()  
如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。  
Array.prototype.filter()  
将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。  
Array.prototype.find()   
找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。  
Array.prototype.findIndex()    
找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。  
Array.prototype.keys()   
返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。  
Array.prototype.map()  
返回一个由回调函数的返回值组成的新数组。  
Array.prototype.reduce()  
从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。  
Array.prototype.reduceRight()  
从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。  
Array.prototype.values()   
返回一个数组迭代器对象，该迭代器会包含所有数组元素的值。  
Array.prototype[@@iterator]()  
和上面的 values() 方法是同一个函数。  

### 补充示例
扩展运算符
Array.from()
```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```
Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
```js
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```
new Array(3) // [,,]
Array.of(3) // [3]
Array.of(3, 11, 8) // [3,11,8]

通过索引删除某个元素
var removedItem = fruits.splice(pos, 1); // this is how to remove an item
fruits.slice(); //复制一个数组
arr.slice([begin[, end]]) 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。
find()
finIndeX()
```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```
includes()

ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。

forEach(), filter(), reduce(), every() 和some()都会跳过空位。
map()会跳过空位，但会保留这个值
join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
ES6 则是明确将空位转为undefined。
## 闭包

## 值传递 引用传递

## 深拷贝浅拷贝
深拷贝：递归遍历树
```js
function deepClone(initalObj, finalObj) {    
  var obj = finalObj || {};    
  for (var i in initalObj) {        
    var prop = initalObj[i];        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
    if(prop === obj) {            
      continue;
    }        
    if (typeof prop === 'object') {
      obj[i] = (prop.constructor === Array) ? [] : {};            
      arguments.callee(prop, obj[i]);
    } else {
      obj[i] = prop;
    }
  }    
  return obj;
}
```
Object.create()
$.extend(true, {}, obj1);
_.cloneDeep(obj1);
_.merge(obj1, source); // source 源对象也会改变
_.defaultsDeep(obj1, source); // source 源对象也会改变
```js
// Shape - 父类(superclass)
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?',
  rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',
  rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'
```


## 浮点数精度
```js
function strip(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision));
}
```
## stream
## event loop
## http模块如何接收请求
## promisify
## 节流函数，防抖函数
```js 
function debounce(func, delay) {
    var timeout;
    return function(e) {
        console.log("清除",timeout,e.target.value)
        clearTimeout(timeout);
        var context = this, args = arguments
        console.log("新的",timeout, e.target.value)
        timeout = setTimeout(function(){
          console.log("----")
          func.apply(context, args);
        },delay)
    };
};
function throttle(fn, threshhold) {
 var timeout
 var start = new Date;
 var threshhold = threshhold || 160
 return function () {

 var context = this, args = arguments, curr = new Date() - 0
 
 clearTimeout(timeout)//总是干掉事件回调
 if(curr - start >= threshhold){ 
     console.log("now", curr, curr - start)//注意这里相减的结果，都差不多是160左右
     fn.apply(context, args) //只执行一部分方法，这些方法是在某个时间段内执行一次
     start = curr
 }else{
 //让方法在脱离事件后也能执行一次
     timeout = setTimeout(function(){
        fn.apply(context, args) 
     }, threshhold);
    }
  }
}
```
setTimeout clear
## 逆时针打印二维数组



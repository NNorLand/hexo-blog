---
title: 前端面试之es6
categories:
  - interview
date: 2019-07-25 22:40:55
updated: 2019-07-25 22:40:55
tags:
---

## 基本数据类型Symbol

```js
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false

// Symbol.for()的情况
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
```

Symbol 值不能与其他类型的值进行运算，会报错。  
api；Symbol.for()，Symbol.keyFor()

```js 模块的 Singleton 模式
// mod.js
const FOO_KEY = Symbol.for('foo');

function A() {
  this.foo = 'hello';
}

if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A();
}

module.exports = global[FOO_KEY];
```

## 对象新增方法

```js
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

## Proxy

```js
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
```

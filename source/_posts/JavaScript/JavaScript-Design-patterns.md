---
title: JavaScript设计模式
categories:
  - JavaScript
date: 2018-06-20 19:20:28
updated: 2018-06-20 19:20:28
tags: JavaScript
---
## 设计模式的类别

### 创建型设计模式

* 简单工厂模式（Simple Factory）
* 工厂方法模式（Factory Method）
* 抽象工厂模式（Abstract Factory）
* 创建者模式（Builder）
* 原型模式（Prototype）
* 单例模式（Singleton）

### 结构型设计模式

* 外观模式/门面模式（Facade门面模式）
* 适配器模式（Adapter）
* 代理模式（Proxy）
* 装饰模式（Decorator）
* 桥梁模式/桥接模式（Bridge）
* 组合模式（Composite）
* 享元模式（Flyweight）

### 行为设计模式

* 模板方法模式（Template Method）
* 观察者模式（Observer）
* 状态模式（State）
* 策略模式（Strategy）
* 职责链模式（Chain of Responsibility）
* 命令模式（Command）
* 访问者模式（Visitor）
* 调停者模式（Mediator）
* 备忘录模式（Memento）
* 迭代器模式（Iterator）
* 解释器模式（Interpreter）

### 三者之间的区别和联系  

> 创建型模式提供生存环境，结构型模式提供生存理由，行为型模式提供如何生存。

创建型模式为其他两种模式使用提供了环境。  
结构型模式侧重于接口的使用，它做的一切工作都是对象或是类之间的交互，提供一个门。  
行为型模式顾名思义，侧重于具体行为，所以概念中才会出现职责分配和算法通信等内容。  

### 设计原则

开闭原则：对扩展开放，对修改关闭  
里氏转换原则： 子类继承父类，单独完全可以运行  
依赖倒转原则： 引用一个对象，如果这个对象有底层类型，直接引用底层类型  
接口隔离原则： 每一个接口应该是一种角色  
合成/聚合复用原则： 新的对象应使用一些已有的对象，使之成为新对象的一部分  
迪米特原则： 一个对象应对其他对象有尽可能少的了解  

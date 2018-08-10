---
title: angular-controller-directive-factory
date: 2016-10-24 11:06:50
categories:
- JavaScript
tags: [angular , JavaScript]
---
> 要了解使用方式的话，先要简（shen）单（ru）理解 Controller、Directive 和 Factory 分别是什么。  
文章主旨：Angular 2 就是 Angular 1.x 最佳实践的延伸，所以了解 Angular 2 中的做法，就可以了解 Angular 1.x 中应该怎么做。。  
作者：Trotyl Yu  
链接：https://www.zhihu.com/question/27836513/answer/76686560  
来源：知乎  
著作权归作者所有，转载请联系作者获得授权。  

## 1. Controller
Controller 虽然叫 Controller，但远没有后端框架中的 Controller 那么复杂的作用，Angular 1.x 中的 Controller，说得不好听一下，就仅仅是一个初始化器（Initializer），进行相关的数据绑定（包括字段和方法）而已，一般的初学者用法如下：
```js
// Angular 1.x with $scope in ES5
myApp.controller('myController', ['$scope', 'itemService', function($scope, itemService) {
  $scope.currentItem = itemService.current();
  $scope.items = itemService.all();
  $scope.add = function(item) {
    itemService.add(item);
  };
}]);
```
可以看到，上面的代码中，Controller 干的事情仅仅就是把相应的数据或者方法绑定到 ViewModel 中。随着 Angular 1.2 中 Controller As 语法的到来，就不再需要 $scope 了：
```js
// Angular 1.x with 'controller as' in ES5
myApp.controller('myController', ['itemService', function(itemService) {
  this.currentItem = itemService.current();
  this.items = itemService.all();
  this.add = function(item) {
    itemService.add(item);
  };
}]);
```
这样，就可以抛弃 $scope 了（其实事件传递还是有可能用到）。看到 this 之后，我们不妨思考一下，这些属性到底是对象独有的还是类（严格地说JavaScript中叫原型）共有的呢？通常都是后者，即只要是这个 Controller，都要有这些属性。这样，我们就可以考虑，把不变性的内容（比如基本上所有的方法）作为原型的属性而非对象的属性：
```js
// Angular 1.x with 'controller as' in ES5
myApp.controller('myController', ['itemService', ItemController]);

function ItemController(itemService) {
  this.currentItem = itemService.current();
  this.items = itemService.all();
}

ItemController.protoype.add = function(item) {
    itemService.add(item);
};
```
这样就避免了把一坨方法绑定也挤到 Controller 里，也可以更清晰的看出 Controller 的初始化作用。（this 会顺着原型链查找的，但是可能很多用 Angular 的人并没有清晰的看到 Angular 仍然是普通的 JavaScript。）然后，随着 ES6 的流行，我们可以很轻松的转换成 ES6 的版本：
```js
// Angular 1.x with 'controller as' in ES6
myApp.controller('myController', ['itemService', ItemController]);

class ItemController {
  constructor(itemService) {
    this.itemService = itemService;
    this.currentItem = itemService.current();
    this.items = itemService.all();
  }
  add(item) {
    this.itemService.add(item);
  }
}
```
所以，因为 Controller 的作用就只是初始化，在有了类（class）的情况下，就完全可以被同化到 class 的 constructor 里面了。如果开发人员喜欢静态类型的话，还可以使用 TypeScript，也就相当于在 ES6 的基础上增加了一个静态的类型系统：
```js
// Angular 1.x with 'controller as' in TypeScript
myApp.controller('myController', ['itemService', ItemController]);

class ItemController {
  private currentItem: Item;
  private items: Item[];
  constructor(private itemService: ItemService) {
    this.currentItem = itemService.current();
    this.items = itemService.all();
  }
  add(item: Item): void {
    this.itemService.add(item);
  }
}
```
其中，用到了 TypeScript 的一个语法糖，即在构造函数的参数名前加上可访问性修饰符（private、public）可以直接添加为实例的属性。最后，我们就可以很容易理解 Angular 2 中的写法了：
```js
// Angular 2 in TypeScript
@Component({
  ...
})
class ItemController {
  private currentItem: Item;
  private items: Item[];
  constructor(private itemService: ItemService) {
    this.currentItem = itemService.current();
    this.items = itemService.all();
  }
  add(item: Item): void {
    this.itemService.add(item);
  }
}
```
由于 TypeScript 提供了 Metadata 支持，Angular 2 可以直接按类型注入（当然也依然可以使用按名注入，如果有特殊需求的话），不需要再手动键入依赖名称了。

综上所述，Controller 唯一的作用就是初始化，除了从外部到 ViewModel 的简单赋值（或极其简单的运算外），其他所有过程都不应该出现在 Controller 中。


## 2. Directive

Angular 1.x 中的一个奇葩问题就是把所有自定义的 HTML 扩展都叫做 Directive，引起了很多误会。Angular 中的 Directive 按用途分为三种：

* Component Directive
* Attribute Directive
* Structural Directive

Structural Directive 是最特殊的，相当于一般 MVC 框架中 Template 的关键字，作用是影响 HTML 的文档结构而非特定元素，比如 ngRepeat、ngInclude、ngIf、ngSwtich 等。

另外两种的话就很好分了，不出意外的话 restrict: 'E' 就是 Component Directive，restrict: 'A' 就是 Attribute Directive，前者作为一个独立元素（或者说组件）存在，比如 ngForm，后者影响现有元素/组件的某些效果，比如 ngClass、ngModel、ngSrc、ngStyle、ngClick 等。（在 Angular 2 中由于引入了通用的属性绑定和事件绑定机制如 [class.someKey]="someValue"、[style.someKey]="someValue"、[src]="someValue"、(click)="someMethodCall()"，所以对原有属性的封装和对原生事件的封装的 Attribute Directive 都不需要了）

Angular 1.x 中，controller 既可以作为 Component Directive 的属性也可以作为 Attribute Directive 的属性（比如 ngController、ngView），但是由于由 ngController 的存在，近乎于可以创造独立于 Directive 的 Controller。Angular 2 中废弃了 ngController 这个存在，所有需要用到 Controller （或者说 Constructor）的地方都需要自己定义相应的 Directive。

综上所述（虽然好像并没有怎么述），Angular 的哲学理念就是保证 View 层尽可能的使用声明式语法（而非命令式语法），一切初始化相关的东西都放在 Controller 中（慎用 ngInit），所有需要用到 Controller 的地方都封装成自己的 Directive。


## 3. Factory？

如果说的是 Provider、Factory、Service、Value、Constant 的总称的话，一般来说并没有 Factory 的叫法，要么叫 Service（官方早期是这么叫的，但是会有 a Service is a Service 这种跨层次重名情况），或者叫 Provider（除 Constant 外本质上都是 Provider，Value 和 Service 是调用的 Factory，Factory 是调用的 Provider），或者高雅一点叫 Dependency。这里暂时叫一下 Provider，如果不习惯的话，脑补成别的名词就好。。

其实如果按本文这种顺序的话，用下排除法就知道什么时候该用 Provider 了，所有没有在上面两者的职责内的情况，包括但不仅限于网络、存储等其他一切与展示逻辑无关的内容。

至于这几个东东内部的区别，The Provider（不是泛指）的话具有可配置性，可以在程序运行前进行相应的设定；Factory 和 Service 除了写法上没有什么区别，喜欢用什么用什么，不一定要按它的名字来；Value 和 Constant 为单个对象依赖，Constant 可以在 Provider 的配置阶段使用，其他都不能。Angular 2 把上面这些东西的名词叫法合并了，虽然实际上并没有什么功能上的改变。（不过，依赖注入的机制倒是改了不少。）

综上所述，所有与展示逻辑（或者说交互逻辑）无关的部分都应该写成 Provider（广义的）。

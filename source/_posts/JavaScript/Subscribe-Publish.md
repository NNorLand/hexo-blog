---
title: subscribe/publish 订阅/发布模式
categories:
- JavaScript
date: 2016-10-20 23:30:52
tags: JavaScript
---
我们先引出问题的所在，这里使用一个订单系统：

在一个电子商务系统中，现在我们有订单模块，和信息模块两个主要模块，当下单成功时，我们用要发送订单信息的给客户。

下面是一个简单的解决办法，我们在一个类中调用另一个类的方法。
```
// 订单类，存储订单的所有变量和函数
function Order( goods ){
    this.goods = goods;
}
Order.prototype = {
    done: function(){
        // 订单完成代码
        this.sendSuccessMsg();
    },
    sendSuccessMsg: function(){
        var message = new Message();
        message.sendMsg(this.goods)
    }
}


// 消息类，具备各种消息功能函数
function Message(){}
Message.prototype = {
    sendMsg: function( goods ){
        alert("商品名："+goods.name+"\n"+"价格："+goods.price);
    }
    //其它信息模块的方法
}
var order = new Order({ name:"索尼耳机", price:100})
order.done() //弹出商品的信息
```  
经过简单的分析代码，我们可以发现一些问题，首先，Order和Message紧耦合，一般来说，当一个类进行的修改会需要另一个类的修改这就是耦合。在这里，比较直接的一个问题，当我们改改了Message类中的sendMsg方法的名字或者参数时，Order类中的相应函数名和参数也要跟着修改。



知道了这种方法的问题，下面我们就来看看如何用Publish/Subscribe模式改进这段代码.Publish/Subscribe模式是一种消息通信模式，信息发布一方叫发布者，信息的接收方叫订阅者。

下面是一个根据Publish/Subscribe模式的简易系统
```
var subpub = {};
(function( subpub ){
    var list = {};
    subpub.publish = function(topic,msg){
        for(var i = 0; i<list[topic].length; i++) {
            list[topic][i](msg);
        }
    }
    subpub.subscribe = function( topic,listener){
        if(!list[topic]) list[topic] = [];
        list[topic].push(listener);
    }
})( subpub )

// 测试
subpub.subscribe('foo', function(msg){
    alert(msg);
});
subpub.publish('foo', 'Hello World!')
```
将这个事件管理小系统应用到之前的订单系统中，进行解耦。
```
function Order( goods ){
    this.goods = goods;
}
Order.prototype = {
    done: function(){
        // 订单完成代码
        this.sendSuccessMsg();
    },
    sendSuccessMsg: function(){
        subpub.publish('order/done',this.goods);
    }
}
function Message(){
    subpub.subscribe('order/done',this.sendMsg);
}
Message.prototype = {
    sendMsg: function( goods ){
        alert("商品名："+goods.name+"\n"+"价格："+goods.price);
    }
    //其它信息模块的方法
}
var message = new Message();
var order = new Order({ name:"索尼耳机", price:100});
order.done() //弹出商品的信息
```
现在，我们发现Message和Order类不关心彼此如何实现。修改某个类中的函数不用考虑是否会影响到另一个类。不过有重要的一点是保存的事件标题。

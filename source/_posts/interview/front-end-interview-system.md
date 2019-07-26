---
title: 前端面试之操作系统
categories:
  - interview
date: 2019-07-23 22:47:38
updated: 2019-07-23 22:47:38
tags:
---
## 进程与线程

**JS单线程运行机制，浏览器多进程**
线程和进程区分不清，是很多新手都会犯的错误，没有关系。这很正常。先看看下面这个形象的比喻：

>- 进程是一个工厂，工厂有它的独立资源
>- 工厂之间相互独立
>- 线程是工厂中的工人，多个工人协作完成任务
>- 工厂内有一个或多个工人
>- 工人之间共享空间

详细理解

>- 工厂的资源 -> 系统分配的内存（独立的一块内存）
>- 工厂之间的相互独立 -> 进程之间相互独立
>- 多个工人协作完成任务 -> 多个线程在进程中协作完成任务
>- 工厂内有一个或多个工人 -> 一个进程由一个或多个线程组成
>- 工人之间共享空间 -> 同一进程下的各个线程之间共享程序的内存空间（包括代码段、数据集、堆等）

作者：dailc
链接：`https://juejin.im/post/5a6547d0f265da3e283a1df7`
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## js多线程

什么是web worker

Concurrent.Thread.js

### 专用worker中消息的接收和发送

workers的魔法通过postMessage() 方法和onmessage事件处理函数生效。向一个worker发送消息需要这样做（main.js）：

```js
first.onchange = function() {
  myWorker.postMessage([first.value,second.value]);
  console.log('Message posted to worker');
}

second.onchange = function() {
  myWorker.postMessage([first.value,second.value]);
  console.log('Message posted to worker');
}
```

这段代码中变量first和second代表2个`<input>`元素；它们当中任意一个的值发生改变时，myWorker.postMessage([first.value,second.value])会将这2个值组成数组发送给worker。你可以在消息中发送许多你想发送的东西。

在worker中接收到消息后，我们可以写这样一个事件处理函数代码作为响应（worker.js）：

```js
onmessage = function(e) {
  console.log('Message received from main script');
  var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  console.log('Posting message back to main script');
  postMessage(workerResult);
}
```

onmessage处理函数允许我们在任何时刻，一旦接收到消息就可以执行一些代码，代码中消息本身作为事件的data属性进行使用。这里我们简单的对这2个数字作乘法处理并再次使用postMessage()方法，将结果回传给主线程。

回到主线程，我们再次使用onmessage以响应worker回传的消息：

```js
myWorker.onmessage = function(e) {
  result.textContent = e.data;
  console.log('Message received from worker');
}
```

如果你需要从主线程中立刻终止一个运行中的worker，可以调用worker的terminate 方法：

> myWorker.terminate();  
worker 线程会被立即杀死，不会有任何机会让它完成自己的操作或清理工作。

而在worker线程中，workers 也可以调用自己的 close  方法进行关闭：

> close();

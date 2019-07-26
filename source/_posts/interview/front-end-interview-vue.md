---
title: 前端面试之Vue
categories:
  - interview
date: 2019-07-23 22:50:43
updated: 2019-07-23 22:50:43
tags:
---

## Vue生命周期

beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeDestory
destroyed

## Vue mixin

mixins就是定义一部分公共的方法或者计算属性,然后混入到各个组件中使用,方便管理与统一修改

## Vue 通信

组件间的父子之间的传值--props  
组件间的子父之间的传值--props，emit  
非组件间的组件间的传值（简称：EventBus）  
sessionStorage缓存传值  
路由带参数跳转进行传值  
vuex进行传值  

## VueRouter

路由嵌套  
VueRouter children

怎么定义vue-router的动态路由？怎么获取传过来的动态参数
在router目录下的index.js文件中，对path属性加上/:id。  
使用router对象的params.id。  

vue-router有哪几种导航钩子？
三种，  
第一种：是全局导航钩子：router.beforeEach(to,from,next)，作用：跳转前进行判断拦截。  
第二种：组件内的钩子  
第三种：单独路由独享组件  

## 简述一下Sass、Less，且说明区别

他们是动态的样式语言，是CSS预处理器,CSS上的一种抽象层。  
他们是一种特殊的语法/语言而编译成CSS。  
变量符不一样，less是@，而Sass是$;Sass支持条件语句，可以使用if{}else{},for{}循环等等。而Less不支持  
Sass是基于Ruby的，是在服务端处理的，而Less是需要引入less.js来处理Less代码输出Css到浏览器  

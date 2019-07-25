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

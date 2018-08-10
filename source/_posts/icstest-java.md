---
title: Java问题记录
date: 2016-07-12 20:33:05
tags: Java
---
### 引言
Java问题记录
前端开发怎么能不懂点后台知识？说好的前(全)端(栈)工程师呢？
<!--more-->

---
### 八种基本数据类型
~~经常忘...~~  
byte ,short ,init ,long  
char ,boolean ,float ,double
### string,stringbuffer与stringbuilder的区别?
1.在执行速度方面的比较：StringBuilder >  StringBuffer   
2.StringBuffer与StringBuilder，他们是字符串变量，是可改变的对象，每当我们用它们对字符串做操作时，实际上是在一个对象上操作的，不像String一样创建一些对象进行操作，所以速度就快了。
3.StringBuilder：线程非安全的
　StringBuffer：线程安全的
我们在字符串缓冲去被多个线程使用是，JVM不能保证StringBuilder的操作是安全的，虽然他的速度最快，但是可以保证StringBuffer是可以正确操作的。当然大多数情况下就是我们是在单线程下进行的操作，所以大多数情况下是建议用StringBuilder而不用StringBuffer的，就是速度的原因。

对于三者使用的总结：
1. 如果要操作少量的数据用 = String
2. 单线程操作字符串缓冲区 下操作大量数据 = StringBuilder
3. 多线程操作字符串缓冲区 下操作大量数据 = StringBuffer

---
### Java防止非法和重复表单提交的方法
答: 使用Session技术:
1. 在regist.jsp页面中生成一个唯一随机值, 将其保存到Session中, 同时将其保存为表单的隐藏域的值
2. 在处理注册的请求时,获取Session中值,获取请求参数的值,比较两者是否相同, 如果相同说明不是重复提交,请求通过同时删除session中保存的值, 如果不相同则是重复提交, 不能通过.

经典现实案例:
> 一位乘客在北京火车站买了一张去天津的火车票(直接刷的那种),他刷票进站坐火车去了天津, 回来后过了几天, 他又需要去天津这次他不想再买票, 直接拿上次的票去进站口刷, 检票机提示“此火车票已使用过了”, 不能进站.

博客园详细文章解答:
[JavaWeb学习总结(十三)——使用Session防止表单重复提交](http://www.cnblogs.com/xdp-gacl/p/3859416.html)

---
### 静态include与动态include的区别分析：
为了更深刻的了解这两者的区别，专门搜索了类似的资料，写出来供大家分享：
1. 静态include的结果是把其他jsp引入当前jsp,两者合为一体，用include指令, 包含的动作是在jsp被编译成java文件时执行的, 只有第一次请求时执行. </br>
动态include的结构是两者独立,直到输出时才合并，用`<jsp:include>`, 包含的动作是在jsp对应的Serlet处理请求时去执行的,每次请求都会执行.

2. 动态include的jsp文件独立性很强,是一个单独的jsp文件,需要使用的对象,页面设置,都必须由自己创建,当然,还好它和include它的页面的request范围是一致的. </br>
而静态include纯粹是把代码写在外面的一种共享方法,所有的变量都是可以和include它的主文件共享,两者高度紧密结合,不能有变量同名的冲突.而页面设置也可以借用主文件的.

静态include主要是对静态页面的引入，不会检查所包含文件的变化
`<% @ include file="include.html" %>`
动态include主要是对动态页面的引入，它总是会检查所引入的页面的变化，如果所包含的资源在请求间发生变化
，则下一次请求包含`<jsp:include>`动作的jsp时，将包含资源的新内容。
另一方面，include指令在转换时一次性地将内容复制到jsp中，如果所包含的资源发生变化，则使用include指令的jsp将不能反应出新的内容，除非重新编译该jsp。

`<jsp：include>`动作包含的属性：
page：指定所包含资源的相对url路径，该资源必须时同一web应用程序的组成部分。
flush：指定在执行include动作后是否应刷新缓冲区，在jsp1.1中，该属性必须设置为真。
使用动态include动作时，根据jsp1.1规范，jsp容器允许判断通过include指令包含的资源是否发生变化。如果发生变化。则容器可以重新编译包含该资源的jsp，然而，该规范并没有提供向容器表明某个包含的资源发生变化的机制。

动态include的优点和不足：

**优点**：
1. 引入和同步一个动态的页面，使jsp页面更具灵活性
2. 能和不同页面之间进行信息的交互和快捷的实现方式。
3. 改变了原始的所有页面编码都放在一个jsp上，使不同的功能分别写在不同页里，通过动态include方式引用到页面，更易于编码，更易于管理。

**不足**：

动态的引入时需要频繁的变化和页面信息的更新和交互，要占用大量的资源开销。降低页面的访问速度。如果在没必要动态引入的情况下，不要使用动态include
应该注意事项：
1. <jsp:include>动作的flush属性必须要定义，不定义会出现转换错误。而且设置的flush必须要为true
2. 在<jsp:include>动作中指定的页面必须是同一web应用程序的一部分。如果引入的是非同一web应用的页面将导致请求时错误。

---
### List,Set,Map是否继承自Collection接口？

答：List，Set是，Map不是。如图
```
Collection
├List //有序
│ ├LinkedList
│ ├ArrayList
│ └Vector
│   └Stack
└Set //无序不重复
Map //键值对
├Hashtable
├HashMap
└WeakHashMap
```
Collection是最基本的集合接口，一个Collection代表一组Object，即Collection的元素。一些Collection允许相同的元素而另一些不行。一些能排序而另一些不行。Java JDK不能提供直接继承自Collection的类，Java JDK提供的类都是继承自Collection的"子接口"，如:List和Set。

注意：Map没有继承Collection接口，Map提供key到value的映射。一个Map中不能包含相同key，每个key只能映射一个value。Map接口提供3种集合的视图，Map的内容可以被当做一组key集合，一组value集合，或者一组key-value映射。


详细介绍：
* List特点：元素有放入顺序，元素可重复
* Map特点：元素按键值对存储，无放入顺序
* Set特点：元素无放入顺序，元素不可重复（注意：元素虽然无放入顺序，但是元素在set中的位置是有该元素的HashCode决定的，其位置其实是固定的）
* List接口有三个实现类：LinkedList，ArrayList，Vector
* LinkedList：底层基于链表实现，链表内存是散乱的，每一个元素存储本身内存地址的同时还存储下一个元素的地址。链表增删快，查找慢
* ArrayList和Vector的区别：
> * ArrayList是非线程安全的，效率高；
> * Vector是基于线程安全的，效率低
* Set接口有两个实现类：HashSet(底层由HashMap实现)，LinkedHashSet
* SortedSet接口有一个实现类：TreeSet（底层由平衡二叉树实现）
* Query接口有一个实现类：LinkList
* Map接口有三个实现类：HashMap，HashTable，LinkeHashMap
* HashMap非线程安全，高效，支持null；HashTable线程安全，低效，不支持null
* SortedMap有一个实现类：TreeMap

其实最主要的是，list是用来处理序列的，而set是用来处理集的。Map是知道的，存储的是键值对 </br>
**set一般无序不重复.map kv 结构 ,list 有序**

---

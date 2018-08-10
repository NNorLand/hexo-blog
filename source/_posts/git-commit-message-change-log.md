---
title: git commit message和change log编写指南
date: 2016-07-26 11:28:53
tags: Git
---
**原作者：**阮一峰

日期：2016年1月6日

>  原帖地址:[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

git每次提交代码，都要写commit message，否则不允许提交。
```
$ git commit -m "hello world"
```
只执行git commit，会跳出文本编辑器，让你写多行。

基本上你写什么都行但是,一般来说,commit message应该清晰明了.说明本次提交的目的.

目前,社区有很多种commit message 规范.本文介绍angular规范,这是目前最广泛的写法,比较合理和系统化,并且有配套的工具.

<!-- more -->

# commit message 的作用
格式化commit message 有几个好处.

1. **提供更多的历史信息,方便浏览.**<br>
比如,下面的命令显示上次发布之后的变动,每个commit占据一行,你只要看首行,就知道某次commit的目的.
> $ git log <last tag> HEAD --pretty=formate:%s

![git commit message]( https://ohuxfnzjy.qnssl.com/image/hexo/2016/07/26/bg2016010604.png)

2. **可以过滤某些commit(比如文档改动),以便于快速查找信息.**<br>
比如,下面的命令仅显示本次发布新增加的功能.
> $ git log <last release> HEAD --grep feature

3. **可以直接从commit生成change log.**<br>
change log 是发布新版本时,用来说明与上一个文档差异的文档.

# commit message 的格式
每次提交,commit message 都包括三个部分:header,body和footer.
```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```
## header
header部分只有一行,包括三个字段:type(必需),scope(可选)和subject(必需).
### type
用于说明commit的类别,只允许使用下面7个标识.
```
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```
如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。其他情况（docs、chore、style、refactor、test）由你决定，要不要放入 Change log，建议是不要。
### scope
`scope`用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
### subject
`subject`是 commit 目的的简短描述，不超过50个字符。

> * 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
* 第一个字母小写
* 结尾不加句号（.）

## body
Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例。
```
More detailed explanatory text, if necessary.  Wrap it to
about 72 characters or so.

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
```
有两个注意点。
* 使用第一人称现在时，比如使用change而不是changed或changes。
* 应该说明代码变动的动机，以及与以前行为的对比。

## footer
Footer 部分只用于两种情况。
### 不兼容变动
如果当前代码与上一个版本不兼容，则 Footer 部分以BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法。
```
BREAKING CHANGE: isolate scope bindings definition has changed.

    To migrate the code follow the example below:

    Before:

    scope: {
      myAttr: 'attribute',
    }

    After:

    scope: {
      myAttr: '@',
    }

    The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```
### 关闭 Issue
如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue 。
```
Closes #234
```
也可以一次关闭多个 issue 。
```
Closes #123, #245, #992
```
## Revert
还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟着被撤销 Commit 的 Header。
```
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```
Body部分的格式是固定的，必须写成`This reverts commit &lt;hash>`.，其中的hash是被撤销 commit 的 SHA 标识符。
如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的Reverts小标题下面。
# Commitizen
Commitizen是一个撰写合格 Commit message 的工具。
安装命令如下。
> $ npm install -g commitizen

然后，在项目目录里，运行下面的命令，使其支持 Angular 的 Commit message 格式。
> $ commitizen init cz-conventional-changelog --save --save-exact

以后，凡是用到`git commit`命令，一律改为使用`git cz`。这时，就会出现选项，用来生成符合格式的 Commit message。
# 生成change log
如果你的所有 Commit 都符合 Angular 格式，那么发布新版本时， Change log 就可以用脚本自动生成（例1，例2，例3）。
生成的文档包括以下三个部分。
```
New features
Bug fixes
Breaking changes.
```
每个部分都会罗列相关的 commit ，并且有指向这些 commit 的链接。当然，生成的文档允许手动修改，所以发布前，你还可以添加其他内容。
`conventional-changelog` 就是生成 `Change log` 的工具，运行下面的命令即可。

> $ npm install -g conventional-changelog<br>
$ cd my-project<br>
$ conventional-changelog -p angular -i CHANGELOG.md -w

上面命令不会覆盖以前的 Change log，只会在CHANGELOG.md的头部加上自从上次发布以来的变动。

如果你想生成所有发布的 Change log，要改为运行下面的命令。

> $ conventional-changelog -p angular -i CHANGELOG.md -w -r 0

为了方便使用，可以将其写入package.json的scripts字段。
```
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -w -r 0"
  }
}
```
以后，直接运行下面的命令即可。

> $ npm run changelog

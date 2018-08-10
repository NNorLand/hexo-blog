---
title: ios禁用非交互的audio.play()方法
categories:
  - JavaScript
date: 2017-01-04T15:30:52.000Z
updated: 2017-01-04T15:30:52.000Z
tags:
  - JavaScript
  - IOS
---
>参考文献
[apple开发者中心](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html)  
谷歌有关audio的说明:[User Control of Downloads Over Cellular Networks  ](https://developers.google.com/web/updates/2016/03/play-returns-promise)

```
In Safari on iOS (for all devices, including iPad), where the user may be on a cellular network and be charged per data unit, preload and autoplay are disabled. No data is loaded until the user initiates it. This means the JavaScript play() and load() methods are also inactive until the user initiates playback, unless the play() or load() method is triggered by user action. In other words, a user-initiated Play button works, but an onLoad="play()" event does not.  

This plays the movie: `<input type="button" value="Play" onclick="document.myMovie.play()">`  

This does nothing on iOS: `<body onload="document.myMovie.play()">`  
```
用我学了长达12年的英语翻译一下“就是不可以啦，需要用户主动去触发才行的啦”。好了，我能做的就是这么多了，其实我还手动测试了一下其他hack方法，最后也以失败告终，直接解决办法就是绑定一个触摸事件给最上层容器上，用户肯定要触摸滚动之类的啊，这样不得不就触发了。
最近遇到语音连续播放的问题,iOS禁用了非交互的audio.play()方法,之前采用的方法,模拟点击,各种hack,都没有效果.无奈放弃  
找到一种,动态src的方式来操作.事例代码如下.
有待填坑
```javascript
window.onload = function() {
    var arr = [
        "http://aliyun.mochi.shufawu.com/weixin-course/201611251845/207631360020730506.mp3",
        "http://aliyun.mochi.shufawu.com/weixin-course/201611251845/4479743430150737799.mp3",
        "http://aliyun.mochi.shufawu.com/weixin-course/201611241843/7952956551407820401.mp3"
    ];
    var myAudio = new Audio();
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        alert("iphone");
    } else {
        alert('other')
    }
    myAudio.preload = true;
    myAudio.controls = true;
    myAudio.src = arr.reverse().pop();
    myAudio.addEventListener('ended', playEndedHandler, false);
    myAudio.play();
    document.getElementById("audioBox").appendChild(myAudio);
    myAudio.loop = false;
    myAudio.controls = true;

    function playEndedHandler() {
        myAudio.src = arr.reverse().pop();
        myAudio.play();
        !arr.length && myAudio.removeEventListener('ended', playEndedHandler, false);
    }
}
```
```js
function startPlayback() {
  return document.querySelector('#music').play();
}

ChromeSamples.log('Attempting to play automatically...');

startPlayback().then(function() {
  ChromeSamples.log('The play() Promise fulfilled! Rock on!');
}).catch(function(error) {
  ChromeSamples.log('The play() Promise rejected!');
  ChromeSamples.log('Use the Play button instead.');
  ChromeSamples.log(error);

  var playButton = document.querySelector('#play');
  // The user interaction requirement is met if
  // playback is triggered via a click event.
  playButton.addEventListener('click', startPlayback);
  playButton.hidden = false;
});
```

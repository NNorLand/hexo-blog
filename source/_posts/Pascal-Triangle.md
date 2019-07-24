---
title: 杨辉三角的JavaScript实现
categories:
  - JavaScript
date: 2019-07-22 17:16:17
updated: 2019-07-22 17:16:17
tags: [JavaScript, LeetCode]

---
> 杨辉三角，是二项式系数在三角形中的一种几何排列，中国南宋数学家杨辉1261年所著的《详解九章算法》一书中出现。 在欧洲，帕斯卡（1623----1662）在1654年发现这一规律，所以这个表又叫做帕斯卡三角形。 帕斯卡的发现比杨辉要迟393年，比贾宪迟600年。

![杨辉三角](http://oss.liujiaan.top/image/hexo/PascalTriangleAnimated2.gif)


## 给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
在杨辉三角中，每个数是它左上方和右上方的数的和。

示例:

```text
输入: 5
输出:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
```
```js
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    const result = [];

    for (let i = 0; i < numRows; i ++) {
        const subArr = [];
        for (let j = 0; j <= i; j++) {
            if (j > 0 && j < i) {
                subArr.push(result[i-1][j-1] + result[i-1][j]);
            } else {
                subArr.push(1);
            }
        }
        result.push(subArr);
    }
    
    return result;

};
```

## 给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。

示例：
```
输入: 3
输出: [1,3,3,1]
```
```javascript
/**
 * @param {number} rowIndex
 * @return {number[]}

 杨辉三角正好是二次项的展开式,(1+x)的n次幂的系数,有通项公式C(n-1,m-1)=(n-1)!/[(m-1)!(n-m)!] 而研究每一项后,发现他们的规律,如 C(4,1)=C(4,0)*4/1,C(4,2)=C(4,1)*3/2, C(4,3)=C(4,2)*2/3,C(4,4)=C(4,3)*1/4: 

 */
var getRow = function (rowIndex) {
  if (rowIndex === 0) {
    return [1]
  } else if (rowIndex === 1) {
    return [1, 1]
  } else {
    let index = 1
    let result = [1]
    for (let i = 0; i < rowIndex; i++) {
      index = index * (rowIndex - i) / (i + 1);
      result.push(index)
    }
    return result
  }
};

// console.log('getRow(3)', getRow(5))
```
```javascript
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
  if (rowIndex < 0) return []
  if (rowIndex === 0) return [1]
  let preRow = getRow(rowIndex - 1)
  let result = []  
  for (let i = 0; i <= rowIndex; i++) {
    if (i === 0) result[i] = preRow[0]
    else if (i === rowIndex) result[i] = preRow[i - 1]
    else result[i] = preRow[i - 1] + preRow[i]
  }
  return result
};
```

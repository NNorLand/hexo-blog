---
title: PN532 + 树莓派读写NFC
categories:
  - 杂记
date: 2017-09-23 13:10:43
updated: 2017-09-23 13:10:43
tags: [raspberrypi,nfc]
---
> 公司门禁丢了要150。卧槽,果断自己做几张,把原版供起来。

首先需要PN532芯片,RC522试了下,只能读卡,不能写卡。  
树莓派的UART被蓝牙占用,尝试无果。用I2C接口成功。

<!--more-->

![pn532](https://ohuxfnzjy.qnssl.com/image/hexo/2017/09/640760-20160809011418434-760565530.png)
<a id="libnfc_conf" href="javascript:" name=“libnfc_conf”></a>   
> 参考网站: 
参考资料附录&相关链接：  
A1.[libnfc配置方法](http://nfc-tools.org/index.php?title=Libnfc:configuration) 
A2.[libnfc安装教程](http://nfc-tools.org/index.php?title=Libnfc)  
A3.[libnfc用户API](http://nfc-tools.org/index.php?title=Libnfc:API)  
A4.[libnfc主页](http://nfc-tools.org/index.php?title=Main_Page)  
A5.[libnfc学习例程](http://nfc-tools.org/index.php?title=Category:Libnfc:Examples)  
A6.[Iteadstudio PN532 Module](http://imall.iteadstudio.com/im130625002.html)  
A7.[Disable R-Pi/RASPBIAN serial console for using UART0 ](http://learn.adafruit.com/adafruit-nfc-rfid-on-raspberry-pi/freeing-uart-on-the-pi)  
A8.[http://geek-workshop.com/thread-10042-1-1.html](http://geek-workshop.com/thread-10042-1-1.html)  

# 系统搭建
系统为Respbian
## 系统配置
执行sudo raspi-config进行配置.  
选择Interface Options，启用SPI、I2C，禁用Serial  
选择Advanced Options，1-Expand Filesystem 扩展分区  
## 安装依赖
autoconf、libusb-dev、libtool、libpcsclite-dev
```bash
sudo apt-get update  
sudo apt-get upgrade  
sudo apt-get install autoconf libusb-dev libtool libpcsclite-dev  
```
# 工具安装

## 树莓派与PN532连接
树莓派3接口图
![树莓派3GPIO图](https://ohuxfnzjy.qnssl.com/image/hexo/2017/09/2016042406444998.jpg)  

我用的I2C接口,接线方式如下。  
> 04 <-> VCC   
  06 <-> GND  
  03 <-> SDA  
  05 <-> SCL

## libnfc
顾名思义，nfc库。  
官方github:[https://github.com/nfc-tools/libnfc](https://github.com/nfc-tools/libnfc)  
```shell
wget https://github.com/nfc-tools/libnfc/releases/download/libnfc-1.7.1/libnfc-1.7.1.tar.bz2
tar -jxvf libnfc-1.7.1.tar.bz2
cd libnfc-1.7.1
autoreconf -vis
./configure --with-drivers=all --sysconfdir=/etc --prefix=/usr
make
sudo make install
sudo mkdir /etc/nfc
```
用I2C方式连接,需要
```
sudo nano /etc/nfc/nfc/libnfc.conf
```
填写
> device.connstring = pn532_i2c:/dev/i2c-1  

其他配置项默认,修改参照上面的[libnfc配置](#libnfc_conf)
如果我们使用UART接口直接和PN532在树莓派上连接，则可以  
```
sudo cp contrib/libnfc/pn532_uart_on_rpi.conf.sample /etc/nfc/devices.d/pn532_uart_on_rpi.conf
```
执行`nfc-list`命令,输出
```bash
➜  ~ nfc-list
nfc-list uses libnfc 1.7.1
NFC device: pn532_i2c:/dev/i2c-1 opened
```
## mfoc

官方github：[https://github.com/nfc-tools/mfoc](https://github.com/nfc-tools/mfoc)  
```shell
git clone https://github.com/nfc-tools/mfoc.git
cd mfoc/
autoreconf -vis
./configure
make
sudo make install
```
mfoc用法如下
```shell
Usage: mfoc [-h] [-k key] [-f file] … [-P probnum] [-T tolerance] [-O output]
h print this help and exit
k try the specified key in addition to the default keys  
//指定key
f parses a file of keys to add in addition to the default keys  
//用文件为输入指定多个key
P number of probes per sector, instead of default of 20  
//每个扇区测试密钥数目
T nonce tolerance half-range, instead of default of 20  
(i.e., 40 for the total range, in both directions)
O file in which the card contents will be written (REQUIRED) 
//输出dump的文件
D file in which partial card info will be written in case PRNG is not vulnerable
Example: mfoc -O mycard.mfd
Example: mfoc -k ffffeeeedddd -O mycard.mfd
Example: mfoc -f keys.txt -O mycard.mfd
Example: mfoc -P 50 -T 30 -O mycard.mfd
This is mfoc version 0.10.7.
For more information, run: ‘man mfoc’.
[mfoc -h]
```
## mfcuk
官方github:[https://github.com/nfc-tools/mfcuk](https://github.com/nfc-tools/mfcuk)  
```shell
git clone https://github.com/nfc-tools/mfcuk.git
cd mfcuk
autoreconf -vis
./configure
make
sudo make install
```
用法,执行
```
mfcuk
```
## 写卡
直接使用nfc-mfclassic即可对Mifare classic系列卡片写入。主要有M1卡（S50）和4K卡（S70）。  
```bash
nfc-mfclassic
```
## 详细描述
mfoc是用来破解IC卡密钥的，一般的门禁卡很可能用的是默认密钥，破解起来很快。  
把要复制的卡放到读卡器上，运行  
```
mfoc -O target.dmp
```
如果不成功，说明加密没有用默认秘钥，可以增加每个区块的爆破次数
```
mfoc -P 500 -O target.dmp
```

如果顺利你会看到所有block的信息都被dump出来。M1卡有16个sector，每个sector有4个block，所以一共是64个block。  
然后把一张新卡放上读卡器，也dump一次  
```
mfoc -O blank.dmp
```

接下来就可以写卡了
```
nfc-mfclassic W B target.dmp blank.dmp
```

写完之后可以把新卡再dump出来，与原始卡比较一下
```
mfoc -O new.dmp
hexdump -vC target.dmp > target.hex
hexdump -vC new.dmp > new.hex
diff target.hex new.hex
```
如果diff没有显示任何结果，恭喜，卡片已经100%复制成功，甚至不用去刷卡验证就知道可以了。
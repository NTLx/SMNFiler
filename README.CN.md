<!--
 * @Author: Letmeouted
 * @Email: 1002726239@qq.com
 * @FilePath: \SMNFiler\README.cn.md
-->
# SMNFiler

`SMNFiler`：

- 使用 [Electron](https://electronjs.org) 框架进行跨平台开发
- 基于 [electron-quick-start](https://github.com/electron/electron-quick-start) 和 [MDUI](https://github.com/zdhxiong/mdui) 项目搭建用户界面
- 核心算法模块不开源

## 软件安装包

目前提供适用于 Mac OS X（64位）和 Windows 系统的发行版。

> Windows 版软件为 32 位，可在 32 位和 64 位 Windows 系统上运行。

### Windows

在 Windows 系统下可直接运行 `Portable` 版程序，无需安装。

[Portable 下载链接](https://github.com/NTLx/SMNFiler/releases/download/v0.1.0/SMNFiler.v0.1.0.Win_Portable.exe)

> 若以上连接效果不佳，请尝试使用 [下载镜像](http://cloud.cubicise.com:10081/s/8GRKCowfwqoLji8)

### Mac OS

在 Mac OS X 系统下，双击安装包，将软件包移动至 `应用程序` 文件夹内即可使用：

![darwin install](https://cdn.jsdelivr.net/gh/Letmeouted/PicGO/Pic/picture.png)

[Mac OS 下载链接](https://github.com/NTLx/SMNFiler/releases/download/v0.1.0/SMNFiler.v0.1.0.MacOS.dmg)

> 若以上连接效果不佳，请尝试使用 [下载镜像](http://cloud.cubicise.com:10081/s/bxbwwpG6NwkaN76)

## 软件使用

### 程序主窗口

![main window](https://cdn.jsdelivr.net/gh/Letmeouted/PicGO/Pic/9BA908BA-D91F-479B-AD71-CD60341F518C.png)

将一个或多个文件（下机数据，用默认格式导出）拖拽至 `文件处理区` 即可；也可以点击提示区域，然后选择需要处理的文件。

> - 仅支持 `txt` 或 `csv` 格式的输入文件；
> - 点击方式添加文件时，一次只能选择一个文件进行处理。

默认针对每一个输入文件都会按照样本名拆分输出结果到输出文件夹中。

输出文件夹位于每个输入文件相同的目录下。

### 查看帮助文档

可点击主界面的橙色 `帮助` 按钮查看帮助文档。

### 退出程序

点击主界面的绿色 `退出` 按钮即可退出程序。

### 选项

设置面板如图：

![each sample output](https://cdn.jsdelivr.net/gh/Letmeouted/PicGO/Pic/6AAC09DF-CEC8-4166-969E-2CAA7641DB5B.png)

默认输出结果共有两个文件，如需更多计算结果，可将`更多计算结果`开关按钮打开，便可多出一个详情文件。

默认输出结果中含有峰高，如需峰面积，可将`峰面积代替峰高`开关按钮打开。

默认输出结果为英文，如需使用中文，可将`设置为中文`开关按钮打开。

默认输出编码格式为 `UTF-8` ；为兼容 `Excel` ，可手动修改为 `GBK` 。

> 输出文件夹不会改变。


## 反馈

如在本软件的使用过程中有任何意见或建议，欢迎 [提出](https://github.com/NTLx/SMNFiler/issues/new/choose)，也可以 [查看留言](https://github.com/NTLx/SMNFiler/issues) 。

## 参与

如果您想要参与本软件的开发，或有意为本项目贡献一份力量，却不知如何开始，可以参考 [这里](https://opensource.guide/zh-cn/) 。

## License

[GNU GPLv3](LICENSE)


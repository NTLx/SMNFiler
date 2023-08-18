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

[Portable 下载链接](https://github.com/NTLx/SMNFiler/releases/download/v0.5.0/SMNFiler.v0.5.0.Win_Portable.exe)

> 若以上连接效果不佳，请尝试使用 [下载镜像](http://cloud.cubicise.com:10081/s/8GRKCowfwqoLji8)

### Mac OS

在 Mac OS X 系统下，双击安装包，将软件包移动至 `应用程序` 文件夹内即可使用：

![darwin install](https://cdn.jsdelivr.net/gh/Letmeouted/PicGO/Pic/picture.png)

[Mac OS 下载链接](https://github.com/NTLx/SMNFiler/releases/download/v0.2.1/SMNFiler.v0.2.1.MacOS.dmg)

> 若以上连接效果不佳，请尝试使用 [下载镜像](http://cloud.cubicise.com:10081/s/bxbwwpG6NwkaN76)

## 软件使用

### 程序主窗口

![main window](https://cdn.jsdelivr.net/gh/Letmeouted/PCPicture/Snipaste_2023-08-18_09-12-32.png)

将一个或多个文件（下机数据，用默认格式导出）拖拽至 `文件处理区` 即可；也可以点击提示区域，然后选择需要处理的文件。

> - 仅支持 `txt` 或 `csv` 格式的输入文件；
> - 点击方式添加文件时，一次只能选择一个文件进行处理。

默认针对每一个输入文件都会按照样本名拆分输出结果到输出文件夹中。

输出文件夹位于每个输入文件相同的目录下。

### 查看帮助文档

可点击主界面的橙色 `帮助` 按钮查看帮助文档。

### 退出程序

点击主界面的绿色 `退出` 按钮即可退出程序。

### 上传样本信息文件

![uploadWindow](https://cdn.jsdelivr.net/gh/Letmeouted/PCPicture/Snipaste_2023-08-18_09-12-43.png)

设置中选择了输出文件种类中的`输出结果文件和报告`选项或`输出结果文件和包含图片报告`选项，会自动跳转至该界面。点击上传按钮上传样本信息文件，便可正常输出报告文件（报告文件会自动生成在结果文件的文件夹，并按照文件名自动生成文件夹存放报告文件）。输出包含图片报告文件时，该图片是根据以.figure.tsv结尾的数据文件进行绘制的。

### 选项

设置面板如图：

![each sample output](https://cdn.jsdelivr.net/gh/Letmeouted/PCPicture/Snipaste_2023-08-18_09-12-52.png)

默认输出结果中含有峰高，如需峰面积，可将`峰面积代替峰高`开关按钮打开。

默认输出结果为英文，如需使用中文，可将`设置为中文`开关按钮打开。

默认输出编码格式为 `UTF-8` ；为兼容 `Excel` ，可手动修改为 `GBK` 。

默认输出结果文件中自定义标准品样本名为`STD`，如需自定义标准品样本名，请点击该对话弹出框进行自定义。

默认输出文件种类只包含结果文件，如需输出报告文件，请选择`输出结果文件和报告`选项。如需输出报告文件（含图片），请选择`输出结果文件和包含图片报告`选项。

默认输出结果文件中自定义NTC检测样本名为空。如需自定义NTC检测样本名，请点击`自定义NTC检测`按钮进行自定义。

默认输出结果文件中自定义Ladder检测样本名为空。如需自定义Ladder检测样本名，请点击`自定义Ladder检测`按钮进行自定义。

#### 针对输出报告文件的设置

用户可以根据自己的需求，对生成的报告文件的字体以及生成报告文件的形式进行特定设置。就目前设置而言，默认生成的报告字体为宋体，并以PDF文件的形式呈现。如需调整字体，可将`切换为MiSans字体（默认为宋体）`开关按钮打开。如需调整生成报告文件以网页的形式呈现，可将`生成HTML文件`开关按钮打开。生成报告文件时，软件在特定目录下生成两个文件，一个是PDF文件形式，另一个是HTML文件形式呈现。

> 输出文件夹不会改变。

### 日志

日志面板如图：

![log](https://cdn.jsdelivr.net/gh/Letmeouted/PCPicture/Snipaste_2023-08-18_09-13-01.png)

## 反馈

如在本软件的使用过程中有任何意见或建议，欢迎 [提出](https://github.com/NTLx/SMNFiler/issues/new/choose)，也可以 [查看留言](https://github.com/NTLx/SMNFiler/issues) 。

## 参与

如果您想要参与本软件的开发，或有意为本项目贡献一份力量，却不知如何开始，可以参考 [这里](https://opensource.guide/zh-cn/) 。

## License

[GNU GPLv3](LICENSE)

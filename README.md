<!--
 * @Author: Letmeouted
 * @Email: 1002726239@qq.com
 * @FilePath: \SMNFiler\README.md
-->
# SMNFiler

[EN](README.md) | [🇨🇳中文](README.CN.md)

`SMNFiler`:

- Based on [Electron](https://electronjs.org)
- Based on [electron-quick-start](https://github.com/electron/electron-quick-start) and [MDUI](https://github.com/zdhxiong/mdui) project
- core algorithm was not open source

## Installation

Suitable for Mac OS X (x64 platform) and Windows.

> The package for Windows is ia32, will be functional both x86 and x64 platform.

### Windows

`Portable` package can run without installation.

[Download Portable for win](https://github.com/NTLx/SMNFiler/releases/download/v0.2.1/SMNFiler.v0.2.1.Win_Portable.exe)

> [Download mirror](http://cloud.cubicise.com:10081/s/8GRKCowfwqoLji8) for China user.

### Mac OS

Move app to `Application` :

![darwin install](https://cdn.jsdelivr.net/gh/Letmeouted/PicGO/Pic/picture.png)

[Download for Mac OS](https://github.com/NTLx/SMNFiler/releases/download/v0.2.1/SMNFiler.v0.2.1.MacOS.dmg)

> [Download mirror](http://cloud.cubicise.com:10081/s/bxbwwpG6NwkaN76) for China user.

## Usage

## Main window

![main window](https://cdn.jsdelivr.net/gh/Letmeouted/PicominiPC/img/main.png)

Drag file(s) to process region (means `文件处理区`), or just click this region to select a file.

> input file format: only support `txt` and `csv`

By default, the output will be splited according to sample names, and the result file(s) will be output to the dir where the input file comes from.

### Manual

You may press the orange button `帮助` to check manual, it will simply open a browser window which link to this page.

### Exit

Press the blue button `退出` could exit the software.

### Settings

Several settings was offered in `设置面板` , defalut settings should be like this:

![each sample output](https://cdn.jsdelivr.net/gh/Letmeouted/PicominiPC/img/settingSMN.png)

By default ,the output result will be two files , If you need more calculation results, you can turn on the `更多计算结果` switch button to create an additional detail file.

By default, the output result include of Peak height, If you need Peak area, you can turn on the `峰面积代替峰高` switch button.

By default, the output result will be English, If you need Chinese, you can turn on the `设置为中文` switch button.

The default encode was set to `UTF-8` ,Mainly for windows users, so that `Excel` (from Microsoft Office) could be display rightfully. If you need ~~far~~ more widely used encode format, you can change `选择输出格式` to switch encode from `UTF-8` to `GBK` .

> The output dir will not change.

### Log

The log panel is as shown

![log](https://cdn.jsdelivr.net/gh/Letmeouted/PicominiPC/img/SMNLog.png)
### Program running log window

The program run log window is shown in the figure

![new window](https://cdn.jsdelivr.net/gh/Letmeouted/PicominiPC/img/screen.log.png)

## Feedback

Welcome to [open issue](https://github.com/NTLx/SMNFiler/issues/new/choose) on this project to help us make improve for this software, or you can see the [existing issues](https://github.com/NTLx/SMNFiler/issues).

## Participate

Want to contribute to this project but do not know how/where to start? Please check [Open Source Guides](https://opensource.guide/).

## License

[GNU GPLv3](LICENSE.md)

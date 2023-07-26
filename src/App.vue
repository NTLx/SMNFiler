<template>
  <el-container>
    <el-header height="320px">
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
        stretch
      >
        <el-tab-pane
          label="GeneMapper下机数据上传"
          name="first"
          v-if="showUploadGen"
        >
          <div id="holder" class="holder" style="height: 510px">
            <div>
              <el-upload
                class="upload-demo"
                drag
                action="#"
                accept=".txt,.csv"
                :on-change="handleChange"
                :file-list="fileList1"
                :data="{
                  stdName: uploadParams.stdName,
                  ntcName: uploadParams.ntcName,
                  ladderName: uploadParams.ladderName,
                  language: uploadParams.language,
                  peakStatus: uploadParams.peakStatus,
                  outputFormat:uploadParams.outputFormat,
                  fileType:uploadParams.fileType,
                }"
                :http-request="httpRequest"
                :before-upload="beforeAvatarUpload"
              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                  拖拽文件至此或<em>点击上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    文件名当中不能含有空格、特殊符号、中文
                  </div>
                </template>
              </el-upload>
            </div>
          </div>
          <el-row class="mb-4">
            <el-col :span="12"
              ><div class="helpButton">
                <!-- <el-button type="warning"
                  ><el-icon><QuestionFilled /></el-icon
                  ><a
                    :href="this.webUrl"
                    target="_blank"
                    class="help"
                    style="text-decoration: none"
                    >帮助</a
                  ></el-button
                > -->
                <el-button type="warning" @click="help"
                  ><el-icon><QuestionFilled /></el-icon>帮助</el-button
                >
              </div>
            </el-col>
            <el-col :span="12"
              ><div class="exitButton">
                <el-button type="primary" @click="exitBox">
                  <el-icon><Back /></el-icon>退出
                </el-button>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="设置" name="third" class="setting">
          <div class="settingPostion">
            <el-row>
              <el-col :span="24">
                <el-divider content-position="left"> 结果文件设置 </el-divider>
              </el-col>
            </el-row>
            <el-row class="fileSetting">
              <el-col :span="8">
                <el-button type="primary" @click="customSampleName = true" size="large">
                  自定义样本名
                </el-button>
                <el-dialog
                  v-model="customSampleName"
                  title="请输入标准品样本名"
                >
                  <el-input
                    v-model="sampleName"
                    placeholder="请输入标准品样本名"
                  ></el-input>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="customSampleName = false" size="large">
                        取消
                      </el-button>
                      <el-button type="primary" @click="saveSampleName">
                        确认
                      </el-button>
                    </span>
                  </template>
                </el-dialog>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="customNTCSampleName = true" size="large">
                  自定义NTC检测
                </el-button>
                <el-dialog
                  v-model="customNTCSampleName"
                  title="请输入进行NTC检测的样本名"
                >
                  <el-input
                    v-model="ntcSampleName"
                    placeholder="请输入进行NTC检测的样本名"
                  ></el-input>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="customNTCSampleName = false">
                        取消
                      </el-button>
                      <el-button type="primary" @click="saveNTCSampleName">
                        确认
                      </el-button>
                    </span>
                  </template>
                </el-dialog>
              </el-col>
              <el-col :span="8">
                <el-button
                  type="primary"
                  @click="customLadderSampleName = true"
                  size="large"
                >
                  自定义Ladder检测
                </el-button>
                <el-dialog
                  v-model="customLadderSampleName"
                  title="请输入进行Ladder检测的样本名"
                >
                  <el-input
                    v-model="ladderSampleName"
                    placeholder="请输入进行Ladder检测的样本名"
                  ></el-input>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="customLadderSampleName = false">
                        取消
                      </el-button>
                      <el-button type="primary" @click="saveLadderSampleName">
                        确认
                      </el-button>
                    </span>
                  </template>
                </el-dialog>
              </el-col>
            </el-row>
            <el-row class="fileSetting">
              <el-col :span="8">
                <el-switch
                  v-model="value1"
                  size="large"
                  inline-prompt
                  active-text="结果文件为中文"
                  active-value="-l"
                  inactive-value=" "
                  style="
                    --el-switch-oncolor: #13ce66;
                    --el-switch-off-color: #ff4949;
                  "
                  inactive-text="结果文件为英文"
                  @change="switchReceiveStatus1"
                ></el-switch>
              </el-col>
              <el-col :span="8">
                <el-switch
                  v-model="value2"
                  size="large"
                  inline-prompt
                  active-text="峰面积"
                  active-value="-a"
                  inactive-value=" "
                  style="
                    --el-switch-oncolor: #13ce66;
                    --el-switch-off-color: #ff4949;
                  "
                  inactive-text="峰高"
                  @change="switchReceiveStatus2"
                ></el-switch>
              </el-col>
              <el-col :span="8" class="leftText">
                <span style="radio-label">格式：</span>
                <el-radio-group
                  v-model="radio1"
                  @change="switchFileFormat"
                  size="large"
                >
                  <el-radio-button label="GBK"></el-radio-button>
                  <el-radio-button label="UTF-8"></el-radio-button>
                </el-radio-group>
              </el-col>
            </el-row>
            <el-row class="fileSetting">
              <el-col :span="24" class="leftText">
                <span class="radio-label">种类：</span>
                <el-radio-group
                  v-model="radio2"
                  @change="switchFileType"
                  size="large"
                >
                  <el-radio-button label="summaryFile">结果文件</el-radio-button>
                  <el-radio-button label="summaryFileAndReportFile">结果文件和报告</el-radio-button>
                  <el-radio-button label="summaryFileAndReportPictureFile">结果文件和含图片报告</el-radio-button>
                </el-radio-group>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-header>
  </el-container>
</template>

<script>
import { ElNotification } from "element-plus";
export default {
  data() {
    return {
      activeName: "first",
      fileList1: [],
      fileList2: [],
      showUploadGen: true,
      showSampleInformation: false,
      customSampleName: false,
      customNTCSampleName: false,
      customLadderSampleName: false,
      sampleName: "",
      ntcSampleName: "",
      ladderSampleName: "",
      uploadParams: {
        outputFormat: "GBK",
      },
      value1: " ",
      value2: " ",
      radio1: "GBK",
      radio2: "summaryFile"
    };
  },
  methods: {
    // 添加帮助跳转方法
    help() {
      const { shell } = window.require("electron");
      shell.openExternal("https://github.com/NTLx/SMNFiler");
    },
    // 退出窗口方法
    exitBox() {
      window.close();
    },
    //处理文件列表
    handleChange(file, fileList1) {
      // this.fileList1 = [];
      this.fileList1 = fileList1.slice(-1);
      console.log("fileList1", fileList1.length);
    },
    // 上传文件之前文件格式校验方法
    beforeAvatarUpload(file, fileList1) {
      let extension = file.name.split(".")[1];
      let extensionList = ["txt", "csv"];
      if (extensionList.indexOf(extension) < 0) {
        const formatMessage =
          "很抱歉，您选择的文件格式不符合要求，请重新选择文件！";
        ElNotification({
          showClose: true,
          message: formatMessage,
          type: "error",
          position: "top-right",
          duration: "2000",
          offset: 60,
        });
        return false;
      }
    },
    // 处理Genemapper下机数据调用可执行文件方法
    httpRequest(data) {
      console.log("自定义标准品样本名", data.data.stdName);
      console.log("结果文件为中文", data.data.language);
      console.log("峰状态", data.data.peakStatus);
      console.log("文件格式",data.data.outputFormat);
      console.log("文件种类",data.data.fileType);
      var file = data.file;
      var path = require("path");
      const { exec } = window.require("child_process");
      var fs = window.require("fs");
      var exeFile;
      var linuxOldUrl = path.join(__dirname, "analysis_miss");
      var windowOldUrl = path.join(__dirname, "analysis_miss.exe");
      var linuxNewUrl = path.join(process.cwd(), "/resources/analysis_miss");
      var windowNewUrl = path.join(
        process.cwd(),
        "/resources/analysis_miss.exe"
      );
      fs.readFile(file.path, function (err, data) {
        if (err) {
          return console.error(err);
        }
        console.log("异步读取：" + data.toString());
      });
      fs.stat(linuxOldUrl, (err) => {
        if (err) {
          if (file.path) {
            console.log("Request handle 'start' was called");
            if (process.platform === "win32") {
              exeFile = windowNewUrl;
            } else if (process.platform === "linux") {
              exeFile = linuxNewUrl;
            }
            exec(exeFile + " -i " + file.path, (error, stdout, stderr) => {
              if (error || stderr) {
                const notice = "输入下机数据文件" + file.name + "处理有误！";
                ElNotification({
                  showClose: true,
                  message: notice,
                  type: "error",
                  position: "top-right",
                  duration: "2000",
                  offset: 60,
                });
                console.log("error:\n" + error);
                console.log("stderr:\n" + stderr);
              } else if (stdout) {
                const notice = "输入下机数据文件" + file.name + "处理完成";
                ElNotification({
                  showClose: true,
                  message: notice,
                  type: "success",
                  position: "top-right",
                  duration: "2000",
                  offset: 60,
                });
                console.log("stdout:\n" + stdout);
              }
            });
          }
        } else {
          if (file.path) {
            console.log("Request handle 'start' was called");
            if (process.platform === "win32") {
              exeFile = windowNewUrl;
            } else if (process.platform === "linux") {
              exeFile = linuxNewUrl;
            }
            exec(exeFile + " -i " + file.path, (error, stdout, stderr) => {
              if (error || stderr) {
                const notice = "输入下机数据文件" + file.name + "处理有误！";
                ElNotification({
                  showClose: true,
                  message: notice,
                  type: "error",
                  position: "top-right",
                  duration: "2000",
                  offset: 60,
                });
                console.log("error:\n" + error);
                console.log("stderr:\n" + stderr);
              } else if (stdout) {
                const notice = "输入下机数据文件" + file.name + "处理完成";
                ElNotification({
                  showClose: true,
                  message: notice,
                  type: "success",
                  position: "top-right",
                  duration: "2000",
                  offset: 60,
                });
                console.log("stdout:\n" + stdout);
              }
            });
          }
        }
      });
    },
    // 保存自定义样本名
    saveSampleName() {
      var sampleName = this.sampleName;
      this.uploadParams.stdName = sampleName;
      this.customSampleName = false;
    },
    // 保存NTC检测样本名
    saveNTCSampleName() {
      var ntcSampleName = this.ntcSampleName;
      this.uploadParams.ntcName = ntcSampleName;
      this.customNTCSampleName = false;
    },
    // 保存Ladder检测样本名
    saveLadderSampleName() {
      var ladderSampleName = this.ladderSampleName;
      this.uploadParams.ladderName = ladderSampleName;
      this.customLadderSampleName = false;
    },
    //设置输出结果文件为中文
    switchReceiveStatus1(val) {
      this.uploadParams.language = val;
    },
    //峰面积
    switchReceiveStatus2(val) {
      this.uploadParams.peakStatus = val;
    },
    //文件格式转换GBK，UTF-8
    switchFileFormat(val){
      console.log("输出文件格式", val);
      this.uploadParams.outputFormat = val;
    },
    //切换输出文件种类
    switchFileType(val){
       console.log("输出文件种类", val);
      this.uploadParams.fileType = val;
    }
  },
};
</script>

<style>
.el-tabs {
  width: 100%;
}

.demo-tabs .el-tabs__content {
  height: calc(100% - 40px); /* 40px 是指每个标签页的高度 */
  display: flex;
}

.demo-tabs .el-tab-pane {
  flex: 1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.upload-demo .el-upload-dragger {
  height: 450px;
}
.el-upload-dragger {
  margin-top: 10px;
}
.upload-demo .el-upload__tip {
  font-size: 15px;
  color: #708090;
  margin-top: 0px;
}
.upload-demo1 {
  text-align: left;
}
.table-wrapper {
  overflow-x: auto;
}
a.help {
  color: #fff;
}
.demo-tabs .helpButton {
  text-align: left;
}
.demo-tabs .mb-4 .exitButton {
  text-align: right;
}
.setting {
  position: relative;
}
/* .settingPosition {
  margin-top: 20%;
} */
.grid-content {
  border-radius: 4px;
  text-align: left;
}
.fileSetting {
  margin: 34px 0;
}

.el-divider__text {
  font-size: 16px !important;
}
i.el-icon.el-icon--upload {
  margin-top: 100px;
}
.leftText{
  display: flex;
  align-items: center;
}
</style>

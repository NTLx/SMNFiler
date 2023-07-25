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
                :data="{}"
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
                <el-button type="primary">
                  <el-icon><Back /></el-icon>退出
                </el-button>
              </div>
            </el-col>
          </el-row>
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
    };
  },
  methods: {
    // 添加帮助跳转方法
    help() {
      const { shell } = window.require("electron");
      shell.openExternal("https://github.com/NTLx/SMNFiler");
    },
    // 处理Genemapper下机数据调用可执行文件方法
    httpRequest(data) {
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
.leftText {
  text-align: left;
}
</style>

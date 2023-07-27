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
                  outputFormat: uploadParams.outputFormat,
                  fileType: uploadParams.fileType,
                  fileTypeParameter:uploadParams.fileTypeParameter,
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
        <el-tab-pane
          label="样本信息数据上传"
          name="second"
          v-if="showSampleInformation"
        >
          <el-upload
            v-model:file-list="fileList2"
            class="upload-demo1"
            action="#"
            accept=".xlsx,.xls"
            :on-change="handleChange1"
            :http-request="httpRequest1"
            :data="{
              fileType: uploadParams.fileType,
              fileTypeParameter:uploadParams.fileTypeParameter,
              htmlStatus: uploadParams.htmlStatus,
              fontStatus: uploadParams.fontStatus,
            }"
            :before-upload="beforeSampleInformationUpload"
          >
            <el-button type="primary" class="uploadSampleData"
              >上传样本信息数据</el-button
            >
            <template #tip>
              <div class="el-upload__tip">
                样本信息数据文件后缀格式必须为xlsx/xls
              </div>
            </template>
          </el-upload>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
              <template #default="props">
                <div m="18">
                  <p m="t-0 b-2">门诊号：{{ props.row.clinicNumber}}</p>
                  <p m="t-0 b-2">住院号：{{props.row.hospitalNumber}}</p>
                  <p m="t-0 b-2">手机号：{{props.row.phone}}</p>
                  <p m="t-0 b-2">送检科室：{{props.row.inspectionDepartment}}</p>
                  <p m="t-0 b-2">送检医生：{{props.row.inspectionDoctor}}</p>
                  <p m="t-0 b-2">采样日期：{{props.row.samplingDate}}</p>
                  <p m="t-0 b-2">检验日期：{{props.row.inspectionDate}}</p>
                  <p m="t-0 b-2">报告日期：{{props.row.reportDate}}</p>
                  <p m="t-0 b-2">检验单位：{{props.row.inspectionEntity}}</p>
                  <p m="t-0 b-2">检验者：{{props.row.inspector}}</p>
                  <p m="t-0 b-2">审核者：{{props.row.checker}}</p>
                  <p m="t-0 b-2">结论：{{props.row.conclude}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="序号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="medicalHistory" label="简要病史"></el-table-column>
            <el-table-column prop="sampleType" label="样本类型"></el-table-column>
            <el-table-column prop="smn1" label="SMN1外显子7"></el-table-column>
            <el-table-column prop="smn2" label="SMN2外显子7"></el-table-column>
          </el-table>
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
                <el-button
                  type="primary"
                  @click="customSampleName = true"
                  size="large"
                >
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
                <el-button
                  type="primary"
                  @click="customNTCSampleName = true"
                  size="large"
                >
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
                  <el-radio-button label="summaryFile"
                    >结果文件</el-radio-button
                  >
                  <el-radio-button label="summaryFileAndReportFile"
                    >结果文件和报告</el-radio-button
                  >
                  <el-radio-button label="summaryFileAndReportPictureFile"
                    >结果文件和含图片报告</el-radio-button
                  >
                </el-radio-group>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-divider content-position="left">报告文件设置</el-divider>
              </el-col>
            </el-row>
            <el-row class="fileSetting">
              <el-col :span="12">
                <el-switch
                  v-model="value3"
                  size="large"
                  inline-prompt
                  active-text="生成 HTML 文件"
                  active-value="1"
                  inactive-value="0"
                  style="
                    --el-switch-oncolor: #13ce66;
                    --el-switch-off-color: #ff4949;
                  "
                  inactive-text="不生成 HTML 文件"
                  @change="switchReceiveStatus3"
                >
                </el-switch>
              </el-col>
              <el-col :span="12">
                <el-switch
                  v-model="value4"
                  size="large"
                  inline-prompt
                  active-text="字体:MiSans"
                  active-value="1"
                  inactive-value="0"
                  style="
                    --el-switch-oncolor: #13ce66;
                    --el-switch-off-color: #ff4949;
                  "
                  inactive-text="字体:宋体"
                  @change="switchReceiveStatus4"
                >
                </el-switch>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-divider content-position="left">日志</el-divider>
              </el-col>
            </el-row>
            <el-row class="fileSetting">
              <el-col :span="24">
                <el-button @click="openLogFile" type="primary" size="large">
                  打开日志文件
                </el-button>
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
      tableData: [],
      showUploadGen: true,
      showSampleInformation: false,
      customSampleName: false,
      customNTCSampleName: false,
      customLadderSampleName: false,
      sampleName: " ",
      ntcSampleName: " ",
      ladderSampleName: " ",
      uploadParams: {
        outputFormat: "UTF-8",
        stdName: "STD",
        ntcName: " ",
        ladderName: " ",
        fileType: "summaryFile",
        fileTypeParameter: " ",
      },
      value1: " ",
      value2: " ",
      radio1: "UTF-8",
      radio2: "summaryFile",
      value3: 0,
      value4: 0,
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
    // 处理样本信息文件列表
    handleChange1(file, fileList2) {
      this.fileList2 = fileList2.slice(-1);
      console.log("fileList2", fileList2.length);
    },
    //点击切换tabs栏方法
     handleClick(tab, event) {
      console.log(tab.props.label, event);
      if (tab.props.label == "GeneMapper下机数据上传") {
        ElNotification({
          message: "GeneMapper下机数据上传",
          type: "info",
          showClose: true,
          position: "top-right",
          duration: "2000",
          offset: 60,
        });
      } else if (tab.props.label == "样本信息数据上传") {
        ElNotification({
          message: "样本信息数据上传",
          type: "info",
          showClose: true,
          position: "top-right",
          duration: "2000",
          offset: 60,
        });
      } else if (tab.props.label == "设置") {
        ElNotification({
          message: "设置",
          type: "info",
          showClose: true,
          position: "top-right",
          duration: "2000",
          offset: 60,
        });
      }
    },
    // 上传Genemapper下机数据文件之前文件格式校验方法
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
    // 上传样本信息文件之前文件格式校验方法
    beforeSampleInformationUpload(file2,fileList2){
      let extension1 = file2.name.split(".")[1];
      let extensionList1 = ["xlsx", "xls"];
      if (extensionList1.indexOf(extension1) < 0) {
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
     //日期格式转换1
    formatDate1(numb, format = "年", format1 = "月", format2 = "日") {
      let time = new Date((numb - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      let year = time.getFullYear() + "";
      let month = time.getMonth() + 1 + "";
      let date = time.getDate() + "";
      if (format && format.length === 1) {
        return (
          year +
          format +
          (month < 10 ? "0" + month : month) +
          format1 +
          (date < 10 ? "0" + date : date) +
          format2
        );
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
    //日期格式转换2
    formatDate2(numb, format = "-") {
      let time = new Date((numb - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      let year = time.getFullYear() + "";
      let month = time.getMonth() + 1 + "";
      let date = time.getDate() + "";
      if (format && format.length === 1) {
        return (
          year +
          format +
          (month < 10 ? "0" + month : month) +
          format +
          (date < 10 ? "0" + date : date)
        );
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
    // 处理Genemapper下机数据调用可执行文件方法
    httpRequest(data) {
      console.log("自定义标准品样本名", data.data.stdName);
      console.log("结果文件为中文", data.data.language);
      console.log("峰状态", data.data.peakStatus);
      console.log("文件格式", data.data.outputFormat);
      console.log("文件种类", data.data.fileType);
      console.log("字体文件状态", data.data.fontStatus);
      console.log("生成html文件", data.data.htmlStatus);
      this.tableData=""
      var file = data.file;
      var path = require("path");
      var log = window.require("electron-log");
      log.transports.console.level = "silly";
      var app = window.require("@electron/remote").app;
      var logFilepath = path.join(app.getPath("temp"));
      console.log(logFilepath);
      var logFilename = "SMNFilerVue.log";
      log.transports.file.resolvePath = () =>
        path.join(logFilepath, logFilename);
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
            exec(
              exeFile +
                " -i " +
                file.path +
                " -e " +
                data.data.outputFormat +
                " -c " +
                data.data.stdName +
                " " +
                data.data.peakStatus +
                " " +
                data.data.language +
                " " +
                data.data.ntcName +
                " " +
                data.data.ladderName +
                " " +
                data.data.fileTypeParameter,
              (error, stdout, stderr) => {
                if (error || stderr) {
                  const notice = "输入下机数据文件" + file.name + "处理有误！";
                  log.error(
                    "\n" +
                      "当前输入下机数据文件" +
                      file.name +
                      "\n" +
                      "处理有误！"
                  );
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
                  log.info(
                    "\n" +
                      "当前输入下机数据文件" +
                      file.name +
                      "\n" +
                      "处理完成！"
                  );
                  ElNotification({
                    showClose: true,
                    message: notice,
                    type: "success",
                    position: "top-right",
                    duration: "2000",
                    offset: 60,
                  });
                  console.log("stdout:\n" + stdout);
                  if(data.data.fileType !== "summaryFile" ){
                      this.changeTab()
                  }
                }
              }
            );
          }
        } else {
          if (file.path) {
            console.log("Request handle 'start' was called");
            if (process.platform === "win32") {
              exeFile = windowNewUrl;
            } else if (process.platform === "linux") {
              exeFile = linuxNewUrl;
            }
            exec(
              exeFile +
                " -i " +
                file.path +
                " -e " +
                data.data.outputFormat +
                " -c " +
                data.data.stdName +
                " " +
                data.data.peakStatus +
                " " +
                data.data.language +
                " " +
                data.data.ntcName +
                " " +
                data.data.ladderName +
                " " +
                data.data.fileTypeParameter,
              (error, stdout, stderr) => {
                if (error || stderr) {
                  const notice = "输入下机数据文件" + file.name + "处理有误！";
                  log.error(
                    "\n" +
                      "当前输入下机数据文件" +
                      file.name +
                      "\n" +
                      "处理有误！"
                  );
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
                  log.info(
                    "\n" +
                      "当前输入下机数据文件" +
                      file.name +
                      "\n" +
                      "处理完成！"
                  );
                  ElNotification({
                    showClose: true,
                    message: notice,
                    type: "success",
                    position: "top-right",
                    duration: "2000",
                    offset: 60,
                  });
                  console.log("stdout:\n" + stdout);
                  if(data.data.fileType !== "summaryFile" ){
                      this.changeTab()
                  }
                }
              }
            );
          }
        }
      });
    },
    // 处理样本信息数据文件并生成报告
    httpRequest1(data1){
      console.log("处理样本data1",data1)
      var file =data1.file;
      console.log("file",file);
      var path = require("path");
       var log = window.require("electron-log");
      log.transports.console.level = "silly";
      var app = window.require("@electron/remote").app;
      var logFilepath = path.join(app.getPath("temp"));
      console.log(logFilepath);
      var logFilename = "vue3Electron.log";
      log.transports.file.resolvePath = () =>
        path.join(logFilepath, logFilename);

      var xlsx = window.require("node-xlsx");
      var sampleFileNamePath = file.path.trim();
      console.log(sampleFileNamePath);
      var sampleFileName = sampleFileNamePath.substring(
        sampleFileNamePath.lastIndexOf("\\") + 1
      );
      console.log("sampleFileName", sampleFileName);
      var sampleFileNameCurrentPath = sampleFileNamePath.substring(
        0,
        sampleFileNamePath.lastIndexOf("\\") + 1
      );
      console.log("sampleFileNameCurrentPath", sampleFileNameCurrentPath);
      log.info(
        "\n" +
          "当前处理文件名：" +
          sampleFileName +
          "\n" +
          "成功传入输入样本数据文件"
      );
      var sampleSheets = xlsx.parse(file.path.trim());
      var sampleSheetsData = sampleSheets[0].data;
      var sampleLineData = [];
      // var newSampleLineData = [];
      var outFileName = [];
      var outFileNamePath = [];
      // var docx = [];
      // var header1 = [];
      // var header2=  [];
      // var footer2= [];
      for (var j = 1; j < sampleSheetsData.length; j++) {
        sampleLineData.push(sampleSheetsData[j]);
        console.log("sampleLineData", sampleLineData);
      }
      console.log("sampleLineData1", sampleLineData);
      const objArr = sampleLineData.map((item)=>{
        //采样日期调用日期格式转换方法
        console.log("采样日期",item[9])
        var newSamplingDate = this.formatDate2(item[9]);
        //检验日期调用日期格式转换方法
        console.log("检验日期",item[10])
        var newInspectionDate = this.formatDate2(item[10]);
        //报告日期调用日期格式转换方法
        console.log("报告日期",item[11])
        var newReportDate = this.formatDate2(item[11]);
         // 格式转换
        var leftSlash = "/";
        if (item[0] == " " || item[0] == undefined) {
          item[0] = leftSlash;
        }
        if (item[1] == " " || item[1] == undefined) {
          item[1] = leftSlash;
        }
        if (item[2] == " " || item[2] == undefined) {
          item[2] = leftSlash;
        }
        if (item[3] == " " || item[3] == undefined) {
          item[3] = leftSlash;
        }
        if (item[4] == " " || item[4] == undefined) {
          item[4] = leftSlash;
        }
        if (item[5] == " " || item[5] == undefined) {
          item[5] = leftSlash;
        }
        if (item[6] == " " || item[6] == undefined) {
          item[6] = leftSlash;
        }
        if (item[7] == " " || item[7] == undefined) {
          item[7] = leftSlash;
        }
        if (item[8] == " " || item[8] == undefined) {
          item[8] = leftSlash;
        }
        if (item[9] == " " || item[9] == undefined) {
          item[9] = leftSlash;
        }
        if (item[10] == " " || item[10] == undefined) {
          item[10] = leftSlash;
        }
        if (item[11] == " " || item[11] == undefined) {
          item[11] = leftSlash;
        }
        if (item[12] == " " || item[12] == undefined) {
          item[12] = leftSlash;
        }
        if (item[13] == " " || item[13] == undefined) {
          item[13] = leftSlash;
        }
        if (item[14] == " " || item[14] == undefined) {
          item[14] = leftSlash;
        }
        if (item[15] == " " || item[15] == undefined) {
          item[15] = leftSlash;
        }
        if (item[16] == " " || item[16] == undefined) {
          item[16] = leftSlash;
        }
        if (item[17] == " " || item[17] == undefined) {
          item[17] = leftSlash;
        }
        if (item[18] == " " || item[18] == undefined) {
          item[18] = leftSlash;
        }
        return {
          number: item[0],
          name: item[1],
          sex: item[2],
          clinicNumber: item[3],
          hospitalNumber: item[4],
          phone: item[5],
          inspectionDepartment: item[6],
          inspectionDoctor: item[7],
          medicalHistory: item[8],
          samplingDate: newSamplingDate,
          inspectionDate: newInspectionDate,
          reportDate: newReportDate,
          inspectionEntity: item[12],
          sampleType: item[13],
          inspector: item[14],
          checker: item[15],
          smn1: item[16],
          smn2: item[17],
          conclude: item[18],
        }
      });
      console.log("objArr", objArr);
      this.tableData = objArr;
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
    switchFileFormat(val) {
      console.log("输出文件格式", val);
      this.uploadParams.outputFormat = val;
    },
    //切换输出文件种类
    switchFileType(val) {
      if (val == "summaryFileAndReportFile") {
         console.log("结果文件和报告");
        this.showUploadGen = true;
        this.showSampleInformation = true;
        this.uploadParams.fileType = val;
        this.uploadParams.fileTypeParameter = " "
        this.changeTab1()
      } else if (val == "summaryFileAndReportPictureFile") {
         console.log("结果文件和含图片报告");
         this.showUploadGen = true;
         this.showSampleInformation = true;
         this.uploadParams.fileType = val;
         this.uploadParams.fileTypeParameter = "-f"
         this.changeTab1()
      } else {
        console.log("结果文件");
        this.uploadParams.fileType = val
        this.uploadParams.fileTypeParameter = " "
        this.showUploadGen = true;
        this.showSampleInformation = false;
        this.changeTab1()
      }
    },
    // 切换为样本信息上传窗口
    changeTab() {
      this.activeName = "second";
      setTimeout(() => {
        ElNotification({
          message: "样本信息上传",
          type: "info",
          showClose: true,
          position: "top-right",
          duration: "2000",
          offset: 60,
        });
      }, 1000);
    },
    // 切换为Genemapper下机数据上传
    changeTab1() {
      this.activeName = "first";
      setTimeout(() => {
        ElNotification({
          message: "Genemapper下机数据上传",
          type: "info",
          showClose: true,
          position: "top-right",
          duration: "2000",
          offset: 60,
        });
      }, 1000);
    },
    // 生成html文件
    switchReceiveStatus3(val) {
      this.uploadParams.htmlStatus = val;
    },
    //切换字体文件方法
    switchReceiveStatus4(val) {
      this.uploadParams.fontStatus = val;
    },
    // 日志
    openLogFile() {
      var log = window.require("electron-log");
      var path = require("path");
      var app = window.require("@electron/remote").app;
      var logFilepath = path.join(app.getPath("temp"));
      console.log(logFilepath);
      let convertedLogFilepath = logFilepath.replace(/\\/g, "/");
      var logFilename = "SMNFilerVue.log";
      log.transports.file.resolvePath = () =>
        path.join(convertedLogFilepath, logFilename);
      console.log(path.join(convertedLogFilepath, logFilename));
      const { shell } = window.require("electron");
      shell.openExternal(path.join(convertedLogFilepath, logFilename));
      // window.open(path.join(convertedLogFilepath, logFilename));
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
  margin: 30px 0;
}

.el-divider__text {
  font-size: 16px !important;
}
i.el-icon.el-icon--upload {
  margin-top: 100px;
}
.leftText {
  display: flex;
  align-items: center;
}
</style>

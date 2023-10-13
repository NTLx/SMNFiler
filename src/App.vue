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
          <div id="holder" class="holder">
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
                  fileTypeParameter: uploadParams.fileTypeParameter,
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
                  <!-- <el-descriptions title="" direction="vertical" :column="3" :size="size" border>
                    <el-descriptions-item label="标准品样本名" align="center">{{ sampleName?sampleName:"/" }}</el-descriptions-item>
                    <el-descriptions-item label="NTC 检测样本名" align="center">{{ ntcSampleName?ntcSampleName:"/" }}</el-descriptions-item>
                    <el-descriptions-item label="Ladder 检测样本名" align="center">{{ ladderSampleName?ladderSampleName:"/" }}</el-descriptions-item>
                  </el-descriptions> -->
                </template>
                <template #file>
                  <el-text size="large"
                    >GeneMapper下机输入文件：{{ fileList1[0].name }}</el-text
                  >
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
                <el-tooltip
                  class="box-item"
                  content="跳转至帮助文档"
                  effect="light"
                >
                  <el-button type="warning" @click="help" size="large"
                    ><el-icon><QuestionFilled /></el-icon>帮助</el-button
                  >
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="12"
              ><div class="downloadButton">
                <el-tooltip
                  class="box-item"
                  content="下载样本信息模版文件"
                  effect="light"
                >
                  <el-button type="primary" @click="download" size="large">
                    <el-icon><Download /></el-icon>模版
                  </el-button>
                </el-tooltip>
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
              fileTypeParameter: uploadParams.fileTypeParameter,
              htmlStatus: uploadParams.htmlStatus,
              fontStatus: uploadParams.fontStatus,
              selectReport: uploadParams.selectReport,
            }"
            :before-upload="beforeSampleInformationUpload"
          >
            <el-tooltip
              class="box-item"
              content="上传样本信息文件"
              effect="light"
              placement="right"
            >
              <el-button type="primary" class="uploadSampleData" size="large"
                ><el-icon><Upload /></el-icon>上传</el-button
              >
            </el-tooltip>
            <template #tip>
              <div class="el-upload__tip">
                样本信息数据文件后缀格式必须为xlsx/xls
              </div>
            </template>
          </el-upload>
          <el-table :data="tableData" style="width: 100%" id="myTable">
            <el-table-column type="expand">
              <template #default="props">
                <div m="18">
                  <p m="t-0 b-2">门诊号：{{ props.row.clinicNumber }}</p>
                  <p m="t-0 b-2">住院号：{{ props.row.hospitalNumber }}</p>
                  <p m="t-0 b-2">手机号：{{ props.row.phone }}</p>
                  <p m="t-0 b-2">
                    送检科室：{{ props.row.inspectionDepartment }}
                  </p>
                  <p m="t-0 b-2">送检医生：{{ props.row.inspectionDoctor }}</p>
                  <p m="t-0 b-2">采样日期：{{ props.row.samplingDate }}</p>
                  <p m="t-0 b-2">检验日期：{{ props.row.inspectionDate }}</p>
                  <p m="t-0 b-2">报告日期：{{ props.row.reportDate }}</p>
                  <p m="t-0 b-2">检验单位：{{ props.row.inspectionEntity }}</p>
                  <p m="t-0 b-2">检验者：{{ props.row.inspector }}</p>
                  <p m="t-0 b-2">审核者：{{ props.row.checker }}</p>
                  <p m="t-0 b-2">结论：{{ props.row.conclude }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="number"
              label="序号"
              align="center"
              fixed
            ></el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="medicalHistory"
              label="简要病史"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="sampleType"
              label="样本类型"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="smn1"
              label="SMN1外显子7"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="smn2"
              label="SMN2外显子7"
              align="center"
            ></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="设置" name="third" class="setting">
          <div class="container">
            <el-row class="row-container">
              <el-col :span="24">
                <el-divider content-position="left"> 输出文件设置 </el-divider>
              </el-col>
              <!-- </el-row>
            <el-row class="fileSetting"> -->
              <el-col :span="12">
                <div class="spanPosition">
                  <span>类型：</span>
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
                </div>
              </el-col>
              <el-col :span="12">
                <el-switch
                  v-model="value1"
                  class="ml-2"
                  size="large"
                  inline-prompt
                  active-text="结果文件为中文"
                  active-value="-l"
                  inactive-value=" "
                  style="
                    --el-switch-on-color: #13ce66;
                    --el-switch-off-color: #ff4949;
                  "
                  inactive-text="结果文件为中文"
                  @change="switchReceiveStatus1"
                ></el-switch>
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="9">
                <el-input
                  v-model="ntcSampleName"
                  placeholder="NTC检测样本名"
                  size="large"
                >
                  <template #append>
                    <el-button
                      type="primary"
                      class="custom-button"
                      @click="saveNTCSampleName"
                      size="large"
                      >应用</el-button
                    >
                  </template>
                </el-input>
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="9">
                <el-input
                  v-model="sampleName"
                  placeholder="样本名默认为STD"
                  size="large"
                >
                  <template #append>
                    <el-button
                      type="primary"
                      @click="saveSampleName"
                      class="custom-button"
                      size="large"
                      >应用</el-button
                    >
                  </template>
                </el-input>
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="2"></el-col>
              <el-col :span="9">
                <el-input
                  v-model="ladderSampleName"
                  placeholder="Ladder检测样本名"
                  size="large"
                >
                  <template #append>
                    <el-button
                      type="primary"
                      @click="saveLadderSampleName"
                      class="custom-button"
                      size="large"
                      >应用</el-button
                    >
                  </template>
                </el-input>
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="9"></el-col>
              <el-col :span="2"></el-col>
            </el-row>
            <!-- <el-col :span="8">
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
              </el-col> -->

            <el-row class="row-container">
              <el-col :span="24">
                <el-divider content-position="left">报告文件设置</el-divider>
              </el-col>
              <!-- <el-row class="fileSetting">  -->
              <el-col :span="8">
                <el-select
                  v-model="value5"
                  size="large"
                  @change="handleSelectChange"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-switch
                  v-model="value3"
                  size="large"
                  inline-prompt
                  active-text="生成 HTML 文件"
                  active-value="1"
                  inactive-value="0"
                  style="
                    --el-switch-on-color: #13ce66;
                    --el-switch-off-color: #ff4949;
                  "
                  inactive-text="生成 HTML 文件"
                  @change="switchReceiveStatus3"
                >
                </el-switch>
              </el-col>
              <el-col :span="8">
                <el-switch
                  v-model="value4"
                  size="large"
                  inline-prompt
                  active-text="MiSans 字体"
                  active-value="1"
                  inactive-value="0"
                  style="
                    --el-switch-on-color: #13ce66;
                    --el-switch-off-color: #ff4949;
                  "
                  inactive-text="MiSans 字体"
                  @change="switchReceiveStatus4"
                >
                </el-switch>
              </el-col>
            </el-row>
            <el-row class="row-container">
              <el-col :span="24">
                <el-divider content-position="left">日志</el-divider>
              </el-col>
              <!-- </el-row>
            <el-row class="fileSetting"> -->
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
/* eslint-disable */
import { ElNotification, ElLoading } from "element-plus";
export default {
  data() {
    return {
      activeName: "first",
      fileList1: [],
      fileList2: [],
      tableData: [],
      outputArr1: [],
      outputFigureArr1: [],
      lastOutput: [],
      outputDirectry: "",
      showUploadGen: true,
      showSampleInformation: false,
      customSampleName: false,
      customNTCSampleName: false,
      customLadderSampleName: false,
      sampleName: "STD",
      ntcSampleName: "",
      ladderSampleName: "",
      uploadParams: {
        outputFormat: this.outputFormat(),
        stdName: "STD",
        ntcName: "",
        ladderName: "",
        fileType: "summaryFile",
        fileTypeParameter: "",
        selectReport: "default",
        peakStatus: "",
        language: "",
      },
      options: [
        { label: "默认报告模板", value: "default" },
        { label: "其他", value: "other" },
      ],
      value1: " ",
      value2: " ",
      radio2: "summaryFile",
      value3: 0,
      value4: 0,
      value5: "default",
    };
  },
  methods: {
    // 获取浏览器窗口高度
    getWindowHeight() {
      return (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      );
    },
    // 获取浏览器窗口宽度
    getWindowWidth() {
      return (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      );
    },
    //调节表格高度
    adjustTableHeight() {
      var table = document.getElementById("myTable");
      var windowHeight = this.getWindowHeight();
      var windowWidth = this.getWindowWidth();
      var tableHeight,tableWidth
      table == null ?(console.log("nothing"),console.log("windowHeight", windowHeight),console.log("windowWidth", windowWidth)):(console.log("windowHeight", windowHeight),console.log("windowWidth", windowWidth),tableHeight = windowHeight - table.offsetTop-100,tableWidth = windowWidth - 20,table.style.height = tableHeight + "px",table.style.width = tableWidth + "px");
    },
    // 根据不同操作系统设置默认值
    outputFormat() {
      const platformEncodingMap = {
        darwin: "UTF-8",
        win32: "GBK",
        linux: "UTF-8",
      };
      const platform = process.platform;
      return platformEncodingMap[platform] || "UTF-8";
    },
    // 添加帮助跳转方法
    help() {
      const { shell } = window.require("electron");
      shell.openExternal(
        "https://alidocs.dingtalk.com/i/p/b6Vz6P44NlKnYmZ9/docs/20eMKjyp81xLM6k7SarGeNMMJxAZB1Gv"
      );
    },
    // 下载样本数据窗口方法
    download() {
      var path = require("path");
      if (process.platform === "darwin") {
        var downloadFile = path.join(
          process.cwd(),
          "/Applications/SMNFiler.app/Contents/Resources/SMNFilerSampleData.xlsx"
        );
        var win = window.require("@electron/remote").getCurrentWindow();
        win.webContents.downloadURL("file:///" + downloadFile);
      } else if (process.platform === "win32") {
        var downloadFile = path.join(
          process.cwd(),
          "/resources/SMNFilerSampleData.xlsx"
        );
        var win = window.require("@electron/remote").getCurrentWindow();
        win.webContents.downloadURL(downloadFile);
      } else if (process.platform === "linux") {
        var downloadFile = path.join(
          process.cwd(),
          "/resources/SMNFilerSampleData.xlsx"
        );
        var win = window.require("@electron/remote").getCurrentWindow();
        win.webContents.downloadURL(downloadFile);
      }

      console.log("downloadFile", downloadFile);
    },
    // 下拉单选框值变化方法
    handleSelectChange(value) {
      console.log("选项变化:", value);
      if (value == "default") {
        this.value5 = "default";
      } else if (value == "other") {
        this.value5 = "other";
      }
      this.uploadParams.selectReport = value;
    },
    //处理文件列表
    handleChange(file, fileList1) {
      this.fileList1 = fileList1.slice(-1);
    },
    // 处理样本信息文件列表
    handleChange1(file, fileList2) {
      this.fileList2 = fileList2.slice(-1);
    },
    //点击切换tabs栏方法
    handleClick(tab, event) {
      var label = tab.props.label;
      switch (label) {
        case "GeneMapper下机数据上传":
        case "样本信息数据上传":
        case "设置":
          this.showInfoNotification(label);
          break;
        default:
          // 默认情况下的处理逻辑
          break;
      }
    },
    // info消息通知
    showInfoNotification(message) {
      ElNotification({
        message: message,
        type: "info",
        showClose: true,
        position: "top-right",
        duration: "2000",
        offset: 60,
      });
    },
    // error消息通知
    showErrorNotification(message) {
      ElNotification({
        message: message,
        type: "error",
        showClose: true,
        position: "top-right",
        duration: "2000",
        offset: 60,
      });
    },
    // success消息通知
    showSuccessNotification(message) {
      ElNotification({
        message: message,
        type: "success",
        showClose: true,
        position: "top-right",
        duration: "2000",
        offset: 60,
      });
    },
    // warning 消息通知
    showWarningNotification(message) {
      ElNotification({
        message: message,
        type: "warning",
        showClose: true,
        position: "top-right",
        duration: "2000",
        offset: 60,
      });
    },
    // 上传Genemapper下机数据文件之前文件格式校验方法
    beforeAvatarUpload(file, fileList1) {
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let extensionList = ["txt", "csv"];
      if (extensionList.indexOf(extension) < 0) {
        const formatMessage =
          "很抱歉，您选择的文件格式不符合要求，请重新选择文件！";
        this.showErrorNotification(formatMessage);
        return false;
      }
    },
    // 上传样本信息文件之前文件格式校验方法
    beforeSampleInformationUpload(file2, fileList2) {
      let extension1 = file2.name.split(".")[1];
      let extensionList1 = ["xlsx", "xls"];
      if (extensionList1.indexOf(extension1) < 0) {
        const formatMessage =
          "很抱歉，您选择的文件格式不符合要求，请重新选择文件！";
        this.showErrorNotification(formatMessage);
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
      var loading = ElLoading.service({
        lock: true,
        text: "上传处理中",
        background: "rgba(0, 0, 0, 0.7)",
      });
      var stdName = data.data.stdName;
      var language = data.data.language;
      var peakStatus = data.data.peakStatus;
      var outputFormat = data.data.outputFormat;
      var fileType = data.data.fileType;
      var htmlStatus = data.data.htmlStatus;
      var fileTypeParameter = data.data.fileTypeParameter;
      var ntcName = data.data.ntcName;
      var ladderName = data.data.ladderName;
      this.tableData = "";
      // 创建 Date 对象并传入时间戳
      var date = new Date();
      // 使用 Date 对象的方法获取日期和时间信息
      var year = date.getFullYear(); // 年份
      var month = date.getMonth() + 1; // 月份（注意月份从 0 开始，所以要加 1）
      var day = date.getDate(); // 日期
      var hours = date.getHours(); // 小时
      var minutes = date.getMinutes(); // 分钟
      var seconds = date.getSeconds(); // 秒
      var file = data.file;
      var path = require("path");
      // 格式化日期和时间
      var formattedDateTime = `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;
      if (process.platform === "darwin") {
        var inputFile = path.dirname(file.path);
      } else if (process.platform === "win32") {
        var inputFile = file.path.substring(0, file.path.lastIndexOf("\\") + 1);
      } else if (process.platform === "linux") {
        var inputFile = file.path.substring(0, file.path.lastIndexOf("\\") + 1);
      }

      var inputFileNameWithOutSuffix = file.name.substring(
        0,
        file.name.lastIndexOf(".")
      );
      console.log("inputFileNameWithOutSuffix", inputFileNameWithOutSuffix);
      var generateDataFolder =
        inputFileNameWithOutSuffix + "." + formattedDateTime;
      var outputDirectry = path.join(inputFile, generateDataFolder);
      console.log("outputDirectry", outputDirectry);
      var log = window.require("electron-log");
      log.transports.console.level = "silly";
      var app = window.require("@electron/remote").app;
      var logFilepath = path.join(app.getPath("temp"));
      console.log(logFilepath);
      var logFilename = "SMNFilerVue.log";
      log.transports.file.resolvePath = () =>
        path.join(logFilepath, logFilename);
      const { exec } = window.require("child_process");
      var exeFile;
      var linuxNewUrl = path.join(process.cwd(), "/resources/analysis_miss");
      var windowNewUrl = path.join(
        process.cwd(),
        "/resources/analysis_miss.exe"
      );
      var macNewUrl = path.join(
        process.cwd(),
        "/Applications/SMNFiler.app/Contents/Resources/analysis_miss.mac"
      );
      if (process.platform === "darwin") {
        this.uploadParams.outputFormat = "UTF-8";
        this.uploadParams.language == "";
        exeFile = linuxNewUrl;
      } else if (process.platform === "win32") {
        this.uploadParams.outputFormat = "GBK";
        this.uploadParams.language == "";
        exeFile = windowNewUrl;
      } else if (process.platform === "linux") {
        this.uploadParams.outputFormat = "UTF-8";
        this.uploadParams.language == "";
        exeFile = linuxNewUrl;
      }
      if (file.path) {
        console.log("Request handle 'start' was called");
        if (ntcName == "" && ladderName == "") {
          exec(
            exeFile +
              " -i " +
              file.path +
              " -e " +
              outputFormat +
              " -c " +
              stdName +
              " " +
              language +
              " " +
              fileTypeParameter +
              " -o " +
              outputDirectry,
            (error, stdout, stderr) => {
              if (error || stderr) {
                loading.close();
                this.errorNotification(
                  file.name,
                  "当前处理输入文件：" +
                    file.name +
                    "有误！\n具体详情请查看日志文件。"
                );
                const notice = "输入下机数据文件" + file.name + "处理有误！";
                log.error(
                  "\n" +
                    "当前输入下机数据文件" +
                    file.name +
                    "\n" +
                    "处理有误！" +
                    "\n" +
                    stderr
                );
                this.showErrorNotification(notice);
                console.log("error:\n" + error);
                console.log("stderr:\n" + stderr);
              } else if (stdout) {
                loading.close();
                const notice = "输入下机数据文件" + file.name + "处理完成";
                log.info(
                  "\n" +
                    "当前输入下机数据文件" +
                    file.name +
                    "\n" +
                    "处理完成！"
                );
                this.showSuccessNotification(notice);
                console.log("stdout:\n" + stdout);
                if (fileType !== "summaryFile") {
                  this.changeTab();
                  // 去除文件后缀
                  if (fileType == "summaryFileAndReportFile") {
                    // 解析summary文件
                    var outPutFileName =
                      inputFileNameWithOutSuffix +
                      "." +
                      outputFormat +
                      ".Summary.tsv";
                    const summaryFile = path.join(
                      inputFile,
                      generateDataFolder,
                      outPutFileName
                    );
                    console.log("summaryFile", summaryFile);
                    this.outputDirectry = outputDirectry;
                    var xlsx = window.require("node-xlsx");
                    // var tsvFile = fs.readFileSync(summaryFile, "utf8");
                    const parsedData = xlsx.parse(summaryFile);
                    console.log("parsedData", parsedData);
                    var parsedSheetData = parsedData[0].data;
                    // iconv.skipDecodeWarning = true;
                    var parsedLineData = [];
                    for (var j = 0; j < parsedSheetData.length; j++) {
                      if (
                        parsedSheetData[j][0].includes("warn") ||
                        parsedSheetData[j][0].includes("All")
                      ) {
                        console.log("当前" + j + "行有warn或者含有All");
                      } else {
                        console.log("全部数据");
                        parsedLineData.push(parsedSheetData[j]);
                      }
                    }
                    const outputArr = parsedLineData.map(function (item) {
                      return {
                        number: item[0],
                        removeSuffixNumber: item[1],
                        SMN1andSMN2: item[2],
                        SMN1: item[2].split("|")[0],
                        SMN2: item[2].split("|")[1],
                      };
                    });
                    console.log("outputArr", outputArr);
                    this.outputArr1 = outputArr;
                  } else {
                    // 生成画图文件路径
                    const outputFigureFile =
                      inputFileNameWithOutSuffix +
                      "." +
                      outputFormat +
                      ".figure.tsv";
                    const figureFile = path.join(
                      inputFile,
                      generateDataFolder,
                      outputFigureFile
                    );
                    this.outputDirectry = outputDirectry;
                    var xlsx = window.require("node-xlsx");
                    // 解析画图文件
                    const parsedData1 = xlsx.parse(figureFile);
                    var parsedSheetData1 = parsedData1[0].data;
                    // iconv.skipDecodeWarning = true;
                    var parsedLineData1 = [];
                    for (var j = 1; j < parsedSheetData1.length; j++) {
                      parsedLineData1.push(parsedSheetData1[j]);
                    }
                    const outputFigureArr = parsedLineData1.map(function (
                      item
                    ) {
                      return {
                        fileName: item[0],
                        SMN1: item[1],
                        SMN2: item[2],
                        S06: item[3],
                        S04: item[4],
                        S07: item[5],
                        S01: item[6],
                        S05: item[7],
                        S08: item[8],
                        S02: item[9],
                        S03: item[10],
                        WARN: item[11],
                      };
                    });
                    this.outputFigureArr1 = outputFigureArr;
                  }
                }
              }
            }
          );
        } else if (ntcName !== "" && ladderName == "") {
          exec(
            exeFile +
              " -i " +
              file.path +
              " -e " +
              outputFormat +
              " -c " +
              stdName +
              " " +
              language +
              " -n " +
              ntcName +
              " " +
              fileTypeParameter +
              " -o " +
              outputDirectry,
            (error, stdout, stderr) => {
              if (error || stderr) {
                loading.close();
                this.errorNotification(
                  file.name,
                  "当前处理输入文件：" +
                    file.name +
                    "有误！\n具体详情请查看日志文件。"
                );
                const notice = "输入下机数据文件" + file.name + "处理有误！";
                log.error(
                  "\n" +
                    "当前输入下机数据文件" +
                    file.name +
                    "\n" +
                    "处理有误！" +
                    "\n" +
                    stderr
                );
                this.showErrorNotification(notice);
                console.log("error:\n" + error);
                console.log("stderr:\n" + stderr);
              } else if (stdout) {
                loading.close();
                const notice = "输入下机数据文件" + file.name + "处理完成";
                log.info(
                  "\n" +
                    "当前输入下机数据文件" +
                    file.name +
                    "\n" +
                    "处理完成！"
                );
                this.showSuccessNotification(notice);
                console.log("stdout:\n" + stdout);
                if (fileType !== "summaryFile") {
                  this.changeTab();
                  if (fileType == "summaryFileAndReportFile") {
                    // 解析summary文件
                    var outPutFileName =
                      inputFileNameWithOutSuffix +
                      "." +
                      outputFormat +
                      ".Summary.tsv";
                    const summaryFile = path.join(
                      inputFile,
                      generateDataFolder,
                      outPutFileName
                    );
                    console.log("summaryFile", summaryFile);
                    this.outputDirectry = outputDirectry;
                    var xlsx = window.require("node-xlsx");
                    const parsedData = xlsx.parse(summaryFile);
                    console.log("parsedData", parsedData);
                    var parsedSheetData = parsedData[0].data;
                    // iconv.skipDecodeWarning = true;
                    var parsedLineData = [];
                    for (var j = 0; j < parsedSheetData.length; j++) {
                      if (
                        parsedSheetData[j][0].includes("warn") ||
                        parsedSheetData[j][0].includes("All")
                      ) {
                        console.log("当前" + j + "行有warn或者含有All");
                      } else {
                        console.log("全部数据");
                        parsedLineData.push(parsedSheetData[j]);
                      }
                    }
                    const outputArr = parsedLineData.map(function (item) {
                      return {
                        number: item[0],
                        removeSuffixNumber: item[1],
                        SMN1andSMN2: item[2],
                        SMN1: item[2].split("|")[0],
                        SMN2: item[2].split("|")[1],
                      };
                    });
                    console.log("outputArr", outputArr);
                    this.outputArr1 = outputArr;
                  } else {
                    // 生成画图文件路径
                    const outputFigureFile =
                      inputFileNameWithOutSuffix +
                      "." +
                      outputFormat +
                      ".figure.tsv";
                    const figureFile = path.join(
                      inputFile,
                      generateDataFolder,
                      outputFigureFile
                    );
                    this.outputDirectry = outputDirectry;
                    var xlsx = window.require("node-xlsx");
                    // 解析画图文件
                    const parsedData1 = xlsx.parse(figureFile);
                    var parsedSheetData1 = parsedData1[0].data;
                    // iconv.skipDecodeWarning = true;
                    var parsedLineData1 = [];
                    for (var j = 1; j < parsedSheetData1.length; j++) {
                      parsedLineData1.push(parsedSheetData1[j]);
                    }
                    const outputFigureArr = parsedLineData1.map(function (
                      item
                    ) {
                      return {
                        fileName: item[0],
                        SMN1: item[1],
                        SMN2: item[2],
                        S06: item[3],
                        S04: item[4],
                        S07: item[5],
                        S01: item[6],
                        S05: item[7],
                        S08: item[8],
                        S02: item[9],
                        S03: item[10],
                        WARN: item[11],
                      };
                    });
                    this.outputFigureArr1 = outputFigureArr;
                  }
                }
              }
            }
          );
        } else if (ntcName != "" && ladderName != "") {
          exec(
            exeFile +
              " -i " +
              file.path +
              " -e " +
              outputFormat +
              " -c " +
              stdName +
              " " +
              language +
              " -n " +
              ntcName +
              " -d " +
              ladderName +
              " " +
              fileTypeParameter +
              " -o " +
              outputDirectry,
            (error, stdout, stderr) => {
              if (error || stderr) {
                loading.close();
                this.errorNotification(
                  file.name,
                  "当前处理输入文件：" +
                    file.name +
                    "有误！\n具体详情请查看日志文件。"
                );
                const notice = "输入下机数据文件" + file.name + "处理有误！";
                log.error(
                  "\n" +
                    "当前输入下机数据文件" +
                    file.name +
                    "\n" +
                    "处理有误！" +
                    "\n" +
                    stderr
                );
                this.showErrorNotification(notice);
                console.log("error:\n" + error);
                console.log("stderr:\n" + stderr);
              } else if (stdout) {
                loading.close();
                const notice = "输入下机数据文件" + file.name + "处理完成";
                log.info(
                  "\n" +
                    "当前输入下机数据文件" +
                    file.name +
                    "\n" +
                    "处理完成！"
                );
                this.showSuccessNotification(notice);
                console.log("stdout:\n" + stdout);
                if (fileType !== "summaryFile") {
                  this.changeTab();
                  if (fileType == "summaryFileAndReportFile") {
                    // 解析summary文件
                    var outPutFileName =
                      inputFileNameWithOutSuffix +
                      "." +
                      outputFormat +
                      ".Summary.tsv";
                    const summaryFile = path.join(
                      inputFile,
                      generateDataFolder,
                      outPutFileName
                    );
                    console.log("summaryFile", summaryFile);
                    this.outputDirectry = outputDirectry;
                    var xlsx = window.require("node-xlsx");
                    // var tsvFile = fs.readFileSync(summaryFile, "utf8");
                    const parsedData = xlsx.parse(summaryFile);
                    console.log("parsedData", parsedData);
                    var parsedSheetData = parsedData[0].data;
                    // iconv.skipDecodeWarning = true;
                    var parsedLineData = [];
                    for (var j = 0; j < parsedSheetData.length; j++) {
                      if (
                        parsedSheetData[j][0].includes("warn") ||
                        parsedSheetData[j][0].includes("All")
                      ) {
                        console.log("当前" + j + "行有warn或者含有All");
                      } else {
                        console.log("全部数据");
                        parsedLineData.push(parsedSheetData[j]);
                      }
                    }
                    const outputArr = parsedLineData.map(function (item) {
                      return {
                        number: item[0],
                        removeSuffixNumber: item[1],
                        SMN1andSMN2: item[2],
                        SMN1: item[2].split("|")[0],
                        SMN2: item[2].split("|")[1],
                      };
                    });
                    console.log("outputArr", outputArr);
                    this.outputArr1 = outputArr;
                  } else {
                    // 生成画图文件路径
                    const outputFigureFile =
                      inputFileNameWithOutSuffix +
                      "." +
                      outputFormat +
                      ".figure.tsv";
                    const figureFile = path.join(
                      inputFile,
                      generateDataFolder,
                      outputFigureFile
                    );
                    this.outputDirectry = outputDirectry;
                    var xlsx = window.require("node-xlsx");
                    // 解析画图文件
                    const parsedData1 = xlsx.parse(figureFile);
                    var parsedSheetData1 = parsedData1[0].data;
                    // iconv.skipDecodeWarning = true;
                    var parsedLineData1 = [];
                    for (var j = 1; j < parsedSheetData1.length; j++) {
                      parsedLineData1.push(parsedSheetData1[j]);
                    }
                    const outputFigureArr = parsedLineData1.map(function (
                      item
                    ) {
                      return {
                        fileName: item[0],
                        SMN1: item[1],
                        SMN2: item[2],
                        S06: item[3],
                        S04: item[4],
                        S07: item[5],
                        S01: item[6],
                        S05: item[7],
                        S08: item[8],
                        S02: item[9],
                        S03: item[10],
                        WARN: item[11],
                      };
                    });
                    this.outputFigureArr1 = outputFigureArr;
                  }
                }
              }
            }
          );
        } else if (ntcName == "" && ladderName != "") {
          exec(
            exeFile +
              " -i " +
              file.path +
              " -e " +
              outputFormat +
              " -c " +
              stdName +
              " " +
              peakStatus +
              " " +
              language +
              " -d " +
              ladderName +
              " " +
              fileTypeParameter +
              " -o " +
              outputDirectry,
            (error, stdout, stderr) => {
              if (error || stderr) {
                loading.close();
                this.errorNotification(
                  file.name,
                  "当前处理输入文件：" +
                    file.name +
                    "有误！\n具体详情请查看日志文件。"
                );
                const notice = "输入下机数据文件" + file.name + "处理有误！";
                log.error(
                  "\n" +
                    "当前输入下机数据文件" +
                    file.name +
                    "\n" +
                    "处理有误！" +
                    "\n" +
                    stderr
                );
                this.showErrorNotification(notice);
                console.log("error:\n" + error);
                console.log("stderr:\n" + stderr);
              } else if (stdout) {
                loading.close();
                const notice = "输入下机数据文件" + file.name + "处理完成";
                log.info(
                  "\n" +
                    "当前输入下机数据文件" +
                    file.name +
                    "\n" +
                    "处理完成！"
                );
                this.showSuccessNotification(notice);
                console.log("stdout:\n" + stdout);
                if (fileType !== "summaryFile") {
                  this.changeTab();
                  if (fileType == "summaryFileAndReportFile") {
                    // 解析summary文件
                    var outPutFileName =
                      inputFileNameWithOutSuffix +
                      "." +
                      outputFormat +
                      ".Summary.tsv";
                    const summaryFile = path.join(
                      inputFile,
                      generateDataFolder,
                      outPutFileName
                    );
                    console.log("summaryFile", summaryFile);
                    this.outputDirectry = outputDirectry;
                    var xlsx = window.require("node-xlsx");
                    // var tsvFile = fs.readFileSync(summaryFile, "utf8");
                    const parsedData = xlsx.parse(summaryFile);
                    console.log("parsedData", parsedData);
                    var parsedSheetData = parsedData[0].data;
                    // iconv.skipDecodeWarning = true;
                    var parsedLineData = [];
                    for (var j = 0; j < parsedSheetData.length; j++) {
                      if (
                        parsedSheetData[j][0].includes("warn") ||
                        parsedSheetData[j][0].includes("All")
                      ) {
                        console.log("当前" + j + "行有warn或者含有All");
                      } else {
                        console.log("全部数据");
                        parsedLineData.push(parsedSheetData[j]);
                      }
                    }
                    const outputArr = parsedLineData.map(function (item) {
                      return {
                        number: item[0],
                        removeSuffixNumber: item[1],
                        SMN1andSMN2: item[2],
                        SMN1: item[2].split("|")[0],
                        SMN2: item[2].split("|")[1],
                      };
                    });
                    console.log("outputArr", outputArr);
                    this.outputArr1 = outputArr;
                  } else {
                    // 生成画图文件路径
                    const outputFigureFile =
                      inputFileNameWithOutSuffix +
                      "." +
                      outputFormat +
                      ".figure.tsv";
                    const figureFile = path.join(
                      inputFile,
                      generateDataFolder,
                      outputFigureFile
                    );
                    this.outputDirectry = outputDirectry;
                    var xlsx = window.require("node-xlsx");
                    // 解析画图文件
                    const parsedData1 = xlsx.parse(figureFile);
                    var parsedSheetData1 = parsedData1[0].data;
                    // iconv.skipDecodeWarning = true;
                    var parsedLineData1 = [];
                    for (var j = 1; j < parsedSheetData1.length; j++) {
                      parsedLineData1.push(parsedSheetData1[j]);
                    }
                    const outputFigureArr = parsedLineData1.map(function (
                      item
                    ) {
                      return {
                        fileName: item[0],
                        SMN1: item[1],
                        SMN2: item[2],
                        S06: item[3],
                        S04: item[4],
                        S07: item[5],
                        S01: item[6],
                        S05: item[7],
                        S08: item[8],
                        S02: item[9],
                        S03: item[10],
                        WARN: item[11],
                      };
                    });
                    this.outputFigureArr1 = outputFigureArr;
                  }
                }
              }
            }
          );
        }
      }
    },
    // 处理样本信息数据文件并生成报告
    httpRequest1(data1) {
      console.log("样本数据处理开始")
      var loading = ElLoading.service({
        lock: true,
        text: "上传处理中",
        background: "rgba(0, 0, 0, 0.7)",
      });
      var file = data1.file;
      console.log("样本信息输入文件", file);
      var path = require("path");
      var log = window.require("electron-log");
      log.transports.console.level = "silly";
      var app = window.require("@electron/remote").app;
      var logFilepath = path.join(app.getPath("temp"));
      console.log(logFilepath);
      var logFilename = "SMNFilerVue.log";
      log.transports.file.resolvePath = () =>
        path.join(logFilepath, logFilename);
      var xlsx = window.require("node-xlsx");
      var sampleFileNamePath = file.path.trim();
      console.log("样本数据文件路径",sampleFileNamePath);
      var sampleFileName = sampleFileNamePath.substring(
        sampleFileNamePath.lastIndexOf("\\") + 1
      );
      console.log("样本数据名", sampleFileName);
      var sampleFileNameCurrentPath = sampleFileNamePath.substring(
        0,
        sampleFileNamePath.lastIndexOf("\\") + 1
      );
      console.log("样本数据文件根路径", sampleFileNameCurrentPath);
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
      var htmlName = [];
      var pdfName = [];
      var newFolderName = [];
      var htmlPathAndName = [];
      var pdfPathAndName = [];
      var content = [];
      var content1 = [];
      var content2 = [];
      var number = [];
      var customerName = [];
      var sex = [];
      var clinicNumber = [];
      var hospitalNumber = [];
      var phone = [];
      var inspectionDepartment = [];
      var inspectionDoctor = [];
      var medicalHistory = [];
      var samplingDate = [];
      var inspectionDate = [];
      var reportDate = [];
      var inspectionEntity = [];
      var sampleType = [];
      var inspector = [];
      var checker = [];
      var smn1 = [];
      var smn2 = [];
      var conclude = [];
      // var docx = [];
      // var header1 = [];
      // var header2=  [];
      // var footer2= [];

      for (var j = 0; j < sampleSheetsData.length; j++) {
        sampleLineData.push(sampleSheetsData[j]);
        console.log("sampleLineData", sampleLineData);
      }
      console.log("sampleLineData1", sampleLineData);
      for (var n = 1; n < sampleLineData.length; n++) {
        for (var m = 0; m < sampleLineData[0].length; m++) {
          if (sampleLineData[0][m] == "序号") {
            number.push(sampleLineData[n][m]);
          } else if (sampleLineData[0][m] == "姓名") {
            customerName.push(sampleLineData[n][m]);
          } else if (sampleLineData[0][m] == "性别") {
            sex.push(sampleLineData[n][m]);
          } else if (sampleLineData[0][m] == "门诊号") {
            clinicNumber.push(sampleLineData[n][m]);
          } else if (sampleLineData[0][m] == "住院号") {
            hospitalNumber.push(sampleLineData[n][m]);
          } else if (sampleLineData[0][m] == "手机号") {
            phone.push(sampleLineData[n][m]);
          } else if (sampleLineData[0][m] == "送检科室") {
            inspectionDepartment.push(sampleLineData[n][m]);
          } else if (sampleLineData[0][m] == "送检医生") {
            inspectionDoctor.push(sampleLineData[n][m]);
          } else if (sampleLineData[0][m] == "简要病史") {
            medicalHistory.push(sampleLineData[n][m]);
          } else if (sampleLineData[0][m] == "采样日期") {
            samplingDate.push(this.formatDate2(sampleLineData[n][m]));
          } else if (sampleLineData[0][m] == "检验日期") {
            inspectionDate.push(this.formatDate2(sampleLineData[n][m]));
          } else if (sampleLineData[0][m] == "报告日期") {
            reportDate.push(this.formatDate2(sampleLineData[n][m]));
          } else if (sampleLineData[0][m] == "检验单位") {
            inspectionEntity.push(sampleLineData[n][m]);
          } else if (sampleLineData[0][m] == "样本类型") {
            sampleType.push(sampleLineData[n][m]);
          } else if (sampleLineData[0][m] == "检验者") {
            inspector.push(sampleLineData[n][m]);
          } else if (sampleLineData[0][m] == "审核者") {
            checker.push(sampleLineData[n][m]);
          } else if (sampleLineData[0][m] == "SMN1外显子7") {
            smn1.push(sampleLineData[n][m]);
          } else if (sampleLineData[0][m] == "SMN2外显子7") {
            smn2.push(sampleLineData[n][m]);
          } else if (sampleLineData[0][m] == "检验结论") {
            conclude.push(sampleLineData[n][m]);
          }
        }
      }
      const objArr = {
        number: number,
        customerName: customerName,
        sex: sex,
        clinicNumber: clinicNumber,
        hospitalNumber: hospitalNumber,
        phone: phone,
        inspectionDepartment: inspectionDepartment,
        inspectionDoctor: inspectionDoctor,
        medicalHistory: medicalHistory,
        samplingDate: samplingDate,
        inspectionDate: inspectionDate,
        reportDate: reportDate,
        inspectionEntity: inspectionEntity,
        sampleType: sampleType,
        inspector: inspector,
        checker: checker,
        smn1: smn1,
        smn2: smn2,
        conclude: conclude,
      };
      console.log("objArr", objArr);
      var objArr1 = objArr.customerName.map(function (name, index) {
        var leftSlash = "/";
        if (objArr.number[index] == " " || objArr.number[index] == undefined) {
          objArr.number[index] = leftSlash;
        }
        if (
          objArr.customerName[index] == " " ||
          objArr.customerName[index] == undefined
        ) {
          objArr.customerName[index] = leftSlash;
        }
        if (objArr.sex[index] == " " || objArr.sex[index] == undefined) {
          objArr.sex[index] = leftSlash;
        }
        if (
          objArr.clinicNumber[index] == " " ||
          objArr.clinicNumber[index] == undefined
        ) {
          objArr.clinicNumber[index] = leftSlash;
        }
        if (
          objArr.hospitalNumber[index] == " " ||
          objArr.hospitalNumber[index] == undefined
        ) {
          objArr.hospitalNumber[index] = leftSlash;
        }
        if (objArr.phone[index] == " " || objArr.phone[index] == undefined) {
          objArr.phone[index] = leftSlash;
        }
        if (
          objArr.inspectionDepartment[index] == " " ||
          objArr.inspectionDepartment[index] == undefined
        ) {
          objArr.inspectionDepartment[index] = leftSlash;
        }
        if (
          objArr.inspectionDoctor[index] == " " ||
          objArr.inspectionDoctor[index] == undefined
        ) {
          objArr.inspectionDoctor[index] = leftSlash;
        }
        if (
          objArr.medicalHistory[index] == " " ||
          objArr.medicalHistory[index] == undefined
        ) {
          objArr.medicalHistory[index] = leftSlash;
        }
        if (
          objArr.samplingDate[index] == " " ||
          objArr.samplingDate[index] == undefined
        ) {
          objArr.samplingDate[index] = leftSlash;
        }
        if (
          objArr.inspectionDate[index] == " " ||
          objArr.inspectionDate[index] == undefined
        ) {
          objArr.inspectionDate[index] = leftSlash;
        }
        if (
          objArr.reportDate[index] == " " ||
          objArr.reportDate[index] == undefined
        ) {
          objArr.reportDate[index] = leftSlash;
        }
        if (
          objArr.inspectionEntity[index] == " " ||
          objArr.inspectionEntity[index] == undefined ||
          objArr.inspectionEntity[index] == "/"
        ) {
          objArr.inspectionEntity[index] = " ";
        }
        if (
          objArr.sampleType[index] == " " ||
          objArr.sampleType[index] == undefined
        ) {
          objArr.sampleType[index] = leftSlash;
        }
        if (
          objArr.inspector[index] == " " ||
          objArr.inspector[index] == undefined
        ) {
          objArr.inspector[index] = leftSlash;
        }
        if (
          objArr.checker[index] == " " ||
          objArr.checker[index] == undefined
        ) {
          objArr.checker[index] = leftSlash;
        }
        if (
          objArr.conclude[index] == " " ||
          objArr.conclude[index] == undefined
        ) {
          objArr.conclude[index] = leftSlash;
        }
        if (objArr.smn1[index] == " " || objArr.smn1[index] == undefined) {
          objArr.smn1[index] = leftSlash;
        }
        if (objArr.smn2[index] == " " || objArr.smn2[index] == undefined) {
          objArr.smn2[index] = leftSlash;
        }
        return {
          name: name,
          number: objArr.number[index],
          sex: objArr.sex[index],
          clinicNumber: objArr.clinicNumber[index],
          hospitalNumber: objArr.hospitalNumber[index],
          phone: objArr.phone[index],
          inspectionDepartment: objArr.inspectionDepartment[index],
          inspectionDoctor: objArr.inspectionDoctor[index],
          medicalHistory: objArr.medicalHistory[index],
          samplingDate: objArr.samplingDate[index],
          inspectionDate: objArr.inspectionDate[index],
          reportDate: objArr.reportDate[index],
          inspectionEntity: objArr.inspectionEntity[index],
          sampleType: objArr.sampleType[index],
          inspector: objArr.inspector[index],
          checker: objArr.checker[index],
          smn1: objArr.smn1[index],
          smn2: objArr.smn2[index],
          conclude: objArr.conclude[index],
        };
      });
      console.log("样本信息表数据", objArr1);
      if (objArr1.length == 0) {
        var nullNotice =
          "样本信息表中数据暂无数据,请重新上传有数据的样本信息表!";
        this.showErrorNotification(nullNotice)
        log.error("\n" + nullNotice);
        this.errorNotification(
          sampleFileName,
          "当前处理输入文件：" +
            sampleFileName +
            "有误！" +
            "\n" +
            "样本信息表数据为空，请记得添加样本信息数据！"
        );
        loading.close();
      } else {
        this.tableData = objArr1;
        if (data1.data.fileType == "summaryFileAndReportFile") {
          console.log("当前输出文件为结果文件以及报告文件");
          var outputFile = this.outputArr1;
          var outputDirectry = this.outputDirectry;
          console.log("outputDirectry", outputDirectry);
          this.adjustTableHeight();
          this.lastOutput = [];
          for (var k = 0; k < outputFile.length; k++) {
            this.lastOutput.push({
              number: outputFile[k].number,
              removeSuffixNumber: outputFile[k].removeSuffixNumber,
              SMN1andSMN2: outputFile[k].SMN1andSMN2,
              SMN1: outputFile[k].SMN1,
              SMN2: outputFile[k].SMN2,
            });
          }
          var lastOutput1 = this.lastOutput;
          var that = this;
          objArr1.forEach(function (item, index) {
            lastOutput1.forEach(function (item, index1) {
              if (objArr1[index].number == lastOutput1[index1].number) {
                htmlName[index] =
                  objArr1[index].name +
                  "_" +
                  objArr1[index].inspectionEntity +
                  ".html";
                pdfName[index] =
                  objArr1[index].name +
                  "_" +
                  objArr1[index].inspectionEntity +
                  ".pdf";
                newFolderName[index] = outputDirectry;
                htmlPathAndName[index] = path.join(
                  newFolderName[index],
                  htmlName[index]
                );
                pdfPathAndName[index] = path.join(
                  newFolderName[index],
                  pdfName[index]
                );
                if (objArr1[index].smn1 >= 2) {
                  var reportResult = "未检出目标基因拷贝数异常";
                  var recommend = "无";
                } else if (objArr1[index].smn1 == 1) {
                  reportResult = "SMN1基因外显子7杂合型缺失";
                  recommend = "遗传咨询";
                } else if (objArr1[index].smn1 == 0) {
                  reportResult = "SMN1基因外显子7纯合型缺失";
                  recommend = "遗传咨询";
                }
                var pictureHtml = "";
                var pagingTable = "";
                var pagingEnd = "";
                var pictureScript = "";
                var echartsPath = "";
                if (data1.data.fontStatus == 1) {
                  var changeFont = path.join(
                    process.cwd(),
                    "/resources/MiSans-Normal.ttf"
                  );
                  var changeFont1 = changeFont.replace(/\\/g, "/");
                  var changeFont2 = "url(" + changeFont1 + ")";
                  var currentFont = `@font-face{
                                  font-family:"MiSans-Normal";
                                  src:${changeFont2};
                                  font-display:swap;
                              }`;
                  var lineSpacing = `line-height:23px`;
                  var beforeStage = `text-indent:-12.85pt`;
                  var fontSetting = 'font-family:"MiSans-Normal"';
                } else {
                  var defaultFont = path.join(
                    process.cwd(),
                    "/resources/simsun.ttc"
                  );
                  var defaultFont1 = defaultFont.replace(/\\/g, "/");
                  var defaultFont2 = "url(" + defaultFont1 + ")";
                  currentFont = `@font-face{
                                      font-family:"simsun";
                                      src:${defaultFont2};
                                      font-display:swap;
                                  }`;
                  lineSpacing = `line-height:24px`;
                  beforeStage = `text-indent:-16.85pt`;
                  fontSetting = 'font-family:"simsun"';
                }
                // 添加 svg 方框图片替换 input 输入框
                var correctBox = `<svg t="1654332410780" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2963" width="16" height="16" style="vertical-align: middle;">
                                  <path d="M832 128H192a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64z m-93.71 270.86L466.76 670.4a32 32 0 0 1-45.26 0L285.71 534.6A32 32 0 0 1 331 489.33L444.14 602.5 693 353.61a32 32 0 0 1 45.26 45.25z" p-id="2964" ></path>
                         </svg>`;
                var blankBox = `<svg t="1654332611254" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3878" width="16" height="16" style="vertical-align: middle;">
                             <path d="M774 200c27.6 0 50 22.4 50 50v524c0 27.6-22.4 50-50 50H250c-27.6 0-50-22.4-50-50V250c0-27.6 22.4-50 50-50h524m0-72H250c-16.4 0-32.4 3.2-47.5 9.6-14.5 6.1-27.6 14.9-38.8 26.1-11.2 11.2-20 24.2-26.1 38.8-6.4 15.1-9.6 31.1-9.6 47.5v524c0 16.4 3.2 32.4 9.6 47.5 6.1 14.5 14.9 27.6 26.1 38.8 11.2 11.2 24.2 20 38.8 26.1 15.1 6.4 31.1 9.6 47.5 9.6h524c16.4 0 32.4-3.2 47.5-9.6 14.5-6.1 27.6-14.9 38.8-26.1 11.2-11.2 20-24.2 26.1-38.8 6.4-15.1 9.6-31.1 9.6-47.5V250c0-16.4-3.2-32.4-9.6-47.5-6.1-14.5-14.9-27.6-26.1-38.8-11.2-11.2-24.2-20-38.8-26.1-15.1-6.4-31.1-9.6-47.5-9.6z" p-id="3879"></path>
                         </svg>`;
                if (reportResult == "未检出目标基因拷贝数异常") {
                  var defaultBox1 = correctBox;
                  var defaultBox2 = blankBox;
                  var defaultBox3 = blankBox;
                  var defaultBox4 = `font-weight:bold`;
                } else if (reportResult == "SMN1基因外显子7杂合型缺失") {
                  defaultBox1 = blankBox;
                  defaultBox2 = correctBox;
                  defaultBox3 = blankBox;
                  var defaultBox5 = `font-weight:bold`;
                } else {
                  defaultBox1 = blankBox;
                  defaultBox2 = blankBox;
                  defaultBox3 = correctBox;
                  var defaultBox6 = `font-weight:bold`;
                }
                content[index] = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>G030Report</title>
          <!-- 引入 echarts.js -->
          <script src='${echartsPath}'><\/script>
          <style>
              /* Style Definitions */
              p.MsoNormal,
              li.MsoNormal,
              div.MsoNormal {
                  margin: 0cm;
                  text-align: justify;
                  text-justify: inter-ideograph;
                  font-size: 10.5pt;
                  /* font-family: Simsun; */
              }

              p.MsoListParagraph,
              li.MsoListParagraph,
              div.MsoListParagraph {
                  margin: 0cm;
                  text-align: justify;
                  text-justify: inter-ideograph;
                  /*text-indent: 21.0pt;*/
                  font-size: 10.5pt;
                  /* font-family: Simsun; */
              }

              .MsoChpDefault {
                  /* font-family: Simsun; */
              }

              td {
                  height: 40px;
              }

              /* Page Definitions */
              @page WordSection1 {
                  size: 595.3pt 841.9pt;
                  margin: 42.45pt 90.0pt 49.525pt 90.0pt;
                  layout-grid: 15.6pt;
              }
              ${currentFont}
              body{
                  ${fontSetting}
              }
              div.WordSection1 {
                  page: WordSection1;
              }

              /* List Definitions */
              ol {
                  margin-bottom: 0cm;
              }

              ul {
                  margin-bottom: 0cm;
              }

              .checkbox:checked::after {
                  background: #000;
              }
              .page-header,
              .page-header-space {
                  height: 20px;
                  font-size: 8.5px;
              }

              .page-footer,
              .page-footer-space {
                  height: auto;
                  text-align: center;
                  font-size: 8.5px;
              }

              .page-footer {
                  position: fixed;
                  bottom: 0mm;
                  /* width: 100%; */
                  /* border-top: 1px solid black; */
                  /* for demo */
                  /* background: yellow; */
                  /* for demo */
              }

              .page-header {
                  position: fixed;
                  top: 0mm;
                  width: 100%;
                  /*  border-bottom: 1px solid black;  for demo */
                  /* background: yellow; */
                  /* for demo */
              }

              /* 文字阴影宋体打印加粗解决方案 */
              .fontBolder {
                  text-shadow: 0.15pt 0px 0px black, 0.25pt 0px 0px black, 0.35pt 0px 0px black, -0.25pt 0px 0px black, 0px 0.25pt 0px black, 0px -0.25pt 0px black;
              }

              @media print {
                  body {
                      margin: 0;
                  }
              }
              #mainContent{
                  border: 1px solid windowtext;
              }
              /* table tr td{ border-top:1px solid windowtext; } table{ border:1px solid windowtext; border-top-width:0px; }  */
              /* table{ border-collapse:collapse; } table tr{ border:1px solid windowtext; }  */
          </style>
      </head>
      <body lang=ZH-CN style='word-wrap:break-word;text-justify-trim:punctuation;text-align: center;'>

          <div class=WordSection1 style='layout-grid:15.6pt;margin-top: 30px;'>
              <table cellspacing=0 cellpadding=0 width=556
                  style='width:416.7pt;border-collapse:collapse;border:none;margin: auto;text-align: center'>
                  <tr>
                      <td class="page-header" style="text-align: left;width: 416.7pt;border-bottom: solid windowtext 1pt;">
                          ${objArr1[index].inspectionEntity}
                          <!-- <hr style="width:416.7pt"> -->
                      </td>

                  </tr>
              </table>
              <table cellspacing=0 cellpadding=0 width=556
                  style='width:416.7pt;border-collapse:collapse;margin: auto;text-align: center'>
                  <tr>
                      <td class="page-footer" style="width:416.7pt;text-align: right">
                          检验结果仅对送检样本负责
                      </td>
                  </tr>

              </table>
              <p class=MsoNormal align=center style='text-align:center;layout-grid-mode:char;margin: 35px 0 35px 0'><b><span
                          lang=utf-8 style='font-size:14.0pt;'>运动神经元存活基因拷贝数检验报告单</b></p>

              <table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0 width=556 id="mainContent"
                  style='width:416.7pt;margin: auto;border-collapse:collapse;'>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>门诊号</b></p>
                      </td>
                      <td width=183 colspan=7 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].clinicNumber}</span>
                          </p>
                      </td>
                      <td width=73  colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'><b>住院号</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].hospitalNumber}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal style='text-align:center'><b>姓名</b></p>
                      </td>
                      <td width=113 colspan=3 style='width:85.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=left style="text-align: left;">
                              <span>
                                  ${objArr1[index].name}
                              </span>
                          </p>
                      </td>
                      <td width=76 style='width:2.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=center style='text-align:center'><b>性别</b></p>
                      </td>
                      <td width=113  colspan=3 style='width:3.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=left style='text-align:left'><span>${objArr1[index].sex}</span></p>
                      </td>
                      <td width=73 colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=center style='text-align:center'><b>手机号</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=left style='text-align:left'><span>${objArr1[index].phone}</span></p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>送检科室</b></p>
                      </td>
                      <td width=339 colspan=7 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].inspectionDepartment}</span>
                          </p>
                      </td>
                      <td width=73  colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;white-space: nowrap;'><b>送检医生</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].inspectionDoctor}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>样本类型</b></p>
                      </td>
                      <td width=183 colspan=7 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].sampleType}</span>
                          </p>
                      </td>
                      <td width=73  colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;white-space: nowrap;'><b>采样日期</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].samplingDate}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>简要病史</b></p>
                      </td>
                      <td width=339 colspan=12 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].medicalHistory}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验方法</b></p>
                      </td>
                      <td width=339 colspan=12 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:center'>
                              <span >荧光&thinsp;PCR-毛细管电泳法</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>目标基因</b></p>
                      </td>
                      <td width=339 colspan=6 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:center'>
                              <span><i>SMN1</i>&thinsp;外显子&thinsp;7</span>
                          </p>
                      </td>
                      <td width=73  colspan=6 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'>
                              <span><i>SMN2</i>&thinsp;外显子&thinsp;7</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验结果</b></p>
                      </td>
                      <td width=339 colspan=6 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:center'>
                              <span>${objArr1[index].smn1}</span>
                          </p>
                      </td>
                      <td width=73  colspan=6 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'>
                              <span>${objArr1[index].smn2}</span>
                          </p>
                      </td>
                  </tr>
                  ${pictureHtml}
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验结论</b></p>
                      </td>
                      <td width=183 colspan=12 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              ${defaultBox1}
                          <span style="vertical-align: middle;${defaultBox4}" >未检出目标基因拷贝数异常</span>
                          </p>
                          <p class=MsoNormal align=left style='text-align:left'>
                              ${defaultBox2}
                          <span style="vertical-align: middle;${defaultBox5}" ><i>SMN1&thinsp;</i>基因外显子&thinsp;7&thinsp;杂合型缺失</span>
                          </p>
                          <p class=MsoNormal align=left style='text-align:left'>
                              ${defaultBox3}
                          <span style="vertical-align: middle;${defaultBox6}" ><i>SMN1&thinsp;</i>基因外显子&thinsp;7&thinsp;纯合型缺失</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=73  style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'><b>建议</b></p>
                      </td>
                      <td width=110 colspan=12 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'>
                              <span>${recommend}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=556 colspan=13 style='width:416.7pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class='MsoNormal' align=center style='text-align:center'><span><b>结果解释</b></span></p>
                      </td>
                  </tr>
                  <tr>
                      <td width=556 colspan=13 valign=middle style='width:416.7pt;
        padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoListParagraph align=justify style='margin-left:23.25pt;${beforeStage};${lineSpacing};'>
                              1. 本次检验仅用于<i>&thinsp;SMN1&thinsp;</i>中最常见的外显子&thinsp;7&thinsp;缺失型携带者的检验，并未覆盖<i>&thinsp;SMN1&thinsp;</i>基因的罕见点突变检测。因此，当检测结果排除受检者为<i>&thinsp;SMN1&thinsp;</i>第&thinsp;7&thinsp;外显子缺失型携带者时，并不能排除受检者是否携带有<i>&thinsp;SMN1&thinsp;</i>基因的罕见点突变。
                          </p>
                          ${pagingTable}
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >2. 当检出<i>&thinsp;SMN1&thinsp;</i>第&thinsp;7&thinsp;外显子为&thinsp;2&thinsp;拷贝时，并不能直接判断&thinsp;2&thinsp;个拷贝的<i>&thinsp;SMN1&thinsp;</i>在染色体上的排布方式，即不能判断出是否为“&thinsp;2+0&thinsp;”携带者型。当怀疑待检样本存在“&thinsp;2+0&thinsp;”时，建议其配偶进行<i>&thinsp;SMN1&thinsp;</i>基因检测。</p>
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >3. 受检者进行过骨髓移植、细胞治疗或接受输血，可能会影响血样检测结果的准确性。</p>
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >4. 该方法检测<i>&thinsp;SMN1&thinsp;</i>基因第&thinsp;7&thinsp;外显子拷贝数时，将以受检者基因组中保守的管家基因为内参。内参基因罕见的突变可能会影响到检测结果的准确性。</p>
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >5. 检验<i>&thinsp;SMN2&thinsp;</i>基因拷贝数通常仅用于对患者临床预后的评估。正常人群中<i>&thinsp;SMN2&thinsp;</i>基因本身就存在拷贝数变异，可能为&thinsp;0、1、2&thinsp;或以上。</p>
                          ${pagingEnd}
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验日期</b></p>
                      </td>
                      <td width=339 colspan=9 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].inspectionDate}</span>
                          </p>
                      </td>
                      <td width=73  colspan=2 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;white-space: nowrap;'><b>报告日期</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                        <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].reportDate}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验者</b></p>
                      </td>
                      <td width=339 colspan=9 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].inspector}</span>
                          </p>
                      </td>
                      <td width=73  colspan=2 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'><b>审核者</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].checker}</span>
                          </p>
                      </td>
                  </tr>
              </table>
          </div>
      </body>
      ${pictureScript}
      </html>`;
                content1[index] = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>G030Report</title>
          <!-- 引入 echarts.js -->
          <script src='${echartsPath}'><\/script>
          <style>
              /* Style Definitions */
              p.MsoNormal,
              li.MsoNormal,
              div.MsoNormal {
                  margin: 0cm;
                  text-align: justify;
                  text-justify: inter-ideograph;
                  font-size: 10.5pt;
                  /* font-family: Simsun; */
              }

              p.MsoListParagraph,
              li.MsoListParagraph,
              div.MsoListParagraph {
                  margin: 0cm;
                  text-align: justify;
                  text-justify: inter-ideograph;
                  /*text-indent: 21.0pt;*/
                  font-size: 10.5pt;
                  /* font-family: Simsun; */
              }

              .MsoChpDefault {
                  /* font-family: Simsun; */
              }

              td {
                  height: 40px;
              }

              /* Page Definitions */
              @page WordSection1 {
                  size: 595.3pt 841.9pt;
                  margin: 42.45pt 90.0pt 49.525pt 90.0pt;
                  layout-grid: 15.6pt;
              }
              ${currentFont}
              body{
                  ${fontSetting}
              }
              div.WordSection1 {
                  page: WordSection1;
              }

              /* List Definitions */
              ol {
                  margin-bottom: 0cm;
              }

              ul {
                  margin-bottom: 0cm;
              }

              .checkbox:checked::after {
                  background: #000;
              }
              .page-header,
              .page-header-space {
                  height: 20px;
                  font-size: 8.5px;
              }

              .page-footer,
              .page-footer-space {
                  height: auto;
                  text-align: center;
                  font-size: 8.5px;
              }

              .page-footer {
                  position: fixed;
                  bottom: 0mm;
                  /* width: 100%; */
                  /* border-top: 1px solid black; */
                  /* for demo */
                  /* background: yellow; */
                  /* for demo */
              }

              .page-header {
                  position: fixed;
                  top: 0mm;
                  width: 100%;
                  /*  border-bottom: 1px solid black;  for demo */
                  /* background: yellow; */
                  /* for demo */
              }

              /* 文字阴影宋体打印加粗解决方案 */
              .fontBolder {
                  text-shadow: 0.15pt 0px 0px black, 0.25pt 0px 0px black, 0.35pt 0px 0px black, -0.25pt 0px 0px black, 0px 0.25pt 0px black, 0px -0.25pt 0px black;
              }

              @media print {
                  body {
                      margin: 0;
                  }
              }
              #mainContent{
                  border: 1px solid windowtext;
              }
              /* table tr td{ border-top:1px solid windowtext; } table{ border:1px solid windowtext; border-top-width:0px; }  */
              /* table{ border-collapse:collapse; } table tr{ border:1px solid windowtext; }  */
          </style>
      </head>
      <body lang=ZH-CN style='word-wrap:break-word;text-justify-trim:punctuation;text-align: center;'>

          <div class=WordSection1 style='layout-grid:15.6pt;margin-top: 30px;'>
              <table cellspacing=0 cellpadding=0 width=556
                  style='width:416.7pt;border-collapse:collapse;border:none;margin: auto;text-align: center'>
                  <tr>
                      <td class="page-header" style="text-align: left;width: 416.7pt;border-bottom: solid windowtext 1pt;">
                          ${objArr1[index].inspectionEntity}
                          <!-- <hr style="width:416.7pt"> -->
                      </td>

                  </tr>
              </table>
              <table cellspacing=0 cellpadding=0 width=556
                  style='width:416.7pt;border-collapse:collapse;margin: auto;text-align: center'>
                  <tr>
                      <td class="page-footer" style="width:416.7pt;text-align: right">
                          检验结果仅对送检样本负责
                      </td>
                  </tr>

              </table>
              <p class=MsoNormal align=center style='text-align:center;layout-grid-mode:char;margin: 35px 0 35px 0'><b><span
                          lang=utf-8 style='font-size:14.0pt;'>运动神经元存活基因拷贝数检验报告单</b></p>

              <table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0 width=556 id="mainContent"
                  style='width:416.7pt;margin: auto;border-collapse:collapse;'>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>门诊号</b></p>
                      </td>
                      <td width=183 colspan=7 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].clinicNumber}</span>
                          </p>
                      </td>
                      <td width=73  colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'><b>住院号</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].hospitalNumber}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal style='text-align:center'><b>姓名</b></p>
                      </td>
                      <td width=113 colspan=3 style='width:85.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=left style="text-align: left;">
                              <span>
                                  ${objArr1[index].name}
                              </span>
                          </p>
                      </td>
                      <td width=76 style='width:2.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=center style='text-align:center'><b>性别</b></p>
                      </td>
                      <td width=113  colspan=3 style='width:3.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=left style='text-align:left'><span>${objArr1[index].sex}</span></p>
                      </td>
                      <td width=73 colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=center style='text-align:center'><b>手机号</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=left style='text-align:left'><span>${objArr1[index].phone}</span></p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>送检科室</b></p>
                      </td>
                      <td width=339 colspan=7 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].inspectionDepartment}</span>
                          </p>
                      </td>
                      <td width=73  colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;white-space: nowrap;'><b>送检医生</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].inspectionDoctor}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>样本类型</b></p>
                      </td>
                      <td width=183 colspan=7 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].sampleType}</span>
                          </p>
                      </td>
                      <td width=73  colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;white-space: nowrap;'><b>采样日期</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].samplingDate}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>简要病史</b></p>
                      </td>
                      <td width=339 colspan=12 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].medicalHistory}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验方法</b></p>
                      </td>
                      <td width=339 colspan=12 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:center'>
                              <span >荧光&thinsp;PCR-毛细管电泳法</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>目标基因</b></p>
                      </td>
                      <td width=339 colspan=6 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:center'>
                              <span><i>SMN1</i>&thinsp;外显子&thinsp;7</span>
                          </p>
                      </td>
                      <td width=73  colspan=6 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'>
                              <span><i>SMN2</i>&thinsp;外显子&thinsp;7</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验结果</b></p>
                      </td>
                      <td width=339 colspan=6 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:center'>
                              <span>${objArr1[index].smn1}</span>
                          </p>
                      </td>
                      <td width=73  colspan=6 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'>
                              <span>${objArr1[index].smn2}</span>
                          </p>
                      </td>
                  </tr>
                  ${pictureHtml}
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验结论</b></p>
                      </td>
                      <td width=183 colspan=12 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              ${defaultBox1}
                          <span style="vertical-align: middle;${defaultBox4}" >未检出目标基因拷贝数异常</span>
                          </p>
                          <p class=MsoNormal align=left style='text-align:left'>
                              ${defaultBox2}
                          <span style="vertical-align: middle;${defaultBox5}" ><i>SMN1&thinsp;</i>基因外显子&thinsp;7&thinsp;杂合型缺失</span>
                          </p>
                          <p class=MsoNormal align=left style='text-align:left'>
                              ${defaultBox3}
                          <span style="vertical-align: middle;${defaultBox6}" ><i>SMN1&thinsp;</i>基因外显子&thinsp;7&thinsp;纯合型缺失</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=73  style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'><b>建议</b></p>
                      </td>
                      <td width=110 colspan=12 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'>
                              <span>${recommend}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=556 colspan=13 style='width:416.7pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class='MsoNormal' align=center style='text-align:center'><span><b>结果解释</b></span></p>
                      </td>
                  </tr>
                  <tr>
                      <td width=556 colspan=13 valign=middle style='width:416.7pt;
        padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoListParagraph align=justify style='margin-left:23.25pt;${beforeStage};${lineSpacing};'>
                              1. 本次检验仅用于<i>&thinsp;SMN1&thinsp;</i>中最常见的外显子&thinsp;7&thinsp;缺失型携带者的检验，并未覆盖<i>&thinsp;SMN1&thinsp;</i>基因的罕见点突变检测。因此，当检测结果排除受检者为<i>&thinsp;SMN1&thinsp;</i>第&thinsp;7&thinsp;外显子缺失型携带者时，并不能排除受检者是否携带有<i>&thinsp;SMN1&thinsp;</i>基因的罕见点突变。
                          </p>
                          ${pagingTable}
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >2. 当检出<i>&thinsp;SMN1&thinsp;</i>第&thinsp;7&thinsp;外显子为&thinsp;2&thinsp;拷贝时，并不能直接判断&thinsp;2&thinsp;个拷贝的<i>&thinsp;SMN1&thinsp;</i>在染色体上的排布方式，即不能判断出是否为“&thinsp;2+0&thinsp;”携带者型。当怀疑待检样本存在“&thinsp;2+0&thinsp;”时，建议其配偶进行<i>&thinsp;SMN1&thinsp;</i>基因检测。</p>
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >3. 受检者进行过骨髓移植、细胞治疗或接受输血，可能会影响血样检测结果的准确性。</p>
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >4. 该方法检测<i>&thinsp;SMN1&thinsp;</i>基因第&thinsp;7&thinsp;外显子拷贝数时，将以受检者基因组中保守的管家基因为内参。内参基因罕见的突变可能会影响到检测结果的准确性。</p>
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >5. 检验<i>&thinsp;SMN2&thinsp;</i>基因拷贝数通常仅用于对患者临床预后的评估。正常人群中<i>&thinsp;SMN2&thinsp;</i>基因本身就存在拷贝数变异，可能为&thinsp;0、1、2&thinsp;或以上。</p>
                          ${pagingEnd}
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验日期</b></p>
                      </td>
                      <td width=339 colspan=9 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].inspectionDate}</span>
                          </p>
                      </td>
                      <td width=73  colspan=2 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;white-space: nowrap;'><b>报告日期</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                        <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].reportDate}</span>
                          </p>
                      </td>
                  </tr>
              </table>
          </div>
      </body>
      ${pictureScript}
      </html>`;

                content2[index] =
                  data1.data.selectReport == "default"
                    ? content[index]
                    : content1[index];
                var fs = window.require("fs");
                fs.writeFile(
                  htmlPathAndName[index],
                  content2[index],
                  function (err) {
                    if (err) {
                      var notice = "输入文件 " + sampleFileName + " 处理有误";
                      if (index == htmlPathAndName.length - 1) {
                        that.showErrorNotification(notice);
                      }
                      log.error(
                        "\n" +
                          "当前处理文件名为：" +
                          sampleFileName +
                          "\n错误提示：\n" +
                          err
                      );
                      throw err;
                    }
                    var notice = "输入文件 " + sampleFileName + " 处理完成";
                    console.log("File is created successfully.");
                    setTimeout(() => {
                      if (index == htmlPathAndName.length - 1) {
                        console.log("that2", that);
                        that.showSuccessNotification(notice);
                      }
                    }, 1000);
                    log.info(
                      "\n" +
                        "当前处理文件名为：" +
                        sampleFileName +
                        "\n" +
                        "成功生成HTML文件：" +
                        htmlName[index]
                    );
                  }
                );
                var window_to_PDF1 = [];

                // Html File change to PDF File method
                function afterWrite() {
                  console.log("进入生成报告文件方法");
                  var { BrowserWindow } = window.require("@electron/remote");
                  window_to_PDF1[index] = new BrowserWindow({ show: false }); //to just open the browser in background
                  window_to_PDF1[index].loadURL(
                    `file://${htmlPathAndName[index].replace(/\\/g, "/")}`
                  ); //give the file link you want to display
                  window_to_PDF1[index].webContents.on(
                    "did-finish-load",
                    function () {
                      window_to_PDF1[index].webContents
                        .printToPDF({})
                        .then((data) => {
                          fs.writeFile(pdfPathAndName[index], data, (error) => {
                            if (error) {
                              loading.close();
                              throw error;
                            }
                            var pdfnotice =
                              `Wrote ` +
                              pdfPathAndName.length +
                              ` PDF successfully`;
                            if (index == pdfPathAndName.length - 1) {
                              setTimeout(() => {
                                if (
                                  sampleFileNamePath.indexOf("#") != -1 ||
                                  sampleFileNamePath.indexOf("&") != -1 ||
                                  sampleFileNamePath.indexOf("+") != -1 ||
                                  sampleFileNamePath.indexOf("=") != -1 ||
                                  sampleFileNamePath.indexOf("?") != -1 ||
                                  sampleFileNamePath.indexOf(" ") != -1
                                ) {
                                  var warningNotice =
                                    "检测到您上传的文件或路径中存在特殊字符串或空格！请及时修改！否者会导致无法生成PDF报告的图片信息！";
                                  that.showWarningNotification(warningNotice);
                                }
                              }, 1000);
                              console.log("that", that);
                              that.showSuccessNotification(pdfnotice);
                            }
                            log.info(
                              "\n" +
                                "当前处理文件名为：" +
                                htmlName[index] +
                                "\n" +
                                "成功生成PDF文件：" +
                                pdfName[index]
                            );
                            if (data1.data.htmlStatus == 0) {
                              fs.unlink(htmlPathAndName[index], function (err) {
                                if (err) {
                                  console.log(
                                    "An error ocurred updating the file" +
                                      err.message
                                  );
                                  return;
                                }
                                if (index == pdfPathAndName.length - 1) {
                                  loading.close();
                                  console.log("HTML File successfully deleted");
                                }
                              });
                            }
                            window_to_PDF1[index].close();
                          });
                        })
                        .catch((error) => {
                          if (index == pdfPathAndName.length - 1) {
                            that.showErrorNotification(error);
                          }
                          log.error(
                            `Failed to write PDF ${pdfPathAndName[index]}`,
                            error
                          );
                        });
                    }
                  );
                }
                setTimeout(afterWrite, 1000);
              }
            });
          });
        } else if (data1.data.fileType == "summaryFileAndReportPictureFile") {
          this.adjustTableHeight();
          console.log("当前输出文件为结果文件和含图片的报告文件");
          var figureFile = this.outputFigureArr1;
          var outputDirectry = this.outputDirectry;
          console.log("outputDirectry", outputDirectry);
          this.figureFile1 = [];
          for (var k = 0; k < figureFile.length; k++) {
            this.figureFile1.push({
              fileName: figureFile[k].fileName,
              SMN1: figureFile[k].SMN1,
              SMN2: figureFile[k].SMN2,
              S06: figureFile[k].S06,
              S04: figureFile[k].S04,
              S07: figureFile[k].S07,
              S01: figureFile[k].S01,
              S05: figureFile[k].S05,
              S08: figureFile[k].S08,
              S02: figureFile[k].S02,
              S03: figureFile[k].S03,
              WARN: figureFile[k].WARN,
            });
          }
          var figureFile2 = this.figureFile1;
          objArr1.forEach(function (item, index) {
            figureFile2.forEach(function (item, index1) {
              if (objArr1[index].number == figureFile2[index1].fileName) {
                htmlName[index] =
                  objArr1[index].name +
                  "_" +
                  objArr1[index].inspectionEntity +
                  ".html";
                pdfName[index] =
                  objArr1[index].name +
                  "_" +
                  objArr1[index].inspectionEntity +
                  ".pdf";
                newFolderName[index] = outputDirectry;
                htmlPathAndName[index] = path.join(
                  newFolderName[index],
                  htmlName[index]
                );
                pdfPathAndName[index] = path.join(
                  newFolderName[index],
                  pdfName[index]
                );
                if (objArr1[index].smn1 >= 2) {
                  var reportResult = "未检出目标基因拷贝数异常";
                  var recommend = "无";
                } else if (objArr1[index].smn1 == 1) {
                  reportResult = "SMN1基因外显子7杂合型缺失";
                  recommend = "遗传咨询";
                } else if (objArr1[index].smn1 == 0) {
                  reportResult = "SMN1基因外显子7纯合型缺失";
                  recommend = "遗传咨询";
                }
                var echartsPath = path.join(
                  process.cwd(),
                  "/resources/echarts.js"
                );
                console.log("echartsPath", echartsPath);
                var pictureHtml = `<tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验结果图谱</b></p>
                      </td>
                      <td width=339 colspan=12 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                        <div id="main" style="height: 306px; width: 460px"></div>
                      </td>
                  </tr>`;
                var pagingTable = ` </td>
                  </tr>
              </table>
              <table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0 width=556
                                                       style='width:416.7pt;border-collapse:collapse;border:none;margin: auto;'>
                  <tr>
                      <td width=556 colspan=13 valign=middle style='width:416.7pt;border:solid windowtext 1.0pt;border:none;padding:0cm 5.4pt 0cm 0pt'>
                                                               <span style='font-size:10.5pt'>
                                                                  <br clear=all style='page-break-before:always'>
                                                               </span>
                                                           </td>
                  </tr>
              </table>
              <table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0 width=556 id="mainContent"
              style='width:416.7pt;margin: auto;border-collapse:collapse;margin-top:40px;'>
                  <tr>
                      <td width=556 colspan=13 valign=middle style='width:416.7pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>`;
                var pagingEnd = `</td>`;
                var pictureScript = `<script type="text/javascript">
            /* 基于准备好的dom，初始化echarts实例*/
            var lastData = ${figureFile2[index1].WARN};
            if (lastData == false) {
              var mainContent = document.getElementById("main");
              var myChart = echarts.init(mainContent);
              var SMN1 = "${figureFile2[index1].SMN1}";
              var SMN2 = "${figureFile2[index1].SMN2}";
              var S01 = "${figureFile2[index1].S01}";
              var S02 = "${figureFile2[index1].S02}";
              var S03 = "${figureFile2[index1].S03}";
              var S04 = "${figureFile2[index1].S04}";
              var S05 = "${figureFile2[index1].S05}";
              var S06 = "${figureFile2[index1].S06}";
              var S07 = "${figureFile2[index1].S07}";
              var S08 = "${figureFile2[index1].S08}";
              if (S01 == "1 2") {
                var marker1Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker1Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S01 == "1") {
                var marker1Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker1Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S01 == "2") {
                var marker1Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker1Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              }
              if (S02 == "1 2") {
                var marker2Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker2Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S02 == "1") {
                var marker2Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker2Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S02 == "2") {
                var marker2Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker2Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              }
              if (S03 == "1 2") {
                var marker3Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker3Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S03 == "1") {
                var marker3Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker3Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S03 == "2") {
                var marker3Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker3Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              }
              if (S04 == "1 2") {
                var marker4Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker4Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
                var marker4Value3 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFC0CB", /*粉色*/
                  },
                };
              } else if (S04 == "1") {
                var marker4Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker4Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
                var marker4Value3 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFC0CB", /*粉色*/
                  },
                };
              } else if (S04 == "2") {
                var marker4Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker4Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
                var marker4Value3 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFC0CB", /*粉色*/
                  },
                };
              } else if (S04 == "2 3") {
                var marker4Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker4Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
                var marker4Value3 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFC0CB", /*粉色*/
                  },
                };
              } else if (S04 == "1 3") {
                var marker4Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker4Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
                var marker4Value3 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFC0CB", /*粉色*/
                  },
                };
              } else if (S04 == "3") {
                var marker4Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker4Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
                var marker4Value3 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFC0CB", /*粉色*/
                  },
                };
              }
              if (S05 == "1 2") {
                var marker5Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker5Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S05 == "1") {
                var marker5Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker5Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S05 == "2") {
                var marker5Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker5Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              }
              if (S06 == "1 2") {
                var marker6Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker6Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S06 == "1") {
                var marker6Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker6Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S06 == "2") {
                var marker6Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*黄色*/
                  },
                };
                var marker6Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              }
              if (S07 == "1 2") {
                var marker7Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker7Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S07 == "1") {
                var marker7Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker7Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S07 == "2") {
                var marker7Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker7Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              }
              if (S08 == "11 13") {
                var marker8Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker8Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S08 == "11") {
                var marker8Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker8Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S08 == "13") {
                var marker8Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker8Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else {
                var marker8Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#00FFFF", /*青色*/
                  },
                };
                var marker8Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#00FFFF", /*青色*/
                  },
                };
              }
              if (SMN1 > 1) {
                var SMN1Value1 = {
                  value: SMN1,
                  itemStyle: {
                    color: "#9955FF", /*淡紫色*/
                  },
                };
                var SMN1Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FF8888", /*淡红色*/
                  },
                };
              } else {
                var SMN1Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#9955FF", /*淡紫色*/
                  },
                };
                var SMN1Value2 = {
                  value: SMN1,
                  itemStyle: {
                    color: "#FF8888", /*淡红色*/
                  },
                };
              }
              if (SMN2 >= 0) {
                var SMN2Value1 = {
                  value: SMN2,
                  itemStyle: {
                    color: "#9955FF", //淡紫色
                  },
                };
                var SMN2Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FF8888", //淡红色
                  },
                };
              }
              var option1 = {
                color: ["#9955FF", "#FF8888","#000088", "#FFFF00", "#FFC0CB" ],
                title: {
                  text: "",
                },
                animation : false,
                aria: {
                  enabled: true,
                  decal: {
                    show: true,
                  },
                },
                tooltip: {
                  trigger: "axis",
                  axisPointer: {
                    type: "shadow",
                    label: {},
                  },
                },
                grid:{top:"24%"},
                legend: {
                  data: [

                    {
                      name: "SMN1>1,SMN2>=0",
                      icon: "rect",

                    },
                    {
                      name: "SMN1<=1",
                      icon: "rect",

                    },
                    {
                      name: "等位基因1",
                      icon: "rect",

                    },
                    {
                      name: "等位基因2",
                      icon: "rect",

                    },
                    {
                      name: "等位基因3",
                      icon: "rect",

                    },
                  ],
                },
                xAxis: {
                  data: [
                    "SMN1",
                    "SMN2",
                    "S06",
                    "S04",
                    "S07",
                    "S01",
                    "S05",
                    "S08",
                    "S02",
                    "S03",
                  ],
                  axisLabel: { interval: 0 },
                },
                yAxis: [
                  {
                    type: "value",
                    name: "拷贝数",
                    position: "left",
                    alignTicks: true,
                    axisLine: {
                      show: true,
                    },
                    axisLabel: {
                      formatter: "{value}",
                    },
                    interval: 1,
                  },

                ],
                series: [
                {
                    name: "SMN1>1,SMN2>=0",
                    type: "bar",
                    data: [SMN1Value1, SMN2Value1, 0, 0, 0, 0, 0, 0, 0, 0],
                    barGap: "0%",
                  },
                  {
                    name: "SMN1<=1",
                    type: "bar",
                    data: [SMN1Value2, SMN2Value2, 0, 0, 0, 0, 0, 0, 0, 0],
                    barGap: "0%",

                  },
                  {
                    name: "等位基因1",
                    type: "bar",
                    data: [
                      0,
                      0,
                      marker6Value1,
                      marker4Value1,
                      marker7Value1,
                      marker1Value1,
                      marker5Value1,
                      marker8Value1,
                      marker2Value1,
                      marker3Value1,
                    ],
                    barGap: "0%",

                  },
                  {
                    name: "等位基因2",
                    type: "bar",
                    data: [
                      0,
                      0,
                      marker6Value2,
                      marker4Value2,
                      marker7Value2,
                      marker1Value2,
                      marker5Value2,
                      marker8Value2,
                      marker2Value2,
                      marker3Value2,
                    ],
                    barGap: "0%",
                  },
                  {
                    name: "等位基因3",
                    type: "bar",
                    data: [0, 0, 0, marker4Value3, 0, 0, 0, 0, 0, 0],
                    barGap: "0%",
                  },

                ],
              };
              myChart.setOption(option1);
            } else {
              var mainContent = document.getElementById("main");
              var myChart = echarts.init(mainContent);
              var SMN1 = "${figureFile2[index1].SMN1}";
              var SMN2 = "${figureFile2[index1].SMN2}";
              var S01 = "${figureFile2[index1].S01}";
              var S02 = "${figureFile2[index1].S02}";
              var S03 = "${figureFile2[index1].S03}";
              var S04 = "${figureFile2[index1].S04}";
              var S05 = "${figureFile2[index1].S05}";
              var S06 = "${figureFile2[index1].S06}";
              var S07 = "${figureFile2[index1].S07}";
              var S08 = "${figureFile2[index1].S08}";
              if (S01 == "1 2") {
                var marker1Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker1Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S01 == "1") {
                var marker1Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker1Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S01 == "2") {
                var marker1Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker1Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              }
              if (S02 == "1 2") {
                var marker2Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker2Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S02 == "1") {
                var marker2Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker2Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S02 == "2") {
                var marker2Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker2Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              }
              if (S03 == "1 2") {
                var marker3Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker3Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S03 == "1") {
                var marker3Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker3Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S03 == "2") {
                var marker3Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker3Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              }
              if (S04 == "1 2") {
                var marker4Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker4Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
                var marker4Value3 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFC0CB", /*粉色*/
                  },
                };
              } else if (S04 == "1") {
                var marker4Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker4Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
                var marker4Value3 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFC0CB", /*粉色*/
                  },
                };
              } else if (S04 == "2") {
                var marker4Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker4Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
                var marker4Value3 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFC0CB", /*粉色*/
                  },
                };
              } else if (S04 == "2 3") {
                var marker4Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker4Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
                var marker4Value3 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFC0CB", /*粉色*/
                  },
                };
              } else if (S04 == "1 3") {
                var marker4Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker4Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
                var marker4Value3 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFC0CB", /*粉色*/
                  },
                };
              } else if (S04 == "3") {
                var marker4Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker4Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
                var marker4Value3 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFC0CB", /*粉色*/
                  },
                };
              }
              if (S05 == "1 2") {
                var marker5Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker5Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S05 == "1") {
                var marker5Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker5Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S05 == "2") {
                var marker5Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker5Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              }
              if (S06 == "1 2") {
                var marker6Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker6Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S06 == "1") {
                var marker6Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker6Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S06 == "2") {
                var marker6Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*黄色*/
                  },
                };
                var marker6Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              }
              if (S07 == "1 2") {
                var marker7Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker7Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S07 == "1") {
                var marker7Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker7Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S07 == "2") {
                var marker7Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker7Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              }
              if (S08 == "11 13") {
                var marker8Value1 = {
                  value: 1,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker8Value2 = {
                  value: 1,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S08 == "11") {
                var marker8Value1 = {
                  value: 2,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker8Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else if (S08 == "13") {
                var marker8Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#000088", /*深蓝色*/
                  },
                };
                var marker8Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#FFFF00", /*黄色*/
                  },
                };
              } else {
                var marker8Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#00FFFF", /*青色*/
                  },
                };
                var marker8Value2 = {
                  value: 2,
                  itemStyle: {
                    color: "#00FFFF", /*青色*/
                  },
                };
              }
              if (SMN1 > 1) {
                var SMN1Value1 = {
                  value: SMN1,
                  itemStyle: {
                    color: "#9955FF", /*淡紫色*/
                  },
                };
                var SMN1Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FF8888", /*淡红色*/
                  },
                };
              } else {
                var SMN1Value1 = {
                  value: 0,
                  itemStyle: {
                    color: "#9955FF", /*淡紫色*/
                  },
                };
                var SMN1Value2 = {
                  value: SMN1,
                  itemStyle: {
                    color: "#FF8888", /*淡红色*/
                  },
                };
              }
              if (SMN2 >= 0) {
                var SMN2Value1 = {
                  value: SMN2,
                  itemStyle: {
                    color: "#9955FF", //淡紫色
                  },
                };
                var SMN2Value2 = {
                  value: 0,
                  itemStyle: {
                    color: "#FF8888", //淡红色
                  },
                };
              }
              var option1 = {
                color: ["#9955FF", "#FF8888","#000088", "#FFFF00", "#FFC0CB" ],
                title: {
                  text: "",
                },
                animation : false,
                aria: {
                  enabled: true,
                  decal: {
                    show: true,
                  },
                },
                tooltip: {
                  trigger: "axis",
                  axisPointer: {
                    type: "shadow",
                    label: {},
                  },
                },
                grid:{top:"24%"},
                legend: {
                  data: [

                    {
                      name: "SMN1>1,SMN2>=0",
                      icon: "rect",
                    },
                    {
                      name: "SMN1<=1",
                      icon: "rect",

                    },
                    {
                      name: "等位基因1",
                      icon: "rect",

                    },
                    {
                      name: "等位基因2",
                      icon: "rect",

                    },
                    {
                      name: "等位基因3",
                      icon: "rect",

                    },
                  ],
                },
                xAxis: {
                  data: [
                    "SMN1",
                    "SMN2",
                    "S06",
                    "S04",
                    "S07",
                    "S01",
                    "S05",
                    "S08",
                    "S02",
                    "S03",
                  ],
                  axisLabel: { interval: 0 },
                },
                yAxis: [
                  {
                    type: "value",
                    name: "拷贝数",
                    position: "left",
                    alignTicks: true,
                    axisLine: {
                      show: true,
                    },
                    axisLabel: {
                      formatter: "{value}",
                    },
                    interval: 1,
                  },

                ],
                series: [
                {
                    name: "SMN1>1,SMN2>=0",
                    type: "bar",
                    data: [SMN1Value1, SMN2Value1, 0, 0, 0, 0, 0, 0, 0, 0],
                    barGap: "0%",
                  },
                  {
                    name: "SMN1<=1",
                    type: "bar",
                    data: [SMN1Value2, SMN2Value2, 0, 0, 0, 0, 0, 0, 0, 0],
                    barGap: "0%",

                  },
                  {
                    name: "等位基因1",
                    type: "bar",
                    data: [
                      0,
                      0,
                      marker6Value1,
                      marker4Value1,
                      marker7Value1,
                      marker1Value1,
                      marker5Value1,
                      marker8Value1,
                      marker2Value1,
                      marker3Value1,
                    ],
                    barGap: "0%",
                  },
                  {
                    name: "等位基因2",
                    type: "bar",
                    data: [
                      0,
                      0,
                      marker6Value2,
                      marker4Value2,
                      marker7Value2,
                      marker1Value2,
                      marker5Value2,
                      marker8Value2,
                      marker2Value2,
                      marker3Value2,
                    ],
                    barGap: "0%",
                  },
                  {
                    name: "等位基因3",
                    type: "bar",
                    data: [0, 0, 0, marker4Value3, 0, 0, 0, 0, 0, 0],
                    barGap: "0%",

                  },

                ],
              };

              /* 使用刚指定的配置项和数据显示图表*/
              myChart.setOption(option1);
            }
          <\/script>`;
                if (data1.data.fontStatus == 1) {
                  var changeFont = path.join(
                    process.cwd(),
                    "/resources/MiSans-Normal.ttf"
                  );
                  var changeFont1 = changeFont.replace(/\\/g, "/");
                  var changeFont2 = "url(" + changeFont1 + ")";
                  var currentFont = `@font-face{
                                  font-family:"MiSans-Normal";
                                  src:${changeFont2};
                                  font-display:swap;
                              }`;
                  var lineSpacing = `line-height:23px`;
                  var beforeStage = `text-indent:-12.85pt`;
                  var fontSetting = 'font-family:"MiSans-Normal"';
                } else {
                  var defaultFont = path.join(
                    process.cwd(),
                    "/resources/simsun.ttc"
                  );
                  var defaultFont1 = defaultFont.replace(/\\/g, "/");
                  var defaultFont2 = "url(" + defaultFont1 + ")";
                  currentFont = `@font-face{
                                      font-family:"simsun";
                                      src:${defaultFont2};
                                      font-display:swap;
                                  }`;
                  lineSpacing = `line-height:24px`;
                  beforeStage = `text-indent:-16.85pt`;
                  fontSetting = 'font-family:"simsun"';
                }
                // 添加 svg 方框图片替换 input 输入框
                var correctBox = `<svg t="1654332410780" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2963" width="16" height="16" style="vertical-align: middle;">
                                  <path d="M832 128H192a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64z m-93.71 270.86L466.76 670.4a32 32 0 0 1-45.26 0L285.71 534.6A32 32 0 0 1 331 489.33L444.14 602.5 693 353.61a32 32 0 0 1 45.26 45.25z" p-id="2964" ></path>
                         </svg>`;
                var blankBox = `<svg t="1654332611254" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3878" width="16" height="16" style="vertical-align: middle;">
                             <path d="M774 200c27.6 0 50 22.4 50 50v524c0 27.6-22.4 50-50 50H250c-27.6 0-50-22.4-50-50V250c0-27.6 22.4-50 50-50h524m0-72H250c-16.4 0-32.4 3.2-47.5 9.6-14.5 6.1-27.6 14.9-38.8 26.1-11.2 11.2-20 24.2-26.1 38.8-6.4 15.1-9.6 31.1-9.6 47.5v524c0 16.4 3.2 32.4 9.6 47.5 6.1 14.5 14.9 27.6 26.1 38.8 11.2 11.2 24.2 20 38.8 26.1 15.1 6.4 31.1 9.6 47.5 9.6h524c16.4 0 32.4-3.2 47.5-9.6 14.5-6.1 27.6-14.9 38.8-26.1 11.2-11.2 20-24.2 26.1-38.8 6.4-15.1 9.6-31.1 9.6-47.5V250c0-16.4-3.2-32.4-9.6-47.5-6.1-14.5-14.9-27.6-26.1-38.8-11.2-11.2-24.2-20-38.8-26.1-15.1-6.4-31.1-9.6-47.5-9.6z" p-id="3879"></path>
                         </svg>`;
                if (reportResult == "未检出目标基因拷贝数异常") {
                  var defaultBox1 = correctBox;
                  var defaultBox2 = blankBox;
                  var defaultBox3 = blankBox;
                  var defaultBox4 = `font-weight:bold`;
                } else if (reportResult == "SMN1基因外显子7杂合型缺失") {
                  defaultBox1 = blankBox;
                  defaultBox2 = correctBox;
                  defaultBox3 = blankBox;
                  var defaultBox5 = `font-weight:bold`;
                } else {
                  defaultBox1 = blankBox;
                  defaultBox2 = blankBox;
                  defaultBox3 = correctBox;
                  var defaultBox6 = `font-weight:bold`;
                }
                content[index] = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>G030Report</title>
          <!-- 引入 echarts.js -->
          <script src='${echartsPath}'><\/script>
          <style>
              /* Style Definitions */
              p.MsoNormal,
              li.MsoNormal,
              div.MsoNormal {
                  margin: 0cm;
                  text-align: justify;
                  text-justify: inter-ideograph;
                  font-size: 10.5pt;
                  /* font-family: Simsun; */
              }

              p.MsoListParagraph,
              li.MsoListParagraph,
              div.MsoListParagraph {
                  margin: 0cm;
                  text-align: justify;
                  text-justify: inter-ideograph;
                  /*text-indent: 21.0pt;*/
                  font-size: 10.5pt;
                  /* font-family: Simsun; */
              }

              .MsoChpDefault {
                  /* font-family: Simsun; */
              }

              td {
                  height: 40px;
              }

              /* Page Definitions */
              @page WordSection1 {
                  size: 595.3pt 841.9pt;
                  margin: 42.45pt 90.0pt 49.525pt 90.0pt;
                  layout-grid: 15.6pt;
              }
              ${currentFont}
              body{
                  ${fontSetting}
              }
              div.WordSection1 {
                  page: WordSection1;
              }

              /* List Definitions */
              ol {
                  margin-bottom: 0cm;
              }

              ul {
                  margin-bottom: 0cm;
              }

              .checkbox:checked::after {
                  background: #000;
              }
              .page-header,
              .page-header-space {
                  height: 20px;
                  font-size: 8.5px;
              }

              .page-footer,
              .page-footer-space {
                  height: auto;
                  text-align: center;
                  font-size: 8.5px;
              }

              .page-footer {
                  position: fixed;
                  bottom: 0mm;
                  /* width: 100%; */
                  /* border-top: 1px solid black; */
                  /* for demo */
                  /* background: yellow; */
                  /* for demo */
              }

              .page-header {
                  position: fixed;
                  top: 0mm;
                  width: 100%;
                  /*  border-bottom: 1px solid black;  for demo */
                  /* background: yellow; */
                  /* for demo */
              }

              /* 文字阴影宋体打印加粗解决方案 */
              .fontBolder {
                  text-shadow: 0.15pt 0px 0px black, 0.25pt 0px 0px black, 0.35pt 0px 0px black, -0.25pt 0px 0px black, 0px 0.25pt 0px black, 0px -0.25pt 0px black;
              }

              @media print {
                  body {
                      margin: 0;
                  }
              }
              #mainContent{
                  border: 1px solid windowtext;
              }
              /* table tr td{ border-top:1px solid windowtext; } table{ border:1px solid windowtext; border-top-width:0px; }  */
              /* table{ border-collapse:collapse; } table tr{ border:1px solid windowtext; }  */
          </style>
      </head>
      <body lang=ZH-CN style='word-wrap:break-word;text-justify-trim:punctuation;text-align: center;'>

          <div class=WordSection1 style='layout-grid:15.6pt;margin-top: 30px;'>
              <table cellspacing=0 cellpadding=0 width=556
                  style='width:416.7pt;border-collapse:collapse;border:none;margin: auto;text-align: center'>
                  <tr>
                      <td class="page-header" style="text-align: left;width: 416.7pt;border-bottom: solid windowtext 1pt;">
                          ${objArr1[index].inspectionEntity}
                          <!-- <hr style="width:416.7pt"> -->
                      </td>

                  </tr>
              </table>
              <table cellspacing=0 cellpadding=0 width=556
                  style='width:416.7pt;border-collapse:collapse;margin: auto;text-align: center'>
                  <tr>
                      <td class="page-footer" style="width:416.7pt;text-align: right">
                          检验结果仅对送检样本负责
                      </td>
                  </tr>

              </table>
              <p class=MsoNormal align=center style='text-align:center;layout-grid-mode:char;margin: 35px 0 35px 0'><b><span
                          lang=utf-8 style='font-size:14.0pt;'>运动神经元存活基因拷贝数检验报告单</b></p>

              <table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0 width=556 id="mainContent"
                  style='width:416.7pt;margin: auto;border-collapse:collapse;'>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>门诊号</b></p>
                      </td>
                      <td width=183 colspan=7 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].clinicNumber}</span>
                          </p>
                      </td>
                      <td width=73  colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'><b>住院号</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].hospitalNumber}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal style='text-align:center'><b>姓名</b></p>
                      </td>
                      <td width=113 colspan=3 style='width:85.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=left style="text-align: left;">
                              <span>
                                  ${objArr1[index].name}
                              </span>
                          </p>
                      </td>
                      <td width=76 style='width:2.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=center style='text-align:center'><b>性别</b></p>
                      </td>
                      <td width=113  colspan=3 style='width:3.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=left style='text-align:left'><span>${objArr1[index].sex}</span></p>
                      </td>
                      <td width=73 colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=center style='text-align:center'><b>手机号</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=left style='text-align:left'><span>${objArr1[index].phone}</span></p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>送检科室</b></p>
                      </td>
                      <td width=339 colspan=7 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].inspectionDepartment}</span>
                          </p>
                      </td>
                      <td width=73  colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;white-space: nowrap;'><b>送检医生</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].inspectionDoctor}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>样本类型</b></p>
                      </td>
                      <td width=183 colspan=7 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].sampleType}</span>
                          </p>
                      </td>
                      <td width=73  colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;white-space: nowrap;'><b>采样日期</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].samplingDate}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>简要病史</b></p>
                      </td>
                      <td width=339 colspan=12 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].medicalHistory}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验方法</b></p>
                      </td>
                      <td width=339 colspan=12 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:center'>
                              <span >荧光&thinsp;PCR-毛细管电泳法</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>目标基因</b></p>
                      </td>
                      <td width=339 colspan=6 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:center'>
                              <span><i>SMN1</i>&thinsp;外显子&thinsp;7</span>
                          </p>
                      </td>
                      <td width=73  colspan=6 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'>
                              <span><i>SMN2</i>&thinsp;外显子&thinsp;7</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验结果</b></p>
                      </td>
                      <td width=339 colspan=6 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:center'>
                              <span>${objArr1[index].smn1}</span>
                          </p>
                      </td>
                      <td width=73  colspan=6 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'>
                              <span>${objArr1[index].smn2}</span>
                          </p>
                      </td>
                  </tr>
                  ${pictureHtml}
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验结论</b></p>
                      </td>
                      <td width=183 colspan=12 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              ${defaultBox1}
                          <span style="vertical-align: middle;${defaultBox4}" >未检出目标基因拷贝数异常</span>
                          </p>
                          <p class=MsoNormal align=left style='text-align:left'>
                              ${defaultBox2}
                          <span style="vertical-align: middle;${defaultBox5}" ><i>SMN1&thinsp;</i>基因外显子&thinsp;7&thinsp;杂合型缺失</span>
                          </p>
                          <p class=MsoNormal align=left style='text-align:left'>
                              ${defaultBox3}
                          <span style="vertical-align: middle;${defaultBox6}" ><i>SMN1&thinsp;</i>基因外显子&thinsp;7&thinsp;纯合型缺失</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=73  style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'><b>建议</b></p>
                      </td>
                      <td width=110 colspan=12 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'>
                              <span>${recommend}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=556 colspan=13 style='width:416.7pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class='MsoNormal' align=center style='text-align:center'><span><b>结果解释</b></span></p>
                      </td>
                  </tr>
                  <tr>
                      <td width=556 colspan=13 valign=middle style='width:416.7pt;
        padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoListParagraph align=justify style='margin-left:23.25pt;${beforeStage};${lineSpacing};'>
                              1. 本次检验仅用于<i>&thinsp;SMN1&thinsp;</i>中最常见的外显子&thinsp;7&thinsp;缺失型携带者的检验，并未覆盖<i>&thinsp;SMN1&thinsp;</i>基因的罕见点突变检测。因此，当检测结果排除受检者为<i>&thinsp;SMN1&thinsp;</i>第&thinsp;7&thinsp;外显子缺失型携带者时，并不能排除受检者是否携带有<i>&thinsp;SMN1&thinsp;</i>基因的罕见点突变。
                          </p>
                          ${pagingTable}
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >2. 当检出<i>&thinsp;SMN1&thinsp;</i>第&thinsp;7&thinsp;外显子为&thinsp;2&thinsp;拷贝时，并不能直接判断&thinsp;2&thinsp;个拷贝的<i>&thinsp;SMN1&thinsp;</i>在染色体上的排布方式，即不能判断出是否为“&thinsp;2+0&thinsp;”携带者型。当怀疑待检样本存在“&thinsp;2+0&thinsp;”时，建议其配偶进行<i>&thinsp;SMN1&thinsp;</i>基因检测。</p>
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >3. 受检者进行过骨髓移植、细胞治疗或接受输血，可能会影响血样检测结果的准确性。</p>
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >4. 该方法检测<i>&thinsp;SMN1&thinsp;</i>基因第&thinsp;7&thinsp;外显子拷贝数时，将以受检者基因组中保守的管家基因为内参。内参基因罕见的突变可能会影响到检测结果的准确性。</p>
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >5. 检验<i>&thinsp;SMN2&thinsp;</i>基因拷贝数通常仅用于对患者临床预后的评估。正常人群中<i>&thinsp;SMN2&thinsp;</i>基因本身就存在拷贝数变异，可能为&thinsp;0、1、2&thinsp;或以上。</p>
                          ${pagingEnd}
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验日期</b></p>
                      </td>
                      <td width=339 colspan=9 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].inspectionDate}</span>
                          </p>
                      </td>
                      <td width=73  colspan=2 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;white-space: nowrap;'><b>报告日期</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                        <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].reportDate}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验者</b></p>
                      </td>
                      <td width=339 colspan=9 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].inspector}</span>
                          </p>
                      </td>
                      <td width=73  colspan=2 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'><b>审核者</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].checker}</span>
                          </p>
                      </td>
                  </tr>
              </table>
          </div>
      </body>
      ${pictureScript}
      </html>`;
                content1[index] = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>G030Report</title>
          <!-- 引入 echarts.js -->
          <script src='${echartsPath}'><\/script>
          <style>
              /* Style Definitions */
              p.MsoNormal,
              li.MsoNormal,
              div.MsoNormal {
                  margin: 0cm;
                  text-align: justify;
                  text-justify: inter-ideograph;
                  font-size: 10.5pt;
                  /* font-family: Simsun; */
              }

              p.MsoListParagraph,
              li.MsoListParagraph,
              div.MsoListParagraph {
                  margin: 0cm;
                  text-align: justify;
                  text-justify: inter-ideograph;
                  /*text-indent: 21.0pt;*/
                  font-size: 10.5pt;
                  /* font-family: Simsun; */
              }

              .MsoChpDefault {
                  /* font-family: Simsun; */
              }

              td {
                  height: 40px;
              }

              /* Page Definitions */
              @page WordSection1 {
                  size: 595.3pt 841.9pt;
                  margin: 42.45pt 90.0pt 49.525pt 90.0pt;
                  layout-grid: 15.6pt;
              }
              ${currentFont}
              body{
                  ${fontSetting}
              }
              div.WordSection1 {
                  page: WordSection1;
              }

              /* List Definitions */
              ol {
                  margin-bottom: 0cm;
              }

              ul {
                  margin-bottom: 0cm;
              }

              .checkbox:checked::after {
                  background: #000;
              }
              .page-header,
              .page-header-space {
                  height: 20px;
                  font-size: 8.5px;
              }

              .page-footer,
              .page-footer-space {
                  height: auto;
                  text-align: center;
                  font-size: 8.5px;
              }

              .page-footer {
                  position: fixed;
                  bottom: 0mm;
                  /* width: 100%; */
                  /* border-top: 1px solid black; */
                  /* for demo */
                  /* background: yellow; */
                  /* for demo */
              }

              .page-header {
                  position: fixed;
                  top: 0mm;
                  width: 100%;
                  /*  border-bottom: 1px solid black;  for demo */
                  /* background: yellow; */
                  /* for demo */
              }

              /* 文字阴影宋体打印加粗解决方案 */
              .fontBolder {
                  text-shadow: 0.15pt 0px 0px black, 0.25pt 0px 0px black, 0.35pt 0px 0px black, -0.25pt 0px 0px black, 0px 0.25pt 0px black, 0px -0.25pt 0px black;
              }

              @media print {
                  body {
                      margin: 0;
                  }
              }
              #mainContent{
                  border: 1px solid windowtext;
              }
              /* table tr td{ border-top:1px solid windowtext; } table{ border:1px solid windowtext; border-top-width:0px; }  */
              /* table{ border-collapse:collapse; } table tr{ border:1px solid windowtext; }  */
          </style>
      </head>
      <body lang=ZH-CN style='word-wrap:break-word;text-justify-trim:punctuation;text-align: center;'>

          <div class=WordSection1 style='layout-grid:15.6pt;margin-top: 30px;'>
              <table cellspacing=0 cellpadding=0 width=556
                  style='width:416.7pt;border-collapse:collapse;border:none;margin: auto;text-align: center'>
                  <tr>
                      <td class="page-header" style="text-align: left;width: 416.7pt;border-bottom: solid windowtext 1pt;">
                          ${objArr1[index].inspectionEntity}
                          <!-- <hr style="width:416.7pt"> -->
                      </td>

                  </tr>
              </table>
              <table cellspacing=0 cellpadding=0 width=556
                  style='width:416.7pt;border-collapse:collapse;margin: auto;text-align: center'>
                  <tr>
                      <td class="page-footer" style="width:416.7pt;text-align: right">
                          检验结果仅对送检样本负责
                      </td>
                  </tr>

              </table>
              <p class=MsoNormal align=center style='text-align:center;layout-grid-mode:char;margin: 35px 0 35px 0'><b><span
                          lang=utf-8 style='font-size:14.0pt;'>运动神经元存活基因拷贝数检验报告单</b></p>

              <table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0 width=556 id="mainContent"
                  style='width:416.7pt;margin: auto;border-collapse:collapse;'>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>门诊号</b></p>
                      </td>
                      <td width=183 colspan=7 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].clinicNumber}</span>
                          </p>
                      </td>
                      <td width=73  colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'><b>住院号</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].hospitalNumber}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal style='text-align:center'><b>姓名</b></p>
                      </td>
                      <td width=113 colspan=3 style='width:85.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=left style="text-align: left;">
                              <span>
                                  ${objArr1[index].name}
                              </span>
                          </p>
                      </td>
                      <td width=76 style='width:2.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=center style='text-align:center'><b>性别</b></p>
                      </td>
                      <td width=113  colspan=3 style='width:3.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=left style='text-align:left'><span>${objArr1[index].sex}</span></p>
                      </td>
                      <td width=73 colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=center style='text-align:center'><b>手机号</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoNormal align=left style='text-align:left'><span>${objArr1[index].phone}</span></p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>送检科室</b></p>
                      </td>
                      <td width=339 colspan=7 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].inspectionDepartment}</span>
                          </p>
                      </td>
                      <td width=73  colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;white-space: nowrap;'><b>送检医生</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].inspectionDoctor}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>样本类型</b></p>
                      </td>
                      <td width=183 colspan=7 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].sampleType}</span>
                          </p>
                      </td>
                      <td width=73  colspan=4 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;white-space: nowrap;'><b>采样日期</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].samplingDate}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>简要病史</b></p>
                      </td>
                      <td width=339 colspan=12 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].medicalHistory}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验方法</b></p>
                      </td>
                      <td width=339 colspan=12 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:center'>
                              <span >荧光&thinsp;PCR-毛细管电泳法</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>目标基因</b></p>
                      </td>
                      <td width=339 colspan=6 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:center'>
                              <span><i>SMN1</i>&thinsp;外显子&thinsp;7</span>
                          </p>
                      </td>
                      <td width=73  colspan=6 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'>
                              <span><i>SMN2</i>&thinsp;外显子&thinsp;7</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验结果</b></p>
                      </td>
                      <td width=339 colspan=6 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:center'>
                              <span>${objArr1[index].smn1}</span>
                          </p>
                      </td>
                      <td width=73  colspan=6 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'>
                              <span>${objArr1[index].smn2}</span>
                          </p>
                      </td>
                  </tr>
                  ${pictureHtml}
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验结论</b></p>
                      </td>
                      <td width=183 colspan=12 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              ${defaultBox1}
                          <span style="vertical-align: middle;${defaultBox4}" >未检出目标基因拷贝数异常</span>
                          </p>
                          <p class=MsoNormal align=left style='text-align:left'>
                              ${defaultBox2}
                          <span style="vertical-align: middle;${defaultBox5}" ><i>SMN1&thinsp;</i>基因外显子&thinsp;7&thinsp;杂合型缺失</span>
                          </p>
                          <p class=MsoNormal align=left style='text-align:left'>
                              ${defaultBox3}
                          <span style="vertical-align: middle;${defaultBox6}" ><i>SMN1&thinsp;</i>基因外显子&thinsp;7&thinsp;纯合型缺失</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=73  style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'><b>建议</b></p>
                      </td>
                      <td width=110 colspan=12 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center'>
                              <span>${recommend}</span>
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td width=556 colspan=13 style='width:416.7pt;padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class='MsoNormal' align=center style='text-align:center'><span><b>结果解释</b></span></p>
                      </td>
                  </tr>
                  <tr>
                      <td width=556 colspan=13 valign=middle style='width:416.7pt;
        padding:0cm 5.4pt 0cm 5.4pt'>
                          <p class=MsoListParagraph align=justify style='margin-left:23.25pt;${beforeStage};${lineSpacing};'>
                              1. 本次检验仅用于<i>&thinsp;SMN1&thinsp;</i>中最常见的外显子&thinsp;7&thinsp;缺失型携带者的检验，并未覆盖<i>&thinsp;SMN1&thinsp;</i>基因的罕见点突变检测。因此，当检测结果排除受检者为<i>&thinsp;SMN1&thinsp;</i>第&thinsp;7&thinsp;外显子缺失型携带者时，并不能排除受检者是否携带有<i>&thinsp;SMN1&thinsp;</i>基因的罕见点突变。
                          </p>
                          ${pagingTable}
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >2. 当检出<i>&thinsp;SMN1&thinsp;</i>第&thinsp;7&thinsp;外显子为&thinsp;2&thinsp;拷贝时，并不能直接判断&thinsp;2&thinsp;个拷贝的<i>&thinsp;SMN1&thinsp;</i>在染色体上的排布方式，即不能判断出是否为“&thinsp;2+0&thinsp;”携带者型。当怀疑待检样本存在“&thinsp;2+0&thinsp;”时，建议其配偶进行<i>&thinsp;SMN1&thinsp;</i>基因检测。</p>
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >3. 受检者进行过骨髓移植、细胞治疗或接受输血，可能会影响血样检测结果的准确性。</p>
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >4. 该方法检测<i>&thinsp;SMN1&thinsp;</i>基因第&thinsp;7&thinsp;外显子拷贝数时，将以受检者基因组中保守的管家基因为内参。内参基因罕见的突变可能会影响到检测结果的准确性。</p>
                          <p class=MsoListParagraph align=center style='margin-left:23.25pt;${beforeStage};${lineSpacing}' >5. 检验<i>&thinsp;SMN2&thinsp;</i>基因拷贝数通常仅用于对患者临床预后的评估。正常人群中<i>&thinsp;SMN2&thinsp;</i>基因本身就存在拷贝数变异，可能为&thinsp;0、1、2&thinsp;或以上。</p>
                          ${pagingEnd}
                  </tr>
                  <tr>
                      <td width=71 style='width:53.2pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;'><b>检验日期</b></p>
                      </td>
                      <td width=339 colspan=9 style='width:167.5pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].inspectionDate}</span>
                          </p>
                      </td>
                      <td width=73  colspan=2 style='width:54.4pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                          <p class=MsoNormal align=center style='text-align:center;white-space: nowrap;'><b>报告日期</b></p>
                      </td>
                      <td width=110 style='width:82.35pt;padding:0cm 5.4pt 0cm 5.4pt;'>
                        <p class=MsoNormal align=left style='text-align:left'>
                              <span>${objArr1[index].reportDate}</span>
                          </p>
                      </td>
                  </tr>
              </table>
          </div>
      </body>
      ${pictureScript}
      </html>`;
                content2[index] =
                  data1.data.selectReport == "default"
                    ? content[index]
                    : content1[index];
                var fs = window.require("fs");
                fs.writeFile(
                  htmlPathAndName[index],
                  content2[index],
                  function (err) {
                    if (err) {
                      var notice = "输入文件 " + sampleFileName + " 处理有误";

                      if (index == htmlPathAndName.length - 1) {
                        this.showErrorNotification(notice);
                      }
                      log.error(
                        "\n" +
                          "当前处理文件名为：" +
                          sampleFileName +
                          "\n错误提示：\n" +
                          err
                      );
                      throw err;
                    }
                    var notice = "输入文件 " + sampleFileName + " 处理完成";
                    console.log("File is created successfully.");
                    setTimeout(() => {
                      if (index == htmlPathAndName.length - 1) {
                        that.showSuccessNotification(notice);
                      }
                    }, 1000);
                    log.info(
                      "\n" +
                        "当前处理文件名为：" +
                        sampleFileName +
                        "\n" +
                        "成功生成HTML文件：" +
                        htmlName[index]
                    );
                  }
                );
                var window_to_PDF1 = [];
                // Html File change to PDF File method
                function afterWrite() {
                  console.log("进入生成报告文件方法");
                  var { BrowserWindow } = window.require("@electron/remote");
                  window_to_PDF1[index] = new BrowserWindow({ show: false }); //to just open the browser in background
                  window_to_PDF1[index].loadURL(
                    `file://${htmlPathAndName[index].replace(/\\/g, "/")}`
                  ); //give the file link you want to display
                  window_to_PDF1[index].webContents.on(
                    "did-finish-load",
                    function () {
                      window_to_PDF1[index].webContents
                        .printToPDF({})
                        .then((data) => {
                          fs.writeFile(pdfPathAndName[index], data, (error) => {
                            if (error) throw error;
                            var pdfnotice =
                              `Wrote ` +
                              pdfPathAndName.length +
                              ` PDF successfully`;
                            if (index == pdfPathAndName.length - 1) {
                              setTimeout(() => {
                                if (
                                  sampleFileNamePath.indexOf("#") != -1 ||
                                  sampleFileNamePath.indexOf("&") != -1 ||
                                  sampleFileNamePath.indexOf("+") != -1 ||
                                  sampleFileNamePath.indexOf("=") != -1 ||
                                  sampleFileNamePath.indexOf("?") != -1 ||
                                  sampleFileNamePath.indexOf(" ") != -1
                                ) {
                                  var warningNotice =
                                    "检测到您上传的文件或路径中存在特殊字符串或空格！请及时修改！否者会导致无法生成PDF报告的图片信息！";
                                  that.showWarningNotification(warningNotice);
                                }
                              }, 1000);
                              that.showSuccessNotification(pdfnotice);
                            }
                            log.info(
                              "\n" +
                                "当前处理文件名为：" +
                                htmlName[index] +
                                "\n" +
                                "成功生成PDF文件：" +
                                pdfName[index]
                            );
                            if (data1.data.htmlStatus == 0) {
                              fs.unlink(htmlPathAndName[index], function (err) {
                                if (err) {
                                  console.log(
                                    "An error ocurred updating the file" +
                                      err.message
                                  );
                                  return;
                                }
                                if (index == pdfPathAndName.length - 1) {
                                  loading.close();
                                  console.log("HTML File successfully deleted");
                                }
                              });
                            }
                            window_to_PDF1[index].close();
                          });
                        })
                        .catch((error) => {
                          if (index == pdfPathAndName.length - 1) {
                            that.showErrorNotification(error);
                          }
                          loading.close();
                          log.error(
                            `Failed to write PDF ${pdfPathAndName[index]}`,
                            error
                          );
                        });
                    }
                  );
                }
                setTimeout(afterWrite, 1000);
              }
            });
          });
        }
      }
    },
    // 运行脚本后错误系统通知
    errorNotification(fileName, body) {
      var path = require("path");
      var pic = path.join(process.cwd(), "/resources/app256x256.png");
      const options = {
        icon: pic,
        body: body,
      };
      const notification = new Notification("SMNFiler Error", options);
    },
    // 保存自定义样本名
    saveSampleName() {
      var sampleName = this.sampleName;
      this.uploadParams.stdName = sampleName;
      var saveSampleName = "当前标准品样本名：" + sampleName
      this.showInfoNotification(saveSampleName)
    },
    // 保存NTC检测样本名
    saveNTCSampleName() {
      var ntcSampleName = this.ntcSampleName;
      this.uploadParams.ntcName = ntcSampleName;
      var saveNTCSampleName = "当前NTC检测样本名：" + ntcSampleName
      this.showInfoNotification(saveNTCSampleName)
    },
    // 保存Ladder检测样本名
    saveLadderSampleName() {
      var ladderSampleName = this.ladderSampleName;
      this.uploadParams.ladderName = ladderSampleName;
      var saveLadderSampleName = "当前Ladder检测样本名：" + ladderSampleName
      this.showInfoNotification(saveLadderSampleName)      
    },
    //设置输出结果文件为中文
    switchReceiveStatus1(val) {
      this.uploadParams.language = val;
    },
    //切换输出文件种类
    switchFileType(val) {
      if (val == "summaryFileAndReportFile") {
        console.log("结果文件和报告");
        this.showUploadGen = true;
        this.showSampleInformation = true;
        this.uploadParams.fileType = val;
        this.uploadParams.fileTypeParameter = " ";
        this.changeTab1();
      } else if (val == "summaryFileAndReportPictureFile") {
        console.log("结果文件和含图片报告");
        this.showUploadGen = true;
        this.showSampleInformation = true;
        this.uploadParams.fileType = val;
        this.uploadParams.fileTypeParameter = "-f";
        this.changeTab1();
      } else {
        console.log("结果文件");
        this.uploadParams.fileType = val;
        this.uploadParams.fileTypeParameter = " ";
        this.showUploadGen = true;
        this.showSampleInformation = false;
        this.changeTab1();
      }
    },
    // 切换为样本信息上传窗口
    changeTab() {
      this.activeName = "second";
      var sampleMessage = "样本信息数据上传";
      setTimeout(() => {
        this.showInfoNotification(sampleMessage)
      },500);
    },
    // 切换为Genemapper下机数据上传
    changeTab1() {
      this.activeName = "first";
      var genMessage = "Genemapper下机数据上传";
      setTimeout(() => {
        this.showInfoNotification(genMessage);
      }, 500);
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
      var fs = window.require("fs");
      fs.access(
        path.join(convertedLogFilepath, logFilename),
        fs.constants.F_OK,
        (err) => {
          if (err) {
            console.log("日志文件不存在");
            this.showErrorNotification(
              "由于您还未进行任何数据分析操作，因此暂时无日志生成！"
            );
          } else {
            console.log("日志文件存在");
            if (process.platform === "darwin") {
              const { shell } = window.require("electron");
              const openFile = (filePath) => {
                shell
                  .openPath(filePath)
                  .then(() => {
                    console.log("日志文件已成功打开");
                  })
                  .catch((error) => {
                    console.error("打开日志文件时出错:", error);
                  });
              };
              openFile(path.join(convertedLogFilepath, logFilename));
              // shell.openExternal(path.join(convertedLogFilepath, logFilename));
            } else if (process.platform === "win32") {
              const { shell } = window.require("electron");
              shell.openExternal(path.join(convertedLogFilepath, logFilename));
            } else if (process.platform === "linux") {
              const { shell } = window.require("electron");
              shell.openExternal(path.join(convertedLogFilepath, logFilename));
            }
          }
        }
      );
    },
  },
  mounted() {
    window.addEventListener("resize", this.adjustTableHeight);
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
#holder {
  height: 77vh;
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
  height: 69vh;
}
.el-upload-dragger {
  margin-top: 10px;
}
.upload-demo .el-upload__tip {
  font-size: 15px;
  color: #708090;
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
.demo-tabs .mb-4 .downloadButton {
  text-align: right;
}
.setting {
  position: relative;
}
.grid-content {
  border-radius: 4px;
  text-align: left;
}
/* .fileSetting {
  margin: 30px 0;
} */

.el-divider__text {
  font-size: 16px !important;
}
i.el-icon.el-icon--upload {
  margin-top: 21vh;
}
.leftText {
  display: flex;
  align-items: center;
}
.el-input-group__append .custom-button {
  background-color: #409eff !important;
  color: white !important;
}
.container {
  display: flex;
  flex-direction: column;
  height: calc(90vh-20px);
}
.marginLeftRight {
  margin: 0 45px;
}
.spanPosition {
  display: flex;
  align-items: center;
  justify-content: center;
}
.row-container {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.el-col-9 {
  margin-top: 24px;
}
</style>
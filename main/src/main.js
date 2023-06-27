/** 具体项目情况查看README.md */
import Vue from "vue";

import Cookies from "js-cookie";

import Element from "element-ui";
import "./assets/styles/element-variables.scss";

import "@/assets/styles/index.scss"; // global css
import "@/assets/styles/shuke.scss"; // shuke css
import App from "./App";
import store from "./store";
import router from "./router";
import directive from "./directive"; // directive
import plugins from "./plugins"; // plugins
import mixin from "./mixin"; // 全局的混入
import format from "date-fns/format"; // date-fns日期格式化 使用详情在readme
import { download } from "@/utils/request";
import request from "@/utils/request";
import axios from "axios";
import _ from "lodash"; // lodash
import { registerMicroApps, start } from "qiankun";

import "./assets/icons"; // icon
import "./permission"; // permission control
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import {
  parseTime,
  resetForm,
  addDateRange,
  selectDictLabel,
  selectDictLabels,
  handleTree
} from "@/utils/shuke";
// 分页组件
import Pagination from "@/components/Pagination";
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar";
// 富文本组件
import Editor from "@/components/Editor";
// 文件上传组件
import FileUpload from "@/components/FileUpload";
// 图片上传组件
import ImageUpload from "@/components/ImageUpload";
// 字典标签组件
import DictTag from "@/components/DictTag";
// 头部标签组件
import VueMeta from "vue-meta";
// 字典数据组件
// import DictData from "@/components/DictData";
// 若依页面分层工具
import ryLayerPage from "./index";

// 全局方法挂载
Vue.prototype.getDicts = getDicts;
Vue.prototype.getConfigKey = getConfigKey;
Vue.prototype.parseTime = parseTime;
Vue.prototype.resetForm = resetForm;
Vue.prototype.addDateRange = addDateRange;
Vue.prototype.selectDictLabel = selectDictLabel;
Vue.prototype.selectDictLabels = selectDictLabels;
Vue.prototype.download = download;
Vue.prototype.handleTree = handleTree;
Vue.prototype.$format = format;
Vue.prototype.$axios = axios;
Vue.prototype.$bus = new Vue();
Vue.prototype._ = _;
Vue.prototype.msgSuccess = function(msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
};

// 全局组件挂载
Vue.component("DictTag", DictTag);
Vue.component("Pagination", Pagination);
Vue.component("RightToolbar", RightToolbar);
Vue.component("Editor", Editor);
Vue.component("FileUpload", FileUpload);
Vue.component("ImageUpload", ImageUpload);

Vue.use(directive);
Vue.use(mixin);
Vue.use(plugins);
Vue.use(VueMeta);
Vue.use(ryLayerPage, {
  http: request,
  dict: getDicts,
  dictField: {
    dictLabel: "label",
    dictValue: "value"
  }
});

Vue.use(Element, {
  size: Cookies.get("size") || "medium" // set element-ui default size
});

Vue.config.productionTip = false;

registerMicroApps([
  // {
  //   name: "vueApp",
  //   entry: "//localhost",
  //   // container: "#container",
  //   activeRule: "/ry-test-system"
  // },
  {
    name: "sub-vue",
    entry: "//localhost:8080",
    activeRule: "/ry-test-system/vue2-app",
    container: "#container"
  }
  // {
  //   name: "vue3-app",
  //   entry: "//localhost:8082",
  //   activeRule: "/vue3-app",
  //   container: "#container"
  // }
]);
// 启动 qiankun
start();

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

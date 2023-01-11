<template>
  <ry-layer-page
    ref="layerpage"
    :search-layer="searchLayer"
    :operate-layer="operateLayer"
    :display-layer="displayLayer"
    :loading="false"
  />
</template>
<script>
import Custom from "./Custom";
import CustomPage from "./CustomPage";
import CustomDialog from "./CustomDialog";
export default {
  dicts: ["sys_normal_disable", "sys_show_hide"],
  data() {
    const route = this.$route.name.toLowerCase();
    const BASE_URL = "/his/office";
    const form = [
      {
        name: "Custom",
        component: Custom,
      },
      {
        label: "科室名称",
        model: "deptName",
        component: "FormSelect",
        dict: "sys_normal_disable",
        rules: [
          {
            required: true,
            message: "请输入科室名称",
            trigger: "change",
          },
        ],
      },
      {
        label: "科室负责人",
        model: "deptLeader",
        component: "FormInput",
        width: 565,
        rules: [
          {
            // required: true,
            message: "请输入科室负责人",
            trigger: "blur",
          },
        ],
      },
      {
        label: "科室电话",
        model: "deptPhone",
        component: "FormInput",
        rules: [
          {
            // pattern: /^[1]([3-9])[0-9]{9}$/,
            // required: true,
            message: "请输入正确的科室电话",
            trigger: "blur",
          },
        ],
      },
      {
        label: "部门",
        model: "dept",
        component: "FormTreeSelect",
        treeUrl: "/system/dept/list",
        // multiple: true,
        // alwaysOpen: true,
        showCount: true,
        normalizer(node) {
          return {
            id: node.deptId,
            label: node.deptName,
            children: node.children,
          };
        },
        // 如果的数据不是一个树，可以用callback处理数据
        callback(data) {
          return this.handleTree(data, "deptId");
        },
        clearable: true,
      },
      {
        label: "时间",
        model: "mzsj",
        type: "datetime",
        // type:"daterange",
        component: "FormDate",
      },
      {
        label: "预警时间",
        type: "daterange",
        component: "FormDateRange",
      },
      {
        label: "门诊时间",
        type: "monthrange",
        valueFormat: "yyyy-MM",
        startTimeLabel: "startTimeMZ",
        endTimeLabel: "endTimeMZ",
        component: "FormDateRange",
      },
      {
        label: "附件",
        model: "fileId",
        component: "FormUpdate",
        width: 565,
        icon: "el-icon-receiving",
        fileListLabel: "fileList", //文件列表别名
        multiple: false,
        size: "mini",
        buttonLabel: "上传图片", // 按钮描述
        upload: {
          action: `${process.env.VUE_APP_FILE_API}/minio/upload`,
          headers: {
            Authorization:
              "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjI4YjIwMmM0LWQzZTktNGUwZi05YmRmLTNhOTUzYTFlNWJjYSJ9.YMRqEvDQM-DG_dv3IizC_x6Xj-oD8DGpIB-ncdiMPRvjVlmdmAu5mVgqljQzY3fSs5Q-7P8g6piGizFVBVMNzA",
          },
          reg: /^.*\.(?:jpg|jpeg|png)$/i,
          size: 5,
          textLabel:
            "请上传 大小不超过 <span style='color:#ff0078'>5MB</span> 格式为 jpg/jpeg/png的图片",
          sizeLabel: "上传文件大小不能超过5MB",
        },
      },
    ];
    const operateLayer = {
      add: {
        size: "mini",
        type: "primary",
        label: "新增",
        params: {
          mzsj: new Date(),
        },
        method: "post",
        // plain: true,
        // circle: true,
        url: `${BASE_URL}`,
        hasPermi: `${route}:add`,
        // show: false,
        mode: {
          type: "Dialog",
          // title: "1",
          // width: 1000,
          // fullscreen: true,
          // modal: false,
          // modalAppendToBody: false,
          // appendToBody: false,
          // closeOnPressEscape: false,
          // showClose: false,
          // lockScroll: false,
          // beforeClose: this.beforeClose,
          // center: true,//居中布局
          // closeOnClickModal: false,
          // destroyOnClose: true,
          customClass: "dark",
          top: "25vh", // 距离顶部距离
          form,
        },
      },
      edit: {
        size: "mini",
        type: "primary",
        label: "修改",
        params: {
          age: 18,
        },
        disabled: "single",
        url: `${BASE_URL}`,
        method: "put",
        hasPermi: `${route}:edit`,
        mode: {
          type: "Dialog",
          detail: true, // 需要使用详情
          form,
        },
      },
      search: {
        size: "mini",
        type: "primary",
        label: "查看",
        params: { lakeiedward: "resrse" },
        disabled: "single",
        hasPermi: `${route}:search`,
        method: "get",
        url: `${BASE_URL}`,
        mode: {
          type: "Dialog",
          detail: true, // 需要使用详情
          label: "deptId",
          rules: false, // 不需要校验
          readonly: true,
          form: form,
          button: [
            // dialog支持自定义按钮 event的submit为提交， cancel为取消
            {
              event: "cancel",
              label: "关闭",
            },
          ],
          catch: () => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          },
        },
      },
      remove: {
        size: "mini",
        type: "primary",
        label: "删除",
        disabled: "multipe",
        url: `${BASE_URL}`,
        method: "delete",
        hasPermi: `${route}:remove`,
        mode: {
          subscribe: "是否确认删除这些数据?",
          type: "warning",
          title: "提示",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          showConfirmButton: true,
          showCancelButton: true,
          center: false,
          roundButton: false,
          label: "deptId",
          catch: () => {
            this.$message({
              type: "info",
              message: "已取消警告",
            });
          },
        },
      },
      warn: {
        size: "mini",
        type: "danger",
        disabled: "single",
        label: "警告",
        plain: true,
        url: `${BASE_URL}/warn`,
        method: "get",
        hasPermi: `${route}:warn`,
        mode: {
          subscribe: (item) => {
            return `${item.deptLeader}已被严重警告`;
          },
          title: "警告",
          type: "error",
          label: "deptId",
          catch: () => {
            this.$message({
              type: "info",
              message: "取消警告",
            });
          },
        },
      },
      // 自定义弹框
      customDialog: {
        size: "mini",
        label: "自定义弹框",
        params: { b: "resrse" },
        show: "table",
        mode: {
          type: "CustomDialog",
          name: "customDialog", // 自定义组件都要有name作为该组件的ref值
          detail: true, // 需要使用详情
          component: CustomDialog, // 自定义组件
        },
      },
      // 自定义组件页面
      customPage: {
        size: "mini",
        type: "success",
        disabled: "single",
        plain: true,
        show: "table",
        icon: "el-icon-set-up",
        label: "自定义组件",
        mode: {
          type: "CustomPage",
          name: "customPage", // 自定义组件都要有name作为该组件的ref值
          component: CustomPage, // 自定义组件
          detail: true, // 需要使用详情
        },
      },
      // 自定义详情路由
      routerPage: {
        size: "mini",
        type: "danger",
        disabled: "single",
        show: "table",
        label: "自定义路由",
        plain: true,
        mode: {
          type: "RouterPage",
          detail: true,
          router: {
            path: "/his/RouterPage",
            query: {
              name: "参数",
            },
            // name: "RouterPage",
            // params: {
            //   sek: "lakei",
            // },
          },
        },
      },
    };
    return {
      // 搜索层
      searchLayer: {
        labelAfter: ":",
        formWidth: 260,
        searchName: "查询",
        resetName: "重置",
        form: [
          {
            name: "Custom", // 渲染保证唯一
            component: Custom,
          },
          {
            label: "科室负责人",
            model: "deptLeader",
            regExp: "english",
            component: "FormInput",
          },
          {
            label: "预警时间",
            type: "daterange",
            startTimeLabel: "startTimeYJ",
            endTimeLabel: "endTimeYJ",
            component: "FormDateRange",
          },
        ],
      },
      // 操作层
      operateLayer,
      // 展示层
      displayLayer: {
        url: `${BASE_URL}/list`,
        // dblclick: false, //双击可查看
        rowclick: false, // 点击行选择
        // stripe: false,//	是否为斑马纹
        border: true, // 是否带有纵向边框
        // size: "mini", //Table 的尺寸
        // showHeader: false, //是否显示表头
        // highlightCurrentRow: false, //是否要高亮当前行
        // maxHeight: 100, // Table 的最大高度。合法的值为数字或者单位为 px 的高度。
        // height: 50, //Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
        headerCellStyle: { textAlign: "center" }, // 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
        cellStyle: { "text-align": "center" }, // 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
        // cellStyle: this.cellStyle, // 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
        data: [
          {
            prop: "deptName",
            label: "科室名称",
            callback: (item) => {
              const office = ["急诊科", "内科", "外科", "眼科", "麻醉科"];
              return office[item.deptName];
            },
          },
          {
            prop: "deptLeader",
            label: "科室负责人",
          },
          {
            prop: "deptPhone",
            label: "科室电话",
          },
          {
            prop: "deptCode",
            label: "科室类别",
            callback: (item) => {
              const code = ["急诊", "门诊"];
              return code[item.deptCode];
            },
          },
          {
            label: "操作",
            operate: true, // 自动根据ryoperate中show字段进行截取
            width: "500",
          },
        ],
      },
    };
  },
  methods: {
    cellStyle(row) {
      if (row.rowIndex === 1) {
        return { color: "#ff0053", border: "3px solid #567824" };
      }
    },

    // 字典加载完成的回调
    onDictReady(dict) {
      console.log(this.dict);
      // 初始化字典项
      this.$refs.layerpage.initDicts(dict);
    },
  },
};
</script>

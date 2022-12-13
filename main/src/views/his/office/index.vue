<template>
  <FormMain
    ref="FormMain"
    :ry-search="rySearch"
    :ry-operate="ryOperate"
    :ry-table="ryTable"
    :right-toolbar="true"
  />
</template>
<script>
import CustomA from "./CustomA";
import Analyze from "./Analyze";
import Dialog from "./Dialog";
export default {
  dicts: ["sys_normal_disable", "sys_show_hide"],
  data() {
    const route = this.$route.name.toLowerCase();
    const BASE_URL = "/his/office";
    const form = [
      {
        name: "CustomA",
        component: CustomA,
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
        rules: [
          {
            required: true,
            message: "请输入科室负责人",
            trigger: "blur",
          },
        ],
      },
      {
        label: "科室电话",
        model: "deptPhone",
        component: "FormInput",
        width: 565,
        rules: [
          {
            pattern: /^[1]([3-9])[0-9]{9}$/,
            required: true,
            message: "请输入正确的科室电话",
            trigger: "blur",
          },
        ],
      },
      {
        label: "附件",
        model: "fileId",
        component: "FormUpdate",
        width: 565,
        upload: {
          action: `${process.env.VUE_APP_FILE_API}/minio/uploads`,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImRkZTg2MjBiLWFiY2EtNGU2Ni05NDUyLTY4ZjNmYmMxY2MxMiJ9.8F5v9uJ-YBWLe6s90lxeoQtt5OiTzENZIraOAf3L8odvjNTKhoPXldZzSYjVkBhToITj4bg-7OcNqSjc8Q9g5A",
          },
          multiple: true,
          // reg: /^.*\.(?:jpg|jpeg|png|doc|docx|pdf|xls|xlsx|ppt|pptx|txt|mp4|flv)$/i, //正则校验
          // size: 10, //限制10mb以内
          // textLabel: "支持word文件、excel文件等等，小于1M的文件",
          // sizeLabel: "",//限制大小描述
          // buttonLabel: "上传",// 按钮描述
        },
      },
    ];
    const ryOperate = {
      add: {
        size: "mini",
        type: "primary",
        label: "新增",
        params: {},
        method: "post",
        url: `${BASE_URL}`,
        hasPermi: `${route}:add`,
        mode: {
          type: "dialog",
          // width: 1000,
          // fullscreen: true,
          // modal: false,
          // modalAppendToBody: false,
          // appendToBody: false,
          // closeOnPressEscape: false,
          // showClose: false,
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
        params: {},
        disabled: "single",
        url: `${BASE_URL}`,
        method: "put",
        hasPermi: `${route}:edit`,
        mode: {
          type: "dialog",
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
          type: "dialog",
          detail: true, // 需要使用详情
          label: "deptId",
          rules: false, // 不需要校验
          form,
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
        label: "警告",
        plain: true,
        url: `${BASE_URL}`,
        method: "delete",
        hasPermi: `${route}:warn`,
        mode: {
          // subscribe: "是否警告填这个信息的人?",
          subscribe: (item) => {
            return item.deptLeader;
          },
          title: "警告",
          type: "error",
          label: "deptId",
          catch: () => {
            this.$message({
              type: "info",
              message: "已取消警告",
            });
          },
        },
      },
      // 自定义弹框
      hello: {
        size: "mini",
        label: "自定义弹框",
        params: { b: "resrse" },
        show: "table",
        mode: {
          type: "componentDialog",
          name: "Dialog", // 自定义组件都要有name作为该组件的ref值
          detail: true, // 需要使用详情
          component: Dialog, // 自定义组件
        },
      },
      // 自定义分析组件
      analyze: {
        size: "mini",
        type: "success",
        disabled: "single",
        plain: true,
        show: "table",
        icon: "el-icon-set-up",
        label: "自定义组件",
        mode: {
          type: "componentPage",
          name: "Analyze", // 自定义组件都要有name作为该组件的ref值
          component: Analyze, // 自定义组件
          detail: true, // 需要使用详情
        },
      },
      // 自定义详情路由
      router: {
        size: "mini",
        type: "danger",
        disabled: "single",
        show: "table",
        label: "自定义路由",
        plain: true,
        router: {
          // path: "/his/detail",
          name: "Detail",
          params: {
            sek: "lakei",
          },
          // query: {
          //   name: "参数",
          // },
        },
        mode: {
          type: "routerPage",
        },
      },
    };
    return {
      /* 顶部搜索条件 */
      rySearch: {
        labelAfter: ":",
        labelWidth: "100px",
        validateOnRuleChange: false,
        size: "mini",
        formWidth: 217,
        form: [
          {
            name: "CustomA", // 渲染保证唯一
            component: CustomA,
          },
          {
            label: "科室名称",
            model: "deptName",
            component: "FormInput",
            maxlength: "5",
            showWordLimit: true,
            regExp: "chinese",
            rules: [
              { required: true, message: "请输入科室名称", trigger: "blur" },
            ],
          },
          {
            label: "科室负责人",
            model: "deptLeader",
            readonly: true,
            component: "FormInput",
          },
          {
            label: "科室间接人",
            model: "deptLeaderP",
            component: "FormSelect",
            dict: "sys_normal_disable",
            allowCreate: true,
            filterable: true,
            multiple: true,
          },
        ],
      },
      /* 按钮和提交数据 */
      ryOperate,
      /* 列表数据 */
      ryTable: {
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
            label: "科室编码",
          },
          {
            label: "操作",
            operate: true, // 自动根据ryOperate中show字段进行截取
            width: "500",
            // rop
            // label
            // minWidth
            // fixed
            // formatter
            // align
            // className
            // labelClassName
            // showOverflowTooltip
          },
        ],
      },
    };
  },
  mounted() {
    const a = {
      name: () => {
        return "lakei";
      },
    };
    const b = JSON.parse(JSON.stringify(a));
    console.log(a);
    console.log(b);
  },
  methods: {
    cellStyle(row) {
      if (row.rowIndex === 1) {
        return { color: "#ff0053", border: "3px solid #567824" };
      }
    },

    catch() {
      console.log(23);
    },

    // 字典加载完成的回调
    onDictReady(dict) {
      // 初始化字典项
      this.$refs.FormMain.initDicts(dict);
    },
  },
};
</script>

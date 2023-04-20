<template>
  <div>
    <ry-layer-page
      ref="layerpage"
      :search-layer="searchLayer"
      :operate-layer="operateLayer"
      :display-layer="displayLayer"
      :loading="true"
    />
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
  data() {
    const BASE_URL = `/merApply`;
    const form = [
      {
        label: "公司名称",
        model: "unit",
        component: "FormInput",
        width: 260
      },
      {
        label: "手机号",
        model: "phone",
        component: "FormInput",
        width: 260
      },
      {
        label: "城市",
        model: "city",
        component: "FormInput",
        width: 260
      },
      {
        label: "报名日期",
        model: "createTime",
        type: "datetimerange",
        component: "FormDateRange" /* 年月日 */,
        startTimeLabel: "startTime",
        endTimeLabel: "endTime",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
        width: 260
      },
      {
        label: "是否参加",
        model: "isJoin",
        component: "FormSelect",
        dict: [{ label: "参加", value: "Y" }, { label: "不参加", value: "N" }],
        width: 260
      }
    ];
    const rules = message => {
      return [
        {
          required: true,
          message,
          trigger: "change"
        }
      ];
    };
    const addForm = [
      {
        label: "公司名称",
        model: "unit",
        component: "FormInput",
        hidden: true,
        rules: rules("请输入公司名称"),
        width: 260
      },
      {
        label: "手机号",
        model: "phone",
        component: "FormInput",
        rules: rules("请输入手机号"),
        width: 260
      },
      {
        label: "公司官网",
        model: "website",
        component: "FormInput",
        rules: rules("请输入官网"),
        width: 260
      },
      {
        label: "城市",
        model: "city",
        component: "FormInput",
        rules: rules("请输入城市"),
        width: 260
      },
      {
        label: "是否参加",
        model: "isJoin",
        component: "FormSelect",
        dict: [{ label: "参加", value: "Y" }, { label: "不参加", value: "N" }],
        rules: rules("请选择是否参加本次活动"),
        width: 260
      },
      {
        label: "活动建议",
        model: "adviceInfo",
        component: "FormTextarea",
        rules: rules("请输入手机号"),
        maxlength: 300,
        showWordLimit: true,
        rows: 5,
        width: 650
      },
      {
        label: "企业Logo",
        model: "logoPath",
        size: "small",
        component: "FormUpdate",
        rules: rules("请上传企业Logo"),
        width: 380,
        drag: true,
        icon: "el-icon-receiving",
        fileListLabel: "lsfj",
        multiple: false,
        listType: "picture",
        image: {
          show: true,
          alt: "图片异常",
          width: 200
        },
        pathLabel: "path",
        limit: 1,
        storage: "single",
        buttonLabel: "上传图片",
        upload: {
          action: `${process.env.VUE_APP_BASE_API}/minio/upload`,
          headers: { Authorization: `Bearer ${getToken()}` },
          reg: /^.*\.(?:jpg|jpeg|png)$/i,
          size: 5,
          textLabel:
            "请上传大小不超过 <span style='color:#ff0078'>5MB</span> 的文件",
          sizeLabel: "上传文件大小不能超过5MB"
        }
      }
    ];
    const operateLayer = {
      add: {
        size: "mini",
        type: "primary",
        label: "新增公司",
        icon: "el-icon-plus",
        params: {
          website: "https://github.com/lakei-edward",
          adviceInfo: "我的建议就是没建议..."
        },
        method: "post",
        url: `${BASE_URL}`,
        mode: {
          type: "Dialog",
          width: "70%",
          form: addForm
        }
      },
      submit: {
        size: "mini",
        type: "primary",
        label: "修改",
        icon: "el-icon-edit",
        params: {},
        disabled: "single",
        method: "put",
        url: `${BASE_URL}`,
        mode: {
          type: "Dialog",
          width: "70%",
          detail: true,
          form: addForm
        }
      },
      search: {
        size: "mini",
        type: "primary",
        label: "查看",
        icon: "el-icon-tickets",
        params: {},
        disabled: "single",
        method: "get",
        url: `${BASE_URL}`,
        mode: {
          type: "Dialog",
          width: "70%",
          detail: true,
          readonly: true,
          form: addForm
        }
      },
      remove: {
        size: "mini",
        type: "primary",
        label: "删除",
        icon: "el-icon-delete",
        params: {},
        method: "delete",
        disabled: "multipe",
        url: `${BASE_URL}`,
        mode: {
          subscribe: "确认删除改数据？",
          type: "warning",
          title: "提示",
          confirmButtonText: "确定"
        }
      },
      export: {
        size: "mini",
        type: "primary",
        label: "导出Excel",
        icon: "el-icon-download",
        params: {},
        method: "post",
        url: `${BASE_URL}/export`,
        mode: {
          type: "Export",
          paramsLabel: "exportIds",
          exportName: "公司信息.xlsx"
        }
      },
      exportWord: {
        size: "mini",
        type: "primary",
        label: "导出Word",
        icon: "el-icon-document-add",
        params: {},
        method: "post",
        disabled: "single",
        url: `${BASE_URL}/exportWord`,
        mode: {
          type: "Export",
          // paramsLabel: "exportIds",
          paramsType: "string",
          // exportName: "公司信息.docx"
          exportName: row => {
            return `${row.unit}.docx`;
          }
        }
      }
    };
    return {
      // 搜索层
      searchLayer: {
        labelWidth: "120px",
        size: "small",
        operateSize: "mini",
        searchName: "查询",
        resetName: "重置",
        params: {},
        form
      },
      // 操作层
      operateLayer,
      // 展示层
      displayLayer: {
        url: `${BASE_URL}`,
        params: {},
        dblclick: false, // 双击可查看
        border: true, // 是否带有纵向边框
        headerCellStyle: { textAlign: "center" }, // 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
        cellStyle: { "text-align": "center" }, // 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
        data: [
          {
            prop: "logo",
            label: "企业Logo",
            use: {
              element: "Avatar",
              attr: {
                path: "picPath",
                show: true,
                alt: "图片异常",
                width: 50
              }
            }
          },
          {
            prop: "unit",
            label: "公司名称"
          },

          {
            prop: "phone",
            label: "手机号"
          },
          {
            prop: "city",
            label: "城市"
          },

          {
            prop: "createTime",
            label: "报名日期"
          },
          {
            prop: "isJoin",
            label: "是否参加",
            use: {
              element: "Tag",
              attr: {
                type: "primary"
              }
            },
            callback: row => {
              return row.isJoin === "Y" ? "参加" : "不参加";
            }
          }
        ]
      }
    };
  },
  methods: {
    // 字典加载完成的回调
    onDictReady(dict) {
      // 初始化字典项
      this.$refs.layerpage.initDicts(dict);
    }
  }
};
</script>

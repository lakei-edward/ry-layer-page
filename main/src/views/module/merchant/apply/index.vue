<template>
  <div>
    <ry-layer-page
      ref="layerpage"
      :search-layer="searchLayer"
      :operate-layer="operateLayer"
      :display-layer="displayLayer"
      :loading="false"
    />
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
  dicts: ["sys_normal_disable", "sys_show_hide"],
  data() {
    const route = this.$route.name.toLowerCase();
    const kpType = this.$route.query.type;
    const BASE_URL = `/merApply`;
    const form = [
      {
        label: "单位名称",
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
        type: "daterange",
        component: "FormDateRange" /* 年月日 */,
        startTimeLabel: "startGrjdzjrq",
        endTimeLabel: "endGrjdzjrq",
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
    const addForm = [
      {
        label: "单位名称",
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
        label: "是否参加",
        model: "isJoin",
        component: "FormSelect",
        dict: [{ label: "参加", value: "Y" }, { label: "不参加", value: "N" }],
        width: 260
      },
      {
        label: "附件",
        model: "fileId",
        size: "small",
        component: "FormUpdate",
        width: 380,
        drag: true,
        icon: "el-icon-receiving",
        fileListLabel: "lsfi",
        multiple: true,
        buttonLabel: "上传图片",
        upload: {
          action: `${process.env.VUE_APP_BASE_API}/minio/upload`,
          headers: { Authorization: `Bearer ${getToken()}` },
          // reg: /^.*\.(?:jpg|jpeg|png|map4|doc|docx|xls|xlxs)$/i,
          size: 100,
          textLabel:
            "请上传大小不超过 <span style='color:#ff0078'>100MB</span> 的文件",
          sizeLabel: "上传文件大小不能超过100MB"
        }
      }
    ];
    const operateLayer = {
      add: {
        size: "mini",
        type: "primary",
        label: "新增单位",
        params: {},
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
        label: "提交",
        params: {},
        disabled: val => {
          return val[0].tjzt === "Y";
        },
        method: "post",
        url: `${BASE_URL}/updateTRckpGrjdzjByIds`,
        mode: {
          subscribe: "提交后，考核数据立即生效，确认无误后可点击确定。",
          type: "warning",
          title: "提示",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          showConfirmButton: true,
          showCancelButton: true,
          center: false,
          roundButton: false,
          paramsType: true // params传参模式，不是path传参
          // label: "deptId", // 取值id的别名
          // paramsLabel: "ids" // 参数别名
        }
      },
      search: {
        size: "mini",
        type: "primary",
        label: "查看",
        params: {},
        disabled: "single",
        method: "get",
        url: `${BASE_URL}`,
        multiPath: ["id", "type"], // 这里的type取得是undefined,后端接受的就是这个，因为type在list中没有这个字段，无所谓是什么
        mode: {
          type: "RouterPage",
          detail: true,
          router: {
            path: "/rckp/grjdzj-info/index/",
            query: {
              type: kpType,
              mode: "search"
            }
          }
        }
      },
      remove: {
        size: "mini",
        type: "primary",
        label: "删除", // todo 选择导出还未联调
        params: {},
        method: "delete",
        url: `${BASE_URL}`,
        mode: {
          subscribe: "提交后，考核数据立即生效，确认无误后可点击确定。",
          type: "warning",
          title: "提示",
          confirmButtonText: "确定"
        }
      },
      export: {
        size: "mini",
        type: "primary",
        label: "导出", // todo 选择导出还未联调
        params: {},
        method: "post",
        url: `${BASE_URL}/export`,
        mode: {
          type: "export",
          paramsLabel: "exportIds",
          exportName: "个人季度总结.xlsx"
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
        // border: true, // 是否带有纵向边框
        headerCellStyle: { textAlign: "center" }, // 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
        cellStyle: { "text-align": "center" }, // 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
        data: [
          {
            prop: "unit",
            label: "单位名称"
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
            label: "是否参加"
            // callback: row => {
            //   return row.tjzt === "Y" ? "参加" : "不参加";
            // }
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

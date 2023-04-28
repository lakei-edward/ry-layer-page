<template>
  <el-cascader
    :options="setOptions"
    v-model="form[model]"
    :size="size"
    :filterable="true"
    :clearable="clearable"
    :separator="separator"
    :props="optionProps"
    :popper-class="popperClass"
    :style="setStyle"
    @change="handleChange"
  >
  </el-cascader>
</template>
<script>
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText
} from "element-china-area-data";
import { TYPE_ARRAY, TYPE_STRING } from "../plugin/default";
export default {
  name: "FormSelect",
  data() {
    return {
      /** 数据 */
      optionsData: {
        provinceAndCityData, //省市二级联动
        regionData, //省市区三级联动
        provinceAndCityDataPlus, //省市二级联动（带“全部”选项）
        regionDataPlus //省市区三级联动（带“全部”选项）
      }
    };
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    model: {
      type: String,
      default: ""
    },
    size: {
      type: String
    },
    /** 自定义浮层类名 */
    popperClass: {
      type: String
    },
    /** 选项分隔符 */
    separator: {
      type: String,
      default: " / "
    },
    /** 表单整体宽度 */
    formWidth: {
      type: Number
    },
    /** 宽度 */
    width: {
      type: Number | String
    },
    /** 数据选项 */
    options: {
      type: String,
      default: "regionData"
    },
    /** 配置输出字段 默认value */
    optionProps: {
      type: Object,
      default: () => {}
    },
    /** 是否支持清空选项 */
    clearable: Boolean,
    /** 是否可搜索选项 */
    filterable: Boolean,
    /** change事件 */
    change: Function
  },
  computed: {
    /** 区分类型 */
    setStyle() {
      return {
        width: this.width
          ? typeof this.width === "string"
            ? this.width
            : this.width + "px"
          : this.formWidth + "px"
      };
    },
    /** 设置Options */
    setOptions() {
      return this.optionsData[this.options];
    }
  },
  beforeDestroy() {
    this.area = [];
  },
  methods: {
    /** 切换事件 */
    handleChange() {
      console.log(CodeToText);
      /** 处理字段值 */
      this.change && this.change();
    }
  }
};
</script>

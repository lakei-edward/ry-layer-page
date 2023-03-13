<template>
  <div>
    <Treeselectlist
      :placeholder="placeholder"
      class="treeselect-main"
      v-model="form[model]"
      :options="deptList"
      :appendToBody="appendToBody"
      :show-count="showCount"
      :maxHeight="maxHeight"
      :normalizer="normalizer"
      :alwaysOpen="alwaysOpen"
      :flat="flat"
      :multiple="multiple"
      :disabled="disabled"
      :noResultsText="noResultsText"
      :clearable="clearable"
      :z-index="zIndex"
      :style="{ width: width ? width + 'px' : formWidth + 'px' }"
    />
  </div>
</template>
<script>
import Treeselectlist from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "FormTreeSelect",
  data() {
    return {
      deptList: []
    };
  },
  props: {
    form: {
      type: Object
    },
    model: {
      type: String,
      required: true
    },
    treeUrl: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    noResultsText: {
      type: String,
      default: "没有找到该单位"
    },
    normalizer: {
      type: Function
    },
    callback: {
      type: Function
    },
    params: {
      type: Object
    },
    width: {
      type: Number,
      default: 217
    },
    formWidth: {
      type: Number
    },
    zIndex: {
      type: Number,
      default: 999
    },
    maxHeight: {
      type: Number
    },
    clearable: Boolean,
    showCount: Boolean,
    multiple: Boolean,
    disabled: Boolean,
    alwaysOpen: Boolean,
    appendToBody: Boolean,
    flat: Boolean // 是否启用平面模式。
  },
  components: { Treeselectlist },
  inject: ["request"],
  mounted() {
    /** 查询部门下拉树结构 */
    this.getTreeselect();
  },
  methods: {
    /** 查询部门下拉树结构 */
    async getTreeselect() {
      if (!this.treeUrl) {
        return;
      }
      if (this.request) {
        const res = await this.request({
          url: this.treeUrl,
          methods: "get",
          params: this.params
        });
        if (!this.callback) {
          this.deptList = res.data;
        } else {
          this.deptList = this.callback(res.data);
        }
      }
    }
  }
};
</script>

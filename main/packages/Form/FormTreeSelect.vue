<template>
  <div>
    <Treeselectlist
      placeholder="请选择"
      class="treeselect-main"
      v-model="form[model]"
      :options="deptOptions"
      :appendToBody="true"
      :show-count="true"
      noResultsText="没有找到该单位"
      :z-index="9999"
      :style="{ width: width + 'px' }"
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
      deptOptions: []
    };
  },
  props: {
    form: {
      type: Object
    },
    model: {
      type: String
    },
    deptUrl: {
      type: String,
      default: "/system/dept/treeselect"
    },
    width: {
      type: Number,
      default: 217
    }
  },
  components: { Treeselectlist },
  created() {
    /** 查询部门下拉树结构 */
    this.getTreeselect();
  },
  methods: {
    /** 查询部门下拉树结构 */
    async getTreeselect() {
      if(request){

        const res = await request({
          url: this.deptUrl
      });
      this.deptOptions = res.data;
        }
    }
  }
};
</script>

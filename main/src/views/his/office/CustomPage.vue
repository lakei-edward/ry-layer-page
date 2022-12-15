<template>
  <div>
    <h1>自定义组件页面</h1>
    {{ params }}
    <el-button @click="submit">提交</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    pageVisible: {
      type: Boolean,
      required: true,
    },
    queryList: {
      type: Function,
    },
    params: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},
  methods: {
    submit() {
      // 回到首页
      this.$emit("update:pageVisible", false);
      // 或者
      // this.$parent.pageVisible=false;
      // 回到首页,重新查询数据
      this.queryList();
      // 或者
      // this.$parent.queryList();
    },
  },
};
</script>

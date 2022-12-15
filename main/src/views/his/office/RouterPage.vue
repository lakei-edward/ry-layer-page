<template>
  <div>
    <h1>路由自定义页面</h1>
    <el-button @click="submit">提交</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: [],
  mounted() {
    console.log(this.$route.query.params);
  },
  methods: {
    submit() {
      this.$router.push("/his/office");
    },
  },
};
</script>

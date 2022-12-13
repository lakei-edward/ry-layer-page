<template>
  <div>
    <h1>详情页</h1>
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
    console.log(this.$route);
  },
  methods: {
    submit() {
      this.$router.push("/his/office");
    },
  },
};
</script>

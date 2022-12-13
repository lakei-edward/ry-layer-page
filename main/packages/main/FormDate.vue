<template>
  <div>
    <el-date-picker
      v-model="form[model]"
      type="date"
      :clearable="clearable"
      :value-format="format"
      placeholder="选择日期"
      size="mini"
      :style="{ width: width + 'px' }"
    >
    </el-date-picker>
  </div>
</template>
<script>
export default {
  name: "FormDate",
  data() {
    return {};
  },
  props: {
    form: {
      type: Object
    },
    model: {
      type: String
    },
    clearable: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 217
    },
    format: {
      type: String,
      default: "yyyy-MM-dd"
    }
  },
  mounted() {}
};
</script>

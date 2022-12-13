<template>
  <div>
    <el-date-picker
      :clearable="clearable"
      :value-format="format"
      v-model="dateTime"
      type="daterange"
      range-separator="~"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      size="mini"
      @change="clearModel"
    ></el-date-picker>
  </div>
</template>
<script>
export default {
  name: "FormDateRange",
  data() {
    return {
      dateTime: []
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
    clearable: {
      type: Boolean,
      default: true
    },
    format: {
      type: String,
      default: "yyyy-MM-dd"
    }
  },
  methods: {
    clearModel(val) {
      this.$emit("dateChange", val);
    }
  }
};
</script>

<template>
  <el-date-picker
    v-model="dateTime"
    :type="type"
    :format="format"
    :disabled="disabled"
    :editable="editable"
    :clearable="clearable"
    :placeholder="placeholder"
    :size="size"
    :value-format="valueFormat"
    :popper-class="popperClass"
    :prefix-icon="prefixIcon"
    :append-to-body="appendToBody"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :style="{ width: width + 'px' }"
    @change="changeDate"
  >
  </el-date-picker>
</template>
<script>
export default {
  name: "FormDateRange",
  data() {
    return {
      dateTime: [],
    };
  },
  props: {
    form: {
      type: Object,
    },
    model: {
      type: String,
    },
    type: {
      type: String,
    },
    size: {
      type: String,
    },
    popperClass: {
      type: String,
    },
    valueFormat: {
      type: String,
    },
    prefixIcon: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    startTimeLabel: {
      type: String,
      default: "startTime",
    },
    endTimeLabel: {
      type: String,
      default: "endTime",
    },
    startPlaceholder: {
      type: String,
      default: "开始时间",
    },
    endPlaceholder: {
      type: String,
      default: "结束时间",
    },
    width: {
      type: Number,
      default: 217,
    },
    format: {
      type: String,
      default: "yyyy-MM-dd",
    },
    disabled: Boolean,
    editable: Boolean,
    clearable: Boolean,
    appendToBody: Boolean,
  },
  methods: {
    changeDate(val) {
      if (val && val.length > 0) {
        this.form[this.startTimeLabel] = val[0];
        this.form[this.endTimeLabel] = val[1];
      }
    },
  },
};
</script>

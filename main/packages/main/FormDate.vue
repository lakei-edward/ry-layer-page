<template>
  <el-date-picker
    v-model="form[model]"
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
    :style="{ width: width ? width + 'px' : formWidth + 'px' }"
  >
  </el-date-picker>
</template>
<script>
export default {
  name: "FormDate",
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
    },
    formWidth: {
      type: Number,
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
};
</script>

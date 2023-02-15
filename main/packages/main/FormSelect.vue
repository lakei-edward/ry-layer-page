<template>
  <el-select
    v-model="form[model]"
    :size="size"
    :clearable="true"
    :placeholder="placeholder"
    :disabled="disabled"
    :multiple="multiple"
    :filterable="filterable"
    :allow-create="allowCreate"
    :popper-class="popperClass"
    :style="{ width: width ? width + 'px' : formWidth + 'px' }"
  >
    <el-option
      v-for="option in dict"
      :key="option.dictValue"
      :label="option.dictLabel"
      :value="option.dictValue"
    />
  </el-select>
</template>
<script>
export default {
  name: "FormSelect",
  props: {
    form: {
      type: Object,
      default: () => {},
    },
    model: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
    size: {
      type: String,
    },
    formWidth: {
      type: Number,
    },
    width: {
      type: Number,
    },
    dict: {
      type: Array | null,
    },
    popperClass: {
      type: String,
    },
    multiple: Boolean,
    clearable: Boolean,
    disabled: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
  },
};
</script>

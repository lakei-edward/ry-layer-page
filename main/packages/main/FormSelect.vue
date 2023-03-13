<template>
  <el-select
    v-model="form[model]"
    :size="size"
    :clearable="clearable"
    :placeholder="placeholder"
    :disabled="disabled"
    :multiple="multiple"
    :filterable="filterable"
    :allow-create="allowCreate"
    :popper-class="popperClass"
    :style="{ width: width ? width + 'px' : formWidth + 'px' }"
    @change="handleChange($event)"
  >
    <el-option
      v-for="option in dict"
      :key="option[keyModel]"
      :label="option[GET_KEY[0]]"
      :value="change ? option : option[GET_KEY[1]]"
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
      default: "请选择",
    },
    size: {
      type: String,
    },
    keyModel: {
      type: String,
      default: "value",
    },
    formWidth: {
      type: Number,
    },
    width: {
      type: Number,
    },
    dict: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Array | null,
    },
    popperClass: {
      type: String,
    },
    filed: {
      type: Object,
    },
    multiple: Boolean,
    clearable: Boolean,
    disabled: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    /* 有change时间的，传递item过去，否则传递value */
    change: Function,
  },
  computed: {
    /** 根据main.js中配置的dictField来取 */
    GET_KEY() {
      return Object.values(this.$options.filed);
    },
  },
  methods: {
    handleChange(val) {
      console.log(val)
      this.change && this.change(val);
    },
  },
};
</script>

<template>
  <el-input
    v-model="form[model]"
    :placeholder="placeholder"
    :style="{ width: width ? width + 'px' : formWidth + 'px' }"
    :maxlength="maxlength"
    :minlength="minlength"
    :show-word-limit="showWordLimit"
    :clearable="clearable"
    :show-password="showPassword"
    :size="size"
    :disabled="disabled"
    :readonly="readonly"
    :autofocus="autofocus"
    :prefix-icon="prefixIcon"
    :suffix-icon="suffixIcon"
    @input="regExp ? handleRegExp(form[model]) : ''"
  />
</template>
<script>
import REGEXP from '../plugin/regExp';
export default {
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    model: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    size: {
      type: String
    },
    regExp: {
      type: String
    },
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    maxlength: {
      type: Number | String
    },
    minlength: {
      type: Number | String
    },
    width: {
      type: Number
    },
    formWidth: {
      type: Number
    },
    showWordLimit: Boolean,
    clearable: Boolean,
    showPassword: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    autofocus: Boolean
  },
  methods: {
    handleRegExp(value) {
      value = value.replace(REGEXP[this.regExp], '');
      this.form[this.model] = value;
    }
  }
};
</script>

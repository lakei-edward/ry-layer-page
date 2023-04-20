<template>
  <div id="FormTextarea">
    <el-input
      type="textarea"
      v-model="form[model]"
      :placeholder="placeholder"
      :style="{ width: width ? width + 'px' : formWidth + 'px' }"
      :maxlength="maxlength"
      :minlength="minlength"
      :show-word-limit="showWordLimit"
      :clearable="clearable"
      :show-password="showPassword"
      :size="size"
      :rows="rows"
      :disabled="disabled"
      :readonly="readonly"
      :autofocus="autofocus"
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
    />
  </div>
</template>
<script>
export default {
  name: "FormTextarea",
  data() {
    return {};
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
    rows: {
      type: Number
    },
    placeholder: {
      type: String,
      default: "请输入"
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
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Number | String
    },
    minlength: {
      // eslint-disable-next-line vue/require-prop-type-constructor
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
  }
};
</script>

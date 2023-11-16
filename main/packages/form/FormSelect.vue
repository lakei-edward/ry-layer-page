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
    :style="setStyle"
    @change="handleChange($event)"
  >
    <el-option
      v-for="option in dict"
      :key="option[keyModel]"
      :label="option[GET_KEY[0]]"
      :value="setValue(option)"
    />
  </el-select>
</template>
<script>
export default {
  name: 'FormSelect',
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
      default: '请选择'
    },
    size: {
      type: String
    },
    keyModel: {
      type: String,
      default: 'value'
    },
    formWidth: {
      type: Number
    },
    width: {
      type: Number | String
    },
    dict: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Array | null
    },
    popperClass: {
      type: String
    },
    filed: {
      type: Object
    },
    multiple: Boolean,
    clearable: Boolean,
    disabled: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    /* 有change时间的，传递item过去，否则传递value */
    change: Function,
    /** value返回什么值 */
    optionValue: Boolean
  },
  computed: {
    /** 区分类型 */
    setStyle() {
      return {
        width: this.width
          ? typeof this.width === 'string'
            ? this.width
            : this.width + 'px'
          : this.formWidth + 'px'
      }
    },
    /** 根据main.js中配置的dictField来取 */
    GET_KEY() {
      return Object.values(this.$options.filed)
    },
    /** 设置value返回什么值 */
    setValue() {
      return function (option) {
        if (this.change) {
          if (this.optionValue) {
            return option[this.GET_KEY[1]]
          } else {
            return option
          }
        } else {
          return option[this.GET_KEY[1]]
        }
      }
    }
  },
  methods: {
    handleChange(val) {
      this.change && this.change(val)
    }
  }
}
</script>

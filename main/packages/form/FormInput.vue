<template>
  <span>
    <el-input
      v-model="form[model]"
      :placeholder="placeholder"
      :style="setStyle"
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
      @click.native="click ? click(form) : ''"
      @change="change ? change($event) : ''"
      @blur="blur ? blur(form) : ''"
      @focus="focus ? focus(form) : ''"
    />
    <el-button v-if="isPhoneCode" @click="sendCode" :disabled="setDisabled">
      <template v-if="!isSend"> 发送验证码 </template>
      <template v-else> {{ fre }}s </template>
    </el-button>
  </span>
</template>
<script>
import mixins from '../plugin/mixin'
import REGEXP from '../plugin/regExp'
export default {
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    code: {
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
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Number | String
    },
    minlength: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Number | String
    },
    width: {
      type: Number | String
    },
    formWidth: {
      type: Number
    },
    showWordLimit: Boolean,
    clearable: Boolean,
    showPassword: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    click: Function,
    change: Function,
    blur: Function,
    focus: Function,
    isPhoneCode: Boolean
  },
  mixins: [mixins],
  provide() {
    return {
      request: this.$options.methods.request
    }
  },
  computed: {
    /** 设置禁用情况 */
    setDisabled() {
      return this.isSend
    },
    /** 区分类型 */
    setStyle() {
      return {
        width: this.width
          ? typeof this.width === 'string'
            ? this.width
            : this.isPhoneCode
              ? this.width - 112 + 'px'
              : this.width + 'px'
          : this.formWidth + 'px'
      }
    }
  },
  data() {
    return {
      /** 倒数秒数 */
      fre: 60,
      /** 是否发送 */
      isSend: false,
      /** 定时器 */
      timer: null
    }
  },
  mounted() {
    // 接受参数
    this.fre = this.isPhoneCode ? this.code?.second : 60
  },
  beforeDestroy() {
    this.timer = null
  },
  methods: {
    /** 正则校验 */
    handleRegExp(value) {
      value = value.replace(REGEXP[this.regExp], '')
      this.form[this.model] = value
    },
    /** 发送验证码 */
    async sendCode() {
      const assign = this.code.assign
      const realPhone = this.form[assign]
      // 判断是否为空
      if (realPhone) {
        // 判断是否为真实的手机号
        if (REGEXP.phone.test(realPhone)) {
          await this.request({
            url: this.code.url,
            params: { [assign]: realPhone } // 这里assign指派的字段要和后端接受的字段一致
          })
          this.isSend = true
          /** 处理发送频率 */
          this.handleThrottle()
        } else {
          this.$warning('请输入正确的手机号码')
        }
      } else {
        this.$info('请先填写手机号码')
      }
    },
    /** 处理发送频率 */
    handleThrottle() {
      this.timer = setInterval(() => {
        this.fre--
        // 当倒数为0的时候重置操作
        if (this.fre === 0) {
          clearInterval(this.timer)
          this.timer = null
          this.fre = this.code.second
          this.isSend = false
        }
      }, 1000)
    }
  }
}
</script>

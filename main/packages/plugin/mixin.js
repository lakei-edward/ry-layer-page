import { judgeType, isUndef } from './util'
import { download } from './download.js'
import { LABEL_AFTER, FORM_WIDTH } from './default'
export default {
  computed: {
    /** 设置label */
    $setLabel() {
      return function (label, labelAfter) {
        return `${label}${labelAfter ? labelAfter : LABEL_AFTER}`
      }
    },
    /** 是否是函数 */
    $isFunction() {
      return function (v) {
        return judgeType(v) === 'Function'
      }
    },
    /** 动态设置form组件 */
    $setInfoWidth() {
      return function (v) {
        return v.width ? `${v.width}px` : FORM_WIDTH
      }
    },
    /**
     * 配置为null和undifined是，也就是没有该项配置，结果为true，
     * 配置为true时，取反
     */
    $isUndef() {
      return function (v) {
        return isUndef(v) ? true : !v
      }
    },
    /**
     * 默认为false
     */
    $isDeFalse() {
      return function (v) {
        return isUndef(v) ? false : v
      }
    },
    /**
     * 默认为true
     * 定稿，只用来判断属性为Boolean，其他的不判断
     * 场景：默认为true时，不传就为true,传的话根据true/false判断
     * 当该项不传时：true
     * 当该项传true：true
     * 当该项传false：false
     */
    $isDeTrue() {
      return function (v) {
        return isUndef(v) ? true : v
      }
    },
    /**
     * 只有时字符串的并且hidden不为true时为true
     */
    $judgeTypeCom() {
      return function (v, hidden) {
        if (typeof v !== 'string') {
          return false
        } else {
          return !this.$isDeFalse(hidden) // 如果不是自定义函数，根据hidden判断显隐
        }
      }
    }
  },
  methods: {
    $info(msg) {
      this.$message({ showClose: true, message: msg, type: 'info' })
    },
    $warning(msg) {
      this.$message({ showClose: true, message: msg, type: 'warning' })
    },
    $error(msg) {
      this.$message({ showClose: true, message: msg, type: 'error' })
    },
    $success(msg) {
      this.$message({ showClose: true, message: msg, type: 'success' })
    },
    /** minio附件下载 不是导出功能 */
    $minioDownFiles(file, item) {
      const url = item.downloadUrl ? item.downloadUrl : '/minio/download'
      download(`${url}/${file.fileId}`, {}, file.name, this.$options.methods.request)
    }
  }
}

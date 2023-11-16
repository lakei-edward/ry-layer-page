import Dict from './dict'
export default function (Vue, option) {
  Vue.mixin({
    data() {
      if (
        this.$options === undefined ||
        this.$options.dicts === undefined ||
        this.$options.dicts === null
      ) {
        return {}
      }
      const dict = new Dict(option, Vue)
      dict.vm = this
      return {
        dict
      }
    },
    created() {
      if (!(this.dict instanceof Dict)) {
        return
      }
      this.dict.init(this.$options.dicts).then(() => {
        this.$nextTick(() => {
          if (this.$options.methods && this.$options.methods.onDictReady instanceof Function) {
            this.$options.methods.onDictReady.call(this, this.dict)
          }
        })
      })
    }
  })
}

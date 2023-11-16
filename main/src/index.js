import FormSelect from '../packages/form/FormSelect.vue'
import FormInput from '../packages/form/FormInput.vue'
import ryLayerPage from '../packages/main/LayerPage.vue'
import OperateForm from '../packages/main/OperateForm'
import SingleForm from '../packages/main/SingleForm.vue'
import Dict from '../packages/dict/index'

const install = function (Vue, opts = {}) {
  if (opts) {
    if (opts.http instanceof Function) {
      ryLayerPage.methods.request = opts.http
      OperateForm.methods.request = opts.http
      FormInput.methods.request = opts.http
      Vue.component(ryLayerPage.name, ryLayerPage)
      Vue.component(OperateForm.name, OperateForm)
      Vue.component(SingleForm.name, SingleForm)
    } else {
      throw Error('http must be a function')
    }
    const filed = {
      dictLabel: 'dictLabel',
      dictValue: 'dictValue'
    }
    const dictField = opts.dictField ? opts.dictField : filed
    FormSelect.filed = dictField
    ryLayerPage.filed = dictField
    Vue.use(Dict, {
      dict: opts.dict,
      dictField
    })
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install }

import init from './init'
function install(Vue, options) {
  Vue.use(init, {
    metas: {
      '*': {
        request: options.dict,
        field: options.dictField
      }
    }
  })
}
export default install

import FormMain from "../packages/Form/FormMain.vue";
import Dict from "../packages/Form/dict/index";

const install = function (Vue, opts = {}) {
  FormMain.methods.request = opts.request;
  Vue.component(FormMain.name, FormMain);
  if (opts.dict) {
    Vue.use(Dict, opts.dict);
  }
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };

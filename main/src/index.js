import RyMinifyPage from "../packages/main/index.vue";
import Dict from "../packages/dict/index";

const install = function (Vue, opts = {}) {
  if (opts) {
    if (opts.request instanceof Function) {
      RyMinifyPage.methods.request = opts.request;
      Vue.component(RyMinifyPage.name, RyMinifyPage);
    } else {
      throw Error("request must be a function");
    }

    if (opts.dict instanceof Function) {
      Vue.use(Dict, opts.dict);
    } else {
      throw Error("dict must be a function");
    }
  }
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };

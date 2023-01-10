import ryLayerPage from "../packages/main/index.vue";
import Dict from "../packages/dict/index";

const install = function (Vue, opts = {}) {
  if (opts) {
    if (opts.http instanceof Function) {
      ryLayerPage.methods.request = opts.http;
      Vue.component(ryLayerPage.name, ryLayerPage);
    } else {
      throw Error("http must be a function");
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

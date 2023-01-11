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
    const filed = {
      labelField: "dictLabel",
      valueField: "dictValue",
    };
    Vue.use(Dict, {
      dict: opts.dict,
      dictField: opts.dictField ? opts.dictField : filed,
    });
  }
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };

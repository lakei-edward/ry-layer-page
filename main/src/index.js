import ryLayerPage from "../packages/main/index.vue";
import SingleForm from "../packages/main/SingleForm.vue";
import SingleFormPiece from "../packages/main/SingleFormPiece.vue";
import Dict from "../packages/dict/index";
import FormSelect from "../packages/main/FormSelect.vue";

const install = function(Vue, opts = {}) {
  if (opts) {
    if (opts.http instanceof Function) {
      ryLayerPage.methods.request = opts.http;
      SingleForm.methods.request = opts.http;
      Vue.component(ryLayerPage.name, ryLayerPage);
      Vue.component(SingleForm.name, SingleForm);
      Vue.component(SingleFormPiece.name, SingleFormPiece);
    } else {
      throw Error("http must be a function");
    }
    const filed = {
      dictLabel: "dictLabel",
      dictValue: "dictValue"
    };
    const dictField = opts.dictField ? opts.dictField : filed;
    FormSelect.filed = dictField;
    ryLayerPage.filed = dictField;
    Vue.use(Dict, {
      dict: opts.dict,
      dictField
    });
  }
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };

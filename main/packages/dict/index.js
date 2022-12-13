import init from "./init";
function install(Vue, request) {
  Vue.use(init, {
    metas: {
      "*": {
        labelField: "dictLabel",
        valueField: "dictValue",
        request,
      },
    },
  });
}
export default install;

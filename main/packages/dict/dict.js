export default class Dict {
  constructor(options, Vue) {
    this.label = {};
    this.type = {};
    this.vm = null;
    this._dictMetas = options;
    this._Vue = Vue;
  }
  init(dicts) {
    const types = dicts;
    const ps = [];
    types.map(meta => {
      this._Vue.set(this.type, meta, {});
      this._Vue.set(this.label, meta, {});
      ps.push(loadDict(this, meta, this._Vue));
    });
    return Promise.all(ps);
  }
}
function loadDict(that, meta, _Vue) {
  const { field, request } = that._dictMetas.metas["*"];
  return request(meta).then(({ data: dicts }) => {
    if (dicts && Array.isArray(dicts)) {
      const types = [];
      dicts.forEach(r => {
        _Vue.set(that.label[meta], r.dictValue, r.dictLabel);
        types.push({
          [field.labelField]: r[field.labelField],
          [field.valueField]: r[field.valueField],
          raw: r
        });
      });
      that.type[meta] = types;
      return types;
    }
  });
}

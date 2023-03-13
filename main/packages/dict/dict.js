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
      // 因为在mian.js中dict的key和value都是自定义的，所以说两者都不确定
      const _key = Object.keys(field);
      const _value = Object.values(field);
      dicts.forEach(r => {
        that.label[meta][r[_key[1]]] = r[_key[0]];
        types.push({
          [_value[0]]: r[_key[0]],
          [_value[1]]: r[_key[1]],
          raw: r
        });
      });
      that.type[meta] = types;
      return types;
    }
  });
}

export default class Dict {
  constructor(options) {
    this.label = {};
    this.type = {};
    this.vm = null;
    this._dictMetas = options;
  }
  init(dicts) {
    const types = dicts;
    const ps = [];
    types.map((meta) => {
      this.type[meta] = {};
      this.label[meta] = {};
      ps.push(loadDict(this, meta));
    });
    return Promise.all(ps);
  }
}
function loadDict(that, meta) {
  const { field, request } = that._dictMetas.metas["*"];
  return request(meta).then(({ data: dicts }) => {
    if (dicts && Array.isArray(dicts)) {
      const types = [];
      dicts.forEach((r) => {
        that.label[meta][r.dictValue] = r.dictLabel;
        types.push({
          [field.labelField]: r[field.labelField],
          [field.valueField]: r[field.valueField],
          raw: r,
        });
      });
      that.type[meta] = types;
    }
  });
}

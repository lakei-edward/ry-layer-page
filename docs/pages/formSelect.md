# FormSelect

## 使用示例

在使用`FormSelect`选择框时，可配合字典一起使用；`onDictReady`方法是自动根据`$options.dicts`中的每一项字典名称获取数据后，把数据返回到当前组件中。

```vue
<script>
export default {
  dicts: ["sys_normal_class", "sys_show_hide"],
  data() {
    return {
      searchLayer: {
        form: [
          {
            label: "科室类别",
            model: "deptClass",
            component: "FormSelect",
            dict: "sys_normal_class",
            rules: [
              {
                required: true,
                message: "请输入科室名称",
                trigger: "change",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    // 字典加载完成的回调
    onDictReady(dict) {
      // 初始化字典项
      this.$refs.layerPage.initDicts(dict);
    },
  },
};
</script>
```

## 属性

| 属性     | 说明        | 类型  | 可选值 | 默认值
| :------- | :----------- | :------ | :------------------------------------------ | :----- |
|component|当前使用的单表单组件|object|—|—|
|label|描述|string|—|—|
|model|该组件需向接口传递的字段|string|—|—|
|dict|字典选项|string|—|—|
|multiple|是否多选|boolean|—|false|
|disabled|是否禁用|boolean|—|false|
|size|输入框尺寸|string|medium/small/mini|—|
|clearable|是否可以清空选项|boolean|—|false|
|placeholder|占位符|string|—|请选择|
|allow-create|是否允许用户创建新条目，需配合 filterable 使用|boolean|—|false|
|popper-class|Select 下拉框的类名|string|—|—|
|filterable|是否可搜索|boolean|—|false|
|formWidth|宽度|number|—|—|
|rules|	elementUI规则校验|	array	|— |	—|
<style>
table th:nth-of-type(1) {
    width: 20%;
}
table th:nth-of-type(2) {
    width: 40%;
}
</style>
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

## 支持事件

```vue
<script>
export default {
  data() {
    return {
      searchLayer: {
        form: [
          {
            label: "科室类别",
            model: "deptClass",
            component: "FormSelect",
            dict: "sys_normal_class",
            change: this.handleScores
          },
        ],
        ...
      },
    };
  },
  methods: {
    /** 处理考核得分的结果 */
    handleScores(val) {
      if (this.remark === "3") {
        this.operateLayer.params.khdf = -(val / 100);
      } else {
        // 如果有计算则按计算来，没有的话恢复原来值
        if (this.operateLayer.params.score) {
          this.operateLayer.params.khdf = (
            this.operateLayer.params.score * this.khdfClone
          ).toFixed(2);
        } else {
          this.operateLayer.params.khdf = this.khdfClone;
        }
      }
    },
  }
};
</script>
```

## 支持自定义数据

此时的 dict 传的不再是一个字典字符串了，而是自己自定义的数据，不过 key 和 value 要和全局的对应上！

```js
{
  label: "接诊状态",
  model: "status",
  dict: [
    { label: "否", value: "0" },
    { label: "是", value: "1" }
  ],
  component: "FormSelect"
}
```

### 接口返回的数据

此处还可以传一个函数，最终返回一个 list 类型数据，这个 list 数据的 key 和 value 要和全局的对应上！

```js
{
  label: "接诊状态",
  model: "status",
  dict: this.fetchSelectData(),
  component: "FormSelect"
}

/** 获取考核内容数据 */
async fetchSelectData() {
  this.routerInfo = this.$route.query;
  let response = await listData({ dictType: this.routerInfo.type });
  this.khnrList = response.rows;
  this.khnrList.forEach((r) => {
    r.value = r.dictValue;
    r.label = r.dictLabel;
  });
  this.khnrList = this.khnrList.filter((r) => r.status === "0");
  return this.khnrList;
},
```

## 属性

| 方法名       | 说明                                                                                         | 参数                  | 可选值            | 默认值 |
| :----------- | :------------------------------------------------------------------------------------------- | :-------------------- | :---------------- | :----- | --- |
| component    | 当前使用的单表单组件                                                                         | object                | —                 | —      |
| label        | 描述                                                                                         | string                | —                 | —      |
| model        | 该组件需向接口传递的字段                                                                     | string                | —                 | —      |
| dict         | 字典选项                                                                                     | string/array/function |                   | —      | —   |
| multiple     | 是否多选                                                                                     | boolean               | —                 | false  |
| disabled     | 是否禁用                                                                                     | boolean               | —                 | false  |
| size         | 输入框尺寸                                                                                   | string                | medium/small/mini | —      |
| clearable    | 是否可以清空选项                                                                             | boolean               | —                 | false  |
| placeholder  | 占位符                                                                                       | string                | —                 | 请选择 |
| allow-create | 是否允许用户创建新条目，需配合 filterable 使用                                               | boolean               | —                 | false  |
| popper-class | Select 下拉框的类名                                                                          | string                | —                 | —      |
| filterable   | 是否可搜索                                                                                   | boolean               | —                 | false  |
| formWidth    | 宽度                                                                                         | number                | —                 | —      |
| rules        | elementUI 规则校验                                                                           | array                 | —                 | —      |
| optionValue  | 使用 change 事件时生效，当绑定 change 事件，则默认返回对象，当该值为 true 时，则只返回 value | boolean               | —                 | —      |
| keyModel     | 绑定在 select 中的 key 字段，避免 value 值重复时，一直报错，示例`keyModel: "createTime"`     | string                | —                 | value  |

## 事件

| 属性   | 说明                 | 回调参数       |
| :----- | :------------------- | :------------- |
| change | 选中值发生变化时触发 | 目前的选中数据 |

<style>
table th:nth-of-type(1) {
    width: 20%;
}
table th:nth-of-type(2) {
    width: 40%;
}
</style>

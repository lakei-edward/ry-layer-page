# FormDate

## 使用示例

```vue
<script>
export default {
  data() {
    return {
      searchLayer: {
        form: [
          {
            label: "时间",
            model: "warnTime",
            component: "FormDate",
            clearable: true,
          },
        ],
      },
    };
  },
};
</script>
```

## 默认时间

在新增数据的时候，时间选择器需要默认当前时间怎么办？只需要在`params`中提前声明该字段的值即可。

```vue
<script>
export default {
  data() {
    return {
      operateLayer: {
        add: {
          params: {
            warnTime: new Date(),
          },
          mode: {
            form: [
              {
                label: "预警时间",
                model: "warnTime",
                component: "FormDate",
              },
            ],
          },
        },
      },
    };
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
|type|显示类型|string|year/month/date/dates/months/years week/datetime/datetimerange/ daterange/monthrange|date|
|format|显示在输入框中的格式|string|见日期格式|yyyy-MM-dd|
|disabled|禁用|boolean|—|false|
|editable|文本框可输入|boolean|—|true|
|clearable|是否显示清除按钮|boolean|—|true|
|size|输入框尺寸|string|large, small, mini|—|
|placeholder|非范围选择时的占位内容|string|—|请选择|
|popperClass|DatePicker 下拉框的类名|string|—|—|
|valueFormat|可选，绑定值的格式。不指定则绑定值为 Date 对象|string|见日期格式|yyyy-MM-dd|
|prefixIcon|自定义头部图标的类名|string|—|el-icon-date|
|appendToBody|DetePicker 自身是否插入至 body 元素上。|boolean|—|true|
|appendToBody|DetePicker 自身是否插入至 body 元素上。|boolean|—|true|
|disabledDate |设置禁用选择日期，禁用今天之前/今天之后|string|before/after|—|

<style>
table th:nth-of-type(1) {
    width: 20%;
}
table th:nth-of-type(2) {
    width: 40%;
}
</style>
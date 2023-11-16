# FormDateRange

## 使用示例

`FormDate`组件传递时间范围的时候，只能传递数组形式的，如果需要传递`startTime、endTime`单个字段的话，需要使用`FormDateRange`单表单组件，让我们来看下`FormDateRange`的具体用法

```vue
<script>
export default {
  data() {
    const route = this.$route.name.toLowerCase()
    return {
      operateLayer: {
        add: {
          size: 'mini',
          label: '新增',
          params: {},
          method: 'post',
          url: '/his/office',
          hasPermi: `${route}:add`,
          mode: {
            type: 'Dialog',
            form: [
              {
                label: '预警时间',
                type: 'daterange',
                component: 'FormDateRange'
              },
              {
                label: '门诊时间',
                type: 'monthrange',
                valueFormat: 'yyyy-MM',
                startTimeLabel: 'startTimeMZ',
                endTimeLabel: 'endTimeMZ',
                component: 'FormDateRange'
              }
            ]
          }
        }
      }
    }
  }
}
</script>
```

## 属性

| 属性            | 说明                                                                 | 类型    | 可选值                | 默认值                 |
| :-------------- | :------------------------------------------------------------------- | :------ | :-------------------- | :--------------------- | --- |
| component       | 当前使用的单表单组件                                                 | object  | —                     | —                      |
| label           | 描述                                                                 | string  | —                     | —                      |
| model           | 该组件需向接口传递的字段                                             | string  | —                     | —                      |
| startTimeLabel  | 开始时间别名                                                         | string  | —                     | startTime              |
| endTimeLabel    | 结束时间别名                                                         | string  | —                     | endTime                |
| maxlength       | 原生属性，最大输入长度                                               | number  | —                     | —                      |
| minlength       | 原生属性，最小输入长度                                               | number  | —                     | —                      |
| show-word-limit | 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效 | boolean | —                     | false                  |
| placeholder     | 输入框占位文本                                                       | string  | —                     | 请输入                 |
| clearable       | 是否可清空                                                           | boolean | —                     | false                  |
| show-password   | 是否显示切换密码图标                                                 | boolean | —                     | false                  |
| disabled        | 禁用                                                                 | boolean | —                     | false                  |
| size            | 输入框尺寸，只在 type!="textarea" 时有效                             | string  | medium / small / mini | —                      |
| prefix-icon     | 输入框头部图标                                                       | string  | —                     | —                      |
| suffix-icon     | 输入框尾部图标                                                       | string  | —                     | —                      |
| readonly        | 原生属性，是否只读                                                   | boolean | —                     | false                  |
| formWidth       | 宽度                                                                 | number  | —                     | —                      |
| regExp          | 输入时的正则校验，内置的正则或者自定义正则                           | string  | regExp                | number/english/chinese | —   |
| rules           | elementUI规则校验                                                    | array   | —                     | —                      |

<style>
table th:nth-of-type(1) {
    width: 20%;
}
table th:nth-of-type(2) {
    width: 40%;
}
</style>

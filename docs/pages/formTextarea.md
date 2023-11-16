# FormTextarea

## 使用示例

```vue
<script>
export default {
  data() {
    const route = this.$route.name.toLowerCase()
    return {
      operateLayer: {
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
              label: '详细内容',
              model: 'content',
              component: 'FormTextarea',
              showWordLimit: true,
              maxlength: 200,
              rows: 5
            }
          ]
        }
      }
    }
  }
}
</script>
```

## 属性

| 属性          | 说明                                                                 | 类型    | 可选值                | 默认值 |
| :------------ | :------------------------------------------------------------------- | :------ | :-------------------- | :----- |
| component     | 当前使用的单表单组件                                                 | object  | —                     | —      |
| label         | 描述                                                                 | string  | —                     | —      |
| model         | 该组件需向接口传递的字段                                             | string  | —                     | —      |
| rows          | 输入框行数，只对 type="textarea" 有效                                | number  | —                     | 2      |
| maxlength     | 原生属性，最大输入长度                                               | number  | —                     | —      |
| minlength     | 原生属性，最小输入长度                                               | number  | —                     | —      |
| showWordLimit | 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效 | boolean | —                     | false  |
| placeholder   | 输入框占位文本                                                       | string  | —                     | 请输入 |
| clearable     | 是否可清空                                                           | boolean | —                     | false  |
| showPassword  | 是否显示切换密码图标                                                 | boolean | —                     | false  |
| disabled      | 禁用                                                                 | boolean | —                     | false  |
| size          | 输入框尺寸，只在 type!="textarea" 时有效                             | string  | medium / small / mini | —      |
| prefixIcon    | 输入框头部图标                                                       | string  | —                     | —      |
| suffixIcon    | 输入框尾部图标                                                       | string  | —                     | —      |
| readonly      | 原生属性，是否只读                                                   | boolean | —                     | false  |
| formWidth     | 宽度                                                                 | number  | —                     | —      |
| rules         | elementUI规则校验                                                    | array   | —                     | —      |

<style>
table th:nth-of-type(1) {
    width: 20%;
}
table th:nth-of-type(2) {
    width: 40%;
}
</style>

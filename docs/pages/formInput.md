# FormInput

## 使用示例

```vue
<script>
export default {
  data() {
    return {
      searchLayer: {
        form: [
          {
            label: "科室负责人",
            model: "deptLeader",
            component: "FormInput",
            rules: [
              { required: true, message: "请输入科室名称", trigger: "blur" },
            ],
          },
        ],
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
|maxlength|原生属性，最大输入长度|number|—|—|
|minlength|原生属性，最小输入长度|number|—|—|
|show-word-limit|是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效|boolean|—|false|
|placeholder|输入框占位文本|string|—|请输入|
|clearable|是否可清空|boolean|—|false|
|show-password|是否显示切换密码图标|boolean|—|false|
|disabled|禁用|boolean|—|false|
|size|输入框尺寸，只在 type!="textarea" 时有效|string|medium / small / mini|—|
|prefix-icon|输入框头部图标|string|—|—|
|suffix-icon|输入框尾部图标|string|—|—|
|readonly|原生属性，是否只读|boolean|—|false|
|formWidth|宽度|number|—|—|
|regExp|输入时的正则校验，内置的正则或者自定义正则|string | regExp|number/english/chinese|—|
|rules|elementUI规则校验|array|—|—|


<style>
table th:nth-of-type(1) {
    width: 20%;
}
table th:nth-of-type(2) {
    width: 40%;
}
</style>
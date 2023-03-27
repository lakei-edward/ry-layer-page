# SearchLayer

::: tip 搜索层-searchLayer
用于对表格数据进行查询等操作
:::

在搜索层中，主要使用内置的单表单组件，如遇到复杂的逻辑，可选用自定义的表单组件，如下面使用示例中的`Custom`，就是一个自定义组件，引入到当前组件中；自定义组件有什么规范？看完该章节后，可移步阅读**单表单组件**章节。

### 使用示例

```vue {3}
<template>
  <ry-layer-page
    :search-layer="searchLayer"
    :operate-layer="operateLayer"
    :display-layer="displayLayer"
  />
</template>
<script>
import Custom from "./Custom";
export default {
  data() {
    return {
      searchLayer: {
        labelAfter: ":",
        labelWidth: "100px",
        size: "mini",
        formWidth: 317,
        searchName: "查询",
        resetName: "重置",
        form: [
          {
            name: "Custom",
            component: Custom, //自定义组件
          },
          {
            label: "科室负责人",
            model: "deptLeader",
            regExp: "english",
            component: "FormInput", //内置组件
          },
          {
            label: "预警时间",
            type: "daterange",
            startTimeLabel: "startTimeYJ",
            endTimeLabel: "endTimeYJ",
            component: "FormDateRange", //内置组件
          },
        ],
      },
    };
  },
};
</script>
```

### 默认传参

- 当封装组件时，可根据params中的某个属性作为类型判断
- 可传入默认的数据

```vue {3}
<template>
  <ry-layer-page
    :search-layer="searchLayer"
    :operate-layer="operateLayer"
    :display-layer="displayLayer"
  />
</template>
<script>
import Custom from "./Custom";
export default {
  data() {
    return {
      // 搜索层
      searchLayer: {
        labelWidth: "120px",
        size: "small",
        operateSize: "mini",
        searchName: "查询",
        resetName: "重置",
        params: {
          khjdYear: `${new Date().getFullYear()}`, // 传入默认的时间
          type: this.getType(), // 区分类型
        },
        form,
      },
    };
  },
};
</script>
```

### 属性

| 属性                 | 说明                                                                                    | 类型    | 可选值                | 默认值 |
| :------------------- | :-------------------------------------------------------------------------------------- | :------ | :-------------------- | :----- |
| searchName           | 查询按钮别称                                                                            | string  | —                     | 搜索   |
| resetName            | 重置按钮别称                                                                            | string  | —                     | 重置   |
| formWidth            | 用于控制该表单内组件的宽度                                                              | string  | —                     | —      |
| size                 | 用于控制该表单内组件的尺寸                                                              | string  | medium / small / mini | —      |
| labelAfter           | 表单项的分割形式                                                                        | string  | —                     | ：     |
| labelWidth           | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。 | string  | —                     | —      |
| labelPosition        | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width                   | string  | right/left/top        | right  |
| labelWidth           | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。 | string  | —                     | —      |
| inlineMessage        | 是否以行内形式展示校验信息                                                              | boolean | —                     | false  |
| disabled             | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效       | boolean | —                     | false  |
| hideRequiredAsterisk | 是否隐藏必填字段的标签旁边的红色星号                                                    | boolean | —                     | false  |
| statusIcon           | 是否在输入框中显示校验结果反馈图标                                                      | boolean | —                     | false  |
| validateOnRuleChange | 是否在 rules 属性改变后立即触发一次验证                                                 | boolean | —                     | true   |
| params               | params 会合并到查询接口中                                                               | object  | —                     | —      |
| form                 | 移步阅读 单表单组件章节                                                                 | —       | —                     | —      |

<style>
table th:nth-of-type(1) {
    width: 10%;
}
table th:nth-of-type(2) {
    width: 30%;
}
table th:nth-of-type(3) {
    width: 10%;
}
table th:nth-of-type(4) {
    width: 10%;
}
</style>

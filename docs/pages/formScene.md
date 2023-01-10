# 概况

单表单组件是什么呢，就是`form`表单中的一个个输入框、选择框等...

![](../../asset/formscene.png)

本插件内置了一些单表单组件，如下：

| 单表单组件     | 对应的组件        |
| :------- | :----------- |
|FormInput|el-input|
|FormSelect|el-select|
|FormTextarea|el-input|
|FormDate|el-date|
|FormDateRange|el-date|
|FormTreeSelect|vue-treeselect|
|FormUpdate|el-upload|


## 使用场景

### 搜索层的使用示例

`form`中的每一项，代表一个表单项，除了自定义`Custom`的组件外，因为在自定义组件中可以写多个表单项。

```vue
<script>
export default {
  data() {
    return {
      searchLayer: {
        labelAfter: ":",
        formWidth: 260,
        searchName: "查询",
        resetName: "重置",
        form: [
          {
            name: "Custom",
            component: Custom,
          },
          {
            label: "科室负责人",
            model: "deptLeader",
            component: "FormInput",
            rules: [
              { required: true, message: "请输入科室负责人", trigger: "blur" },
            ],
          },
          {
            label: "预警时间",
            type: "daterange",
            startTimeLabel: "startTimeYJ",
            endTimeLabel: "endTimeYJ",
            component: "FormDateRange",
          },
        ],
      },
    };
  },
};
</script>
```

此时页面的搜索层也就生成了对应的表单

![](../../asset/searchScene.png)

“科室类别、科室名称” 在自定义组件中创建的；

不过要注意的时是，虽然我们对搜索层表单的`formWidth`统一设置了宽度260，但是自定义组件需要自己在该组件中设置!

### 操作层的使用示例

在`js`中我们可以声明一次进行多次调用；在项目的开发中会大量使用，声明一次多次调用的情况，尽量写较少的代码，提高了代码的灵活性；
```vue
<script>
export default {
  data() {
    const deptLeader = {
      label: "科室负责人",
      model: "deptLeader",
      component: "FormInput",
    };
    return {
      searchLayer: {
        form: [deptLeader,...],
      },
      operateLayer: {
        add: {
          mode: {
            form: [deptLeader,...],
          },
        },
      },
    };
  },
};
</script>
```

## 注意点

在我们使用表单项的时候，`label、model、component`属性为必传，`label、model`代表表单项的文本展示名称和向接口传递的字段，**而`component`则是指定该表单项用的是哪一个单表单组件。**

在后面几节内容学习每个单表单组件具体的使用情况👇

<style>
table th:nth-of-type(1) {
    width: 40%;
}
table th:nth-of-type(2) {
    width: 40%;
}
</style>



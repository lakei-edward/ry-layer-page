# OperateLayer

::: tip 搜索层-operateLayer
用于对表格数据进行增删改查（CRUD）等一系列操作
:::

## 说明
增、删、改、查中key是相对固定的，也就是说要保持一一对应，最好不要试图改变它们；其他的可以自定义key。
- add-增
- remove-删
- edit-改
- search-查

```vue {4}
<template>
  <ry-layer-page
    :search-layer="searchLayer"
    :operate-layer="operateLayer"
    :display-layer="displayLayer"
  />
</template>
<script>
export default {
  data() {
    return {
      operateLayer: {
        add: { label: "新增" },
        edit: { label: "编辑" },
        remove: { label: "删除" },
        search: { label: "查看" },
        warn: { label: "预警" },
      },
    };
  },
};
</script>
```

此时页面操作层就会有对应的操作按钮，但是这些按钮还没有赋予任何的功能。如下图：

![](../../asset/layer.png)

## 配置

让我们来为钮添加一些功能，在添加之前，我们需要对按钮进行装饰，装饰成我们需要的样子

### 使用示例

::: tip 解释说明
操作层-operateLayer中的每一个对象为一个操作项。
:::

在增删改查接口调取中，希望后端通过`post、delete、put、get` 来对增删改查（CRUD）区分，这样我们只需要通过`method` 属性来区分不同接口即可，可以保持`url` 接口不需要来回改变；

操作项中的`params` 是向接口传递的表单信息，可以设置默认自带信息，具体的信息需要在`mode` 参数中配置；当我们需要向接口传递表单信息的时候，此时`params` 为必传项，即使设置为`{}`空对象，操作项中`params` 对象就是表单中的双向绑定对象。

当我们需要对按钮做按钮级权限的时候，使用`hasPermi` 属性，`routeName` 根据若依框架的路由配置，直接获取当前页面的路由名。

```vue
<script>
export default {
  data() {
    const routeName = this.$route.name.toLowerCase();
    const BASE_URL = "/his/office";
    return {
      operateLayer: {
        add: {
          size: "mini",
          type: "primary",
          label: "新增",
          plain: true,
          circle: true,
          url: `${BASE_URL}`,
          method: "post",
          params: {},
          hasPermi: `${routeName}:add`,
          mode: {},
        },
        edit: {
          size: "mini",
          type: "primary",
          label: "修改",
          disabled: "single",
          method: "put",
          url: `${BASE_URL}`,
          params: {
            show: true, //可设置默认参数
          },
          hasPermi: `${routeName}:edit`,
          mode: {},
        },
      },
    };
  },
};
</script>
```

::: tip mode属性
对于按钮操作方式的具体配置`mode` 我们在下面进行详细的说明。
:::

### 属性
| 属性     | 说明        | 类型  | 可选值 | 默认值
| :------- | :----------- | :------ | :------------------------------------------ | :----- |
|show|是否显示,以及按钮的位置，默认在表格上，可配置在表格内；|string |table|—|
|size|尺寸|string|—|—|
|type|类型|string|success / info / warning / error|—|
|icon|图标类名|string|—|—|
|plain|是否朴素按钮|boolean|—|false|
|round|是否圆角按钮|boolean|—|false|
|circle|是否圆形按钮|boolean|—|false|
|disabled|单选/多选/自定义|string /function(row)|single/multipe|—|
|disabledType|当disabled为函数时，用该属性来判断是单选还是多选|string|single/multipe|single|
|label|标题|string|—|—|
|hasPermi|权限|string|—|—|
|url|操作按钮最后需要调的接口|string|—|—|
|method|接口类型|string|—|—|
|params|接口的参数|object|—|—|
|multiPath|查看详情时，path传参多个字段，不仅仅传id了，multiPath: `["id", "tjzt"]`多个参数，并且这些参数要在row中或获取详情的对象中出现！|array|—|—|
|mode|按钮的操作方式|object|—|—|


## 操作方式

当我们点击按钮的时候，我们怎么知道每个按钮是干嘛的呢，新增功能具体新增哪些内容，删除功能怎么确认删除？此时就要用到`mode` 这个参数了

### mode的六种类型

| 类型     |  功能       | 说明  |
| :------- | :----------- | :------ |
|Dialog|弹框，用于比较简单的弹框场景|弹框|
|warning、info、success、error|确认弹框，用于删除操作等|确认消息弹框|
|CustomDialog|向当前页面中插入一个有dialog的组件，dialog组件中内容完全自定义，用于比较复杂的弹框场景|自定义弹框|
|CustomPage|点击按钮后，跳转到一个新的组件页面，可在该组件内完成某些操作后返回主页面，用于比较复杂的场景|自定义页面|
|RouterPage|点击按钮后，跳转到一个路由页面，可在该路由页面内完成某些操作后返回主页面，用于比较复杂的场景|自定义路由页面|
|Export|可根据表格的选中状态导出文件和一键全部导出|导出列表文件|

让我们来逐一了解下每种不同操作类型的使用情况；

::: tip 提示
每种类型的操作方式，各属性配置略有不同，需要针对每种类型操作配置不同的属性！
:::
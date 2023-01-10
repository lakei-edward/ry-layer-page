# FormTreeSelect

## 使用示例

使用该组件，需要获取树的接口，也就是`treeUrl`必传；插件会自动使用`get`方法调取该接口，如果获取的数据不是一个树类型的数据，可以用`callback`处理成一个树类型数据再返回过去；如果不传`callback`，则默认返回接口的原始数据。

```vue
<script>
export default {
  data() {
    return {
      searchLayer: {
        form: [
          {
            label: "部门",
            model: "dept",
            component: "FormTreeSelect",
            treeUrl: "/system/dept/list",
            multiple: true,
            alwaysOpen: true,
            showCount: true,
            normalizer(node) {
              return {
                id: node.deptId,
                label: node.deptName,
                children: node.children,
              };
            },
            callback(data) {
              return this.handleTree(data, "deptId");
            },
            clearable: true,
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
|treeUrl|树的接口|String|是|—|
|placeholder|占位符|String|—|请选择|
|noResultsText|没有匹配的搜索结果时显示的文本|String|—|没有找到该单位|
|normalizer|用于规范化源数据|Function|—|—|
|callback|调取接口后的回调函数，处理成自己想要的数据|Function|—|—|
|params|调取树接口的参数|Object|—|—|
|width|宽度|Number|—|217|
|zIndex|优先级|Number|—|999|
|maxHeight|打开树选择框的高度|Number|—|300|
|clearable|是否可清除|Boolean|—|false|
|showCount|是否显示子项计数在每个分支节点的标签旁边|Boolean|—|false|
|multiple|是否可多选|Boolean|—|false|
|disabled|是否禁用控件。|Boolean|—|false|
|alwaysOpen|菜单是否应始终打开。|Boolean|—|false|
|appendToBody|将菜单追加到body|Boolean|—|false|
|flat|是否启用平面模式|Boolean|—|false|

<style>
table th:nth-of-type(1) {
    width: 20%;
}
table th:nth-of-type(2) {
    width: 40%;
}
</style>
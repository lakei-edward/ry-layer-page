# DisplayLayer

::: tip 展示层-displayLayer
用于对表格数据以什么样的形式进行展示
:::

## 使用示例

当我们使用`callback`的时候，可以根据返回的信息，自定义表格内显示的内容；
使用类似于`cellStyle`回调函数属性时，可以在`methods`中写好方法，在展示层内调用。

```vue
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
    const BASE_URL = '/his/office'
    return {
      // 展示层
      displayLayer: {
        url: `${BASE_URL}/list`,
        rowclick: false,
        cellStyle: this.cellStyle,
        headerCellStyle: { textAlign: 'center' },
        data: [
          {
            prop: 'deptName',
            label: '科室名称',
            callback: item => {
              const office = ['急诊科', '内科', '外科', '眼科', '麻醉科']
              return office[item.deptName]
            }
          },
          {
            prop: 'deptLeader',
            label: '科室负责人'
          },
          {
            prop: 'deptPhone',
            label: '科室电话'
          },
          {
            prop: 'deptCode',
            label: '科室类别',
            callback: item => {
              const code = ['急诊', '门诊']
              return code[item.deptCode]
            }
          },
          {
            prop: 'operate', // 当该列为操作列时，该属性为“operate”必传
            label: '操作',
            operate: true, // 当operateLayer中show字段为true时，自动把该操作放入表格列中
            width: '500'
          }
        ]
      }
    }
  },
  methods: {
    cellStyle(row) {
      if (row.rowIndex === 1) {
        return { color: '#ff0053', border: '3px solid #567824' }
      }
    }
  }
}
</script>
```

## 按钮在表格操作列展示

如果我们不想把操作按钮放在操作层，而是放在表格操作列中，可以设置`operateLayer`中的`show`为`table`；

```vue
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
    const BASE_URL = '/his/office'
    return {
      // 操作层
      operateLayer: {
        customDialog: {
          params: {},
          label: '自定义弹框',
          show: 'table', //展示到表格操作列中
          mode: {}
        }
      },
      // 展示层
      displayLayer: {
        url: `${BASE_URL}/list`,
        data: [
          {
            prop: 'deptPhone',
            label: '科室电话'
          },
          {
            prop: 'operate', // 当该列为操作列时，该属性为“operate”必传
            label: '操作',
            operate: true, // 当operateLayer中show字段为true时，自动把该操作放入表格列中
            width: '500'
          }
        ]
      }
    }
  }
}
</script>
```

## 解构判断

复用组件时，需要根据不同业务展示不同列，可以直接通过数组的解构来判断！

```js
const kpType = this.$route.query.type;
displayLayer: {
  url: `${BASE_URL}/list`,
  params: {},
  data: [
    ...[
      kpType !== "lzkp"
        ? {
          prop: "deptName",
          label: "被考核单位名称"
        }
        : {
          prop: "khlx",
          label: "考核人类型"
        }
    ],
    {
      prop: "updateTime",
      label: "更新日期"
    },
    {
      prop: "deptCode",
      label: "提交状态",
      callback: (row) => {
        return row.tjzt === "Y" ? "已提交" : "未提交";
      }
    }
  ]
}
```

## 展示 el-tag

在表格内展示`el-tag`组件类型样式

```vue
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
    const BASE_URL = '/his/office'
    return {
      // 展示层
      displayLayer: {
        url: `${BASE_URL}/list`,
        data: [
          {
            prop: 'status',
            label: '提交状态',
            component: {
              element: 'Tag',
              attr: {
                type: 'success'
              }
            },
            callback: row => {
              return row.status === 'Y' ? '已提交' : '未提交'
            }
          }
        ]
      }
    }
  }
}
</script>
```

### 动态返回属性

```vue{23}
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
    const BASE_URL = '/his/office'
    return {
      // 展示层
      displayLayer: {
        url: `${BASE_URL}/list`,
        data: [
          {
            /* 发布状态 0：保存 1：发布 2:下架 */
            prop: 'status',
            label: '模型状态',
            component: {
              element: 'Tag',
              attr(row) {
                const types = ['info', 'success', 'danger'];
                return {
                  type: types[row.status]
                };
              }
            },
            callback: (item) => {
              const code = {
                0: '已保存',
                1: '已上架',
                2: '已下架'
              };
              return code[item.status];
            }
          },
        ]
      }
    }
  }
}
</script>
```

## 手动刷新列表数据

```js
this.$refs.layerpage.queryList()
```

示例

```js{10}
handlePut(row, status) {
  this.$confirm('是否确认上架?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    row.status = status;
    modelUpdate(row).then((res) => {
      // 重新获取list数据
      this.$refs.layerpage.queryList();
      this.$message({
        type: 'success',
        message: `${status === '1' ? '上架' : '下架'}成功!`
      });
    });
  });
},
```

### 表格属性

| 属性                | 说明                                                                                          | 类型                                                  | 可选值                | 默认值 |
| :------------------ | :-------------------------------------------------------------------------------------------- | :---------------------------------------------------- | :-------------------- | :----- |
| url                 | 获取表格数据的接口，为 Get 方法获取                                                           | string                                                | —                     | —      |
| dblclick            | 是否可以通过双击表格行进行查看详情                                                            | boolean                                               | —                     | false  |
| rowclick            | 是否可以通过点击表格行选中该行                                                                | boolean                                               | —                     | true   |
| stripe              | 是否为斑马纹 table                                                                            | boolean                                               | —                     | false  |
| border              | 是否带有纵向边框                                                                              | boolean                                               | —                     | false  |
| size                | Table 的尺寸                                                                                  | string                                                | medium / small / mini | —      |
| showHeader          | 是否显示表头                                                                                  | boolean                                               | —                     | true   |
| highlightCurrentRow | 是否要高亮当前行                                                                              | boolean                                               | —                     | false  |
| maxHeight           | Table 的最大高度。合法的值为数字或者单位为 px 的高度。                                        | string/number                                         | —                     | —      |
| height              | Table 的高度，默认为自动高度。                                                                | string/number                                         | —                     | —      |
| headerCellStyle     | 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。 | Function({row, column, rowIndex, columnIndex})/Object | —                     | —      |
| cellStyle           | 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。         | Function({row, column, rowIndex, columnIndex})/Object | —                     | —      |
| index               | 是否有索引                                                                                    | string                                                | —                     | —      |
| data                | 表格数据的具体字段信息，在下面进行详细配置                                                    | array                                                 | —                     | —      |

### 表格列属性

| 属性                | 说明                                                                                                        | 类型                                    | 可选值            | 默认值 |
| :------------------ | :---------------------------------------------------------------------------------------------------------- | :-------------------------------------- | :---------------- | :----- |
| prop                | 对应列内容的字段名，也可以使用 property 属性                                                                | string                                  | —                 | —      |
| label               | 显示的标题                                                                                                  | string                                  | —                 | —      |
| operate             | 是否为操作列，当 operateLayer 中 show 字段为 true 时，自动把该操作放入表格列中                              | boolean                                 | —                 | —      |
| width               | 对应列的宽度                                                                                                | string                                  | —                 | —      |
| minWidth            | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 | string                                  | —                 | —      |
| fixed               | 列是否固定在左侧或者右侧，true 表示固定在左侧                                                               | string, boolean                         | true, left, right | —      |
| formatter           | 用来格式化内容                                                                                              | Function(row, column, cellValue, index) | —                 | —      |
| align               | 对齐方式                                                                                                    | String                                  | left/center/right | left   |
| className           | 列的 className                                                                                              | string                                  | —                 | —      |
| labelClassName      | 当前列标题的自定义类名                                                                                      | string                                  | —                 | —      |
| showOverflowTooltip | 当内容过长被隐藏时显示 tooltip                                                                              | boolean                                 | —                 | true   |
| callback            | 单元格的回调，用于处理单元格的内容为想要的数据                                                              | function                                | —                 | —      |
| component           | 具体看示例                                                                                                  | object                                  | —                 | —      |

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

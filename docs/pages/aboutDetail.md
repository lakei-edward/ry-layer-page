# 关于详情

默认根据id字段进行查看，可自定义id别称

## 前台

- 通过`detail`属性，是否需要查看该表格行的详情，分为row详情和接口详情
- 不传默认传递表格row详情；当type为路由模式并且detail为true时，则路由模式中的query接受详情信息，但是过大的详情信息不建议走路由传参！
- type为RouterPage以外的模式时，详情通过sessionStorage进行传递，值为 `ry-detail`
- 页面中所有需要查看详情的地方调用的都是操作层中`search`对象下的接口来查看，包括修改操作，所以当前页面只要涉及查看的时候`search`对象必须要创建
- 获取信息的时候会把对象中的`params`合并，支持自己设置一些默认字段
- 如果表单新增中某个字段是选择框，则会根据这个选择框的`dict`属性的`label`进行查看

```vue
<script>
export default {
  data() {
    const routeName = this.$route.name.toLowerCase()
    return {
      operateLayer: {
        search: {
          label: '查看',
          params: { ry: 'layer' },
          method: 'get',
          disabled: 'single',
          url: '/his/office',
          hasPermi: `${routeName}:add`,
          mode: {
            type: 'Dialog',
            detail: true, // 需要使用详情
            label: 'deptId', // id别称
            rules: false, // 不需要校验
            form
          }
        }
      }
    }
  }
}
</script>
```

## 传参方式

### path 路径拼接

默认取当前行的id拼接，如果需要指定字段名使用`label`属性

### query 传参

用法为二重数组`[['id', 'groupId']]`，前面为字段名，后面为row里面属性名

```vue
<script>
import Custom from './Custom'
export default {
  data() {
      // 搜索层
    const search = {
      size: 'mini',
      type: 'text',
      label: '查看',
      show: 'table',
      params: {},
      method: 'put',
      url: `${BASE_URL}/group/update`,
      mode: {
        type: 'Dialog',
        top: '25vh',
        labelWidth: '150px',
        closeOnClickModal: false,
        paramsType: [['id', 'id']],
        form
      }
    },
    return {
    }
  }
  methods: {
    /** 打开有关详情弹框的回调，处理数据 */
    detailCallback(item) {
      item.params.dpModelBusinessProjectDTOList = item.params.dpModelBusinessProjectDTOList.map((r) => {
        return r.projectId;
      });
    },
  },
}
</script>
```

## 查看详情弹框的两种展现形式

### 禁用框查看

当我们对`search`下的form中的每一项设置`disabled`，查看详情的时候即展示带禁用表单的的展现形式，是不能编辑的,这是一种方法。

### 纯文本查看

当设置readonly为true时，即为纯文本查看;可设置单位展示

```js
{
  label: "单位人数",
  model: "peoples",
  component: "FormInput",
  unit: "人",
  width: 260
}
```

```vue
<script>
export default {
  data() {
    const routeName = this.$route.name.toLowerCase()
    return {
      operateLayer: {
        search: {
          label: '查看',
          params: { ry: 'layer' },
          method: 'get',
          disabled: 'single',
          url: '/his/office',
          hasPermi: `${routeName}:add`,
          mode: {
            type: 'Dialog',
            detail: true, // 需要使用详情
            label: 'deptId', // id别称
            rules: false, // 不需要校验
            readonly: true, // 纯文本查看
            form
          }
        }
      }
    }
  }
}
</script>
```

## afterDetail 详情后置钩子

用于获取详情后修改字段数据，或者增加新的字段

```vue
<script>
import Custom from './Custom'
export default {
  data() {
      // 搜索层
    const preview = {
      size: 'mini',
      type: 'text',
      label: '预览',
      show: 'table',
      params: {},
      method: 'put',
      url: `${BASE_URL}/group/update`,
      mode: {
        type: 'Dialog',
        top: '25vh',
        labelWidth: '150px',
        closeOnClickModal: false,
        width: '700px',
        detail: true,
        afterDetail: this.detailCallback,
        form: relevanceForm
      }
    },
    return {
    }
  }
  methods: {
    /** 打开有关详情弹框的回调，处理数据 */
    detailCallback(item) {
      item.params.dpModelBusinessProjectDTOList = item.params.dpModelBusinessProjectDTOList.map((r) => {
        return r.projectId;
      });
    },
  },
}
</script>
```

# 关于详情

默认根据id字段进行查看，可自定义id别称

## 前台

- 通过`detail`属性，是否需要查看详情；
- 页面中所有需要查看详情的地方调用的都是操作层中`search`对象下的接口来查看，包括修改操作，所以当前页面只要涉及查看的时候`search`对象必须要创建；
- 获取信息的时候会把对象中的`params`合并，支持自己设置一些默认字段。

```vue
<script>
export default {
  data() {
    const routeName = this.$route.name.toLowerCase();
    return {
      operateLayer: {
        search: {
          label: "查看",
          params: {ry:"layer"},
          method: "get",
          disabled: "single",
          url: "/his/office",
          hasPermi: `${routeName}:add`,
          mode: {
            type: "Dialog",
            detail: true, // 需要使用详情
            label: "deptId",// id别称
            rules: false, // 不需要校验
            form,
          },
        },
      },
    };
  },
};
</script>
```

## 后台
- 采用路径拼接，通过@PathVariable获取传参

## 查看详情弹框的两种展现形式

### 禁用框查看

当我们对`search`下的form中的每一项设置`disabled`，查看详情的时候即展示带禁用表单的的展现形式，是不能编辑的,这是一种方法。

### 纯文本查看

当设置readonly为true时，即为纯文本查看

```vue
<script>
export default {
  data() {
    const routeName = this.$route.name.toLowerCase();
    return {
      operateLayer: {
        search: {
          label: "查看",
          params: {ry:"layer"},
          method: "get",
          disabled: "single",
          url: "/his/office",
          hasPermi: `${routeName}:add`,
          mode: {
            type: "Dialog",
            detail: true, // 需要使用详情
            label: "deptId",// id别称
            rules: false, // 不需要校验
            readonly: true,// 纯文本查看
            form,
          },
        },
      },
    };
  },
};
</script>
```
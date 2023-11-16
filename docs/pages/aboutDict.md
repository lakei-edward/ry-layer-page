# 关于字典

## 默认字典使用

在默认的字典使用中，需要使用调取接口方法不停的去掉取字典接口，再重新赋值使用。一个页面如果使用很多个字典的话，就要重复的调取多次字典接口，变化的只是字典的名称。

```vue
<template>
  <div>
    <el-form-item label="状态" prop="status">
      <el-select v-model="queryParams.status" placeholder="菜单状态" clearable size="small">
               <el-option
          v-for="dict in visibleOptions"
          :key="dict.dictValue"
          :label="dict.dictLabel"
          :value="dict.dictValue"
        />
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 显示状态数据字典
      visibleOptions: []
    }
  },
  created() {
    this.getDicts('sys_normal_disable').then(response => {
      this.visibleOptions = response.data
    })
  }
}
</script>
```

## 选装插件字典

在选装插件字典之后，我们只需要把唯一变化的字典名称放到`$options.dicts`中，插件会自动根据`$options.dicts`中的字典名称请求数据，获取的数据直接在当前页面中使用，使用`dict.type.sys_normal_disable`即可，`dict.type`为前缀，必须要存在，这样下来就省去了繁琐的请求字典的步骤。

```vue {11,22}
<template>
  <div>
    <el-form-item label="状态" prop="status">
      <el-select v-model="queryParams.status" placeholder="菜单状态" clearable size="small">
        <el-option
          v-for="dict in dict.type.sys_normal_disable"
          :key="dict.dictValue"
          :label="dict.dictLabel"
          :value="dict.dictValue"
        />
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
export default {
  dicts: ['sys_normal_disable'],
  data() {
    return {}
  }
}
</script>
```

## 自定义字典项

### dictLabel 和 dictValue

默认的展示文本和值是`dictLabel`和`dictValue`

```vue {13,14}
<template>
  <div>
    <el-form-item label="状态" prop="status">
      <el-select v-model="queryParams.status" placeholder="菜单状态" clearable size="small">
        <el-option
          v-for="dict in dict.type.sys_normal_disable"
          :key="dict.dictValue"
          :label="dict.dictLabel"
          :value="dict.dictValue"
        />
      </el-select>
    </el-form-item>
  </div>
</template>
```

如果后端返回给我们的接口中这两个字段变了怎么办呢，我们可以自定义这两个字段，和接口数据中的字段保持一致。

在使用该插件的时候，支持传入自定义的字典展示形式，可以自定义和接口中的字段保持一致。

- `label` 和 `value` 是写在代码中的别名名称，也就是选择器中的`label`和`value`
- `dictLabel` 和 `dictValue`是接口中的字段名称，要和字典接口返回数据的字段对应上；这里是可配置的，万一返回的字段变了，可以改变这两项保持对应！一般来说接口的字段不会改变。

::: tip 提示
`dictField` 对象中，要保证顺序不要错乱，名称为第一项，值在第二项
:::

```js {9,10}
import { getDicts } from '@/api/system/dict/data'
import request from '@/utils/request'
import ryLayerPage from 'ry-layer-page'

Vue.use(ryLayerPage, {
  http: request,
  dict: getDicts,
  dictField: {
    dictLabel: 'label',
    dictValue: 'value'
  }
})
```

```html
<el-select
  v-model="queryParams.status"
  placeholder="用户状态"
  clearable
  size="small"
  style="width: 240px"
>
  <el-option
    v-for="dict in dict.type.sys_normal_disable"
    :key="dict.value"
    :label="dict.label"
    :value="dict.value"
  />
</el-select>
```

## 插件中使用字典的情况

👆 以上字典示例都是在普通页面中的使用

#### 在分层页面中使用的说明

如果在使用该插件时，在任何一个分层页面当中，有一处地方要使用字典的情况，此时就必须在`main.js`中选装字典项。因为该插件中对字典数据的处理都是针对`$options.dicts`中的字典名称进行获取数据再传递到子孙组件的。

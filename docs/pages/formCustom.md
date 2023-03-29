# 自定义单表单组件

比较复杂的表单组件，我们可以使用自定义方法来创建。重新声明一个 vue 组件，在 vue 组件中我们写好这个复杂的表单组件逻辑，再引用到我们的主页面里去。

## 使用示例

- 比如在项目中，我们遇到关联选择的时候，第二个选择器，是通过第一个选择器选择的内容而决定的；`props`中的`params`为弹框中向接口传递的对象数据，我们需要把字段写入`params`中
- `readonly`是否为只读，查看弹框时，方便对只读模式进行判断
- `noRule` 用来判断是否需要校验；默认为 true，可选 false/true

#### Custom.vue

```vue
<template>
  <span>
    <el-form-item
      label="科室类别:"
      prop="deptCode"
      :rules="
        setRules([
          { required: true, message: '请输入科室类别', trigger: 'blur' }
        ])
      "
    >
      <el-select
        v-if="!readonly"
        v-model="params['deptCode']"
        placeholder="请选择"
        style="width: 217px"
        @change="handleChange"
      >
        <el-option
          v-for="item in dict.type.his_office_class"
          :key="item.dictValue"
          :label="item.dictLabel"
          :value="item.dictValue"
        >
        </el-option>
      </el-select>
      <div v-else style="width: 217px">
        {{ params["deptCodeMc"] }}
      </div>
    </el-form-item>
    <el-form-item
      label="科室名称:"
      prop="deptName"
      :rules="
        setRules([
          { required: true, message: '请输入科室名称', trigger: 'blur' }
        ])
      "
    >
      <el-select
        v-if="!readonly"
        v-model="params['deptName']"
        style="width: 217px"
        placeholder="请选择"
      >
        <el-option
          v-for="item in officeName"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div v-else style="width: 217px">
        {{ params["deptNameMc"] }}
      </div>
    </el-form-item>
  </span>
</template>
<script>
export default {
  props: {
    params: {
      type: Object,
      requird: true,
      default: () => {}
    },
    readonly: Boolean,
    noRule: Boolean
  },
  dicts: ["his_office_class"],
  data() {
    return {
      officeName: [],
      office: [
        {
          pid: "0",
          value: "0",
          label: "急诊科"
        },
        {
          pid: "1",
          value: "1",
          label: "内科"
        },
        {
          pid: "1",
          value: "2",
          label: "外科"
        },
        {
          pid: "1",
          value: "3",
          label: "眼科"
        },
        {
          pid: "1",
          value: "4",
          label: "麻醉科"
        }
      ]
    };
  },
  computed: {
    /** 根据情况设置校验 */
    setRules() {
      return function(val) {
        // 因为这一个地方在三处使用，所以判断的复杂点；搜索层、新增和查看中用的是一个组件
        return this.readonly || this.noRule ? [] : val;
      };
    }
  },
  watch: {
    "params.deptCode": {
      handler(val) {
        this.officeName = this.office.filter(v => v.pid === val);
      },
      immediate: true
    }
  },
  methods: {
    handleChange(val) {
      this.officeName = this.office.filter(v => v.pid === val);
    }
  }
};
</script>
```

#### index.vue

在主页面中使用`Custom.vue`自定义单表单组件

```vue
<template>
  <ry-layer-page
    ref="layerPage"
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
        form: [
          {
            name: "Custom",
            component: Custom,
          },
        ],
      },
      ...
    };
  },
};
</script>
```

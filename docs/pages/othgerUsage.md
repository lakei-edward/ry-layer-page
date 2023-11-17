# 其它用法

## LayerPage

如果是个功能齐全的页面，兼具搜索层、操作层、展示层，就默认使用 `ry-layer-page` 组件就行，用法前面已经说过了，这里就不再一一列举了。

```vue
<template>
  <ry-layer-page
    ref="layerPage"
    :search-layer="searchLayer"
    :operate-layer="operateLayer"
    :display-layer="displayLayer"
    :loading="false"
  />
</template>
<script>
export default {
  dicts: ['sys_normal_disable', 'sys_show_hide'],
  data() {
    return {
      searchLayer: {},
      operateLayer: {},
      displayLayer: {}
    }
  },
  methods: {
    // 字典加载完成的回调
    onDictReady(dict) {
      // 初始化字典项
      this.$refs.layerPage.initDicts(dict)
    }
  }
}
</script>
```

## LayerForm

这里渲染的是操作层里面的某一项，也就是一个新增的 `form` ，或者其它操作的 `form` 表单，可以直接使用内置的单表单组件进行表单的创建，而不是从头去配置表单，它是一个整的表单。

### 使用场景

1. 任何地方弹框中，不局限于在操作层中
1. 跳转到新路由中编辑表单再返回主页面

### 使用示例

```vue
<template>
   <!-- 直接使用全局注册的组件，不需要本地注册 -->
  <LayerForm ref="LayerForm" :operateLayer="operateLayer">
    <!-- 内置插槽，用来处理操作 -->
    <el-form-item>
      <el-button
        class="el-icon-check"
        type="primary"
        :loading="loadSubmit"
        @click="handleForm('Y')"
        >提交</el-button
      >
      <el-button
        class="el-icon-plus"
        type="primary"
        :loading="loadSubmit"
        @click="handleForm('N')"
        >保存</el-button
      >
  </LayerForm>
</template>
<script>
export default {
 dicts: ["sys_normal_disable", "sys_show_hide"],
 data() {
    /* 用法和 LayerPage 一样 */
    const form = [
      {
        label: "考核内容",
        model: "khnr",
        size: "small",
        keyModel: "createTime",
        component: "FormSelect",
        width: 730,
        rules: [
          {
            required: true,
            message: "请选择考核内容",
            trigger: "change"
          }
        ],
        dict: this._khnrList(),
        change: this.chhoseContent
      },
      {
        label: "附件",
        model: "fileId",
        size: "small",
        component: "FormUpdate",
        width: 380,
        drag: true,
        icon: "el-icon-receiving",
        fileListLabel: "fileInfo",
        multiple: true,
        buttonLabel: "上传图片",
        upload: {
          action: `${process.env.VUE_APP_BASE_API}/minio/upload`,
          headers: { Authorization: `Bearer ${getToken()}` },
          size: 100,
          textLabel:
            "请上传大小不超过 <span style='color:#ff0078'>100MB</span> 的文件",
          sizeLabel: "上传文件大小不能超过100MB"
        }
      }
    ];
   return {
     /* 这里对象中直接是操作项的属性了，不再是key-value指向不同操作项了 */
      operateLayer: {
        labelWidth: "120px",
        params: {
          khdf: "",
          khdw: this.$store.state.user.deptId, // 传id
          type: this.$route.query.type
        },
        mode: {
          /** 是否是查看详情页 */
          readonly: this.$route.query.mode == "search",
          form
        }
      },
   }
 },
 methods: {
    // 处理表单提交
    handleForm(){
      // 这里直接把响应式对象传递到接口就像
      console.log(this.operateLayer.params)
    }

    // 获取考核内容数据
    async _khnrList() {
      this.routerInfo = this.$route.query;
      let response = await listData({ dictType: this.routerInfo.type });
      this.khnrList = response.rows;
      this.khnrList.forEach((r) => {
        r.value = r.dictValue;
        r.label = r.dictLabel;
      });
      this.khnrList = this.khnrList.filter((r) => r.status === "0");
      return this.khnrList;
    },

    // 字典加载完成的回调
    onDictReady(dict) {
      // 初始化字典项
      this.$refs.layerPage.initDicts(dict);
    },
  },
}
</script>
```

## LayerFormItem

如果我们正在开发一个特别复杂的表单结构，从而只想复用单表单组件中的其中几个，比如 ”附件上传“ ，那就可以用当前这个组件来完成，它仅作为表单中某一项而存在，而不是整个表单，并且支持查看功能。

### 使用场景

1. 复杂的表单结构中
1. 任何表单存在的地方

### 使用示例

```vue
<template>
  <div>
    <el-form ref="editForm" :model="editForm" label-width="150px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="单位名称:" :prop="isDetailPage ? '' : 'orgId'">
            <!-- 直接使用全局注册的组件，不需要本地注册, -->
            <LayerFormItem
              key="orgId"
              :text="isDetailPage"
              :formParams="editForm"
              :formRef="() => $refs.formbfydw"
              :attrs="{
                model: 'orgId',
                textModel: 'orgName',
                component: 'FormTreeSelect',
                width: 260
              }"
            ></LayerFormItem>
          </el-form-item>
        </el-col>
        <!-- 字典的使用 -->
        <el-col :span="12">
          <el-form-item label="是否匿名:">
            <LayerFormItem
              :text="isDetailPage"
              :formParams="editForm"
              :attrs="{
                model: 'sfnm_c',
                dict: dict.type.sys_yes_no,
                textModel: 'sfnmName',
                component: 'FormSelect',
                width: 260,
                change: handleIsShowName
              }"
            ></LayerFormItem>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 附件 -->
      <el-row>
        <el-form-item label="附件:">
          <!-- getFileInfo就是附件的一些属性值 -->
          <LayerFormItem :text="isDetailPage" :formParams="editForm" :attrs="getFileInfo">
          </LayerFormItem>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  dicts: ['sys_yes_no'],
  data() {
    return {
      editForm: {},
      isDetailPage: false
    }
  },
  methods: {
    // 字典加载完成的回调
    onDictReady(dict) {
      // 初始化字典项
      this.$refs.layerPage.initDicts(dict)
    }
  }
}
</script>
```

| 属性       | 说明                                                                                                                                           | 类型     | 可选值 | 默认值 |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :----- | :----- |
| text       | 是否是详情，详情不展示组件，只展示文本；配合attrs.textModel使用，如果详情是本身字段则不需要，如果有专属的详情字段则需要使用textModel指定该字段 | boolean  | —      | false  |
| formParams | 响应式表单对象                                                                                                                                 | object   | —      | —      |
| attrs      | 各自单表单组件的一些属性参数                                                                                                                   | object   | —      | —      |
| formRef    | 表单的ref函数，获取表单的实例，目前只在 formTreeSelect组件中使用，目的是消除红色校验                                                           | function | —      | —      |

# 六种类型

## Dialog

基本的弹框，在该类型弹框中，可以使用内置的**单表单组件和自定义的表单项内容**

#### 使用示例

```vue {43,59}
<script>
export default {
  data() {
    const routeName = this.$route.name.toLowerCase();
    const BASE_URL = "/his/office";
    const form = [
      {
        label: "科室名称",
        model: "deptName",
        component: "FormSelect",
        dict: "sys_normal_disable",
        rules: [
          {
            required: true,
            message: "请输入科室名称",
            trigger: "change",
          },
        ],
      },
      {
        label: "科室电话",
        model: "deptPhone",
        component: "FormInput",
        rules: [
          {
            pattern: /^[1]([3-9])[0-9]{9}$/,
            required: true,
            message: "请输入正确的科室电话",
            trigger: "blur",
          },
        ],
      },
    ];
    return {
      operateLayer: {
        add: {
          label: "新增",
          params: {},
          method: "post",
          url: `${BASE_URL}`,
          hasPermi: `${routeName}:add`,
          mode: {
            type: "Dialog",
            top: "25vh",
            form,
          },
        },
        edit: {
          type: "primary",
          label: "修改",
          params: {
            name: "Jerry",
          },
          disabled: "single",
          url: `${BASE_URL}`,
          method: "put",
          hasPermi: `${routeName}:edit`,
          mode: {
            type: "Dialog",
            detail: true, // 需要使用详情
            form,
          },
        },
      },
    };
  },
};
</script>
```

在 Dialog 类型弹框中，根据项目需求，我们对弹框进行简单的配置，但是弹框里面的各种表单项该怎么写呢，上面`form`中写了一部分示例；如何使用`form`中的表单项，我们支持了一些常用的内置单表单组件，也可以自定义组件，详细可以查看**单表单组件**章节。

#### 属性

| 属性               | 说明                                                                               | 类型                                 | 可选值             | 默认值 |
| :----------------- | :--------------------------------------------------------------------------------- | :----------------------------------- | :----------------- | :----- |
| type               | 点击按钮后，需要触发的操作类型                                                     | string                               | 见 mode 的六种类型 | —      |
| form               | 移步阅读 单表单组件章节                                                            | array                                | —                  | —      |
| button             | 自定义弹框中按钮的文字以及显隐，不加此项，默认按钮为'取消'，'确定'                 | array                                | —                  | —      |
| detail             | 默认传递表格row信息；当type为RouterPage并且detail为true时，则路由模式中的query接受详情信息，但是过大的详情信息不建议走路由传参！ | boolean                              | —                  | false  |
| rules              | 弹框中的表单是否需要校验                                                           | boolean                              | —                  | false  |
| readonly           | 用于查看功能等，弹框中的信息是否为纯文本展示                                       | boolean                              | —                  | false  |
| title              | Dialog 的标题；为空时取按钮的文本（label 字段）                                    | string                               | —                  | —      |
| width              | Dialog 的宽度                                                                      | string                               | —                  | 50%    |
| fullscreen         | 是否为全屏 Dialog                                                                  | boolean                              | —                  | false  |
| top                | Dialog CSS 中的 margin-top 值                                                      | string                               | —                  | 15vh   |
| modal              | 是否需要遮罩层                                                                     | boolean                              | —                  | true   |
| modalAppendToBody  | 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上       | boolean                              | —                  | true   |
| appendToBody       | Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true       | boolean                              | —                  | false  |
| lockScroll         | 是否在 Dialog 出现时将 body 滚动锁定                                               | boolean                              | —                  | true   |
| customClass        | Dialog 的自定义类名                                                                | string                               | —                  | —      |
| closeOnClickModal  | 是否可以通过点击 modal 关闭 Dialog                                                 | boolean                              | —                  | true   |
| closeOnPressEscape | 是否可以通过按下 ESC 关闭 Dialog                                                   | boolean                              | —                  | true   |
| showClose          | 是否显示关闭按钮                                                                   | boolean                              | —                  | true   |
| beforeClose        | 关闭前的回调，会暂停 Dialog 的关闭                                                 | function(done)，done 用于关闭 Dialog | —                  | —      |
| center             | 是否对头部和底部采用居中布局                                                       | boolean                              | —                  | false  |
| destroyOnClose     | 关闭时销毁 Dialog 中的元素                                                         | boolean                              | —                  | false  |

## 确认弹框

确认弹框的类型为（`warning、info、success、error`），用于项目中需要删除、警告等需要进行第二次确认的操作

#### 使用示例

```vue {17,30}
<script>
export default {
  data() {
    const routeName = this.$route.name.toLowerCase();
    const BASE_URL = "/his/office";
    return {
      operateLayer: {
        remove: {
          type: "primary",
          label: "删除",
          disabled: "multipe",
          url: `${BASE_URL}`,
          method: "delete",
          hasPermi: `${routeName}:remove`,
          mode: {
            subscribe: "是否确认删除这些数据?",
            type: "warning",
            title: "提示",
            label: "deptId",
          },
        },
        warn: {
          type: "danger",
          disabled: "single",
          label: "警告",
          url: `${BASE_URL}/warn`,
          method: "get",
          hasPermi: `${routeName}:warn`,
          mode: {
            type: "error",
            subscribe: (item) => {
              return `${item.deptLeader}已被严重警告`;
            },
            title: "警告",
            label: "deptId",
            catch: () => {
              this.$message({
                type: "info",
                message: "已取消警告",
              });
            },
          },
        },
      },
    };
  },
};
</script>
```

#### 属性

| 属性              | 说明                                                           | 类型                    | 可选值             | 默认值                                          |
| :---------------- | :------------------------------------------------------------- | :---------------------- | :----------------- | :---------------------------------------------- |
| type              | 点击按钮后，需要触发的操作类型                                 | string                  | 见 mode 的六种类型 | —                                               |
| subscribe         | MessageBox 消息正文内容                                        | string / function(info) | —                  | —                                               |
| title             | MessageBox 标题                                                | string                  | —                  | 提示                                            |
| showCancelButton  | 是否显示取消按钮                                               | boolean                 | —                  | false（以 confirm 和 prompt 方式调用时为 true） |
| showConfirmButton | 是否显示确定按钮                                               | boolean                 | —                  | true                                            |
| cancelButtonText  | 取消按钮的文本内容                                             | string                  | —                  | 取消                                            |
| confirmButtonText | 确定按钮的文本内容                                             | string                  | —                  | 确定                                            |
| center            | 是否居中布局                                                   | boolean                 | —                  | false                                           |
| roundButton       | 是否使用圆角按钮                                               | boolean                 | —                  | false                                           |
| catch             | 取消按钮后的回调                                               | function                | —                  | —                                               |
| label             | 操作的 id 别名，默认为 id 字段                                 | string                  | —                  | id                                              |
| paramsType        | 改为 params 传参，不传则为 path 路径传参,可搭配 label 一起使用 | boolean                 | true               | —                                               |

## CustomDialog

#### 使用示例

此时引入了一个外部自定义组件到当前组件。在外部自定义组件中，不受当前插件的限制，可以随意的写项目中比较复杂的弹框需求。

```vue {12}
<script>
import CustomDialog from "./CustomDialog";
export default {
  data() {
    return {
      operateLayer: {
        CustomDialog: {
          label: "自定义弹框",
          params: { name: "resrse" },
          show: "table",
          mode: {
            type: "CustomDialog",
            name: "customDialog",
            detail: true,
            component: CustomDialog,
          },
        },
      },
    };
  },
};
</script>
```

#### 属性

| 属性      | 说明                                                              | 类型    | 可选值             | 默认值 |
| :-------- | :---------------------------------------------------------------- | :------ | :----------------- | :----- |
| type      | 点击按钮后，需要触发的操作类型                                    | string  | 见 mode 的六种类型 | —      |
| name      | 自定义弹框时，name 必传;自定义组件都要有 name 作为该组件的 ref 值 | string  | —                  | —      |
| detail    | 为 true 时，自定义组件的详情会传到该组件的 props 的 params 中     | boolean | —                  | false  |
| component | 自定义组件本身                                                    | object  | —                  | —      |

#### 自定义弹框组件的使用

参数`dialogVisible`控制显隐必传；`queryList`点击确定后，执行该方法可以用于刷新展示层数据；`params`为选择当前行的信息，在当前组件中可以使用该行信息进行一系列操作。

```vue
<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    @close="() => $emit('update:dialogVisible', false)"
  >
    <h1>自定义弹框</h1>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
      <el-button type="primary" @click="$emit('update:dialogVisible', false)"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    queryList: {
      type: Function,
    },
    params: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
```

## CustomPage

#### 使用示例

例如：新增功能比较复杂时，只依靠弹框是放不下的，新增的事项很庞大，这时就需要一个单独的页面去完成该操作，此时就可以使用自定义组件`CustomPage`来完成这件事，其他搜索层、操作层和展示层还是在当前组件，只是把比较复杂的新增功能给抽离出去单独完成。

```vue {14}
<script>
import CustomPage from "./CustomPage";
export default {
  data() {
    return {
      operateLayer: {
        customPage: {
          type: "success",
          disabled: "single",
          show: "table",
          icon: "el-icon-set-up",
          label: "自定义组件",
          mode: {
            type: "CustomPage",
            name: "customPage",
            component: CustomPage,
            detail: true,
          },
        },
      },
    };
  },
};
</script>
```

#### 属性

| 属性      | 说明                                                              | 类型    | 可选值             | 默认值 |
| :-------- | :---------------------------------------------------------------- | :------ | :----------------- | :----- |
| type      | 点击按钮后，需要触发的操作类型                                    | string  | 见 mode 的六种类型 | —      |
| name      | 自定义弹框时，name 必传;自定义组件都要有 name 作为该组件的 ref 值 | string  | —                  | —      |
| detail    | 为 true 时，自定义组件的详情会传到该组件的 props 的 params 中     | boolean | —                  | false  |
| component | 自定义组件本身                                                    | object  | —                  | —      |

#### 自定义弹框组件的使用

当我们点击新增按钮后，进入到了这个自定义组件页面，完成了一系列功能后，需要再跳回到主页面，此时需用到`this.$emit("update:pageVisible", false)`,即关闭当前组件页面，回到主页面。

参数`pageVisible`控制显隐必传；`queryList`点击确定后，执行该方法可以用于刷新展示层数据；`params`为选择当前行的信息，在当前组件中可以使用该行信息进行一系列操作。

```vue
<template>
  <div>
    <h1>自定义组件页面</h1>
    {{ params }}
    <el-button @click="submit">提交</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    pageVisible: {
      type: Boolean,
      required: true,
    },
    queryList: {
      type: Function,
    },
    params: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},
  methods: {
    submit() {
      // 回到首页
      this.$emit("update:pageVisible", false);
      // or
      //this.$parent.pageVisible=false;

      // 回到首页,重新查询数据
      this.queryList();
      // or
      //this.$parent.queryList();
    },
  },
};
</script>
```

## RouterPage

自定义路由页面和自定义组件页面很相似，只是跳转的方式不同，前者是通过组件控制，后者通过路由控制（改变了路由）；在各自的自定义组件中获取选择行的信息方式不同，前者是通过组件的传参获取，后者是通过`this.$route`路由信息获取。

#### 使用示例

如果`defatil`为`true`时，跳转过程中，会把选择行的详情带入到`this.$route.query.params`中；可选择`path`或`name`方式切换路由页；

```vue {11}
<script>
export default {
  data() {
    return {
      operateLayer: {
        routerPage: {
          disabled: "single",
          show: "table",
          label: "自定义路由",
          mode: {
            type: "RouterPage",
            detail: true,
            router: {
              path: "/his/RouterPage",
              query: {
                name: "参数",
              },
              // name: "RouterPage",
              // params: {
              //   sek: "lakei",
              // },
            },
          },
        },
      },
    };
  },
};
</script>
```

#### 属性

| 属性   | 说明                                                              | 类型   | 可选值             | 默认值 |
| :----- | :---------------------------------------------------------------- | :----- | :----------------- | :----- |
| type   | 点击按钮后，需要触发的操作类型                                    | string | 见 mode 的六种类型 | —      |
| name   | 自定义弹框时，name 必传;自定义组件都要有 name 作为该组件的 ref 值 | string | —                  | —      |
| detail             | 默认传递表格row信息；当type为RouterPage并且detail为true时，则路由模式中的query接受详情信息，但是过大的详情信息不建议走路由传参！ | boolean                              | —                  | false  |
| router | 路由跳转的一些配置                                                | object | —                  | —      |

#### 自定义路由页面的使用

在自定义路由页面回到主页面的话，仅需要跳回到主页面路由即可。

```vue
<template>
  <div>
    <h1>路由自定义页面</h1>
    <el-button @click="submit">提交</el-button>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$route.query.params); //当前选中行的详情信息
  },
  methods: {
    submit() {
      this.$router.push("/his/office");
    },
  },
};
</script>
```

## Export

#### 使用示例

当使用导出功能时，会出现两种情况：

- 不传参数，则全部导出
- 传递一个数组参数，按照数组中的“id”进行部分导出

```vue {14}
<script>
export default {
  data() {
    return {
      operateLayer: {
        export: {
          size: "mini",
          type: "primary",
          label: "导出",
          params: { type: khlrType }, // 支持带入自定义的参数，此参数会合并到接口参数中
          method: "post",
          url: `${BASE_URL}/export`,
          mode: {
            type: "Export",
            label: "id", // 当选择表格数据时，默认取表格列表的id属性
            paramsLabel: "exportIds", // 此时接口需要传exportIds这个字段，而不去是id字段
            exportName: `${types[khlrType].label}.xlsx`, // 录入时，根据不同考核单位
          },
        },
      },
    };
  },
};
</script>
```

#### 属性

| 属性        | 说明                           | 类型   | 可选值             | 默认值        |
| :---------- | :----------------------------- | :----- | :----------------- | :------------ |
| type        | 点击按钮后，需要触发的操作类型 | string | 见 mode 的六种类型 | —             |
| label       | 取值的别名                     | string | —                  | id            |
| paramsLabel | 参数字段的别名                 | string | —                  | id            |
| exportName  | 导出附件的名称                 | string | —                  | 列表文件.xlsx |

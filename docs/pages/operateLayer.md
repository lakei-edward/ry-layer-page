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
|show|是否显示,以及按钮的位置，默认在表格上，可配置在表格内；|boolean | string|true/false/table|true|
|size|尺寸|string|—|—|
|type|类型|string|success / info / warning / error|—|
|icon|图标类名|string|—|—|
|plain|是否朴素按钮|boolean|—|false|
|round|是否圆角按钮|boolean|—|false|
|circle|是否圆形按钮|boolean|—|false|
|disabled|单选/多选/自定义|string /function(row)|single/multipe|—|
|label|标题|string|—|—|
|hasPermi|权限|string|—|—|
|url|操作按钮最后需要调的接口|string|—|—|
|method|接口类型|string|—|—|
|params|接口的参数|object|—|—|
|mode|按钮的操作方式|object|—|—|




## 操作方式

当我们点击按钮的时候，我们怎么知道每个按钮是干嘛的呢，新增功能具体新增哪些内容，删除功能怎么确认删除？此时就要用到`mode` 这个参数了

### mode的五种类型

| 类型     |  功能       | 说明  |
| :------- | :----------- | :------ |
|Dialog|弹框，用于比较简单的弹框场景|弹框|
|warning、info、success、error|确认弹框，用于删除操作等|确认消息弹框|
|CustomDialog|向当前页面中插入一个有dialog的组件，dialog组件中内容完全自定义，用于比较复杂的弹框场景|自定义弹框|
|CustomPage|点击按钮后，跳转到一个新的组件页面，可在该组件内完成某些操作后返回主页面，用于比较复杂的场景|自定义页面|
|RouterPage|点击按钮后，跳转到一个路由页面，可在该路由页面内完成某些操作后返回主页面，用于比较复杂的场景|自定义路由页面|

让我们来逐一了解下每种不同操作类型的使用情况；

::: tip 提示
每种类型的操作方式，各属性配置略有不同，需要针对每种类型操作配置不同的属性！
:::

### type为Dialog时

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
            name: 'Jerry',
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
在Dialog类型弹框中，根据项目需求，我们对弹框进行简单的配置，但是弹框里面的各种表单项该怎么写呢，上面`form`中写了一部分示例；如何使用`form`中的表单项，我们支持了一些常用的内置单表单组件，也可以自定义组件，详细可以查看**单表单组件**章节。

#### 属性
| 属性     | 说明        | 类型  | 可选值 | 默认值
| :------- | :----------- | :------ | :------------------------------------------ | :----- |
|type|点击按钮后，需要触发的操作类型|string|见mode的五种类型|—|
|form|移步阅读 单表单组件章节|array|—|—|
|button|自定义弹框中按钮的文字以及显隐，不加此项，默认按钮为'取消'，'确定'|array|—|—|
|detail|是否需要调用查看详情接口，把详情信息保存到上一级的params中，用于查看、编辑等操作|boolean|—|false|
|rules|弹框中的表单是否需要校验|boolean|—|false|
|readonly|用于查看功能等，弹框中的信息是否为纯文本展示|boolean|—|false|
|title|Dialog 的标题；为空时取按钮的文本（label字段）|string|—|—|
|width|Dialog 的宽度|string|—|50%|
|fullscreen|是否为全屏 Dialog|boolean|—|false|
|top|Dialog CSS 中的 margin-top 值|string|—|15vh|
|modal|是否需要遮罩层|boolean|—|true|
|modalAppendToBody|遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上|boolean|—|true|
|appendToBody|Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true|boolean|—|false|
|lockScroll|是否在 Dialog 出现时将 body 滚动锁定|boolean|—|true|
|customClass|Dialog 的自定义类名|string|—|—|
|closeOnClickModal|是否可以通过点击 modal 关闭 Dialog|boolean|—|true|
|closeOnPressEscape|是否可以通过按下 ESC 关闭 Dialog|boolean|—|true|
|showClose|是否显示关闭按钮|boolean|—|true|
|beforeClose|关闭前的回调，会暂停 Dialog 的关闭|function(done)，done 用于关闭 Dialog|—|—|
|center|是否对头部和底部采用居中布局|boolean|—|false|
|destroyOnClose|关闭时销毁 Dialog 中的元素|boolean|—|false|

### type为warning、info、success、error时

确认弹框，用于项目中需要删除、警告等需要进行第二次确认的操作

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
| 属性     | 说明        | 类型  | 可选值 | 默认值
| :------- | :----------- | :------ | :------------------------------------------ | :----- |
|type|点击按钮后，需要触发的操作类型|string|见mode的五种类型|—|
|subscribe|MessageBox 消息正文内容|string / function(info)|—|—|
|title|MessageBox 标题|string|—|提示|
|showCancelButton|是否显示取消按钮|boolean|—|false（以 confirm 和 prompt 方式调用时为 true）|
|showConfirmButton|是否显示确定按钮|boolean|—|true|
|cancelButtonText|取消按钮的文本内容|string|—|取消|
|confirmButtonText|确定按钮的文本内容|string|—|确定|
|center|是否居中布局|boolean|—|false|
|roundButton|是否使用圆角按钮|boolean|—|false|
|catch|取消按钮后的回调|function|—|—|
|label|操作的id别名，默认为id字段|string|—|id|

### type为CustomDialog时


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

| 属性     | 说明        | 类型  | 可选值 | 默认值
| :------- | :----------- | :------ | :------------------------------------------ | :----- |
|type|点击按钮后，需要触发的操作类型|string|见mode的五种类型|—|
|name|自定义弹框时，name必传;自定义组件都要有name作为该组件的ref值|string|—|—|
|detail|为true时，自定义组件的详情会传到该组件的props的params中|boolean|—|false|
|component|自定义组件本身|object|—|—|

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

### type为CustomPage时

#### 使用示例

例如：新增功能比较复杂时，只依靠弹框是放不下的，新增的事项很庞大，这时就需要一个单独的页面去完成该操作，此时就可以使用自定义组件`CustomPage`来完成这件事，其他搜索层、操作层和展示层还是在当前组件，只是把比较复杂的新增功能给抽离出去单独完成。

```vue {14}
<script>
import CustomPage from "./CustomPage";
export default {
  data(){
    return{
      operateLayer:{
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
      }
    }
  }
}
</script>
```

#### 属性

| 属性     | 说明        | 类型  | 可选值 | 默认值
| :------- | :----------- | :------ | :------------------------------------------ | :----- |
|type|点击按钮后，需要触发的操作类型|string|见mode的五种类型|—|
|name|自定义弹框时，name必传;自定义组件都要有name作为该组件的ref值|string|—|—|
|detail|为true时，自定义组件的详情会传到该组件的props的params中|boolean|—|false|
|component|自定义组件本身|object|—|—|

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

### type为RouterPage时

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

| 属性     | 说明        | 类型  | 可选值 | 默认值
| :------- | :----------- | :------ | :------------------------------------------ | :----- |
|type|点击按钮后，需要触发的操作类型|string|见mode的五种类型|—|
|name|自定义弹框时，name必传;自定义组件都要有name作为该组件的ref值|string|—|—|
|router|路由跳转的一些配置|object|—|—|

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
    console.log(this.$route.query.params);//选择行详情信息
  },
  methods: {
    submit() {
      this.$router.push("/his/office");
    },
  },
};
</script>
```
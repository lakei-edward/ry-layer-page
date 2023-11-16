# FormInput

## 使用示例

```vue
<script>
export default {
  data() {
    return {
      searchLayer: {
        form: [
          {
            label: '科室负责人',
            model: 'deptLeader',
            component: 'FormInput',
            rules: [{ required: true, message: '请输入科室名称', trigger: 'blur' }]
          }
        ]
      }
    }
  }
}
</script>
```

## 支持事件

```vue
<script>
export default {
  data() {
    return {
      searchLayer: {
        form: [
          {
            label: "科室负责人",
            model: "deptLeader",
            component: "FormInput",
            clcik: this.handleClick
          },
        ],
        ...
      },
    };
  },
  methods: {
    handleClick() {
      this.$refs.ChoosePerson.init();
    },
  }
};
</script>
```

## 表单项隐藏

当我们不想让该表单项在一开始加载的时候显示，我们可以设置` hidden: true`；

在某些操作后再显现出来，此时通过“示例 1”的`change`方法，控制“示例 2”的显隐

```js
{
  {
    label: "示例1",
    model: "khnr",
    size: "small",
    keyModel: "createTime",
    component: "FormSelect",
    width: 730,
    rules: [
      {
        required: true,
        message: "请选择考核内容",
        trigger: "blur"
      }
    ],
    dict: this._khnrList(),
    change: this.chooseContent
  },
  {
    label: "示例2",
    model: "score",
    size: "small",
    regExp: "number",
    hidden: true,
    component: "FormInput",
    width: 260,
  },
}
```

```js
/** 选择考核内容 */
chhoseContent(val) {
  this.operateLayer.params.khnr = val.dictLabel;
  this.operateLayer.params.khdf = val.dictValue;
  // remark为2、3的根据计算方式来确定khdf是多少
  this.remark = val.remark;
  if (val.remark === "1") {
    this.operateLayer.mode.form.forEach((r) => {
      if (r.model === "score") {
        r.hidden = true;
      }
    });
  } else {
    this.khdfClone = val.dictValue;
    this.operateLayer.mode.form.forEach((r) => {
      if (r.model === "score") {
        r.hidden = false;
        r.label = val.remark === "2" ? "缺项数量" : "记分";
      }
    });
  }
},
```

## 自定义正则

`regExpCallback` 根据自定义的正则进行判断是否可以输入，仅支持 `FormInput` 组件

```js
{
  label: "扣分值",
  maxlength: 5,
  model: "points",
  component: "FormInput",
  placeholder: "请输入，扣分数字前用负号",
  width: 260,
  regExpCallback: (val, setFormValue) => {
    const regex = /^-\d*\.?\d*$/;
    if (!regex.test(val)) {
      setFormValue && setFormValue("");
    }
  },
  rules: inputRule("，扣分数字前用负号"),
},
```

## 内容回填

当选择某一项时，可以回填当前表单的其他字段里面

```vue
<template>
  <div>
    <ry-layer-page
      ref="layerpage"
      :search-layer="searchLayer"
      :operate-layer="operateLayer"
      :display-layer="displayLayer"
      :loading="true"
    />
    <ChoosePerson
      ref="ChoosePerson"
      :multiple="true"
      @choosedPoliceEmit="choosedPoliceEmit"
    ></ChoosePerson>
  </div>
</template>
<script>
export default {
  data() {
    const sjgr = (flag) => {
      return {
        label: "涉及个人",
        model: "individualsInvolvedName",
        component: "FormInput",
        width: 260,
        rules: flag ? chooseRule("涉及个人") : [],
        click: flag ? this.choosePolice : null,
      };
    };
    const operateLayer = {
      add: {
        ...
        mode:{
          form:[sjgr(true)]
        }};
      edit: {};
    }
    return {
      searchLayer: {},
      operateLayer:operateLayer,
      operKey:"" // 用来获取ikey值，也就是操作的key
    };
  },
  methods: {
    choosedPoliceEmit(selection) {
      let xm = [],
        user_id = [];
      if (selection && selection.length > 0) {
        selection.forEach((r) => {
          xm.push(r.xm);
          user_id.push(r.user_id);
        });
        this.$set(
          this.operateLayer[this.operKey].params,
          "individualsInvolvedName",
          xm.join(",")
        );
        this.$set(
          this.operateLayer[this.operKey].params,
          "individualsInvolved",
          user_id.join(",")
        );
      }
    },
    choosePolice(val, ikey) {
      this.operKey = ikey; // 这里回填key，为了赋值
      this.$refs.ChoosePerson.init(val.unitsInvolved);
    },
  }
};
</script>
```

## 属性

| 属性            | 说明                                                                    | 类型    | 可选值                | 默认值                 |
| :-------------- | :---------------------------------------------------------------------- | :------ | :-------------------- | :--------------------- | --- |
| component       | 当前使用的单表单组件                                                    | object  | —                     | —                      |
| label           | 描述                                                                    | string  | —                     | —                      |
| model           | 该组件需向接口传递的字段                                                | string  | —                     | —                      |
| maxlength       | 原生属性，最大输入长度                                                  | number  | —                     | —                      |
| minlength       | 原生属性，最小输入长度                                                  | number  | —                     | —                      |
| show-word-limit | 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效    | boolean | —                     | false                  |
| placeholder     | 输入框占位文本                                                          | string  | —                     | 请输入                 |
| clearable       | 是否可清空                                                              | boolean | —                     | false                  |
| show-password   | 是否显示切换密码图标                                                    | boolean | —                     | false                  |
| disabled        | 禁用                                                                    | boolean | —                     | false                  |
| size            | 输入框尺寸，只在 type!="textarea" 时有效                                | string  | medium / small / mini | —                      |
| prefix-icon     | 输入框头部图标                                                          | string  | —                     | —                      |
| suffix-icon     | 输入框尾部图标                                                          | string  | —                     | —                      |
| readonly        | 原生属性，是否只读                                                      | boolean | —                     | false                  |
| formWidth       | 宽度                                                                    | number  | —                     | —                      |
| regExp          | 输入时的正则校验，内置的正则或者自定义正则                              | string  | regExp                | number/english/chinese | —   |
| rules           | elementUI 规则校验                                                      | array   | —                     | —                      |
| hidden          | 控制表单项的显隐，其他单表单组件一致                                    | boolean | — —                   |
| regExpCallback  | input 自定义正则 regExpCallback,接受两个参数，一个 value，一个 setValue | boolean | — —                   |

## 事件

| 属性  | 说明       | 参数 |
| :---- | :--------- | :--- |
| click | 选中时触发 | —    |

<style>
table th:nth-of-type(1) {
    width: 20%;
}
table th:nth-of-type(2) {
    width: 40%;
}
</style>

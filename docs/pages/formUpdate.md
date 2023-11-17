# FormUpdate

## 使用示例

附件上传到服务器是根据`fileId`字段拼接`,`形式上传，`fileListLabel`属性对应的`elementui`中为`file-list`属性，当获取详情中的附件信息时，用于展示的字段，要和详情接口中的附件信息字段保持一致。

上传文件的提示，`textLabel`属性支持 html 格式。

```vue
<script>
export default {
  data() {
    const route = this.$route.name.toLowerCase()
    return {
      operateLayer: {
        add: {
          size: 'mini',
          label: '新增',
          params: {},
          method: 'post',
          url: '/his/office',
          hasPermi: `${route}:add`,
          mode: {
            type: 'Dialog',
            form: [
              {
                label: '附件',
                model: 'fileId',
                component: 'FormUpdate',
                width: 565,
                icon: 'el-icon-receiving',
                fileListLabel: 'fileInfo',
                multiple: false,
                buttonLabel: '上传图片',
                upload: {
                  action: `${process.env.VUE_APP_FILE_API}/minio/upload`,
                  headers: {
                    Authorization: 'eyJhbGciOiJIUzUxMiJ9.....'
                  },
                  reg: /^.*\.(?:jpg|jpeg|png)$/i,
                  size: 5,
                  textLabel:
                    "请上传 大小不超过 <span style='color:#ff0078'>5MB</span> 格式为 jpg/jpeg/png的图片",
                  sizeLabel: '上传文件大小不能超过5MB'
                }
              }
            ]
          }
        }
      }
    }
  }
}
</script>
```

## 数据回填

获取详情之后，主要依靠 `fileListLabel` 字段对应的 `fileInfo`来回填， `fileInfo`可以自定义为接口返回的字段名称。

如果回填时，附件没有监听到，此时需要使用 `$nextTick` 来处理。

```js
// 给个异步，为了让formUpdate 的 watch 监听事件监听到变化
this.$nextTick(() => {
  // 获取 editForm.fileInfo 数组往 editForm.fileId 中添加数据！
  this.editForm = detail.cbdcInfo
  // 这里是为了做表单必填校验
  this.editForm.fileId =
    this.editForm.cbdcFileInfo && this.editForm.cbdcFileInfo.map(r => r.fileId).join(',')
})
```

## 属性

| 属性          | 说明                                                                                                    | 类型    | 可选值                                             | 默认值          |
| :------------ | :------------------------------------------------------------------------------------------------------ | :------ | :------------------------------------------------- | :-------------- |
| component     | 当前使用的单表单组件                                                                                    | object  | —                                                  | —               |
| label         | 描述                                                                                                    | string  | —                                                  | —               |
| model         | 该组件需向接口传递的字段                                                                                | string  | —                                                  | —               |
| width         | 附件组件所占宽度                                                                                        | number  | —                                                  | —               |
| size          | 按钮尺寸                                                                                                | string  | medium / small / mini                              | —               |
| buttonLabel   | 按钮的描述                                                                                              | string  | —                                                  | 点击上传        |
| limit         | 最大允许上传个数                                                                                        | number  | —                                                  | —               |
| disabled      | 是否禁用                                                                                                | boolean | —                                                  | false           |
| circle        | 是否圆形按钮                                                                                            | boolean | —                                                  | false           |
| round         | 是否圆角按钮                                                                                            | boolean | —                                                  | false           |
| plain         | 是否朴素按钮                                                                                            | boolean | —                                                  | false           |
| icon          | 图标类名                                                                                                | string  | —                                                  | —               |
| type          | 类型                                                                                                    | string  | primary / success / warning / danger / info / text | —               |
| multiple      | 是否支持多选文件                                                                                        | boolean | —                                                  | —               |
| fileListLabel | 上传的文件列表字段；查看详情时，接口里面的字段别名                                                      | string  | —                                                  | fileList        |
| downloadWay   | 查看界面时，下载附件方式                                                                                | string  | Blob/new-window                                    | Blob            |
| downloadUrl   | 下载接口                                                                                                | string  | —                                                  | /minio/download |
| image         | 详情展示预览图片,详情以下属性                                                                           | string  | —                                                  | —               |
| storage       | 存储文件方式(单文件存储/多文件存储)，如果存储方式为单文件，则不允许多选文件上传，否则允许多选或单选上传 | string  | single/multiple                                    | multiple        |
| listType      | 文件列表的类型                                                                                          | string  | text/picture/picture-card                          | text            |
| pathLabel     | 图片路径字段别名                                                                                        | string  | —                                                  | path            |
| upload        | 上传文件的一些配置参数，详细见 upload 属性                                                              | object  | —                                                  | —               |

## image 属性

查看弹框/页面中，传了该属性就会默认展示`pathLabel`路径中的图片，图片的可选属性如下：

```js
image: {
  show: true,
  alt: "图片异常",
  width: 200,
},
```

| 属性   | 说明                 | 类型    | 是否必传 | 默认值 |
| :----- | :------------------- | :------ | :------- | :----- |
| show   | 是否预览图片         | boolean | 是       | false  |
| alt    | 图片异常现场文本内容 | string  | —        | —      |
| width  | 图片宽度             | number  | —        | 150    |
| height | 图片高度             | number  | —        | 自适应 |

## upload 属性

`reg`默认值为`/^.*\.(?:jpg|jpeg|png|doc|docx|pdf|xls|xlsx|ppt|pptx|txt)$/i`，可自定义校验规则

| 属性          | 说明                                            | 类型   | 是否必传     | 默认值                                                                 |
| :------------ | :---------------------------------------------- | :----- | :----------- | :--------------------------------------------------------------------- |
| action        | 接口                                            | string | 是           | —                                                                      |
| headers       | 接口的 headers                                  | object | 是           | —                                                                      |
| reg           | 校验文件的正则表达式                            | object | —            | —                                                                      |
| size          | 上传文件大小限制                                | number | —            | 10                                                                     |
| textLabel     | 上传文件的提示，支持 html 格式                  | string | —            | 请上传 大小不超过 10MB 格式为 doc/docx/xls/xlsx/txt/pdf/jpg/png 的文件 |
| sizeLabel     | 限制大小描述                                    | string | —            | 上传文件大小不能超过 10MB                                              |
| textLabelSite | 当为 drag 时，判断 textLabel 在里还是在外面显示 | string | insert/outer | outer                                                                  |

<style>
table th:nth-of-type(1) {
    width: 20%;
}
table th:nth-of-type(2) {
    width: 40%;
}
table th:nth-of-type(4) {
    width: 17%;
}
</style>

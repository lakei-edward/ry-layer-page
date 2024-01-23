# 日志信息

## 2023.12

1. feat: 表格内的内置组件增加函数传参getTableAttr,例如tag的type类型，可动态改变
1. feat: 路由跳转页面新增新窗口打开功能target: true,
1. feat: 查看详情新增get的query-paramsType类型传参，之前只支持path传参，用法为二重数组[['id', 'groupId']]，前面为字段名，后面为row里面属性名
1. tip: 字典promise用法必须要加$options.dicts，当字典返回一个接口数据时，要返回一个promise
1. tip: 重新刷新列表数据this.$refs.layerpage.queryList()
1. feat: 增加搜索前的钩子函数，beforeSearch，用于搜索前的参数修改
1. feat: 增加详情的回显设置钩子，afterDetail，获取详情之后，还没有渲染到页面时，自定义改变属性值
1. feat: 新增路由跳转前的钩子函数：beforeRouter,返回一个Boolean值，判断能不能跳转
1. feat: 弹框模式下，获取详情的方式增加直接从row里面取，目前只支持详情取，row：true，detail：true
1. feat: 表格内操作项设置hidden，支持回调函数，返回Boolean值类型
1. feat: 表格新增序号，displayLayer.index有值的话显示
1. fix: 表格内的CustomOperate，无法获取row，以增加第三个参数获取row
1. feat: 提交前增加beforeSubmit前置钩子用于前置判断或更改参数，可返回一个promise的Boolean值，用于中止提交操作

## 2023.11

1. feat：新增路由传参可以带入row信息，自定义带入表格的数据，以row开头的参数
1. feat：新增 DownLoad 类型
1. fix：修改主要组件的名称
1. fix：修改LayerFormItem单组件，具有查看详情功能
1. feat：增加选择器父子孙联动效果

## 2023.08

1. feat：单表单组件时间第二参数传入ikey操作类型参数
1. feat：当使用 FormSelect 组件 change 事件时， 则默认返回对象，当该值为 true 时，则只返回 value
1. feat：dialog类型，动态传入label-width
1. fix：重置清除dataRange数据
1. feat：input自定义正则regExpCallback,接受两个参数，一个value，一个setValue
1. feat：树级下拉，改变之后取消红色校验
1. feat：导出新增paramsType，判断传入的是数组还是字符串
1. fix：操作项不传url时，点击确定则只重新获取list数据
1. fix：DIalog类型，新增labelAfter
1. feat：新增textLabelPos属性，判断textLabel在里还是在外面显示
1. fix：修改sizeLabel为sizeLimitTip提示

## 2023.06

1. feat：路由跳转获取详情不应该用路由传参，改为sessionStorage存储！
1. feat：导出新增searchParams属性 需要查询条件参数
1. chore：确认框和Export代码重构
1. feat：日期新增change事件
1. feat：FormSelcet新增optionValue属性，类型：boolean，为change事件，才生效，默认为false，返回对象
1. fix：字典在templete中拿不到数据
1. feat：表格内待新增Switch、Tag组件
1. fix：字典不能设置别名
1. feat：支持不在总框架中使用单个表单项组件SingleFormPiece
1. feat：支持不在总框架中，使用表单组件SingleForm
1. feat：form中的单表单组件，FormInput、FormSelect支持事件函数
1. feat：FormSelect中不仅仅可以传字典的数据，还可以传原有的数组数据！
1. feat：表单项新增隐藏功能，hidden=true，可通过事件控制显隐
1. feat：新增export导出附件模式
1. feat：确认框模式新增paramsType传参 paramsType: true，不是path传参id了，是params传参id
1. feat：export导出附件模式和删除模式，新增paramsLabel，定义参数id的别名，exportName
1. feat：operateLayer中新增disabledType属性，当disabled为函数时，此属性必填，值为：multipe single
1. feat：searchLayer新增默认params，params会合并到主组件中
1. feat：查看详情时，新增多个path参数传递，不仅仅传id了，multiPath: ["id", "tjzt"]多个参数
1. feat：detail不传默认带入row信息，传递detailId则只带入id，detail=true，则走接口路由传参；type为RouterPage以外的模式时，详情放在了params参数中
1. feat：FormSelect的key新增自定义别名keyModel，避免value值重复时，一直报错，默认为value,keyModel: "createTime",
1. feat：FormDate日期新增不可选日期disabledDate属性，固定参数未：before after。范围日期FormDateRange没有该功能
1. fix：表格内的operate按钮操作显示问题
1. feat： 操作列属性为必传项prop: "operate",// 固定值，根据operate判断点击行时是否需要选中改行
1. fix：展示列的dblclick默认改为false
1. fix：修改\_isUndef判断逻辑，拆分为\_isDeTrue \_isDeFalse
1. chore：v-hasPermi属性说明，不传的时候会一直提示”请设置操作权限标签值“，直接在src/directive/permission/hasPermi.js中把new Error注释掉
1. feat：表格内新增el-tag展示
1. fix：修改字典展示问题，FormSelect.vue中也要取main.js中配置的别名key

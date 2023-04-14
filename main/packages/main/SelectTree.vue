<template>
    <el-popover
        ref="popover"
        popper-class="kt-select-tree__popover"
        placement="bottom-start"
        trigger="click"
        :disabled="disabled"
    >
        <!-- 显示content -->
        
        <div id="treeContent" ref="treeContent">
            <el-input
                class="kt-select-tree__input"
                v-if="filterable"
                placeholder="请输入关键字"
                v-model="searchValue"
            ></el-input>
            
            <el-tree
                ref="tree"
                class="kt-select-tree"
                :style="{'min-width':treeWidth}"
                :data="treeData"
                :myrule="myrule"
                :props="dynaDefProps"
                :check-strictly='checkStrictly'
                :clearable="clearable"
                :node-key="dynaDefProps.id"
                @node-click="onNodeClick"
                :highlight-current="!multiple"
                :expand-on-click-node="false"
                :searchVal="searchVal"
                :default-expanded-keys="defaultExpandedKeys"
                :show-checkbox="multiple"
                :default-expand-all="defaultExpandAll"
                :filter-node-method="onTreeFilter"
                @check="onCheck"
                @remove-tag="removeHandle"
                :current-node-key="currentNodeKey"
            >
                <div
                    :class="nodeFilter(node)"
                    style="display:flex;flex:1"
                    slot-scope="{ node, data }"
                >
                    <div ref="" style="width:100%;overflow: hidden;text-overflow: ellipsis;">
                        <el-tooltip v-if="getTootipState(node)" class="item" effect="dark" :content="node.label" placement="top-start">
                            <span
                                :node="node"
                                :data="data"
                            >{{ node.label }}</span>
                        </el-tooltip>
                        <span v-else>
                            {{ node.label }}
                        </span>
                    </div>
                    
                </div>
            </el-tree>
        </div>
        <!-- 触发html -->
        <el-select
            ref="select"
            slot="reference"
            popper-class="kt-select-tree__option"
            :style="{'width':width}"
            v-model="labelValue"
            :size="size"
            :myrule="myrule"
            :multiple="multiple"
            :clearable="clearable"
            :collapse-tags="collapseTags"
            :placeholder="placeholder"
            :disabled="disabled"
            :searchVal="searchVal"
            @change="onChange"
            @clear="onClear"
            @remove-tag="removeHandle"
        >
        </el-select>
    </el-popover>
</template>


<script>
var obj;
export default {
    name: "SelectTree",
    model: {
        prop: "value",
        event: "input"
    },
    props: {

        data: Array,
        value: String | Array,
        defaultProps: Object,
        // 对外暴露的属性
        width: String,
        disabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: "small"
        },
        myrule: {
            type: Boolean,
            default:false
        },
        placeholder: {
            type: String,
            default: "请选择"
        },
        multiple: {
            type: Boolean,
            default: false
        },
        filterable: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: false
        },
        checkStrictly:{
            type: Boolean,
            default: false
        },
        defaultExpandedKeys: Array,
        defaultExpandAll: {
            type: Boolean,
            default: true
        },
        collapseTags: {
            type: Boolean,
            default: true
        },
        searchVal:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
        	currentNodeKey:null,
        	nodeFilter:function(data){
        		var ds = data.data && data.data.disabled?" disabled":"";
        		var s = "kt-select-tree_label" + ds;
        		return s;
        	},
            treeData2:[{
                id: 1,
                label: '一级 2',
                children: [{
                    id: 3,
                    label: '二级 2-1',
                    children: [{
                        id: 4,
                        label: '三级 3-1-1'
                    }, {
                        id: 5,
                        label: '三级 3-1-2',
                        disabled: true
                    }]
                }, {
                    id: 2,
                    label: '二级 2-2',
                    disabled: true,
                    children: [{
                        id: 6,
                        label: '三级 3-2-1'
                    }, {
                        id: 7,
                        label: '三级 3-2-2',
                        disabled: true
                    }]
                }]
            }],
            selectWidth: 0,
            // 传参的值
            modelValue: void 0,
            // 展示框的值
            labelValue: void 0,
            // 搜索框的值
            searchValue: void 0,
            // 树节点宽度
            treeWidth: "auto",
            // 扁平化数据
            options: []
        };
    },
    computed: {
        // 树节点配置选项
        dynaDefProps() {
            return Object.assign(
                {},
                {
                    parentId: "parentId",
                    id: "id",
                    label: "label",
                    children: "children",
                    filter: "filter",
                    disabled:"disabled"
                },
                this.defaultProps
            );
        },
        // 树节点数据
        treeData() {
            if (this.data && this.data.length > 0) {
                // 备份降维模型
                this.options = this.flattenTree(this.data);
                // ⭐⭐⭐ 初始化绑定节点 ⭐⭐⭐
                this.$nextTick(() => {
                    // ⭐⭐⭐ value -> modelValue
                    if (this.multiple) {
                        if (
                            Array.isArray(this.value) &&
                            this.value.length > 0
                        ) {
                            this.labelValue = this.options
                                .filter(node =>
                                    this.value.includes(
                                        node[this.dynaDefProps.id]
                                    )
                                )
                                .map(node => node[this.dynaDefProps.label]);
                            this.$refs.tree.setCheckedKeys(this.value);
                            this.modelValue = this.value;
                        }
                    } else {
                        if (this.value) {
                            this.labelValue = this.options
                                .filter(
                                    node =>
                                        node[this.dynaDefProps.id] == this.value
                                )
                                .map(node => node[this.dynaDefProps.label])[0];
                            this.$refs.tree.setCurrentKey(this.value);
                            this.modelValue = this.value;
                        }
                    }
                });
                // 初始化树模型
                return this.data;
            }
        }
    },
    methods: {
    	removeHandle(v){
            
            // this.$emit("check", node, data);
    		this.$emit("remove-handle", v);
        },
        getTootipState(node){
            var text = node.label;
            // ((5-1)*18)+24
            const width = this.getTextWidth(text);
            if((width + (18*node.level)+24) > this.selectWidth){
                return true
            }else{
                return false
            }
        },
        getTextWidth(str = '') {
            const dom = document.createElement('span');
            dom.style.display = 'inline-block';
            dom.textContent = str;
            document.body.appendChild(dom);
            const width = dom.clientWidth;
           
            document.body.removeChild(dom);
            return width;
        },
        /* 点击节点 */
        onNodeClick(node, data) {
            console.log(node,data)
            if(this.searchVal == true){
                this.searchValue = null;
            }
        	 
            if (!this.multiple) {
            	
                // 绑定值
                if(node.disabled){return;}
                this.modelValue = node[this.dynaDefProps.id];
                // 对外暴露绑定函数
               
                this.$emit("node-click", node, data);
                this.$emit("input", this.modelValue);
                
                // 隐藏菜单
                this.onCloseTree();
            }
        },
        /* 点击节点复选框 */
        onCheck(node, data) {
            // 
            if (this.multiple) {
                let juniorNodes = '';
                if(this.myrule == true){
                    juniorNodes = data.checkedNodes.filter(
                        node => !node[this.dynaDefProps]
                    )
                }else{
                    juniorNodes = data.checkedNodes.filter(
                        node => !node[this.dynaDefProps.children]
                    );
                }
                // 
                // // 绑定值
                this.modelValue = juniorNodes.map(
                    node => node[this.dynaDefProps.id]
                );
                console.log("onCheck",this.modelValue)
                // 对外暴露绑定函数
                this.$emit("check", node, data);
            }else{
                // let juniorNodes = data.checkedNodes.filter(
                //     node => !node[this.dynaDefProps.children]
                // );
                // // 绑定值
                // this.modelValue = juniorNodes.map(
                //     node => node[this.dynaDefProps.id]
                // );
                this.$emit("check", node, data);
            }
        },
        /* 节点过滤函数 */
        onTreeFilter(value, data) {
            if (!value) return true;
            return data[this.dynaDefProps.filter]
                ? data[this.dynaDefProps.label].indexOf(value) !== -1 ||
                      data[this.dynaDefProps.filter].indexOf(
                          value.toUpperCase()
                      ) !== -1
                : data[this.dynaDefProps.label].indexOf(value) !== -1;
        },
        /* 延迟过滤节点 */
        debounceQuery(val) {
            setTimeout(() => {
                this.$refs.tree.filter(val);
            }, 800);
        },
        /* popover菜单关闭 */
        onCloseTree() {
            this.$refs.popover.showPopper = false;
        },
        /* 下拉选value变化 */
        onChange(val) {
            
            if (this.multiple) {
                this.labelValue = val;
                this.modelValue = this.options
                    .filter(node => val.includes(node[this.dynaDefProps.label]))
                    .map(node => node[this.dynaDefProps.id]);
                this.$nextTick(() => {
                    this.$refs.tree.setCheckedKeys(this.modelValue);
                });
            }else{
                this.modelValue = val;

            }
            this.$emit("input", this.modelValue);
        },
        /* 单选模式下清空 */
        onClear() {
            if (this.multiple) {
                //多选
                this.modelValue = [];
            } else {
                //单选
                this.modelValue = void 0;
            }
        },
        /* 数组降维 */
        flattenTree(arr = []) {
            let result = [];
            let copy = Object.assign([], arr);
            const fun = arr => {
                arr.forEach(node => {
                    result.push(node);
                    if (this.isArray(node))
                        fun(node[this.dynaDefProps.children]);
                    // delete node[this.dynaDefProps.children];
                });
            };
            fun(copy);
            return result;
        },
        /* 判断数组 */
        isArray(data) {
            return (
                data[this.dynaDefProps.children] &&
                Array.isArray(data[this.dynaDefProps.children]) &&
                data[this.dynaDefProps.children].length > 0
            );
        }
    },
    mounted() {
        this.selectWidth = this.$refs.select.$el.clientWidth;
        // 获取输入框宽度同步至树状菜单宽度
        this.$nextTick(() => {
            this.treeWidth = `${(this.width ||
                this.selectWidth-10)}px`;
        });
    },
    watch: {
        searchValue(val) {
            this.debounceQuery(val);
        },
        modelValue(val) {
            // 
            // ⭐⭐⭐ modelValue -> labelValue
            
            if (val && Array.isArray(this.options) && this.options.length > 0) {
                if (this.multiple)
                    this.labelValue = this.options
                        .filter(node =>
                            val.includes(node[this.dynaDefProps.id])
                        )
                        .map(node => node[this.dynaDefProps.label]);
                else
                    this.labelValue = this.options.filter(
                        node => node[this.dynaDefProps.id] == val
                    )[0][this.dynaDefProps.label];
            }
            // ⭐⭐⭐ modelValue -> value
            this.$emit("getValue", val);
        },
        // ⭐⭐⭐ value -> labelValue
        value(val) {
            if (!val) this.labelValue = void 0;
        }
    }
};
</script>

<style lang="scss">
/* 下拉选option */
.kt-select-tree__option {
    display: none;
    padding: 0 !important;
}
.kt-select-tree_label{
  width: 7.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 弹出框 */
.kt-select-tree__popover {
    margin-top: 8px !important;
    padding: 5px 0;
}

/* 搜索框 */
.kt-select-tree__input {
    padding: 0 4px 4px !important;
}

/* tree树形控件 */
.kt-select-tree {
    overflow-y: auto;
    max-height: 350px;
}

/* 覆盖默认高亮效果 */
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #409eff !important;
    color: #fff;
}
.kt-select-tree_label.disabled{
	color:#ccc;
	cursor:not-allowed
}
</style>
<style lang="scss" scoped>
.item{
    
}
</style>

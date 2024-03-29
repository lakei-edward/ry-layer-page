<template>
  <div class="app-container">
    <template v-if="!pageVisible">
      <!-- 查询 -->
      <el-form
        v-if="Object.keys(searchLayer).length > 0"
        v-show="showSearch"
        ref="formList"
        :model="formList"
        :inline="$isDeTrue(searchLayer.inline)"
        :label-position="searchLayer.labelPosition"
        :label-width="searchLayer.labelWidth"
        :show-message="searchLayer.showMessage"
        :inline-message="searchLayer.inlineMessage"
        :status-icon="searchLayer.statusIcon"
        :size="searchLayer.size"
        :disabled="searchLayer.disabled"
        :hide-required-asterisk="searchLayer.hideRequiredAsterisk"
        :validate-on-rule-change="searchLayer.validateOnRuleChange"
      >
        <template v-for="item in searchLayer.form">
          <!-- 单表单组件 -->
          <el-form-item
            v-if="$judgeTypeCom(item.component, item.hidden)"
            :key="item.label"
            :label-width="item.labelWidth"
            :required="item.required"
            :show-message="item.showMessage"
            :prop="item.model"
            :size="item.size"
            :rules="item.rules ? item.rules : []"
            :label="$setLabel(item.label, searchLayer.labelAfter)"
          >
            <Attr :formParams="formList" :attrs="item" :formWidth="searchLayer.formWidth"></Attr>
          </el-form-item>
          <!-- 自定组件 -->
          <component
            v-if="$isFunction(item.component)"
            v-bind="$attrs"
            :is="item.component"
            :key="item.name"
            :params="formList"
            :model="item.model"
            :noRule="$isDeTrue(item.noRule)"
          />
        </template>
        <el-form-item>
          <el-button type="primary" :size="searchLayer.operateSize" @click="handleQuery">
            {{ searchLayer.searchName ? searchLayer.searchName : '搜索' }}
          </el-button>
          <el-button :size="searchLayer.operateSize" @click="resetForm">
            {{ searchLayer.resetName ? searchLayer.resetName : '重置' }}
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 操作按钮 -->
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5" v-if="_isHaveObject(operateLayer)">
          <template v-for="(value, key) in operateLayer">
            <el-button
              v-if="value.show !== 'table'"
              :key="key"
              v-hasPermi="[value.hasPermi]"
              :size="value.size"
              :type="value.type"
              :circle="value.circle"
              :round="value.round"
              :plain="value.plain"
              :loading="value.loading"
              :icon="value.icon"
              :autofocus="value.autofocus"
              :disabled="_setDisabled(value)"
              @click="handleOperation(value, key)"
            >
              {{ value.label }}
            </el-button>
          </template>
        </el-col>
        <right-toolbar v-if="rightToolbar" :show-search.sync="showSearch" @querylist="queryList" />
      </el-row>
      <!-- 表格 -->
      <div class="shuke-table-con" v-loading="loading ? tableLoad : false">
        <el-table
          ref="multipleTable"
          :data="tableData"
          :tooltip-effect="displayLayer.tooltipEffect || 'dark'"
          :stripe="displayLayer.stripe"
          :border="displayLayer.border"
          :size="displayLayer.size"
          :show-header="displayLayer.showHeader"
          :highlight-current-row="displayLayer.highlightCurrentRow"
          :max-height="displayLayer.maxHeight"
          :height="displayLayer.height"
          :header-cell-style="displayLayer.headerCellStyle"
          :cell-style="displayLayer.cellStyle"
          :row-key="displayLayer.key"
          :empty-text="displayLayer.emptyText"
          @row-click="rowClcik"
          @row-dblclick="dblclick"
          @selection-change="handleSelectionChange"
        >
          <el-table-column v-if="displayLayer.selection !== false" type="selection" />
          <el-table-column
            v-for="item in displayLayer.data"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :fixed="item.fixed"
            :formatter="item.formatter"
            :align="item.align"
            :class-name="item.className"
            :label-class-name="item.labelClassName"
            :show-overflow-tooltip="$isDeTrue(item.showOverflowTooltip)"
          >
            <template slot-scope="scope">
              <template v-if="item.operate && _isHaveObject(operateLayer)">
                <template v-for="(value, key) in operateLayer">
                  <el-button
                    v-if="value.show === 'table'"
                    :key="key"
                    v-hasPermi="[value.hasPermi]"
                    :size="value.size"
                    :type="value.type"
                    :circle="value.circle"
                    :round="value.round"
                    :plain="value.plain"
                    :loading="value.loading"
                    :icon="value.icon"
                    :autofocus="value.autofocus"
                    :disabled="_setDisabled(value, scope.row)"
                    @click="handleOperation(value, key, scope.row)"
                  >
                    {{ value.label }}
                  </el-button>
                </template>
              </template>
              <template v-else>
                <template v-if="item.use">
                  <component
                    :is="item.use.element"
                    :attr="item.use.attr"
                    :callback="item.callback"
                    :row="scope.row"
                    :prop="item.prop"
                  ></component>
                </template>
                <template v-else>
                  <template v-if="$isFunction(item.callback)">{{
                    item.callback(scope.row)
                  }}</template>
                  <template v-else>{{ scope.row[item.prop] }}</template>
                </template>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <pagination
        v-show="listTotal > 0"
        :total="listTotal"
        :page.sync="formList.pageNum"
        :limit.sync="formList.pageSize"
        @pagination="queryList"
      />

      <!-- 增改查弹框以及其他弹框 -->
      <template v-if="_judgeDialog && dialogAddVisible">
        <el-dialog
          :title="dialogTitle"
          :width="_defaultDialogWidth"
          :fullscreen="operateLayer[ikey].mode.fullscreen"
          :top="operateLayer[ikey].mode.top"
          :modal="operateLayer[ikey].mode.modal"
          :modal-append-to-body="operateLayer[ikey].mode.modalAppendToBody"
          :append-to-body="operateLayer[ikey].mode.appendToBody"
          :lock-scroll="operateLayer[ikey].mode.lockScroll"
          :custom-class="operateLayer[ikey].mode.customClass"
          :close-on-click-modal="operateLayer[ikey].mode.closeOnClickModal"
          :close-on-press-escape="operateLayer[ikey].mode.closeOnPressEscape"
          :show-close="operateLayer[ikey].mode.showClose"
          :before-close="operateLayer[ikey].mode.beforeClose"
          :center="operateLayer[ikey].mode.center"
          :destroy-on-close="operateLayer[ikey].mode.destroyOnClose"
          :visible.sync="dialogAddVisible"
          @close="closeDialogForm"
        >
          <el-form
            ref="forms"
            :inline="true"
            :model="operateLayer[ikey].params"
            label-width="120px"
          >
            <template v-for="item in operateLayer[ikey].mode.form">
              <el-form-item
                v-if="$judgeTypeCom(item.component, item.hidden)"
                :key="item.model"
                :prop="item.model"
                :label="$setLabel(item.label, searchLayer.labelAfter)"
                :rules="$isUndef(operateLayer[ikey].mode.readonly) ? item.rules : []"
              >
                <!-- 新增和修改 -->
                <template v-if="!operateLayer[ikey].mode.readonly">
                  <Attr
                    :formParams="operateLayer[ikey].params"
                    :attrs="item"
                    :formWidth="searchLayer.formWidth"
                  ></Attr>
                </template>
                <!-- 纯文本查看 -->
                <div
                  v-else
                  :style="{
                    width: $setInfoWidth(item),
                    wordWrap: 'break-word'
                  }"
                >
                  <template v-if="item.component !== 'FormUpdate'"
                    >{{ setDetailLabel(item) }}{{ item.unit }}</template
                  >
                  <template v-else>
                    <div
                      v-for="file in operateLayer[ikey].params[
                        item.fileListLabel ? item.fileListLabel : 'fileList'
                      ]"
                      :key="file.fileId"
                    >
                      <img
                        v-if="item.image && item.image.show"
                        :src="file[item.pathLabel ? item.pathLabel : 'path']"
                        :alt="item.image.alt"
                        :style="{
                          width: (item.image.width ? item.image.width : 150) + 'px',
                          height: (item.image.height ? item.image.height : '') + 'px'
                        }"
                      />
                      <el-link v-else type="primary" @click="$minioDownFiles(file, item)"
                        ><i style="margin-right: 5px" class="el-icon-paperclip"></i
                        >{{ file.name }}</el-link
                      >
                    </div>
                  </template>
                </div>
              </el-form-item>
              <component
                v-if="$isFunction(item.component)"
                v-bind="$attrs"
                :is="item.component"
                :key="item.name"
                :ref="item.name"
                :readonly="operateLayer[ikey].mode.readonly"
                :params="operateLayer[ikey].params"
              />
            </template>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <template v-if="!operateLayer[ikey].mode.button">
              <el-button type="primary" :loading="submitLoad" @click="submitForm">
                确 定
              </el-button>
              <el-button @click="closeDialog"> 取 消 </el-button>
            </template>
            <template v-else>
              <el-button
                v-for="item in operateLayer[ikey].mode.button"
                :key="item.event"
                :size="item.size"
                :type="item.type"
                :circle="item.circle"
                :round="item.round"
                :plain="item.plain"
                :icon="item.icon"
                :autofocus="item.autofocus"
                :disabled="item.disabled"
                :loading="item.event === 'submit' ? submitLoad : false"
                @click="item.event === 'submit' ? submitForm() : closeDialog()"
              >
                {{ item.label }}
              </el-button>
            </template>
          </div>
        </el-dialog>
      </template>
      <!-- CustomDialog -->
      <template v-else>
        <component
          v-bind="$attrs"
          :is="operateLayer[ikey].mode.component"
          v-if="operateLayer[ikey] && dialogVisible"
          :ref="operateLayer[ikey].mode.name"
          :dialog-visible.sync="dialogVisible"
          :query-list="queryList"
          :params="operateLayer[ikey].params"
        />
      </template>
    </template>
    <!-- CustomPage -->
    <template v-if="operateLayer[ikey] && pageVisible">
      <component
        v-bind="$attrs"
        :is="operateLayer[ikey].mode.component"
        :ref="operateLayer[ikey].mode.name"
        :page-visible.sync="pageVisible"
        :query-list="queryList"
        :params="operateLayer[ikey].params"
      />
    </template>
  </div>
</template>
<script>
import Tag from '../common/Tag.vue'
import Avatar from '../common/Avatar.vue'
import Attr from '../form/Attr.vue'
import mixins from '../plugin/mixin'
import { download } from '../plugin/download'
import { isDef, isTypes, deepClone, handleDicts, judgeType } from '../plugin/util.js'
import { ID, REMOVE, SEARCH } from '../plugin/default.js'
export default {
  name: 'ry-layer-page',
  mixins: [mixins],
  components: {
    Attr,
    Tag,
    Avatar
  },
  props: {
    // 页数
    pageSize: {
      type: Number,
      default: 10
    },
    // 页码
    pageNum: {
      type: Number,
      default: 1
    },
    // 表格各字段
    displayLayer: {
      type: Object,
      default() {
        return {}
      }
    },
    // 操作
    operateLayer: {
      type: Object,
      default() {
        return {}
      }
    },
    // 搜索信息
    searchLayer: {
      type: Object,
      default() {
        return {}
      }
    },
    // 小功能栏
    rightToolbar: {
      type: Boolean,
      default: true
    },
    // 加载
    loading: {
      type: Boolean,
      default: true
    },
    // 加载
    clearSelection: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      /* 主要的key */
      ikey: false,
      // 操作的禁用
      single: true,
      // 操作的禁用
      multipe: true,
      // 表格数据
      tableData: [],
      // 总条数
      listTotal: 0,
      // 搜索列表
      formList: {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.searchLayer.params
      },
      // 弹框标题
      dialogTitle: '',
      // 选择表格数据
      sections: [],
      /* 查看里面表格的总数据 */
      showSearch: true,
      /* 新增对话框是否显示 */
      dialogAddVisible: false,
      // 是否显示自定义组件
      pageVisible: false,
      // 自己定义的字段保存起来
      ryParamsClone: {},
      // 自定义弹框显隐
      dialogVisible: false,
      // 备份查看接口
      serach_url: '',
      // 是否需要catch
      isCatch: true,
      // 确认节流
      submitLoad: false,
      // 表格加载
      tableLoad: false
    }
  },
  provide() {
    return {
      request: this.$options.methods.request
    }
  },
  computed: {
    // 动态设置禁用选项
    _setDisabled() {
      return function (v, row) {
        if (v.disabled && v.disabled instanceof Function) {
          // 如果显示在表格内，则传递row信息过去，不受单选和多选的控制了
          if (v.show) {
            return v.disabled([row]) // 把选择信息传递过去
          } else {
            // disabledType不传默认单选，也可以根据disabledType传递multipe控制多选
            // 双重判断，首先根据函数判断，再根据disabledType判断
            if (v.disabledType ? !this[v.disabledType] : !this.single) {
              return v.disabled(this.sections) // 把选择信息传递过去
            } else {
              return true
            }
          }
        } else {
          if (v.disabled && v.disabled === 'single') {
            return this.single
          } else if (v.disabled === 'multipe') {
            return this.multipe
          }
          return false
        }
      }
    },
    // 判断弹框方式
    _judgeDialog() {
      return (
        this._isHaveObject(this.operateLayer) &&
        this.operateLayer[this.ikey] &&
        this.operateLayer[this.ikey].mode.type !== 'CustomDialog'
      )
    },
    // 默认弹框宽度
    // todo 需要修改一下
    _defaultDialogWidth() {
      return this.operateLayer[this.ikey].mode.width
        ? this.operateLayer[this.ikey].mode.width
        : '800px'
    },
    // 对象是否有值
    _isHaveObject() {
      return function (v) {
        return Object.keys(v).length > 0
      }
    },
    // 设置查看中展示字段内容
    setDetailLabel() {
      return function (v) {
        // 如果传入的是字典，查看的时候默认取字典中的label展示
        if (v.dict) {
          let flag = v.dict.find(r => r.value === this.operateLayer[this.ikey].params[v.model])
          if (flag) return flag[this.GET_KEY[0]]
        } else {
          // 否则直接去当前model值
          return this.operateLayer[this.ikey].params[v.model]
        }
      }
    },
    /** 根据main.js中配置的dictField来取字典中的别名名称 */
    GET_KEY() {
      return Object.values(this.$options.filed)
    }
  },
  mounted() {
    // 获取列表
    this.queryList()
    // 备份查看接口
    this.backupSearchUrl()
  },
  methods: {
    // 备份查看接口
    backupSearchUrl() {
      if (isDef(this.operateLayer) && this._isHaveObject(this.operateLayer)) {
        const serach_item = this.operateLayer[SEARCH]
        this.serach_url = JSON.parse(JSON.stringify(serach_item.url))
      }
    },

    // 初始化字典项
    initDicts(dict) {
      // 查询字典赋值
      this.searchLayer.form.map(async item => {
        // 当dict传的是字典的时候
        if (judgeType(item.dict) === 'String') {
          item.dict = item.dict && dict.type[item.dict]
          // 当dict传的是通过接口返回数据的时候
        } else if (judgeType(item.dict) === 'Promise') {
          item.dict = await item.dict
        }
      })
      // 弹框中的字典赋值
      handleDicts(this.operateLayer, dict)
      // 表格内的弹窗字典
      this.displayLayer.data.forEach(item => {
        if (item.operate) {
          handleDicts(item.operate, dict)
        }
      })
    },

    // 关闭弹窗清除信息 点击除弹框其它地方生效
    closeDialogForm() {
      this.clearDialogForm()
      if (this.isCatch) {
        this.isCatch = true
        const callback = this.operateLayer[this.ikey].mode.catch
        callback && callback()
      }
    },

    // 取消/关闭dialog
    closeDialog() {
      this.clearDialogForm()
    },

    // 清除弹框内容
    clearDialogForm() {
      // 关闭弹框
      this.dialogAddVisible = false
      // 确认按钮节流
      this.submitLoad = false
      // 关闭的时候清空fileId
      if (this.operateLayer[this.ikey].params) {
        this.operateLayer[this.ikey].params.fileId = ''
      }
      // 日期选择清空
      if (this.$refs.FormDateRange) {
        Array.from(this.$refs.FormDateRange, e => {
          e.dateTime = []
        })
      }
      // 移除整个表单的校验结果
      if (this.$refs.forms) {
        this.$refs.forms.clearValidate()
        this.$refs.forms.resetFields()
      }
      // 自己定义的字段保存起来 重复赋值
      this.operateLayer[this.ikey].params = this.ryParamsClone
      // 查看弹框不需要清除
      if (!this.operateLayer[this.ikey].mode.readonly) {
        // 清除选择
        // 清除文件
        if (this.$refs.FormUpdate) {
          this.$refs.FormUpdate[0].$refs.Upload.clearFiles()
        }
      }
      this.clearSelection && this.$refs.multipleTable.clearSelection()
    },

    /* Operation操作事件 */
    handleOperation(item, key, row = false) {
      // 主要的key
      this.ikey = key
      // 自己定义的字段保存起来
      this.ryParamsClone = (item.params && JSON.parse(JSON.stringify(item.params))) || []
      // 如果没有mode，则默认直接调取接口
      if (item.mode) {
        // 处理不同类型事件
        this.handleModeType(item, row, key)
        // 根据id查看详情
        this.getDetail(item, row)
        // 打开弹框的回调
        this.$emit('handleOperation', item, key)
      } else {
        this.handleRequest(item)
      }
    },

    // 根据id查看详情
    async getDetail(item, row) {
      // detail查看详情属性，并且type不等于RouterPage，因为RouterPage有自己的方式获取
      if (item.mode.detail && item.mode.type !== 'RouterPage') {
        let value = row ? await this.handleInfo(row) : await this.handleInfo(this.sections[0])
        if (item.mode.type === 'dialog') {
          this.$set(this.operateLayer[this.ikey], 'params', {
            ...value,
            ...this.ryParamsClone // 内置组件传递详情信息，也传递自定义信息
          })
        } else {
          this.$set(this.operateLayer[this.ikey], 'params', {
            ...value // 自定义组件只传递详情信息，不传递自定义信息
          })
        }
      }
    },

    // 处理不同类型事件
    handleModeType(item, row, key) {
      switch (item.mode.type) {
        // 《内置弹框》
        case 'Dialog':
          // 打开弹框
          this.dialogAddVisible = true
          // 弹框标题
          this.dialogTitle = item.mode.title ? item.mode.title : item.label
          break
        // 《确认框》
        case isTypes.find(r => r === item.mode.type):
          // 解决删除时不会清除拼接的id
          item = deepClone(item)
          this.handleComfirm(item, row, key)
          break
        // 《自定义弹框》
        case 'CustomDialog':
          this.dialogVisible = true
          break
        // 《自定义页面》
        case 'CustomPage':
          this.pageVisible = true
          break
        // 《自定义路由页面》
        case 'RouterPage':
          this.handleRoutePage(item, row)
          break
        // 《自定义页面》
        case 'Export':
          this.handleExport(item, row)
          break
      }
    },

    /** 处理路由页内容 */
    async handleRoutePage(item, row) {
      // 把详情信息通过路由传过去 支持name和path方式跳转
      if (item.mode.router && judgeType(item.mode.router) === 'Object') {
        const _routerInfo = item.mode.router
        // 当detail没传时，判断参数传递情况，1、detailId不传：则默认传递row，2、传递detailId：则获取row里面的对应的id传过去，可根据该id获取详情
        const _id = item.mode.detailId || null
        _routerInfo.query = _routerInfo.query || {}
        // 先判断有没有选择行信息 没有的话则直接进入到路由不需要传递参数
        if (this.sections && this.sections.length > 0) {
          // 有时接口返回的数据太大了，不能够用路由参数的方式去传输，而且自定义路由页面本身就是一个单独的组件，可以在该组件内调取详情接口
          // 路由传参方式，如果有detail，则获取信息接口数据，否则返回row数据
          if (item.mode.detail) {
            let value = row ? await this.handleInfo(row) : await this.handleInfo(this.sections[0])
            sessionStorage.setItem('ry-detail', JSON.stringify(value))
          } else {
            // 有的话，只传递id
            if (_id) {
              this.$set(_routerInfo.query, _id, this.sections[0][_id])
            } else {
              // 无的话，传递row
              sessionStorage.setItem('ry-detail', JSON.stringify(this.sections[0]))
            }
          }
        }
        this.$router.push(_routerInfo)
      } else {
        throw new Error('router is undefined')
      }
    },

    /** 导出按钮操作 */
    handleExport(item, row) {
      // 这里判断是不是行内操作
      let t_row = row ? [row] : this.sections
      const _label = item.mode.label || ID // 数据名称
      const _exportName = item.mode.exportName
      const _multiParams = item.mode.multiParams || null // 多个参数判断或单个参数复杂判断
      const _searchParams = item.mode.searchParams || false // 是否需要查询条件参数
      const _paramsLabel = item.mode.paramsLabel || ID // 不需要多个参数直接传该属性
      let exportName
      if (typeof _exportName === 'string') {
        exportName = _exportName || 'Excel.xlsx'
      } else {
        exportName = _exportName && item.mode.exportName(this.sections[0])
      }
      let params = {}
      // 判断有没有选择表格数据
      if (t_row && t_row.length > 0) {
        if (_multiParams) {
          _multiParams.forEach(item => {
            /** 判断是否需要传递 */
            if (!item.hidden) {
              params[item.field] = t_row[0][item.label]
            }
            /** 判断字段是否是数组 并且如果行内操作，则不能传递数组*/
            if (item.type === 'array' && !row) {
              params[item.field] = []
              this.sections.forEach(v => {
                params[item.field].push(v[item.label])
              })
            }
          })
        } else {
          params[_paramsLabel] = t_row[0][_label]
        }
      }
      // 这里判断需不需要导出的时候加入查询条件
      const search_params = _searchParams ? this.formList : {}
      // Post传参，@RequestBody注解接受参数
      download(
        item.url,
        { ...params, ...item.params, ...search_params },
        exportName,
        this.$options.methods.request
      )
    },

    /**
     * @brief & 类型：确认框
     * @param {item} & 操作层的数据
     * @param {row}  & 当操作按钮在表格中时，传入的当前行信息,否则为false
     */
    handleComfirm(item, row, key) {
      // 这里判断是不是行内操作
      let t_row = row ? [row] : this.sections
      if (!item.mode.subscribe) {
        throw Error('subscribe is null')
      }
      let subscribe
      if (item.mode.subscribe && item.mode.subscribe instanceof Function) {
        subscribe = item.mode.subscribe(t_row[0])
      } else {
        subscribe = item.mode.subscribe
      }
      const label = item.mode.label || ID
      const _multiParams = item.mode.multiParams || null // 多个参数判断或单个参数复杂判断
      const _paramsLabel = item.mode.paramsLabel || ID // 不需要多个参数直接传该属性
      const requestParams = item.mode.requestParams || false
      const type = item.mode.type
      const title = item.mode.title || '提示'
      const confirmButtonText = item.mode.confirmButtonText || '确定'
      const cancelButtonText = item.mode.cancelButtonText || '取消'
      this.$confirm(subscribe, title, {
        confirmButtonText,
        cancelButtonText,
        type,
        showCancelButton: item.mode.showCancelButton,
        showConfirmButton: item.mode.showConfirmButton,
        center: item.mode.center,
        roundButton: item.mode.roundButton
      })
        .then(() => {
          let params = {}
          /** path传参 */
          if (!requestParams) {
            // 支持多选删除 两个以上进行拼接[,]
            const ids = this.sections.map(r => r[label]).join(',')
            if (ids) {
              item.url = `${item.url}/${ids}`
            }
          } else {
            /** params传参 */
            if (_multiParams) {
              _multiParams.forEach(item => {
                /** 判断改字段是否需要传递 */
                if (!item.hidden) {
                  params[item.field] = t_row[0][item.label]
                }
                /** 判断字段是否是数组 并且如果行内操作，则不能传递数组*/
                if (item.type === 'array' && !row) {
                  params[item.field] = []
                  this.sections.forEach(v => {
                    params[item.field].push(v[item.label])
                  })
                }
              })
            } else {
              params[_paramsLabel] = t_row[0][label]
            }
          }
          // 如果是post传参，并且后端必须要用RequestBody接收!
          if (item.method === 'post') {
            item.params = { ...params }
            this.handleRequest(item)
            return
          }
          // 否则就走params传参
          this.handleRequest(item, params)
        })
        .catch(() => {
          item.mode.catch && item.mode.catch()
        })
    },

    /* 提交按钮 */
    submitForm() {
      this.isCatch = false
      this.$refs['forms'].validate(valid => {
        if (valid) {
          this.submitLoad = true
          /* 调取数据 */
          this.handleRequest(this.operateLayer[this.ikey])
        }
      })
    },

    /* 单击事件，选中当前的行 */
    handleSelectionChange(section) {
      // 只有选中一条数据的时候才可操作
      this.single = section.length !== 1
      // 只有一条或多条数据的时候才可操作
      this.multipe = section.length === 0
      // 获取选择的数据
      this.sections = section
    },

    // 获取表格数据
    async queryList(currentPage) {
      this.tableLoad = true
      /* 分页中的传参判断 */
      if (currentPage) {
        this.formList.pageNum = currentPage.page
        this.formList.pageSize = currentPage.limit
      }
      if (this.displayLayer.url) {
        if (this.request) {
          const res = await this.request({
            url: this.displayLayer.url,
            params: { ...this.formList, ...this.displayLayer.params }
          })
          if (res.code === 200) {
            this.tableLoad = false
            this.tableData = res.rows
            this.listTotal = res.total || 0
          }
        }
      }
    },

    /* 查询 */
    handleQuery() {
      this.$refs.formList.validate(valid => {
        if (valid) {
          this.queryList()
        }
      })
    },

    // 重置
    resetForm() {
      // 移除校验
      this.$refs.formList.clearValidate()
      this.formList = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      // 清空子组件字段dateTime
      if (this.$refs.FormDateRange) {
        // 日期选择清空
        if (this.$refs.FormDateRange) {
          Array.from(this.$refs.FormDateRange, e => {
            e.dateTime = []
          })
        }
      }
      this.queryList()
    },

    // 选中当前的行
    rowClcik(row, column) {
      if (column.property === 'operate') {
        return
      } else {
        if (this.$isDeTrue(this.displayLayer.rowclick)) {
          this.$refs.multipleTable.toggleRowSelection(row)
        }
      }
    },

    // 获取详情信息
    handleInfo(item) {
      const serach_item = this.operateLayer[SEARCH]
      const multiPath = serach_item.multiPath || 0
      if (multiPath) {
        // 多个path拼接
        let path = ''
        multiPath.forEach(v => {
          path += `/${item[v]}`
        })
        serach_item.url = `${this.serach_url}${path}`
      } else {
        // 处理自定义id名
        const label = serach_item.mode.label || ID
        // 尾部拼接id
        serach_item.url = `${this.serach_url}/${item[label]}`
      }
      return this.handleRequest(serach_item, false, true)
    },

    /* 调取数据 */
    async handleRequest(item, params = {}, value = false) {
      if (!this.request) {
        throw Error('request is null')
      }
      const flag = Object.keys(params).length > 0 // 判断params有没有参数
      const res = await this.request({
        method: item.method,
        url: item.url,
        data: flag ? '' : item.params,
        params: flag ? params : ''
      }).catch(err => {
        // 确认按钮节流
        this.submitLoad = false
      })
      if (res.code === 200) {
        if (value && res.data) {
          return res.data
        }
        // 确认按钮节流
        this.submitLoad = false
        this.msgSuccess(`${item.label}成功！`)
        // // 清除弹框中表单数据
        this.clearDialogForm()
        // 重新获取数据
        this.queryList()
      }
    },

    /* 获取双击事件 */
    async dblclick(row) {
      if (this.$isDeFalse(this.displayLayer.dblclick)) {
        this.ikey = SEARCH
        // 打开弹框
        this.dialogAddVisible = true
        // 弹框标题
        this.dialogTitle = this.operateLayer[this.ikey].label
        // 给弹框表单赋值
        const value = await this.handleInfo(row)
        this.operateLayer[this.ikey].params = {
          ...this.operateLayer[this.ikey].params,
          ...value
        }
      }
    }
  }
}
</script>

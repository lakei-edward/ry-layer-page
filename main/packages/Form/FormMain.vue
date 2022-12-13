<template>
  <div class="app-container">
    <template v-if="!pageVisible">
      <!-- 查询 -->
      <el-form
        v-if="Object.keys(rySearch).length > 0"
        ref="formList"
        v-show="showSearch"
        :model="formList"
        :inline="!_isUndef(rySearch.inline) ? rySearch.inline : true"
        :label-position="rySearch.labelPosition"
        :label-width="rySearch.labelWidth"
        :show-message="rySearch.showMessage"
        :inline-message="rySearch.inlineMessage"
        :status-icon="rySearch.statusIcon"
        :size="rySearch.size"
        :disabled="rySearch.disabled"
        :hide-required-asterisk="rySearch.hideRequiredAsterisk"
        :validate-on-rule-change="rySearch.validateOnRuleChange"
      >
        <template v-for="item in rySearch.form">
          <el-form-item
            v-if="_judgeType(item.component)"
            :key="item.label"
            :label-width="item.labelWidth"
            :required="item.required"
            :label="`${item.label}${rySearch.labelAfter}`"
            :show-message="item.showMessage"
            :prop="item.model"
            :size="item.size"
            :rules="item.rules ? item.rules : []"
          >
            <component
              v-bind="$attrs"
              :ref="item.component"
              :is="item.component"
              :form="formList"
              :dict="item.dict"
              :children="item.children"
              :model="item.model"
              :clearable="item.clearable"
              :maxlength="item.maxlength"
              :minlength="item.minlength"
              :width="item.width"
              :form-width="rySearch.formWidth"
              :show-password="item.showPassword"
              :disabled="item.disabled"
              :format="item.format"
              :readonly="item.readonly"
              :popper-class="item.popperClass"
              :filterable="item.filterable"
              :allow-create="item.allowCreate"
              :multiple="item.multiple"
              :regExp="item.regExp"
              :autofocus="item.autofocus"
              :prefix-icon="item.prefixIcon"
              :suffix-icon="item.suffixIcon"
              :deptUrl="item.deptUrl"
              :show-word-limit="item.showWordLimit"
              @dateChange="dateChange"
            ></component>
          </el-form-item>
          <component v-else v-bind="$attrs" :key="item.name" :is="item.component" :form="formList"></component>
        </template>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">{{
            rySearch.searchName ? rySearch.searchName : '搜索'
          }}</el-button>
          <el-button @click="resetForm">{{ rySearch.resetName ? rySearch.resetName : '重置' }}</el-button>
        </el-form-item>
      </el-form>
      <!-- 操作按钮 -->
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <template v-for="(value, key) in ryOperate">
            <el-button
              v-if="_isUndef(value.show) && value.show !== 'table'"
              :key="key"
              :size="value.size"
              :type="value.type"
              :circle="value.circle"
              :round="value.round"
              :plain="value.plain"
              :loading="value.loading"
              :icon="value.icon"
              :autofocus="value.autofocus"
              :disabled="_setDisabled(value)"
              v-hasPermi="[value.hasPermi]"
              @click="handleOperation(value, key)"
              >{{ value.label }}
            </el-button>
          </template>
        </el-col>
        <right-toolbar v-if="rightToolbar" :showSearch.sync="showSearch" @queryTable="queryList"></right-toolbar>
      </el-row>
      <!-- 表格 -->
      <div class="shuke-table-con">
        <el-table
          ref="multipleTable"
          :data="tableData"
          :tooltip-effect="ryTable.tooltipEffect || 'dark'"
          :stripe="ryTable.stripe"
          :border="ryTable.border"
          :size="ryTable.size"
          :show-header="ryTable.showHeader"
          :highlight-current-row="ryTable.highlightCurrentRow"
          :max-height="ryTable.maxHeight"
          :height="ryTable.height"
          :header-cell-style="ryTable.headerCellStyle"
          :cell-style="ryTable.cellStyle"
          :row-key="ryTable.key"
          :empty-text="ryTable.emptyText"
          @row-click="rowClcik"
          @row-dblclick="dblclick"
          @selection-change="handleSelectionChange"
        >
          <el-table-column v-if="ryTable.selection !== false" type="selection"> </el-table-column>
          <el-table-column
            v-for="item in ryTable.data"
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
            :show-overflow-tooltip="_isUndef(item.showOverflowTooltip)"
          >
            <template slot-scope="scope">
              <template v-if="item.operate">
                <template v-for="(value, key) in ryOperate">
                  <el-button
                    v-if="value.show === 'table'"
                    :key="key"
                    :size="value.size"
                    :type="value.type"
                    :circle="value.circle"
                    :round="value.round"
                    :plain="value.plain"
                    :loading="value.loading"
                    :icon="value.icon"
                    :autofocus="value.autofocus"
                    v-hasPermi="[value.hasPermi]"
                    @click="handleOperation(value, key, scope.row)"
                    >{{ value.label }}
                  </el-button>
                </template>
              </template>
              <span v-else>{{ scope.row[item.prop] }}</span>
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
      <template v-if="_judgeDialog">
        <el-dialog
          :title="dialogTitle"
          :width="_defaultDialogWidth"
          :fullscreen="ryOperate[ikey].mode.fullscreen"
          :top="ryOperate[ikey].mode.top"
          :modal="ryOperate[ikey].mode.modal"
          :modal-append-to-body="ryOperate[ikey].mode.modalAppendToBody"
          :append-to-body="ryOperate[ikey].mode.appendToBody"
          :lock-scroll="ryOperate[ikey].mode.lockScroll"
          :custom-class="ryOperate[ikey].mode.customClass"
          :close-on-click-modal="ryOperate[ikey].mode.closeOnClickModal"
          :close-on-press-escape="ryOperate[ikey].mode.closeOnPressEscape"
          :show-close="ryOperate[ikey].mode.showClose"
          :before-close="ryOperate[ikey].mode.beforeClose"
          :center="ryOperate[ikey].mode.center"
          :destroy-on-close="ryOperate[ikey].mode.destroyOnClose"
          :visible.sync="dialogAddVisible"
          @close="clearForm"
        >
          <el-form ref="forms" :inline="true" :model="ryOperate[ikey].params" label-width="120px">
            <template v-for="item in ryOperate[ikey].mode.form">
              <el-form-item
                v-if="_judgeType(item.component)"
                :key="item.model"
                :label="`${item.label}:`"
                :prop="item.model"
                :rules="_isUndef(ryOperate[ikey].mode.rules) ? item.rules : []"
              >
                <component
                  v-bind="$attrs"
                  :is="item.component"
                  :form="ryOperate[ikey].params"
                  :ikey="ikey"
                  :deptUrl="item.deptUrl"
                  :upload="item.upload"
                  :fileIdList="fileIdList"
                  :reg="item.reg"
                  :size="item.size"
                  :describe="item.describe"
                  :row="item.row"
                  :limit="item.limit"
                  :ref="item.component"
                  :dict="item.dict"
                  :children="item.children"
                  :model="item.model"
                  :clearable="item.clearable"
                  :maxlength="item.maxlength"
                  :minlength="item.minlength"
                  :width="item.width"
                  :form-width="rySearch.formWidth"
                  :show-password="item.showPassword"
                  :disabled="item.disabled"
                  :format="item.format"
                  :readonly="item.readonly"
                  :popper-class="item.popperClass"
                  :filterable="item.filterable"
                  :allow-create="item.allowCreate"
                  :multiple="item.multiple"
                  :regExp="item.regExp"
                  :autofocus="item.autofocus"
                  :prefix-icon="item.prefixIcon"
                  :suffix-icon="item.suffixIcon"
                  :show-word-limit="item.showWordLimit"
                >
                </component>
                <!-- <div v-else :style="{ width: _setLongSpan(item) }">
              {{ ryOperate[ikey].params[item.model] }}
            </div> -->
              </el-form-item>
              <component
                v-else
                v-bind="$attrs"
                :key="item.name"
                :ref="item.name"
                :is="item.component"
                :queryList="item.queryList"
                :form="ryOperate[ikey].params"
              ></component>
            </template>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <template v-if="!ryOperate[ikey].mode.button">
              <el-button type="primary" @click="submitForm">确 定</el-button>
              <el-button @click="closeForm">取消</el-button>
            </template>
            <template v-else>
              <el-button
                v-for="item in ryOperate[ikey].mode.button"
                :key="item.event"
                :size="item.size"
                :type="item.type"
                :circle="item.circle"
                :round="item.round"
                :plain="item.plain"
                :loading="item.loading"
                :icon="item.icon"
                :autofocus="item.autofocus"
                :disabled="item.disabled"
                v-hasPermi="[item.hasPermi]"
                @click="item.event === 'submit' ? submitForm() : closeForm()"
                >{{ item.label }}</el-button
              >
            </template>
          </div>
        </el-dialog>
      </template>
      <!-- 跳转到自定义Dialog -->
      <template v-else>
        <component
          v-if="ryOperate[ikey] && dialogVisible"
          v-bind="$attrs"
          :dialogVisible.sync="dialogVisible"
          :ref="ryOperate[ikey].mode.name"
          :is="ryOperate[ikey].mode.component"
          :queryList="queryList"
          :params="ryOperate[ikey].params"
        ></component>
      </template>
    </template>
    <!-- 跳转到自定义组件Page页 -->
    <template v-if="ryOperate[ikey] && pageVisible">
      <component
        v-bind="$attrs"
        :ref="ryOperate[ikey].mode.name"
        :is="ryOperate[ikey].mode.component"
        :pageVisible.sync="pageVisible"
        :queryList="queryList"
        :params="ryOperate[ikey].params"
      ></component>
    </template>
  </div>
</template>
<script>
import FormSelect from './FormSelect.vue';
import FormInput from './FormInput.vue';
import FormDateRange from './FormDateRange.vue';
import FormTreeSelect from './FormTreeSelect.vue';
import FormDate from './FormDate.vue';
import FormTextarea from './FormTextarea.vue';
import FormUpdate from './FormUpdate.vue';
import { isUndef, isDef, isTypes, deepClone } from './plugin/util.js';
import { ID, REMOVE, SEARCH } from './plugin/default.js';
export default {
  name: 'FormMain',
  components: {
    FormSelect,
    FormDateRange,
    FormInput,
    FormTreeSelect,
    FormDate,
    FormTextarea,
    FormUpdate
  },
  props: {
    // 字典集
    dictType: {
      type: Object,
      default: () => {}
    },
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
    ryTable: {
      type: Object,
      default() {
        return {};
      }
    },
    // 操作
    ryOperate: {
      type: Object,
      default() {
        return {};
      }
    },
    // 搜索信息
    rySearch: {
      type: Object,
      default() {
        return {};
      }
    },
    rightToolbar: Boolean
  },

  computed: {
    // 动态设置禁用选项
    _setDisabled() {
      return function (item) {
        if (item.disabled && item.disabled === 'single') {
          return this.single;
        } else if (item.disabled === 'multipe') {
          return this.multipe;
        }
        return false;
      };
    },
    // 动态设置form组件
    _setLongSpan() {
      return function (item) {
        return item.span === 24 ? item.width ? `${item.width}px` : '640px' : '';
      };
    },
    // 判断传入的是否为字符串
    _judgeType() {
      return function (item) {
        return typeof item === 'string';
      };
    },
    // 判断为真
    _isUndef() {
      return function (item) {
        return isUndef(item) ? true : !!item;
      };
    },
    // 判断弹框方式
    _judgeDialog() {
      return this.ryOperate[this.ikey] && this.ryOperate[this.ikey].mode.type !== 'componentDialog';
    },
    // 默认弹框宽度
    _defaultDialogWidth() {
      return this.ryOperate[this.ikey].mode.width ? `${this.ryOperate[this.ikey].mode.width}px` : '800px';
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
        pageSize: this.pageSize
      },
      // 弹框标题
      dialogTitle: '',
      // 弹框内容
      ikey: null,
      // 选择表格数据
      sections: [],
      /* 查看里面表格的总数据 */
      showSearch: true,
      /* 新增对话框是否显示 */
      dialogAddVisible: false,
      // 时间范围
      dateTime: [],
      // 是否显示自定义组件
      pageVisible: false,
      // 自己定义的字段保存起来
      ryParamsClone: {},
      // 附件
      fileIdList: [],
      // 自定义弹框显隐
      dialogVisible: false,
      // 备份查看接口
      serach_url: '',
      isCatch: true
    };
  },
  mounted() {
    this.queryList();
    this.backupSearchUrl();
  },
  methods: {
    backupSearchUrl() {
      // 备份查看接口
      if (isDef(this.ryOperate)) {
        const serach_item = this.ryOperate[SEARCH];
        this.serach_url = JSON.parse(JSON.stringify(serach_item.url));
      }
    },

    // 初始化字典项
    initDicts(dict) {
      // 查询字典赋值
      this.rySearch.form.map((item) => {
        if (item.dict) {
          item.dict = item.dict && dict.type[item.dict];
        }
      });
      // 弹框中的字典赋值
      this.handleDicts(this.ryOperate, dict);
      // 表格内的弹窗字典
      this.ryTable.data.forEach((item) => {
        if (item.operate) {
          this.handleDicts(item.operate, dict);
        }
      });
    },

    // 处理多出字典
    handleDicts(object, dict) {
      for (const key in object) {
        if (Array.isArray(this.ryOperate[key].mode.form)) {
          this.ryOperate[key].mode.form.forEach((item) => {
            if (typeof item.dict === 'string') {
              item.dict = item.dict && dict.type[item.dict];
            }
          });
        }
      }
    },

    // 时间范围选择事件
    dateChange(val) {
      this.dateTime = val;
    },

    // 关闭dialog
    clearForm() {
      this.closeForm();
      if (this.isCatch) {
        this.isCatch = true;
        const callback = this.ryOperate[this.ikey].mode.catch;
        callback && callback();
      }
    },

    // 清除弹框内容
    closeForm() {
      this.dialogAddVisible = false;
      // 关闭的时候清空fileId
      if (this.ryOperate[this.ikey].params) {
        this.ryOperate[this.ikey].params.fileId = '';
      }
      // 附件清空
      this.fileIdList = [];
      this.$nextTick(() => {
        // 自己定义的字段保存起来 重复赋值
        this.ryOperate[this.ikey].params = this.ryParamsClone;
        // 移除整个表单的校验结果
        this.$refs.forms.clearValidate();
        this.$refs.forms.resetFields();
        // 清除选择
        this.$refs.multipleTable.clearSelection();
        // 清除文件
        if (this.$refs.FormUpdate) {
          this.$refs.FormUpdate[0].$refs.Upload.clearFiles();
        }
      });
    },

    /* Operation操作事件 */
    handleOperation(item, key, row = false) {
      // 主要的key
      this.ikey = key;
      // 自己定义的字段保存起来
      this.ryParamsClone = item.params && JSON.parse(JSON.stringify(item.params)) || [];
      // 处理不同类型事件
      this.handleModeType(item, row, key);
      // 根据id查看详情
      this.getDetail(item, row);
      // 打开弹框的回调
      this.$emit('handleOperation', item, key);
    },

    // 根据id查看详情
    async getDetail(item, row) {
      if (item.mode.detail) {
        let value;
        value = row ? await this.handleInfo(row) : await this.handleInfo(this.sections[0]);
        if (item.mode.type === 'dialog') {
          this.$set(this.ryOperate[this.ikey], 'params', {
            ...value,
            ...this.ryParamsClone // 内置组件传递详情信息，也传递自定义信息
          });
        } else {
          this.$set(this.ryOperate[this.ikey], 'params', {
            ...value // 自定义组件只传递详情信息，不传递自定义信息
          });
        }
      }
    },

    // 处理不同类型事件
    handleModeType(item, row, key) {
      switch (item.mode.type) {
      // 《内置弹框》
      case 'dialog':
        // 打开弹框
        this.dialogAddVisible = true;
        // 弹框标题
        this.dialogTitle = item.label;
        // 移除整个表单的校验结果
        this.$nextTick(() => {
          this.$refs.forms.clearValidate();
        });
        break;
        // 《确认框》
      case isTypes.find((r) => r === item.mode.type):
        // 解决删除时不会清除拼接的id
        // item = JSON.parse(JSON.stringify(item));
        item = deepClone(item);
        // 删除数据
        this.handleComfirm(item, row, key);
        break;
        // 《自定义弹框》
      case 'componentDialog':
        this.dialogVisible = true;
        break;
        // 《自定义页面》
      case 'componentPage':
        this.pageVisible = true;
        break;
        // 《自定义路由页面》
      case 'routerPage':
        // 把详情信息通过路由传过去 支持name和path方式跳转
        const _routerInfo = item.router;
        _routerInfo.query = _routerInfo.query || {};
        this.$set(_routerInfo.query, 'params', {
          ...row ? row : this.sections[0]
        });
        this.$router.push(_routerInfo);
        break;
      }
    },

    /* 删除数据 */
    handleComfirm(item, row, key) {
      if (!item.mode.subscribe) {
        throw Error('subscribe is null');
      }
      const label = item.mode.label || ID;
      let subscribe;
      if (item.mode.subscribe && item.mode.subscribe instanceof Function) {
        subscribe = item.mode.subscribe(row ? row : this.sections[0]);
      } else {
        subscribe = item.mode.subscribe;
      }
      const type = item.mode.type;
      const title = item.mode.title || '提示';
      const confirmButtonText = item.mode.confirmButtonText || '确定';
      const cancelButtonText = item.mode.cancelButtonText || '取消';
      this.$confirm(subscribe, title, {
        confirmButtonText,
        cancelButtonText,
        type
      })
        .then(() => {
          if (key === REMOVE) {
            if (row) {
              item.url = `${item.url}/${row[label]}`;
            } else {
              // 支持多选删除 两个以上进行拼接[,]
              const ids = this.sections.map((r) => r[label]).join(',');
              if (ids) {
                item.url = `${item.url}/${ids}`;
              }
            }
          }
          this.handleRequest(item);
        })
        .catch(() => {
          item.mode.catch && item.mode.catch();
        });
    },

    /* 提交按钮 */
    submitForm() {
      this.isCatch = false;
      this.$refs['forms'].validate((valid) => {
        if (valid) {
          /* 处理多选框 拼接成字符串 */
          const _multiples = this.ryOperate[this.ikey].multiples;
          if (_multiples && _multiples.length > 0) {
            for (const i in this.ryOperate[this.ikey].params) {
              if (_multiples.includes(i)) {
                this.ryOperate[this.ikey].params[i] = this.ryOperate[this.ikey].params[i].join(',');
              }
            }
          }
          /* 调取数据 */
          this.handleRequest(this.ryOperate[this.ikey]);
        }
      });
    },

    /* 单击事件，选中当前的行 */
    handleSelectionChange(section) {
      // 只有选中一条数据的时候才可操作
      this.single = section.length !== 1;
      // 只有一条或多条数据的时候才可操作
      this.multipe = section.length === 0;
      // 获取选择的数据
      this.sections = section;
    },

    // 获取表格数据
    async queryList(currentPage) {
      /* 分页中的传参判断 */
      if (currentPage) {
        this.formList.pageNum = currentPage.page;
        this.formList.pageSize = currentPage.limit;
      }
      /* 时间范围的赋值 */
      if (this.dateTime && this.dateTime.length > 0) {
        this.formList.startTime = this.dateTime[0];
        this.formList.endTime = this.dateTime[1];
      } else {
        this.formList.startTime = '';
        this.formList.endTime = '';
      }
      if (this.ryTable.url) {
        if (this.request) {
          const res = await this.request({
            url: this.ryTable.url,
            params: this.formList
          });
          if (res.code === 200) {
            this.tableData = res.rows;
            this.listTotal = res.total || 0;
          }
        }
      }
    },

    /* 查询 */
    handleQuery() {
      this.$nextTick(() => {
        this.$refs.formList.validate((valid) => {
          if (valid) {
            this.queryList();
          }
        });
      });
    },

    // 重置
    resetForm() {
      this.formList = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      // 清空子组件字段dateTime
      if (this.$refs.FormDateRange) {
        this.dateTime = [];
        Array.from(this.$refs.FormDateRange, (item) => {
          item.dateTime = [];
        });
      }
      this.queryList();
    },

    // 选中当前的行
    rowClcik(row) {
      if (!this._isUndef(this.ryTable.rowclick)) {
        return;
      }
      this.$refs.multipleTable.toggleRowSelection(row);
    },

    // 获取详情信息
    handleInfo(item) {
      // 处理自定义id名
      const serach_item = this.ryOperate[SEARCH];
      const label = serach_item.mode.label || ID;
      // 尾部拼接id
      serach_item.url = `${this.serach_url}/${item[label]}`;
      return this.handleRequest(serach_item, false, true);
    },

    /* 调取数据 */
    async handleRequest(item, params = false, value = false) {
      if (this.request) {
        const res = await this.request({
          method: item.method,
          url: item.url,
          data: params ? {} : item.params,
          params
        });
        if (res.code === 200) {
          if (value && res.data) {
            return res.data;
          }
          this.msgSuccess(`${item.label}成功！`);
          this.dialogAddVisible = false;
          // 重新获取数据
          this.queryList();
        }
      }
    },

    /* 获取双击事件 */
    async dblclick(row) {
      if (!this._isUndef(this.ryTable.dblclick)) {
        return;
      }
      this.ikey = SEARCH;
      // 打开弹框
      this.dialogAddVisible = true;
      // 弹框标题
      this.dialogTitle = this.ryOperate[this.ikey].label;
      // 给弹框表单赋值
      const value = await this.handleInfo(row);
      this.ryOperate[this.ikey].params = {
        ...this.ryOperate[this.ikey].params,
        ...value
      };
    }
  }
};
</script>

<template>
  <div class="app-container">
    <template v-if="!pageVisible">
      <!-- 查询 -->
      <el-form
        v-if="Object.keys(searchLayer).length > 0"
        v-show="showSearch"
        ref="formList"
        :model="formList"
        :inline="!_isUndef(searchLayer.inline) ? searchLayer.inline : true"
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
          <el-form-item
            v-if="_judgeType(item.component)"
            :key="item.label"
            :label-width="item.labelWidth"
            :required="item.required"
            :label="`${item.label}${searchLayer.labelAfter}`"
            :show-message="item.showMessage"
            :prop="item.model"
            :size="item.size"
            :rules="item.rules ? item.rules : []"
          >
            <component
              :is="item.component"
              :ref="item.component"
              v-bind="$attrs"
              :form="formList"
              :dict="item.dict"
              :children="item.children"
              :model="item.model"
              :clearable="item.clearable"
              :maxlength="item.maxlength"
              :minlength="item.minlength"
              :width="item.width"
              :form-width="searchLayer.formWidth"
              :show-password="item.showPassword"
              :disabled="item.disabled"
              :format="item.format"
              :readonly="item.readonly"
              :popper-class="item.popperClass"
              :filterable="item.filterable"
              :allow-create="item.allowCreate"
              :multiple="item.multiple"
              :reg-exp="item.regExp"
              :autofocus="item.autofocus"
              :prefix-icon="item.prefixIcon"
              :suffix-icon="item.suffixIcon"
              :dept-url="item.deptUrl"
              :show-word-limit="item.showWordLimit"
              @dateChange="dateChange"
            />
          </el-form-item>
          <component
            v-else
            v-bind="$attrs"
            :is="item.component"
            :key="item.name"
            :params="formList"
          />
        </template>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">
            {{ searchLayer.searchName ? searchLayer.searchName : "搜索" }}
          </el-button>
          <el-button @click="resetForm">
            {{ searchLayer.resetName ? searchLayer.resetName : "重置" }}
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 操作按钮 -->
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5" v-if="_isHaveObject(operateLayer)">
          <template v-for="(value, key) in operateLayer">
            <el-button
              v-if="_isUndef(value.show) && value.show !== 'table'"
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
        <right-toolbar
          v-if="_isUndef(rightToolbar)"
          :show-search.sync="showSearch"
          @querylist="queryList"
        />
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
          <el-table-column
            v-if="displayLayer.selection !== false"
            type="selection"
          />
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
            :show-overflow-tooltip="_isUndef(item.showOverflowTooltip)"
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
                    @click="handleOperation(value, key, scope.row)"
                  >
                    {{ value.label }}
                  </el-button>
                </template>
              </template>
              <template v-else>
                <span v-if="item.callback">{{ item.callback(scope.row) }}</span>
                <span v-else>{{ scope.row[item.prop] }}</span>
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
      <template v-if="_judgeDialog">
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
          @close="clearForm"
        >
          <el-form
            ref="forms"
            :inline="true"
            :model="operateLayer[ikey].params"
            label-width="120px"
          >
            <template v-for="item in operateLayer[ikey].mode.form">
              <el-form-item
                v-if="_judgeType(item.component)"
                :key="item.model"
                :label="`${item.label}:`"
                :prop="item.model"
                :rules="
                  _isUndef(operateLayer[ikey].mode.rules) ? item.rules : []
                "
              >
                <component
                  v-if="!operateLayer[ikey].mode.readonly"
                  :is="item.component"
                  :ref="item.component"
                  v-bind="$attrs"
                  :form="operateLayer[ikey].params"
                  :ikey="ikey"
                  :dept-url="item.deptUrl"
                  :upload="item.upload"
                  :file-id-list="fileIdList"
                  :reg="item.reg"
                  :size="item.size"
                  :describe="item.describe"
                  :row="item.row"
                  :limit="item.limit"
                  :dict="item.dict"
                  :children="item.children"
                  :model="item.model"
                  :clearable="item.clearable"
                  :maxlength="item.maxlength"
                  :minlength="item.minlength"
                  :width="item.width"
                  :form-width="searchLayer.formWidth"
                  :show-password="item.showPassword"
                  :disabled="item.disabled"
                  :format="item.format"
                  :readonly="item.readonly"
                  :popper-class="item.popperClass"
                  :filterable="item.filterable"
                  :allow-create="item.allowCreate"
                  :multiple="item.multiple"
                  :reg-exp="item.regExp"
                  :autofocus="item.autofocus"
                  :prefix-icon="item.prefixIcon"
                  :suffix-icon="item.suffixIcon"
                  :icon="item.icon"
                  :round="item.round"
                  :circle="item.circle"
                  :plain="item.plain"
                  :fileListLabel="item.fileListLabel"
                  :show-word-limit="item.showWordLimit"
                />
                <div v-else :style="{ width: _setLongSpan(item) }">
                  <template>{{
                    operateLayer[ikey].params[item.model]
                  }}</template>
                  <template v-if="item.component === 'FormUpdate'">
                    <div
                      v-for="file in operateLayer[ikey].params[
                        item.fileListLabel ? item.fileListLabel : 'fileList'
                      ]"
                      :key="file.fileId"
                    >
                      <el-link type="primary" @click="downFiles(file, item)">{{
                        file.name
                      }}</el-link>
                    </div>
                  </template>
                </div>
              </el-form-item>
              <component
                v-else
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
              <el-button
                type="primary"
                :loading="submitLoad"
                @click="submitForm"
              >
                确 定
              </el-button>
              <el-button @click="cloesbtn"> 取 消 </el-button>
            </template>
            <template v-else>
              <el-button
                v-for="item in operateLayer[ikey].mode.button"
                :key="item.event"
                v-hasPermi="[item.hasPermi]"
                :size="item.size"
                :type="item.type"
                :circle="item.circle"
                :round="item.round"
                :plain="item.plain"
                :icon="item.icon"
                :autofocus="item.autofocus"
                :disabled="item.disabled"
                :loading="item.event === 'submit' ? submitLoad : false"
                @click="item.event === 'submit' ? submitForm() : cloesbtn()"
              >
                {{ item.label }}
              </el-button>
            </template>
          </div>
        </el-dialog>
      </template>
      <!-- 跳转到自定义Dialog -->
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
    <!-- 跳转到自定义组件Page页 -->
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
import FormSelect from "./FormSelect.vue";
import FormInput from "./FormInput.vue";
import FormDateRange from "./FormDateRange.vue";
import FormTreeSelect from "./FormTreeSelect.vue";
import FormDate from "./FormDate.vue";
import FormTextarea from "./FormTextarea.vue";
import FormUpdate from "./FormUpdate.vue";
import { isUndef, isDef, isTypes, deepClone } from "../plugin/util.js";
import { download } from "../plugin/download.js";
import { ID, REMOVE, SEARCH } from "../plugin/default.js";
export default {
  name: "ry-minify-page",
  components: {
    FormSelect,
    FormDateRange,
    FormInput,
    FormTreeSelect,
    FormDate,
    FormTextarea,
    FormUpdate,
  },
  props: {
    // 页数
    pageSize: {
      type: Number,
      default: 10,
    },
    // 页码
    pageNum: {
      type: Number,
      default: 1,
    },
    // 表格各字段
    displayLayer: {
      type: Object,
      default() {
        return {};
      },
    },
    // 操作
    operateLayer: {
      type: Object,
      default() {
        return {};
      },
    },
    // 搜索信息
    searchLayer: {
      type: Object,
      default() {
        return {};
      },
    },
    // 小功能栏
    rightToolbar: {
      type: Boolean,
      default: true,
    },
    // 加载
    loading: {
      type: Boolean,
      default: true,
    },
    // 加载
    clearSelection: {
      type: Boolean,
      default: true,
    },
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
      },
      // 弹框标题
      dialogTitle: "",
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
      serach_url: "",
      // 是否需要catch
      isCatch: true,
      // 确认节流
      submitLoad: false,
      // 表格加载
      tableLoad: false,
    };
  },

  computed: {
    // 动态设置禁用选项
    _setDisabled() {
      return function (v) {
        if (v.disabled && v.disabled === "single") {
          return this.single;
        } else if (v.disabled === "multipe") {
          return this.multipe;
        }
        return false;
      };
    },
    // 动态设置form组件
    _setLongSpan() {
      return function (v) {
        return v.width ? v.width + "px" : "217px";
      };
    },
    // 判断传入的是否为字符串
    _judgeType() {
      return function (v) {
        return typeof v === "string";
      };
    },
    // 判断为真
    _isUndef() {
      return function (v) {
        return isUndef(v) ? true : !!v;
      };
    },
    // 判断弹框方式
    _judgeDialog() {
      return (
        this._isHaveObject(this.operateLayer) &&
        this.operateLayer[this.ikey] &&
        this.operateLayer[this.ikey].mode.type !== "CustomDialog"
      );
    },
    // 默认弹框宽度
    _defaultDialogWidth() {
      return this.operateLayer[this.ikey].mode.width
        ? `${this.operateLayer[this.ikey].mode.width}px`
        : "800px";
    },
    // 对象是否有值
    _isHaveObject() {
      return function (v) {
        return Object.keys(v).length > 0;
      };
    },
  },
  mounted() {
    // 获取列表
    this.queryList();
    // 备份查看接口
    this.backupSearchUrl();
  },
  methods: {
    // 备份查看接口
    backupSearchUrl() {
      if (isDef(this.operateLayer) && this._isHaveObject(this.operateLayer)) {
        const serach_item = this.operateLayer[SEARCH];
        this.serach_url = JSON.parse(JSON.stringify(serach_item.url));
      }
    },

    // 初始化字典项
    initDicts(dict) {
      // 查询字典赋值
      this.searchLayer.form.map((item) => {
        if (item.dict) {
          item.dict = item.dict && dict.type[item.dict];
        }
      });
      // 弹框中的字典赋值
      this.handleDicts(this.operateLayer, dict);
      // 表格内的弹窗字典
      this.displayLayer.data.forEach((item) => {
        if (item.operate) {
          this.handleDicts(item.operate, dict);
        }
      });
    },

    // 处理多出字典
    handleDicts(object, dict) {
      for (const key in object) {
        if (Array.isArray(this.operateLayer[key].mode.form)) {
          this.operateLayer[key].mode.form.forEach((item) => {
            if (typeof item.dict === "string") {
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
        const callback = this.operateLayer[this.ikey].mode.catch;
        callback && callback();
      }
    },

    // 取消/关闭按钮
    cloesbtn() {
      this.dialogAddVisible = false;
    },

    // 清除弹框内容
    closeForm() {
      this.dialogAddVisible = false;
      // 关闭的时候清空fileId
      if (this.operateLayer[this.ikey].params) {
        this.operateLayer[this.ikey].params.fileId = "";
      }
      // 附件清空
      this.fileIdList = [];
      this.$nextTick(() => {
        // 自己定义的字段保存起来 重复赋值
        this.operateLayer[this.ikey].params = this.ryParamsClone;
        // 查看弹框不清楚
        if (!this.operateLayer[this.ikey].mode.readonly) {
          // 移除整个表单的校验结果
          this.$refs.forms.clearValidate();
          this.$refs.forms.resetFields();
          // 清除选择
          // 清除文件
          if (this.$refs.FormUpdate) {
            this.$refs.FormUpdate[0].$refs.Upload.clearFiles();
          }
        }
        this.clearSelection && this.$refs.multipleTable.clearSelection();
      });
    },

    /* Operation操作事件 */
    handleOperation(item, key, row = false) {
      // 主要的key
      this.ikey = key;
      // 自己定义的字段保存起来
      this.ryParamsClone =
        (item.params && JSON.parse(JSON.stringify(item.params))) || [];
      // 处理不同类型事件
      this.handleModeType(item, row, key);
      // 根据id查看详情
      this.getDetail(item, row);
      // 打开弹框的回调
      this.$emit("handleOperation", item, key);
    },

    // 根据id查看详情
    async getDetail(item, row) {
      if (item.mode.detail) {
        let value;
        value = row
          ? await this.handleInfo(row)
          : await this.handleInfo(this.sections[0]);
        if (item.mode.type === "dialog") {
          this.$set(this.operateLayer[this.ikey], "params", {
            ...value,
            ...this.ryParamsClone, // 内置组件传递详情信息，也传递自定义信息
          });
        } else {
          this.$set(this.operateLayer[this.ikey], "params", {
            ...value, // 自定义组件只传递详情信息，不传递自定义信息
          });
        }
        const fileList = [
          {
            bucketname: "fabledt",
            createBy: "10152",
            createTime: "2022-11-21 17:04:33",
            deptId: 11001,
            fileId: "9798c19e-7858-4662-8186-4e0168d09258",
            format: "xlsx",
            id: 10214,
            moduleType: 2,
            name: "被审核单位模板 (1).xlsx",
            path: "/2022/11/21/9798c19e-7858-4662-8186-4e0168d09258.xlsx",
            relationId: "138",
            size: "14.3KB",
          },
          {
            bucketname: "fabledt",
            createBy: "10028",
            createTime: "2022-11-21 16:26:57",
            deptId: 11001,
            fileId: "6ea1eaa7-4ae1-4c09-99c0-252d2c009731",
            format: "docx",
            id: 10212,
            moduleType: 2,
            name: "部署文档.docx",
            path: "/2022/11/21/6ea1eaa7-4ae1-4c09-99c0-252d2c009731.docx",
            relationId: "136",
            size: "1.45MB",
          },
        ];
        this.operateLayer[this.ikey].params.fileList = fileList;
      }
    },

    // 处理不同类型事件
    async handleModeType(item, row, key) {
      switch (item.mode.type) {
        // 《内置弹框》
        case "Dialog":
          // 打开弹框
          this.dialogAddVisible = true;
          // 弹框标题
          this.dialogTitle = item.mode.title ? item.mode.title : item.label;
          // 移除整个表单的校验结果
          this.$nextTick(() => {
            this.$refs.forms.clearValidate();
          });
          break;
        // 《确认框》
        case isTypes.find((r) => r === item.mode.type):
          // 解决删除时不会清除拼接的id
          item = deepClone(item);
          // 删除数据
          this.handleComfirm(item, row, key);
          break;
        // 《自定义弹框》
        case "CustomDialog":
          this.dialogVisible = true;
          break;
        // 《自定义页面》
        case "CustomPage":
          this.pageVisible = true;
          break;
        // 《自定义路由页面》
        case "RouterPage":
          // 把详情信息通过路由传过去 支持name和path方式跳转
          const _routerInfo = item.mode.router;
          if (item.mode.detail) {
            _routerInfo.query = _routerInfo.query || {};
            let value = row
              ? await this.handleInfo(row)
              : await this.handleInfo(this.sections[0]);
            this.$set(_routerInfo.query, "params", {
              ...value,
            });
          }

          this.$router.push(_routerInfo);
          break;
      }
    },

    /* 删除数据 */
    handleComfirm(item, row, key) {
      if (!item.mode.subscribe) {
        throw Error("subscribe is null");
      }
      let subscribe;
      if (item.mode.subscribe && item.mode.subscribe instanceof Function) {
        subscribe = item.mode.subscribe(row ? row : this.sections[0]);
      } else {
        subscribe = item.mode.subscribe;
      }
      const label = item.mode.label || ID;
      const type = item.mode.type;
      const title = item.mode.title || "提示";
      const confirmButtonText = item.mode.confirmButtonText || "确定";
      const cancelButtonText = item.mode.cancelButtonText || "取消";
      this.$confirm(subscribe, title, {
        confirmButtonText,
        cancelButtonText,
        type,
        showCancelButton: item.mode.showCancelButton,
        showConfirmButton: item.mode.showConfirmButton,
        center: item.mode.center,
        roundButton: item.mode.roundButton,
      })
        .then(() => {
          if (key === REMOVE) {
            if (row) {
              item.url = `${item.url}/${row[label]}`;
            } else {
              // 支持多选删除 两个以上进行拼接[,]
              const ids = this.sections.map((r) => r[label]).join(",");
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
      this.$refs["forms"].validate((valid) => {
        if (valid) {
          this.submitLoad = true;
          /* 处理多选框 拼接成字符串 */
          const _multiples = this.operateLayer[this.ikey].multiples;
          if (_multiples && _multiples.length > 0) {
            for (const i in this.operateLayer[this.ikey].params) {
              if (_multiples.includes(i)) {
                this.operateLayer[this.ikey].params[i] =
                  this.operateLayer[this.ikey].params[i].join(",");
              }
            }
          }
          /* 调取数据 */
          this.handleRequest(this.operateLayer[this.ikey]);
        }
      });
    },

    //附件下载
    downFiles(file, item) {
      if (item.downloadWay === "Blob") {
        download(
          "/file/minio/download/" + file.fileId,
          {},
          file.name,
          this.$options.methods.request
        );
      } else {
        window.open("/dev-api/file/minio/download/" + file.fileId);
      }
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
      this.tableLoad = true;
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
        this.formList.startTime = "";
        this.formList.endTime = "";
      }
      if (this.displayLayer.url) {
        if (this.request) {
          const res = await this.request({
            url: this.displayLayer.url,
            params: this.formList,
          });
          if (res.code === 200) {
            this.tableLoad = false;
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
        pageSize: this.pageSize,
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
      if (!this._isUndef(this.displayLayer.rowclick)) {
        return;
      }
      this.$refs.multipleTable.toggleRowSelection(row);
    },

    // 获取详情信息
    handleInfo(item) {
      // 处理自定义id名
      const serach_item = this.operateLayer[SEARCH];
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
        });
        if (res.code === 200) {
          if (value && res.data) {
            return res.data;
          }
          this.msgSuccess(`${item.label}成功！`);
          // 关闭弹框
          this.dialogAddVisible = false;
          // 确认按钮节流
          this.submitLoad = false;
          // 重新获取数据
          this.queryList();
        }
      }
    },

    /* 获取双击事件 */
    async dblclick(row) {
      if (
        !(
          this._isUndef(this.displayLayer.dblclick) &&
          this._isHaveObject(this.operateLayer)
        )
      ) {
        return;
      }
      this.ikey = SEARCH;
      // 打开弹框
      this.dialogAddVisible = true;
      // 弹框标题
      this.dialogTitle = this.operateLayer[this.ikey].label;
      // 给弹框表单赋值
      const value = await this.handleInfo(row);
      this.operateLayer[this.ikey].params = {
        ...this.operateLayer[this.ikey].params,
        ...value,
      };
    },
  },
};
</script>

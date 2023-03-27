<template>
  <div>
    <el-form
      ref="forms"
      :inline="true"
      :model="operateLayer.params"
      :label-width="operateLayer.labelWidth"
    >
      <template v-for="item in operateLayer.mode.form">
        <el-form-item
          v-if="_judgeType(item.component, item.hidden)"
          :key="item.model"
          :label="`${item.label}：`"
          :prop="item.model"
          :rules="_isUndef(operateLayer.mode.readonly) ? item.rules : []"
        >
          <template v-if="!operateLayer.mode.readonly">
            <component
              v-bind="$attrs"
              :is="item.component"
              :ref="item.component"
              :form="operateLayer.params"
              :type="item.type"
              :startTimeLabel="item.startTimeLabel"
              :endTimeLabel="item.endTimeLabel"
              :editable="item.editable"
              :valueFormat="item.valueFormat"
              :buttonLabel="item.buttonLabel"
              :treeUrl="item.treeUrl"
              :placeholder="item.placeholder"
              :normalizer="item.normalizer"
              :params="item.params"
              :callback="item.callback"
              :maxHeight="item.maxHeight"
              :alwaysOpen="item.alwaysOpen"
              :appendToBody="item.appendToBody"
              :showCount="item.showCount"
              :zIndex="item.zIndex"
              :flat="item.flat"
              :keyModel="item.keyModel"
              :disabledDate="item.disabledDate"
              :disabledBefore="item.disabledBefore"
              :upload="item.upload"
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
              :drag="item.drag"
              :rows="item.rows"
              :round="item.round"
              :circle="item.circle"
              :plain="item.plain"
              :hidden="item.hidden"
              :click="item.click"
              :change="item.change"
              :blur="item.blur"
              :focus="item.focus"
              :fileListLabel="item.fileListLabel"
              :show-word-limit="item.showWordLimit"
            />
          </template>
          <div
            v-else
            :style="{ width: _setLongSpan(item), wordWrap: 'break-word' }"
          >
            <template>{{ operateLayer.params[item.model] }}</template>
            <template v-if="item.component === 'FormUpdate'">
              <div
                v-for="file in operateLayer.params[
                  item.fileListLabel ? item.fileListLabel : 'fileList'
                ]"
                :key="file.fileId"
              >
                <el-link type="primary" @click="downFiles(file, item)"
                  ><i style="margin-right: 5px" class="el-icon-paperclip"></i
                  >{{ file.name }}</el-link
                >
              </div>
            </template>
          </div>
        </el-form-item>
        <component
          v-else-if="_judegeFunction(item.component)"
          v-bind="$attrs"
          :is="item.component"
          :key="item.name"
          :ref="item.name"
          :readonly="operateLayer.mode.readonly"
          :params="operateLayer.params"
        />
      </template>
      <div class="operate">
        <slot></slot>
      </div>
    </el-form>
  </div>
</template>
<script>
/**
 * 传入单个operateLayer，直接使用操作层的表单，不需要与整体的三层捆绑
 */
import { download } from "../plugin/download.js";
import { isUndef, handleDicts } from "../plugin/util.js";
import FormSelect from "./FormSelect.vue";
import FormInput from "./FormInput.vue";
import FormDateRange from "./FormDateRange.vue";
import FormTreeSelect from "./FormTreeSelect.vue";
import FormDate from "./FormDate.vue";
import FormTextarea from "./FormTextarea.vue";
import FormUpdate from "./FormUpdate.vue";
export default {
  name: "SingleForm",
  data() {
    return {};
  },
  props: {
    // 操作
    operateLayer: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  // watch: {
  //   operateLayer: {
  //     handler(val) {
  //     },
  //     deep: true
  //   }
  // },
  computed: {
    /**
     * 默认为false
     */
    _isDeFalse() {
      return function(v) {
        return isUndef(v) ? false : v;
      };
    },
    /**
     * 只有时字符串的并且hidden不为true时为true
     */
    _judgeType() {
      return function(v, hidden) {
        if (typeof v === "string" && this._isDeFalse(hidden)) {
          return true;
        }
      };
    },
    /**
     * 只有时字符串的并且hidden不为true时为true
     */
    _judegeFunction() {
      return function(v) {
        return typeof v !== "string";
      };
    },
    /**
     * 动态设置form组件
     */
    _setLongSpan() {
      return function(v) {
        return v.width ? `${v.width}px` : "217px";
      };
    },
    /**
     * 配置为null和undifined是，也就是没有该项配置，结果为true，
     * 配置为true时，取反
     */
    _isUndef() {
      return function(v) {
        return isUndef(v) ? true : !v;
      };
    }
  },
  /** 单表单组件 */
  components: {
    FormSelect,
    FormDateRange,
    FormInput,
    FormTreeSelect,
    FormDate,
    FormTextarea,
    FormUpdate
  },
  /** main.js传入的请求接口 */
  provide() {
    return {
      request: this.$options.methods.request
    };
  },
  methods: {
    /** 检查表格校验 */
    checkout() {
      return new Promise(res => {
        this.$refs.forms.validate(valid => {
          res(valid);
        });
      });
    },
    /** 附件下载 */
    downFiles(file, item) {
      if (item.downloadWay === "new-window") {
        window.open(`/minio/download/${file.fileId}`);
      } else {
        download(
          `/minio/download/${file.fileId}`,
          {},
          file.name,
          this.$options.methods.request
        );
      }
    },
    /** 初始化字典项 */
    initDicts(dict) {
      // 弹框中的字典赋值
      handleDicts(this.operateLayer, dict, false);
    }
  }
};
</script>
<style scoped>
.operate {
  margin: auto;
  text-align: center;
}
</style>

<template>
  <div>
    <el-form
      ref="forms"
      :inline="$isDeTrue(operateLayer.inline)"
      :model="operateLayer.params"
      :label-width="operateLayer.labelWidth"
    >
      <template v-for="item in operateLayer.mode.form">
        <el-form-item
          v-if="$judgeTypeCom(item.component, item.hidden)"
          :key="item.model"
          :prop="item.model"
          :label="$setLabel(item.label, operateLayer.labelAfter)"
          :rules="$isUndef(operateLayer.mode.readonly) ? item.rules : []"
        >
          <template v-if="!operateLayer.mode.readonly">
            <Attr :formParams="operateLayer.params" :attrs="item"></Attr>
          </template>
          <div
            v-else
            :style="{ width: $setInfoWidth(item), wordWrap: 'break-word' }"
          >
            <template>{{ operateLayer.params[item.model] }}</template>
            <template v-if="item.component === 'FormUpdate'">
              <div
                v-for="file in operateLayer.params[
                  item.fileListLabel ? item.fileListLabel : 'fileList'
                ]"
                :key="file.fileId"
              >
                <el-link type="primary" @click="$minioDownFiles(file, item)"
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
          :readonly="operateLayer.mode.readonly"
          :params="operateLayer.params"
        />
      </template>
      <!-- 自定义操作 -->
      <template>
        <slot></slot>
      </template>
    </el-form>
  </div>
</template>
<script>
/**
 * 传入单个operateLayer，直接使用操作层的表单，不需要与整体的三层捆绑
 */
import Attr from "../form/Attr.vue";
import { handleDicts } from "../plugin/util.js";
import mixins from "../plugin/mixin";
export default {
  name: "OperateForm",
  /** 单表单组件 */
  components: {
    Attr
  },
  mixins: [mixins],
  props: {
    // 操作
    operateLayer: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {},
  /** main.js传入的请求接口 */
  provide() {
    return {
      request: this.$options.methods.request
    };
  },
  methods: {
    /** 初始化字典项 */
    initDicts(dict) {
      // 弹框中的字典赋值
      handleDicts(this.operateLayer, dict, false);
    }
  }
};
</script>

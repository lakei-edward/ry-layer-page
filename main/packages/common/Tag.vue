<template>
  <div>
    <template v-if="_isFunction(callback)"
      ><el-tag :effect="attr.effect" :type="attr.type">{{
        callback(row)
      }}</el-tag></template
    >
    <template v-else
      ><el-tag :effect="attr.effect" :type="attr.type">{{
        row[prop]
      }}</el-tag></template
    >
  </div>
</template>
<script>
import { judgeType } from "../plugin/util.js";
export default {
  data() {
    return {};
  },
  props: ["attr", "callback", "row", "prop"],
  computed: {
    /**
     * 是否是函数
     */
    _isFunction() {
      return function (v) {
        return judgeType(v) === "Function";
      };
    }
  }
};
</script>

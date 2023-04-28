<template>
  <Attr :formParams="formParams" :attrs="attrs"></Attr>
</template>

<script>
/**
 * 可以使用ry-layer-page中单个表单组件，通过该组件来转一下！
 */
import Attr from "../form/Attr.vue";
export default {
  name: "SingleForm",
  components: {
    Attr
  },
  props: {
    attrs: {
      type: Object
    },
    formParams: {
      type: Object
    }
  }
};
</script>

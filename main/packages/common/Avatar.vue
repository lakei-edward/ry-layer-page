<template>
  <img
    :src="row[attr.path ? attr.path : 'path']"
    :alt="attr.path"
    :style="{
      width: (attr.width ? attr.width : 150) + 'px',
      height: (attr.height ? attr.height : '') + 'px'
    }"
  />
</template>
<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    attr: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

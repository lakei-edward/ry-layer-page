<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'ShuKeDoc',
  data() {
    return {
      url: 'http://192.168.20.50:3990/projects/FBDP/repos/develop_platform_front_end/browse'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>

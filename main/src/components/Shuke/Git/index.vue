<template>
  <div>
    <svg-icon icon-class="github" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'ShuKeGit',
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

<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive v-if="isKeepAlive">
        <router-view :key="key" />
      </keep-alive>
      <template v-else>
        <router-view :key="key" />
      </template>
    </transition>
  </section>
</template>

<script>
import { isKeepAlive } from "@/settings.js";
export default {
  name: "AppMain",
  data() {
    return {
      isKeepAlive
    };
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: rgb(240, 242, 245);
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 17px;
  }
}
</style>

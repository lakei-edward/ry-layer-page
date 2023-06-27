<template>
  <div
    :class="{ 'has-logo': showLogo }"
    :style="{
      backgroundColor:
        settings.sideTheme === 'theme-dark'
          ? variables.menuBackground
          : settings.sideTheme === 'theme-light'
          ? variables.menuLightBackground
          : settings.sideTheme === 'theme-blue'
          ? variables.menuBlueBackground
          : variables.logoLightBlueTitleBackground
    }"
  >
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
      <!-- <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/vue2-app">
          <i class="el-icon-menu"></i>
          <span slot="title">导航1</span>
        </el-menu-item>
        <el-menu-item index="/user">
          <i class="el-icon-document"></i>
          <span slot="title">
            导航二
          </span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu> -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="
          settings.sideTheme === 'theme-dark'
            ? variables.menuBackground
            : settings.sideTheme === 'theme-light'
            ? variables.menuLightBackground
            : settings.sideTheme === 'theme-blue'
            ? variables.menuBlueBackground
            : variables.menuLightBlueBackground
        "
        :text-color="
          settings.sideTheme === 'theme-dark'
            ? variables.menuColor
            : settings.sideTheme === 'theme-light'
            ? variables.menuLightColor
            : settings.sideTheme === 'theme-blue'
            ? variables.menuBlueColor
            : variables.menuLightBlueColor
        "
        :unique-opened="true"
        :active-text-color="
          settings.sideTheme === 'theme-blue' ||
          settings.sideTheme === 'theme-light-blue'
            ? variables.menuBlueColorActive
            : settings.theme
        "
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["sidebarRouters", "sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>

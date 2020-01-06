<template>
  <el-menu
    class="el-menu-vertical"
    background-color="#fff"
    text-color="#333"
    active-text-color="deepskyblue"
    router
  >
    <template v-for="item in menus">
      <el-menu-item :key="item.path" :index="item.path" v-if="!item.children">
        <i :class="item.meta.icon" v-if="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
      <el-submenu :key="item.path" :index="item.path" v-else>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item
          v-for="subitem in item.children.filter(c=>c.meta)"
          :key="subitem.path"
          :index="subitem.path"
        >{{ subitem.meta.title }}</el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import { asyncRouteMap } from "@/router";
export default {
  name: "SideMenu",
  data() {
    return {
      curPath: ""
    };
  },
  computed: {
    menus() {
      const path = this.$route.matched[1].path;
      return asyncRouteMap.filter(item => item.path === path)[0].children;
    }
  },
  created() {
    this.curPath = this.$route.fullPath;
  }
};
</script>

<style lang="scss">
.el-menu-vertical {
  width: 200px;
  height: calc(100vh - 60px);
  position: fixed;
  top: 60px;
  left: 0;
}
</style>

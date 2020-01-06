<template>
  <el-container class="base-layout">
    <header-bar></header-bar>
    <el-container>
      <el-aside width="200px">
        <side-menu></side-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderBar from "../common/headerBar";
import SideMenu from "../common/sideMenu";
export default {
  name: "BaseLayout",
  components: {
    HeaderBar,
    SideMenu
  }
};
</script>

<style lang="scss">
.base-layout {
  flex-direction: column;
  .el-main {
    margin-top: 60px;
  }
}
</style>

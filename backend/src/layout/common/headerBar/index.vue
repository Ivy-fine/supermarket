<template>
  <el-header class="headerbar">
    <div class="left">
      <img :src="require('@/assets/img/logo.png')" alt class="logo" />
      <el-menu class="el-menu-demo" mode="horizontal" v-if="list">
        <el-menu-item v-for="item in list" :key="item.path">{{item.meta.title}}</el-menu-item>
      </el-menu>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar icon="el-icon-user-solid" :size="30"></el-avatar>用户名
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户信息</el-dropdown-item>
        <el-dropdown-item>
          <router-link to="/login">退出登录</router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    }
  }
};
</script>

<style lang="scss">
.headerbar {
  background: skyblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    .logo {
      flex-shrink: 0;
      margin-right: 50px;
      display: block;
      height: 50%;
    }
  }
  .el-menu {
    background-color: transparent;
  }
  .el-menu--horizontal > .el-menu-item {
    border: 0;
    color: #fff;
  }
  .el-menu.el-menu--horizontal {
    border: 0;
  }
  .el-dropdown-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    .el-avatar {
      margin-right: 10px;
    }
  }
}
</style>

<template>
  <div class="main-wrap">
    <router-view></router-view>
    <fn-footer-tab :list="linklist"></fn-footer-tab>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      linklist: [
        {
          name: "home",
          path: "/home",
          text: "首页",
          icon: "home.png",
          activeIcon: "homeactive.png"
        },
        {
          name: "classify",
          path: "/classify",
          text: "分类",
          icon: "classify.png",
          activeIcon: "classifyactive.png"
        },
        {
          name: "shopcart",
          path: "/shopcart",
          text: "购物车",
          icon: "shopcart.png",
          activeIcon: "shopcartactive.png"
        },
        {
          name: "mine",
          path: "/mine",
          text: "我的",
          icon: "mine.png",
          activeIcon: "mineactive.png"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.main-wrap {
  @include wh(100vw, 100vh);
  @include flexColumn;
  & > div {
    flex: 1;
  }
}
</style>

<template>
  <nav>
    <router-link :to="item.path" v-for="item in list" :key="item.name">
      <img :src="require(`@/assets/icons/${item.icon}`)" alt class="icon" />
      <img
        :src="require(`@/assets/icons/${item.activeIcon}`)"
        alt
        class="activeicon"
      />
      <span>{{ item.text }}</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "FooterTab",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss">
nav {
  @include wh(750px, 98px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 2px -6px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(235, 235, 235, 1);
  border-width: 1px 0;
  display: flex;
  @include flexAJ(center, space-around);

  a {
    @include flexColumn;
    @include flexAJ(center, center);
    span {
      color: #666666;
      font-size: $fontSize-ss;
      @include baseFontStyle;
      display: block;
    }
    img {
      @include wh(50px, 50px);
    }
    .icon {
      display: block;
    }
    .activeicon {
      display: none;
    }
    &.router-link-active {
      span {
        color: #fe3113;
      }
      .icon {
        display: none;
      }
      .activeicon {
        display: block;
      }
    }
  }
}
</style>

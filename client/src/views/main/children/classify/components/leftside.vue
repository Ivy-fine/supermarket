<template>
  <div class="left">
    <fn-tabBar :list="menu" :activeInd="activeInd" @change="changeType"></fn-tabBar>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array
    },
    activeInd: {
      type: Number,
      default: 0
    }
  },
  methods: {
    changeType(ind, item) {
      this.$emit("changeType", ind, item);
    }
  },
  created() {
    // console.log(this.activeInd);
  }
};
</script>

<style lang="scss" >
.left {
  width: 172px;
  background: rgba(250, 250, 250, 1);
  .tabBar {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    flex-direction: column;
    justify-content: flex-start;
    li {
      flex-shrink: 0;
      font-size: $fontSize-s;
      @include baseFontStyle;
      color: rgba(153, 153, 153, 1);
      line-height: 55px;
      text-align: center;
      padding: 23px 0;
      &.active {
        color: #000;
      }
    }
  }
}
</style>

<template>
  <div class="header">
    <fn-icon name="fa-angle-left" :size="28" v-show="goback" @click="back"></fn-icon>
    <h4 v-show="title">{{title}}</h4>
    <a href="javascript:;" v-show="extra">{{extra}}</a>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    goback: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    extra: {
      type: String,
      default: ""
    },
    back: {
      type: Function
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 90px;
  border-bottom: 1px solid rgba(242, 242, 242, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  .fa-angle-left {
    position: absolute;
    left: 40px;
    line-height: 90px;
  }
  h4 {
    width: 100%;
    font-size: $fontSize-l;
    @include baseTitleFontStyle;
    color: rgba(16, 16, 16, 1);
    text-align: center;
  }
  a {
    text-decoration: none;
    position: absolute;
    right: 40px;
    line-height: 90px;
    color: rgba(247, 105, 104, 1);
    font-size: $fontSize-m;
  }
}
</style>

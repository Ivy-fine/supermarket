<template>
  <transition leave-active-class="animated fadeOut" enter-active-class="animated fadeIn">
    <div class="popup-wrap" v-show="show" @click="hide">
      <transition
        leave-active-class="animated slideOutDown"
        enter-active-class="animated slideInUp"
      >
        <div class="popup" v-show="show" @click.stop>
          <h3>
            {{title}}
            <span @click="hide">取消</span>
            <span @click="hide" v-show="sureBtn">确定</span>
          </h3>
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "PopUp",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    sureBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hide() {
      this.$emit("update:show", false);
      if (this.sureBtn) {
        this.$emit("sureHandler");
      }
    }
  }
};
</script>

<style lang="scss">
.popup-wrap {
  @include wh(100vw, 100vh);
  background: rgba($color: #000000, $alpha: 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  .popup {
    width: 100%;
    height: 643px;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    @include flexColumn;
    h3 {
      height: 98px;
      line-height: 98px;
      padding-left: 24px;
      padding-right: 45px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      span {
        color: #ff1e1e;
      }
    }
  }
}
</style>

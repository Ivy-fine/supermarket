<template>
  <div
    class="dialog-wrap"
    v-show="show"
    leave-active-class="animated fadeOut"
    enter-active-class="animated fadeIn"
  >
    <div class="dialog">
      <h3 v-show="title">{{title}}</h3>
      <div class="content">
        <slot></slot>
      </div>
      <div class="btns">
        <button @click="handleCancel">{{cancelTxt}}</button>
        <button @click="handleSure">{{sureTxt}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    cancelTxt: {
      type: String,
      default: "取消"
    },
    sureTxt: {
      type: String,
      default: "确定"
    }
  },
  methods: {
    handleCancel() {
      this.$emit("update:show", false);
      this.$emit("cancel");
    },
    handleSure() {
      this.$emit("update:show", false);
      this.$emit("sure");
    }
  }
};
</script>

<style lang="scss">
.dialog-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  .dialog {
    position: absolute;
    top: 40%;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 600px;
    border-radius: 10px;
    background: #fff;
    overflow: hidden;
    h3 {
      padding-left: 20px;
      line-height: 80px;
    }
    .content {
      min-height: 130px;
      line-height: 130px;
      font-size: 32px;
      text-align: center;
    }
    .btns {
      display: flex;
      align-items: center;
      border-top: 2px solid #eee;
      button {
        flex: 1;
        height: 100px;
        color: #ff712b;
        background: #fff;
        &:nth-last-of-type(1) {
          border-left: 2px solid #eee;
        }
      }
    }
  }
}
</style>

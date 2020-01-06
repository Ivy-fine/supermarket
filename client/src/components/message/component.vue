<template>
  <div class="message">
    <div v-show="isShow">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    type: {
      type: String,
      default: ""
    },
    msg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isShow: true
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      setTimeout(() => {
        this.isShow = false;
        this.$destroy();
      }, 1500);
    }
  },

  destroyed() {
    document.body.removeChild(this.$el);
  }
};
</script>

<style lang="scss" scoped>
.message {
  padding: 20px 40px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba($color: #000000, $alpha: 0.8);
  color: #eee;
  border-radius: 5px;
}
</style>

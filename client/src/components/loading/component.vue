<template>
  <div class="loading-wrap" v-show="isShow">
    <lottie
      :options="defaultOptions"
      :width="375"
      :height="667"
      v-on:animCreated="handleAnimation"
    />
  </div>
</template>

<script>
import lottie from "vue-lottie";
import Anim from "./anim/lovely-dog.json";
export default {
  name: "Loading",
  data() {
    return {
      isShow: false,
      defaultOptions: {
        container: ".loading-wrap",
        animationData: Anim,
        loop: true,
        autoplay: true
      },
      defaultAnim: ""
    };
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
    handleAnimation(anim) {
      this.defaultAnim = anim;
    }
  },
  components: {
    lottie: lottie
  }
};
</script>

<style lang="scss">
.loading-wrap {
  @include wh(100vw, 100vh);
  background: rgba($color: #000000, $alpha: 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>

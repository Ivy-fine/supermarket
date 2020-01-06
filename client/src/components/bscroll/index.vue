<template>
  <div class="bs-wrap" :class="{ scrollX: scrollY === false }">
    <div class="bs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Bscroll",
  props: {
    scrollY: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let bs = new BScroll(".bs-wrap", {
        scrollY: this.scrollY,
        scrollX: !this.scrollY,
        probeType: 3,
        click: true
      });
      bs.on("scroll", this.throttle(this.onScroll.bind(this, bs), 300));
      bs.on("scrollEnd", this.onScrollEnd.bind(this, bs));
    },
    onScroll(bs) {
      this.$emit("bsScroll", bs);
    },
    onScrollEnd(bs) {
      bs.refresh();
    },
    throttle(func, delay) {
      let prev = Date.now();
      return function() {
        let now = Date.now();
        if (now - prev >= delay) {
          func();
          prev = Date.now();
        }
      };
    }
  }
};
</script>

<style lang="scss">
.bs-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .bs-content {
    position: relative;
    width: 100%;
  }
}
.bs-wrap.scrollX {
  .bs-content {
    height: 100%;
  }
}
</style>

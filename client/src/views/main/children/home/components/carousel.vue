<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="item in list" :key="item.id">
      <img :src="item.imgUrl" alt />
    </swiper-slide>
  </swiper>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "carousel",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: true
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  created() {},
  mounted() {},
  components: {
    swiper,
    swiperSlide
  },
  methods: {}
};
</script>

<style lang="scss">
.swiper-container,
.swiper-slide,
img {
  width: 100%;
  height: 100%;
}
</style>

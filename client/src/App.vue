<template>
  <div class="App">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import "@/assets/font-awesome/css/font-awesome.min.css";
import "@/assets/css/animate.min.css";
export default {
  name: "app"
};
</script>

<style lang='scss'>
@import url("./assets/css/reset.css");
.App {
  width: 100%;
  height: 100%;
}
</style>

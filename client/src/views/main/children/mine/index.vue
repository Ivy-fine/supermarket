<template>
  <div class="mine">
    <myInfo :info="info" />
    <myOrder />
  </div>
</template>

<script>
import myOrder from "./components/myOrder";
import myInfo from "./components/myInfo";
import { mapState } from "vuex";
export default {
  name: "Mine",
  data() {
    return {};
  },
  components: {
    myOrder,
    myInfo
  },
  computed: {
    ...mapState("user", ["info"])
  }
};
</script>

<style lang="scss">
</style>

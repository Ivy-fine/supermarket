<template>
  <div class="selectAddress">
    <searchBar />
  </div>
</template>

<script>
import searchBar from "../address/components/searchBar";
export default {
  components: {
    searchBar
  }
};
</script>

<style lang="scss">
.selectAddress {
  width: 100%;
  height: 100%;
}
</style>

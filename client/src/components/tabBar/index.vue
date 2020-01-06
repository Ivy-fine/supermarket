<template>
  <ul class="tabBar">
    <li
      v-for="(item,index) in list"
      :key="item.id"
      :class="{active:activeInd===index}"
      @click="change(index,item)"
    >{{item.title}}</li>
  </ul>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    list: {
      type: Array
    },
    activeInd: {
      type: Number,
      default: 0
    }
  },
  methods: {
    change(index, item) {
      this.$emit("change", index, item);
    }
  }
};
</script>

<style lang="scss">
ul.tabBar {
  display: flex !important;
  align-items: center;
  justify-content: space-around;
}
</style>

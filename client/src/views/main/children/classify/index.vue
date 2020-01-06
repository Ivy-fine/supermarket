<template>
  <div class="classify">
    <leftside :menu="menuData" @changeType="changeType" :activeInd="typeInd" />
    <rightside :menu="menuData" :typeInd="typeInd" />
  </div>
</template>

<script>
import leftside from "./components/leftside";
import rightside from "./components/rightside";
export default {
  name: "Classify",
  data() {
    return {
      menuData: [],
      typeInd: 0
    };
  },
  components: {
    leftside,
    rightside
  },
  methods: {
    async init() {
      const res = await this.$api.classify.classify_menu();
      this.menuData = res.data;
    },
    changeType(ind, item) {
      this.typeInd = ind;
      this.typeId = item.id;
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss">
.classify {
  width: 100%;
  display: flex;
}
</style>

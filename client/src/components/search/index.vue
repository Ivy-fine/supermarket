<template>
  <div class="search">
    <slot></slot>
    <div class="ipt" v-show="ipt">
      <fn-icon name="fa-search" color="#999999" :size="16"></fn-icon>
      <input type="text" :placeholder="placeholder" v-model="val" />
    </div>
    <span class="extra" v-show="extra">{{extra}}</span>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      val: ""
    };
  },
  props: {
    ipt: {
      type: Boolean,
      default: true
    },
    extra: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "搜索内容"
    },
    value: {
      type: String
    }
  },
  watch: {
    val(newValue) {
      this.$emit("input", newValue);
    },
    value(newValue) {
      this.val = newValue;
    }
  }
};
</script>

<style lang="scss">
.search {
  @include wh(750px, 98px);
  padding: 0 16px;
  display: flex;
  @include flexAJ(center, space-between);
  background: #fff;
  .ipt {
    flex: 1;
    height: 64px;
    background: rgba(246, 246, 246, 1);
    border-radius: 32px;
    display: flex;
    padding: 0 30px;
    @include flexAJ(center, space-around);
    input {
      flex: 1;
      padding-left: 30px;
      background: none;
      border: none;
    }
  }
}
</style>

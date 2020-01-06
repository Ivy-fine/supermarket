<template>
  <div class="menu-wrap">
    <dl v-for="(item, index) in list" :key="index">
      <dt>
        <fn-icon :name="item.name" :size="30" color="#fff"></fn-icon>
      </dt>
      <dd>
        <span>{{ item.text }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss">
.menu-wrap {
  @include wh(750px, 312px);
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-around;
  margin-bottom: 10px;
  dl {
    width: 20%;
    @include flexColumn;
    @include flexAJ(center, center);
    dt {
      @include wh(80px, 80px);
      background: linear-gradient(180deg, #ffc32e, #f97444);
      border-radius: 5px;
      // text-align: center;
      // line-height: 80px;
      display: flex;
      @include flexAJ(center, center);
    }
    dd {
      font-size: $fontSize-s;
      color: $baseFontLightColor;
      line-height: 60px;
    }
  }
}
</style>

<template>
  <div class="daybuy">
    <h3>
      每日必购
      <span>大家都在买</span>
    </h3>
    <ul>
      <li style="background:linear-gradient(180deg, #F7D867, #F09400);"></li>
      <li style="background:linear-gradient(180deg, #F5716B, #D4403B);"></li>
      <li style="background:linear-gradient(180deg, #97E4B8, #68C8BF);"></li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.daybuy {
  @include wh(750px, 384px);
  @include baseFontStyle;
  @include flexColumn;
  h3 {
    padding-left: 40px;
    line-height: 90px;
    font-size: $fontSize-l;
    span {
      font-size: $fontSize-s;
    }
  }
  ul {
    flex: 1;
    display: flex;
    li {
      flex: 1;
      height: 100%;
    }
  }
}
</style>

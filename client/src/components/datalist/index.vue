<template>
  <dl class="datalist" @click="$emit('click')">
    <dt>
      <slot name="dtinfo"></slot>
      <img :src="imgUrl" alt />
    </dt>
    <dd>
      <slot></slot>
    </dd>
  </dl>
</template>

<script>
export default {
  name: "DataList",
  props: {
    imgUrl: {
      type: String
    }
  }
};
</script>

<style lang="scss">
dl.datalist {
  display: flex !important;
  position: relative;
  @include wh(100%, 303px);
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid rgba(226, 226, 226, 1);
  dt {
    @include wh(240px, 240px);
    margin: 33px 30px 30px 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  dd {
    flex: 1;
    @include flexColumn;
    justify-content: space-between;
    padding-top: 27px;
    padding-bottom: 22px;
    padding-right: 30px;
    p.title {
      font-size: $fontSize-sl;
      @include baseFontStyle;
      color: rgba(17, 17, 17, 1);
      line-height: 40px;
      margin-bottom: 12px;
    }
    p.desc {
      font-size: $fontSize-s;
      @include baseFontStyle;
      color: rgba(153, 153, 153, 1);
      line-height: 30px;
      margin-bottom: 16px;
    }
    p.tags {
      display: flex;
      span {
        @include wh(60px, 26px);
        background: linear-gradient(
          251deg,
          rgba(254, 49, 19, 1) 0%,
          rgba(253, 122, 0, 1) 100%
        );
        box-shadow: 0px 4px 8px 0px rgba(252, 36, 33, 0.2),
          0px 4px 14px 2px rgba(255, 255, 255, 0.25);
        border-radius: 17px;
        font-size: 20px;
        @include baseTitleFontStyle;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        text-align: center;
      }
    }
    p.price {
      span {
        color: #fe3113;
        font-size: $fontSize-s;
        @include baseTitleFontStyle;
        b {
          font-size: $fontSize-l;
        }
      }
      s {
        margin-left: 8px;
        font-size: 20px;
        @include baseFontStyle;
        color: #c0c0c0;
      }
    }
    button {
      position: absolute;
      bottom: 25px;
      right: 31px;
      @include wh(66px, 63px);
      background: rgba(254, 49, 19, 1);
      box-shadow: 0px 1px 1px 0px rgba(255, 64, 54, 0.2);
      border-radius: 100%;
      text-align: center;
      img {
        width: 28px;
        height: 28px;
      }
    }
  }
}
</style>

<template>
  <div class="mine-order">
    <div class="title">
      <h3>我的订单</h3>
      <span>
        查看全部
        <fn-icon name="fa-angle-right" :size="12" color="#999"></fn-icon>
      </span>
    </div>
    <div class="order-types">
      <dl v-for="(item,index) in types" :key="index">
        <dt>
          <img :src="require(`@/assets/icons/${item.icon}`)" alt />
        </dt>
        <dd>{{item.title}}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: [
        {
          icon: "pendingpayment.png",
          title: "待付款"
        },
        {
          icon: "pendingsend.png",
          title: "待配送"
        },
        {
          icon: "stroke.png",
          title: "已发货"
        },
        {
          icon: "pendingsend.png",
          title: "退款/售后"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.mine-order {
  width: 690px;
  height: 299px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 33px 20px -20px rgba(0, 0, 0, 0.11),
    0px 0px 17px -3px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  border: 1px solid rgba(240, 240, 240, 1);
  margin: 0 auto;
  margin-top: -50px;
  .title {
    height: 112px;
    padding: 0 30px;
    padding-top: 40px;
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: $fontSize-m;
    }
    span {
      color: #999;
      font-size: $fontSize-m;
    }
  }
  .order-types {
    display: flex;
    justify-content: space-around;
    padding-top: 40px;
    dl {
      text-align: center;
      dt {
        img {
          width: 64px;
          height: 50px;
        }
      }
    }
  }
}
</style>

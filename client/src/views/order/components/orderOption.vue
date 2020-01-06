<template>
  <div class="orderOption">
    <fn-form>
      <fn-form-item label="配送方式" disabled style="margin:0;" @click="showSendWay=true">
        <span>
          多点配送
          <fn-icon name="fa-angle-right" color="#999"></fn-icon>
        </span>
      </fn-form-item>
      <fn-form-item label="配送时间" disabled class="send-time" @click="showSendTime=true">
        <span>
          {{getDate(sendtime) + " 9:00-21:00"}}
          <fn-icon name="fa-angle-right" color="#999"></fn-icon>
        </span>
      </fn-form-item>
      <fn-form-item label="在线支付" disabled>
        <p class="sel-btns">
          <img src="@/assets/icons/ShopCart_btn_UNSEL.png" alt v-show="!payOnline" />
          <img src="@/assets/icons/ShopCart_btn_SEL.png" alt v-show="payOnline" />
        </p>
      </fn-form-item>
      <fn-form-item label="优惠码/优惠券" disabled>
        <span>
          0张可用
          <fn-icon name="fa-angle-right" color="#999"></fn-icon>
        </span>
      </fn-form-item>
      <fn-form-item label="备注" v-model="remark" class="remark" placeholder="填写安全存放地址，请按门铃等配送相关要求"></fn-form-item>
      <fn-form-item label="订单价格" disabled style="margin:0;"></fn-form-item>
      <ul class="money">
        <li>
          商品金额
          <span>￥{{totalPrice}}</span>
        </li>
        <li>
          促销优惠
          <span>-￥{{cut}}</span>
        </li>
        <li>
          基础运费
          <span>+￥{{freight}}</span>
        </li>
      </ul>
      <fn-form-item label="实际支付" disabled>
        <b>￥{{money}}</b>
      </fn-form-item>
    </fn-form>
    <orderProduct :list="orderProductList" />
    <fn-pop-up title="配送方式" :show.sync="showSendWay"></fn-pop-up>
    <fn-pop-up title="配送时间" :show.sync="showSendTime" @sureHandler="sureHandler" sureBtn>
      <input type="date" v-model="sendtime" />
    </fn-pop-up>
  </div>
</template>

<script>
import orderProduct from "./orderProduct.vue";
import { mapGetters } from "vuex";
export default {
  props: {
    cut: {
      type: Number
    },
    freight: {
      type: Number
    },
    money: {
      type: Number
    },
    orderProductList: {
      type: Array
    }
  },
  data() {
    return {
      payOnline: true,
      remark: "",
      showSendWay: false,
      showSendTime: false,
      sendtime: new Date(),
      startTime: "",
      endTime: ""
    };
  },
  computed: {
    // ...mapState("shopcart", ["cartList"]),
    ...mapGetters("shopcart", ["totalPrice"])
    // orderProductList() {
    //   return this.cartList.filter(item => item.active === "1");
    // }
  },
  components: {
    orderProduct
  },
  methods: {
    getDate(date) {
      let days = ["日", "一", "二", "三", "四", "五", "六"];
      const day = new Date(date).getDay();
      return `${new Date(date).toLocaleDateString()}(周${days[day]})`;
    },
    sureHandler() {}
  }
};
</script>

<style lang="scss">
// .orderOption {
// }
.form-item {
  height: 80px;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 0 30px;
  background: #fff;
  margin-bottom: 20px;
  span {
    display: flex;
    @include flexAJ(center, space-between);
    i {
      margin-left: 30px;
    }
  }
  &.send-time {
    height: 134px;
    flex-direction: column;
    @include flexAJ(flex-start, space-around);
    span {
      width: 100%;
    }
  }
  &.remark {
    input {
      padding-left: 20px;
      &::placeholder {
        font-size: $fontSize-m;
      }
    }
  }
  .sel-btns {
    display: flex;
    align-items: center;
    img {
      width: 38px;
      height: 38px;
    }
    span {
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 28px;
      padding-left: 15px;
    }
  }
  b {
    color: #e96113;
  }
}
.money {
  padding: 0 30px;
  background: #fff;
  li {
    color: grey;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
  }
}
</style>

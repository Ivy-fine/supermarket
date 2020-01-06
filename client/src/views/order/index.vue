<template>
  <div class="order">
    <fn-header goback title="订单确认" :back="()=>$router.push('/shopcart')"></fn-header>
    <div class="order-content">
      <orderAddress :addressInfo="addressInfo" />
      <orderOption
        :cut="cut"
        :freight="freight"
        :money="money"
        :orderProductList="orderProductList"
      />
    </div>
    <footer class="submit-order">
      <span>
        合计：￥
        <b>{{money}}</b>
      </span>
      <button @click="submit">提交订单</button>
    </footer>
    <fn-dialog :show.sync="showDialog" @sure="goPay">确定提交订单吗？</fn-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import orderAddress from "./components/orderAddress";
import orderOption from "./components/orderOption";
export default {
  data() {
    return {
      selectedAddId: this.$storage.getItem("selectedAddId") * 1,
      showDialog: false,
      freight: 12, // 运费
      cut: 3 // 优惠
    };
  },
  components: { orderAddress, orderOption },
  computed: {
    ...mapGetters("shopcart", ["totalPrice"]),
    ...mapState("user", ["addressList"]),
    ...mapState("shopcart", ["cartList"]),
    orderProductList() {
      return this.cartList.filter(item => item.active === "1");
    },
    addressInfo() {
      const info = this.addressList.filter(
        item => item.id === this.selectedAddId
      )[0];
      if (info) {
        return info;
      } else {
        return {};
      }
    },
    money() {
      return this.totalPrice - this.cut + this.freight;
    }
  },
  methods: {
    submit() {
      if (Object.keys(this.addressInfo).length > 0) {
        this.showDialog = true;
      } else {
        this.$message.error("请选择收货地址");
      }
    },
    goPay() {
      // address_id,user_id,list_id,payway,sendway,paytime,remark,totalprice,cut,freight
      let ids = this.orderProductList.map(item => item.id).join(",");
      // console.log({
      //   address_id: this.selectedAddId,
      //   list_id: ids,
      //   totalPrice: this.totalPrice,
      //   cut: this.cut,
      //   freight: this.freight
      // });
      this.$api.order
        .order_add({
          address_id: this.selectedAddId,
          list_id: ids,
          totalPrice: this.totalPrice,
          cut: this.cut,
          freight: this.freight
        })
        .then(res => {
          console.log(res);
        });
      this.$router.push("/pay");
    }
  },
  created() {
    this.$store.dispatch("shopcart/cart_list");
  }
};
</script>

<style lang="scss">
.order {
  width: 100%;
  height: 100%;
  @include flexColumn;
  background: #f8f8f8;
  .order-content {
    flex: 1;
    overflow-y: auto;
  }
  .submit-order {
    height: 80px;
    display: flex;
    background: #fff;
    @include flexAJ(center, space-between);
    span {
      padding-left: 30px;
      color: #ff712b;
      b {
        font-size: $fontSize-l;
      }
    }
    button {
      width: 212px;
      height: 80px;
      background: #ff712b;
      color: #fff;
    }
  }
}
</style>

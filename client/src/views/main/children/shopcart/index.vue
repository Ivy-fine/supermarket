<template>
  <div class="shopcart">
    <fn-bscroll scrollY v-show="cartList.length>0">
      <div class="cartlist">
        <fn-data-list
          :imgUrl="product.cover"
          v-for="product in cartList"
          :key="product.id"
          @click="goDetail(product.id)"
        >
          <template v-slot:dtinfo>
            <p class="sel-btns" @click="selOne(product)">
              <img src="@/assets/icons/ShopCart_btn_UNSEL.png" alt v-show="product.active==='0'" />
              <img src="@/assets/icons/ShopCart_btn_SEL.png" alt v-show="product.active==='1'" />
            </p>
          </template>
          <div class="info">
            <p class="title">{{product.name}}</p>
          </div>
          <p class="price">
            <span>
              ￥
              <b>{{product.price}}</b>
            </span>
          </p>
          <div class="btns">
            <p @click.stop="num_change(product,'deduct')">
              <img src="@/assets/icons/btn_DEDUCT.png" alt />
            </p>
            <span>{{product.num}}</span>
            <p @click.stop="num_change(product,'add')">
              <img src="@/assets/icons/btn_ADD.png" alt />
            </p>
          </div>
        </fn-data-list>
      </div>
    </fn-bscroll>
    <div class="submit" v-show="cartList.length>0">
      <p class="sel-btns" @click="selAllProduct">
        <img src="@/assets/icons/ShopCart_btn_UNSEL.png" alt v-show="!selAll" />
        <img src="@/assets/icons/ShopCart_btn_SEL.png" alt v-show="selAll" />
        <span>全选</span>
      </p>
      <p class="totalPrice">
        合计：
        <span>
          <b>￥</b>
          {{totalPrice}}
        </span>
      </p>
      <button @click="goOrder">结算</button>
    </div>
    <div class="no-data" v-show="cartList.length<=0">购物车空空如也~</div>
    <fn-dialog :show.sync="showDialog" @sure="remove">确定删除该商品吗？</fn-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Shopcart",
  data() {
    return {
      selAll: false,
      showDialog: false,
      id: -1
    };
  },
  computed: {
    ...mapState("shopcart", ["cartList"]),
    ...mapGetters("shopcart", ["totalPrice"])
  },
  methods: {
    init() {
      this.selAll = this.cartList.every(item => item.active === "1");
    },
    selAllProduct() {
      this.selAll = !this.selAll;
      const active = this.selAll ? "1" : "0";
      const ids = this.cartList.map(item => {
        item.active = active;
        return item.id;
      });
      this.$store.dispatch("shopcart/cart_update", {
        id: ids,
        active
      });
    },
    selOne(product) {
      const active = product.active;
      product.active = active === "0" ? "1" : "0";
      this.$store.dispatch("shopcart/cart_update", {
        id: product.id,
        active: product.active
      });
    },
    num_change(product, type) {
      if (type === "deduct") {
        if (product.num <= 1) {
          this.showDialog = true;
          this.id = product.id;
        } else {
          product.num -= 1;
        }
      } else {
        product.num += 1;
      }
      const { id, num } = product;
      this.$store.dispatch("shopcart/cart_update", { id, num });
    },
    remove() {
      this.$store.dispatch("shopcart/cart_update", { id: this.id, num: 0 });
      this.$store.dispatch("shopcart/cart_list");
    },
    goOrder() {
      this.$router.push("/order");
    },
    goDetail(id) {
      this.$router.push(`/detail/${id}`);
    }
  },
  async created() {
    await this.$store.dispatch("shopcart/cart_list");
    this.init();
  }
};
</script>

<style lang="scss">
.shopcart {
  @include flexColumn;
}
.cartlist {
  flex: 1;
  .datalist {
    width: 100%;
    height: 266px;
    dt {
      display: flex;
      align-items: center;
      .sel-btns {
        @include wh(38px, 38px);
        margin-right: 14px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      img {
        width: 160px;
        height: 160px;
      }
    }
    p.title {
      font-size: $fontSize-m;
    }
    .btns {
      position: absolute;
      bottom: 30px;
      right: 30px;
      display: flex;
      @include flexAJ(center, space-around);
      p {
        @include wh(56px, 56px);
        img {
          width: 100%;
          height: 100%;
        }
      }
      span {
        font-size: $fontSize-m;
        @include baseFontStyle;
        padding: 0 20px;
      }
    }
  }
}
.submit {
  width: 100%;
  height: 99px;
  background: rgba(255, 255, 255, 1);
  border-radius: 0px 0px 12px 12px;
  border: 1px solid rgba(237, 237, 237, 1);
  padding-left: 29px;
  display: flex;
  @include flexAJ(center, space-between);
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
  .totalPrice {
    flex: 1;
    font-size: $fontSize-m;
    @include baseTitleFontStyle;
    color: rgba(17, 17, 17, 1);
    line-height: 28px;
    margin-right: 30px;
    text-align: right;
    span {
      font-size: $fontSize-l;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(254, 49, 19, 1);
      line-height: 36px;
      b {
        font-size: $fontSize-m;
      }
    }
  }
  button {
    width: 240px;
    height: 98px;
    background: rgba(255, 64, 54, 1);
    box-shadow: 0px 1px 1px 0px rgba(255, 64, 54, 0.2);
    border-radius: 0px 0px 0px 12px;
    font-size: $fontSize-sl;
    @include baseTitleFontStyle;
    color: rgba(255, 255, 255, 1);
  }
}
.no-data {
  width: 100%;
  text-align: center;
  padding-top: 80px;
}
</style>

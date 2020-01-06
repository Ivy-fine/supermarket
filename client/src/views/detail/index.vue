<template>
  <div class="detail">
    <fn-header goback :back="()=>{this.$router.back()}"></fn-header>
    <div class="detail-info">
      <img :src="product.cover" alt />
      <h3>{{product.name}}</h3>
      <p>￥{{product.price}}</p>
    </div>
    <div v-html="html"></div>
    <div class="footer">
      <fn-icon name="fa-shopping-cart" :size="20" color="#767676"></fn-icon>
      <button @click="addCart(product)">加入购物车</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      html: "",
      product: {}
    };
  },
  methods: {
    addCart(product) {
      this.$store.dispatch("shopcart/cart_add", {
        product_id: product.id,
        num: 1
      });
      this.$message.success("成功加入购物车");
    }
  },
  created() {
    this.$api.product.detail({ id: this.$route.params.id }).then(res => {
      this.product = res.data;
      this.html = res.data.detail;
    });
  }
};
</script>

<style lang="scss">
.detail {
  img {
    width: 100%;
  }
  .detail-info {
    padding-left: 40px;
    h3 {
      font-size: 36px;
      margin-bottom: 30px;
      font-weight: 500;
    }
    p {
      color: #ff712b;
      font-size: 40px;
      margin-bottom: 30px;
    }
  }
  .footer {
    width: 100%;
    height: 104px;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 60px;
    background: #fff;
    button {
      width: 220px;
      height: 104px;
      background: #ff712b;
      color: #fff;
    }
  }
}
</style>

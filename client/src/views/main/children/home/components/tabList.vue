<template>
  <div class="tablist">
    <fn-data-list
      :imgUrl="product.cover"
      v-for="product in productList"
      :key="product.id"
      @click="goDetail(product.id)"
    >
      <div class="info">
        <p class="title">{{product.name}}</p>
        <p class="desc">累计{{product.sales | sales}}</p>
        <p class="tags">
          <span>自营</span>
        </p>
      </div>
      <p class="price">
        <span>
          ￥
          <b>{{product.price}}</b>
        </span>
        <s>￥{{product.oldPrice}}</s>
      </p>
      <button @click.stop="addCart(product)">
        <img src="@/assets/icons/car.png" alt />
      </button>
    </fn-data-list>
  </div>
</template>

<script>
export default {
  props: {
    productList: {
      type: Array
    }
  },
  methods: {
    addCart(product) {
      this.$store.dispatch("shopcart/cart_add", {
        product_id: product.id,
        num: 1
      });
      this.$message.success("成功加入购物车");
    },
    goDetail(id) {
      this.$router.push(`/detail/${id}`);
    }
  }
};
</script>

<style lang="scss">
</style>

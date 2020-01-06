<template>
  <div class="orderProduct">
    <fn-data-list :imgUrl="product.cover" v-for="product in list" :key="product.id">
      <div>
        <div class="info">
          <p class="title">{{product.name}}</p>
        </div>
        <p class="price">
          <span>
            ￥
            <b>{{product.price}} x{{product.num}}</b>
          </span>
        </p>
      </div>
      <p>
        <span>共{{product.num}}件</span>
        <fn-icon name="fa-angle-right" color="#999"></fn-icon>
      </p>
    </fn-data-list>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    }
  }
};
</script>

<style lang="scss">
.orderProduct {
  margin-bottom: 20px;
  dl.datalist {
    width: 100%;
    height: 160px;
    dt {
      width: 96px;
      height: 96px;
    }
    dd {
      flex-direction: row;
      align-items: center;
      .info {
        p.title {
          font-size: $fontSize-s;
        }
      }
      p.price {
        color: #333;
        font-size: $fontSize-s;
        span {
          color: #333;
          b {
            color: #333;
            font-weight: 400;
            font-size: $fontSize-s;
          }
        }
      }
      .fa-angle-right {
        margin-left: 20px;
      }
    }
  }
}
</style>

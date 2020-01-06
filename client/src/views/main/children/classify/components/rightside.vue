<template>
  <div class="right">
    <div class="subnav" ref="subnav">
      <fn-tabBar :list="navlist" :activeInd="tabInd" @change="changeTabInd" ref="scrollBar"></fn-tabBar>
      <fn-icon name="fa-filter" :size="12" color="#999999" @click="showPopover=true"></fn-icon>
    </div>
    <fn-bscroll scrollY @bsScroll="bsScroll">
      <div class="right-list">
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
      <span class="loading" v-show="loading">loading...</span>
    </fn-bscroll>
    <fn-pop-over
      :list="filterList"
      :show.sync="showPopover"
      @selectPopOver="sortFilter"
      :top="popTop+'px'"
      right="40px"
    />
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array
    },
    typeInd: {
      type: Number
    }
  },
  data() {
    return {
      tabInd: 0,
      navlist: [{ id: 1, title: "全部" }],
      productList: [],
      type: 1,
      page: 0,
      pageSize: 5,
      loading: false,
      flag: true,
      showPopover: false,
      filterList: [
        { text: "智能排序", sort: { sales: "desc", price: "asc" } },
        { text: "销量从高到低", sort: { sales: "desc", price: "" } },
        { text: "价格从低到高", sort: { price: "asc" } },
        { text: "价格从高到低", sort: { price: "desc" } }
      ],
      sort: {},
      popTop: 0
    };
  },
  watch: {
    menu(newValue) {
      this.setNavlist(newValue, this.typeInd);
    },
    typeInd(newValue) {
      this.setNavlist(this.menu, newValue);
      this.type = this.navlist[0].id;
      this.tabInd = 0;
      this.flag = true;
      this.page = 0;
      this.getProduct();
    }
  },
  methods: {
    changeTabInd(ind, item) {
      this.tabInd = ind;
      this.type = item.id;
      this.page = 0;
      this.flag = true;
      this.getProduct();
    },
    setNavlist(data, ind) {
      this.navlist[0].id = data[ind].id;
      const newArr = data[ind].children;
      this.navlist = [this.navlist[0], ...newArr];
    },
    async getProduct() {
      let { type, page, pageSize, sort } = this;
      const res = await this.$api.classify.classify_products({
        type,
        page,
        pageSize,
        ...sort
      });
      if (page <= 0) {
        this.productList = res.data;
      } else {
        this.productList = [...this.productList, ...res.data];
      }
      this.loading = false;
      if (res.data.length <= 0) this.flag = false;
    },
    async bsScroll(bs) {
      if (this.flag) {
        if (bs.y < bs.maxScrollY) {
          this.loadMore();
        }
      }
    },
    loadMore() {
      console.log("滚到底啦");
      this.loading = true;
      this.page += 1;
      this.getProduct();
    },
    addCart(product) {
      this.$store.dispatch("shopcart/cart_add", {
        product_id: product.id,
        num: 1
      });
      this.$message.success("成功加入购物车");
    },
    sortFilter(item) {
      this.sort = item.sort;
      this.page = 0;
      this.flag = true;
      this.getProduct();
    },
    getPopTop() {
      this.popTop = this.$refs.subnav.offsetTop;
    },
    goDetail(id) {
      this.$router.push(`/detail/${id}`);
    }
  },
  created() {
    this.getProduct();
  }
};
</script>

<style lang="scss">
.right {
  flex: 1;
  overflow: hidden;
}
.subnav {
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  font-size: $fontSize-s;
  @include baseFontStyle;
  color: rgba(0, 0, 0, 1);
  line-height: 55px;
  padding: 0 20px;
  .tabBar {
    flex: 1;
    overflow-x: auto;
    justify-content: flex-start;
    margin-right: 20px;
    li {
      flex-shrink: 0;
      color: #999999;
      font-size: $fontSize-s;
      @include baseFontStyle;
      margin: 0 20px;
      &.active {
        color: #000;
      }
    }
  }
}
.right-list {
  dl {
    @include wh(578px, 303px);
    dt {
      @include wh(186px, 186px);
    }
    dd {
      p.title {
        font-size: $fontSize-m;
      }
      button {
        @include wh(45px, 45px);
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
span.loading {
  line-height: 80px;
  position: absolute;
  bottom: -80px;
}
</style>

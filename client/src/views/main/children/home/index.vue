<template>
  <div class="home">
    <fn-tabBar :list="tabList" @change="changeTabInd" :activeInd="tabInd" v-if="tabBarSticky"></fn-tabBar>
    <fn-skeleton :loading="homeLoading" row-width="100%" :row="1" avatar></fn-skeleton>
    <fn-bscroll @bsScroll="bsScroll" scrollY>
      <fn-search :ipt="false">
        <div class="location" @click="goAddress">
          <fn-icon name="fa-map-marker" color="#999999" :size="16"></fn-icon>
          <div>
            <span>
              送至：
              {{location.address||'请选择位置'}}
            </span>
            <fn-icon name="fa-angle-right" color="#999999" :size="16"></fn-icon>
          </div>
        </div>
        <span @click="goSearch">
          <fn-icon name="fa-search" color="#999999" :size="16"></fn-icon>
        </span>
      </fn-search>
      <carousel class="carousel" :list="bannerList" />
      <navmenu class="navmenu" :list="menuList" />
      <daybuy />
      <fn-tabBar
        :list="tabList"
        @change="changeTabInd"
        ref="tabBar"
        :activeInd="tabInd"
        v-if="!tabBarSticky"
      ></fn-tabBar>
      <tabList :productList="productList" />
      <span class="loading" v-show="loading">loading...</span>
    </fn-bscroll>
  </div>
</template>

<script>
import carousel from "./components/carousel";
import navmenu from "./components/navmenu";
import daybuy from "./components/daybuy";
import tabList from "./components/tabList";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    carousel,
    navmenu,
    daybuy,
    tabList
  },
  data() {
    return {
      homeLoading: true,
      tabInd: 0,
      tabBarTop: 0,
      tabBarSticky: false,
      loading: false,
      flag: true,
      tabList: [],
      menuList: [],
      bannerList: [],
      fetchParams: {
        type: 1,
        page: 0,
        pageSize: 4
      },
      productList: [
        {
          cover:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1475257122,4172797104&fm=26&gp=0.jpg"
        }
      ]
    };
  },
  computed: {
    ...mapState("user", ["location"])
  },
  watch: {
    fetchParams: {
      handler: "getProducts",
      deep: true,
      immediate: true
    }
  },
  methods: {
    async changeTabInd(index, item) {
      console.log("tab");
      this.tabInd = index;
      this.fetchParams.type = item.id;
      this.fetchParams.page = 0;
      this.flag = true;
    },
    async getProducts() {
      const { type, page, pageSize } = this.fetchParams;
      const res = await this.$api.home.home_products({ type, page, pageSize });
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
        if (bs.y + 80 < bs.maxScrollY) {
          this.loadMore();
        }
      }
      if (bs.y < -this.tabBarTop) {
        this.tabBarSticky = true;
        if (this.fetchParams.page === 0) {
          // console.log(bs, "切换了分类");
        }
      } else {
        this.tabBarSticky = false;
      }
    },
    loadMore() {
      console.log("滚到底啦");
      this.loading = true;
      this.fetchParams.page += 1;
    },
    getTabBarTop() {
      const rect = this.$refs.tabBar.$el.getBoundingClientRect();
      this.tabBarTop = rect.top;
    },
    goSearch() {
      this.$router.push("/search");
    },
    goAddress() {
      this.$router.push("/address");
    },
    async init() {
      const banner = await this.$api.home.getCarousel();
      this.bannerList = banner.data;
      const menu = await this.$api.home.getNavigator();
      this.menuList = menu.data;
      const tab = await this.$api.home.home_classify();
      this.tabList = tab.data;
      this.homeLoading = false;
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.getTabBarTop();
  }
};
</script>

<style lang="scss">
.home {
  width: 100vw;
  @include flexColumn;
  .search {
    .location {
      display: flex;
      align-items: center;
      & > div {
        display: flex;
      }
      span {
        @include wh(580px, 30px);
        font-size: 24px;
        @include baseFontStyle;
        color: rgba(153, 153, 153, 1);
        line-height: 30px;
        padding-left: 10px;
        @include ellipsis;
      }
    }
  }
  .carousel {
    @include wh(750px, 308px);
    margin-bottom: 20px;
  }
  .tabBar {
    @include wh(750px, 95px);
    font-size: $fontSize-m;
    @include baseFontStyle;
    color: #4a4a4a;
    z-index: 100;
    li.active {
      color: #fe3113;
      font-size: $fontSize-sl;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
    }
  }
  span.loading {
    line-height: 80px;
    position: absolute;
    bottom: -80px;
  }
  .fn-skeleton {
    height: 308px;
  }
}
</style>

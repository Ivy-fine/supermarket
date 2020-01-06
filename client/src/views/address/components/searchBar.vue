<template>
  <div class="searchBar" ref="searchBar">
    <select>
      <option>北京</option>
      <option>上海</option>
    </select>
    <div class="ipt">
      <fn-icon name="fa-search" color="#999999" :size="16"></fn-icon>
      <input type="text" v-debounce="keyword" />
    </div>
    <div class="search-content" v-show="keyword.length>1" :style="{top:contentTop}">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="setLocation(item)">
          <span>{{item.name}}</span>
          <p>{{item.district}} {{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import location from "@/utils/location";
export default {
  data() {
    return {
      keyword: "",
      list: [],
      contentTop: 0
    };
  },
  watch: {
    keyword(newValue) {
      location.search(newValue).then(res => {
        this.list = res.tips;
      });
    }
  },
  methods: {
    getContentTop() {
      const rect = this.$refs.searchBar.getBoundingClientRect();
      this.contentTop = rect.height + "px";
      // console.log(this.contentTop);
    },
    setLocation(item) {
      this.$store.commit("user/SET_LOCATION", {
        address: item.district + item.address + item.name,
        position: { ...item.location }
      });
      this.$root.$emit("selectAddress", item);
      if (this.$route.params.edit) {
        const redirect = this.$route.query.redirect;
        this.$router.push({
          name: "editAddress",
          params: { getAddress: true },
          query: { redirect }
        });
      } else {
        this.$router.back();
      }
    }
  },
  mounted() {
    this.getContentTop();
  }
};
</script>

<style lang="scss">
.searchBar {
  @include wh(100%, 98px);
  padding: 0 16px;
  display: flex;
  @include flexAJ(center, space-between);
  background: #fff;
  margin-bottom: 22px;
  position: relative;
  select {
    margin-right: 40px;
    color: #000;
    border: none;
    outline: none;
  }
  .ipt {
    flex: 1;
    height: 64px;
    background: rgba(246, 246, 246, 1);
    border-radius: 32px;
    display: flex;
    padding: 0 30px;
    @include flexAJ(center, space-around);
    input {
      flex: 1;
      padding-left: 30px;
      background: none;
      border: none;
    }
  }
}
.search-content {
  @include wh(100vw, auto);
  background: #f8f8f8;
  position: absolute;
  left: 0;
  z-index: 100;
  ul {
    li {
      min-height: 120px;
      padding-left: 20px;
      line-height: 60px;
      font-size: 28px;
      border-bottom: 1px solid #eee;
      p {
        color: #8f8f8f;
      }
    }
  }
}
</style>

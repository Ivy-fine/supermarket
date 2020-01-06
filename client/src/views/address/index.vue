<template>
  <div class="address">
    <searchBar />
    <div class="getLocation" @click="getLocation">定位到当前位置</div>
    <fn-bscroll class="list-wrap" scrollY>
      <addressList v-if="token" />
    </fn-bscroll>
    <button @click="editAddress" class="add">新增地址</button>
    <fn-pop-up :show.sync="show" title="选择地址">
      <div class="list">
        <ul>
          <li v-for="(item,index) in list" :key="index" @click="setLocation(item)">
            <span>{{item.name}}</span>
            <p>{{item.district}} {{item.address}}</p>
          </li>
        </ul>
      </div>
    </fn-pop-up>
  </div>
</template>

<script>
import location from "@/utils/location.js";
import searchBar from "./components/searchBar";
import addressList from "./components/addressList";
import { mapState } from "vuex";
export default {
  name: "Address",
  components: { searchBar, addressList },
  data() {
    return {
      show: false,
      list: []
    };
  },
  computed: {
    ...mapState("user", ["token"])
  },
  methods: {
    getLocation() {
      this.$loading.show();
      location
        .geolocation({
          extensions: "all"
        })
        .then(res => {
          this.list = res.pois;
          this.$loading.hide();
          this.show = true;
        })
        .catch(() => {
          this.$loading.hide();
          this.$message.error("定位失败，请手动选择");
        });
    },
    editAddress() {
      const redirect = this.$route.query.redirect;
      this.$router.push({ path: "/editAddress", query: { redirect } });
    },
    setLocation(item) {
      this.$store.commit("user/SET_LOCATION", {
        address: item.address + item.name,
        position: { ...item.location }
      });
      if (this.$route.params.edit) {
        this.$router.push({
          name: "editAddress",
          params: { getAddress: true }
        });
      } else {
        this.$router.back();
      }
    }
  }
};
</script>

<style lang="scss">
.address {
  width: 100vw;
  height: 100vh;
  background: #f8f8f8;
  @include flexColumn;
  .popup {
    .list {
      flex: 1;
      overflow-y: auto;
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
  }
}
.getLocation {
  @include wh(100%, 70px);
  background: rgba(255, 255, 255, 1);
  padding-left: 21px;
  padding-top: 19px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.add {
  width: 750px;
  height: 85px;
  background: rgba(255, 255, 255, 1);
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 50, 50, 1);
  margin-bottom: 0;
}
.list-wrap {
  flex: 1;
}
</style>

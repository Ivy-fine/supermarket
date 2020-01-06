<template>
  <div class="address-list">
    <h3>历史记录</h3>
    <ul>
      <li v-for="item in addressList" :key="item.id">
        <span @click="select(item)">
          <fn-icon
            :name="selectedAddId==item.id?'fa-check-circle-o':'fa-circle-thin'"
            color="#767676"
            :size="16"
          ></fn-icon>
        </span>
        <div>
          <h4>{{item.name}}</h4>
          <p>{{item.telephone}}</p>
          <p>{{item.address+item.detail}}</p>
        </div>
        <fn-icon name="fa-pencil-square-o" color="#767676" :size="16" @click="goEdit(item)"></fn-icon>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      selectedAddId: this.$storage.getItem("selectedAddId") * 1 || -1
    };
  },
  computed: {
    ...mapState("user", ["addressList"])
  },
  methods: {
    select(item) {
      if (this.selectedAddId === item.id) {
        this.selectedAddId = -1;
        this.$storage.setItem("selectedAddId", -1);
      } else {
        this.selectedAddId = item.id;
        this.$storage.setItem("selectedAddId", item.id);
        this.$store.commit("user/SET_LOCATION", { address: item.address });
        const path = this.$route.query.redirect || "/home";
        this.$router.push(path);
      }
    },
    address_list() {
      this.$store.dispatch("user/address_list");
    },
    goEdit(item) {
      this.$router.push({
        name: "editAddress",
        params: { ...item, editAddress: true }
      });
    }
  },
  created() {
    this.address_list();
  }
};
</script>

<style lang="scss">
.address-list {
  margin-top: 21px;
  flex: 1;
  h3 {
    font-size: $fontSize-s;
    padding: 21px;
    @include baseFontStyle;
    color: rgba(0, 0, 0, 1);
    line-height: 33px;
  }
  ul {
    background: #fff;
    li {
      min-height: 180px;
      display: flex;
      @include flexAJ(center, space-between);
      padding: 0 21px;
      border-bottom: 1px solid #f8f8f8;
      span {
        @include wh(40px, 40px);
        margin-right: 21px;
      }
      & > div {
        flex: 1;
        h4 {
          font-size: $fontSize-l;
          @include baseFontStyle;
        }
        p {
          font-size: $fontSize-m;
          color: #767676;
        }
      }
      .fa-pencil-square-o {
        align-self: flex-start;
        margin-top: 21px;
      }
    }
  }
}
</style>

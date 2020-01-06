<template>
  <div class="orderAddress">
    <div class="addressInfo" v-show="!editing">
      <div>
        <p>{{addressInfo.name}} {{addressInfo.telephone}}</p>
        <p class="send">送至：{{addressInfo.address+addressInfo.detail||"请选择收货地址"}}</p>
      </div>
      <fn-icon name="fa-pencil-square-o" color="#767676" :size="20" @click="editAddress"></fn-icon>
    </div>
    <fn-form :model="form" :rules="rules" ref="addForm" v-show="!addressInfo||editing">
      <fn-form-item label="联系人" v-model="form.name" placeholder="请输入联系人"></fn-form-item>
      <fn-form-item label="手机号" v-model="form.telephone" placeholder="请输入手机号"></fn-form-item>
      <fn-form-item label="地址" readonly v-model="form.address" class="readOnly"></fn-form-item>
      <fn-form-item label="详细地址" v-model="form.detail" placeholder="请输入详细地址">
        <fn-icon name="fa-angle-double-up" color="#767676" :size="20" @click="saveAddress"></fn-icon>
      </fn-form-item>
    </fn-form>
  </div>
</template>

<script>
export default {
  props: {
    addressInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      editing: false,
      form: {
        name: "",
        telephone: "",
        address: "",
        detail: ""
      },
      rules: {
        telephone: [
          { required: true, message: "请输入手机号" },
          { type: "phone", message: "手机号格式不正确" }
        ]
      }
    };
  },
  methods: {
    editAddress() {
      if (Object.keys(this.addressInfo).length <= 0) {
        this.$router.push({ path: "/address", query: { redirect: "/order" } });
      }
      this.editing = true;
      const { name, telephone, address, detail } = this.addressInfo;
      this.form = {
        name,
        telephone,
        address,
        detail
      };
    },
    saveAddress() {
      this.$refs.addForm
        .validate()
        .then(() => {
          let i = 0;
          for (let key in this.form) {
            if (this.form[key] === this.addressInfo[key]) {
              i++;
            }
          }
          if (i === 4) {
            console.log("无修改");
            this.editing = false;
          } else {
            this.$api.user
              .editAdd({ ...this.form, id: this.addressInfo.id })
              .then(res => {
                if (res.code === 1) {
                  this.editing = false;
                  console.log(res);
                  this.$store.dispatch("user/address_list");
                }
              });
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style lang="scss">
.orderAddress {
  .addressInfo {
    width: 100%;
    height: 140px;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    background: #fff;
    & > div {
      width: 630px;
      p {
        @include ellipsis;
        font-size: $fontSize-sl;
        line-height: 50px;
        &.send {
          color: #999999;
          font-size: $fontSize-m;
        }
      }
    }
  }
  .form {
    @include wh(100%, 367px);
    background: rgba(255, 255, 255, 1);
    @include flexColumn;
    margin-bottom: 72px;
    .form-item {
      flex: 1;
      border-bottom: 1px solid #eee;
      label {
        width: 179px;
      }
      input {
        padding-right: 20px;
      }
      .fa-angle-right {
        justify-self: flex-end;
      }
    }
  }
}
</style>

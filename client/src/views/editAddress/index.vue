<template>
  <div class="edit">
    <fn-form :model="form" :rules="rules" ref="addForm">
      <fn-form-item label="联系人" v-model="form.name" placeholder="请输入联系人"></fn-form-item>
      <fn-form-item label="手机号" v-model="form.telephone" placeholder="请输入手机号"></fn-form-item>
      <fn-form-item
        label="地址"
        readonly
        @click="toSelectAddress"
        v-model="form.address"
        placeholder="选择小区、街道、大厦"
      >
        <fn-icon name="fa-angle-right" color="#999999" :size="16"></fn-icon>
      </fn-form-item>
      <fn-form-item label="详细地址" v-model="form.detail" placeholder="请输入详细地址"></fn-form-item>
    </fn-form>
    <button @click="submit">完成</button>
    <button @click="remove" v-show="editId!==-1">删除地址</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      editId: -1,
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
  computed: {
    ...mapState("user", ["info", "location"])
  },
  methods: {
    submit() {
      if (this.$route.params.editAddress) {
        this.$refs.addForm
          .validate()
          .then(res => {
            this.$api.user
              .editAdd({ ...this.form, id: this.editId })
              .then(res => {
                if (res.code === 1) {
                  const redirect = this.$route.query.redirect;
                  this.$router.push({ path: "/address", query: { redirect } });
                }
              });
          })
          .catch(e => {
            this.$message.error(e);
          });
      } else {
        this.$refs.addForm
          .validate()
          .then(res => {
            this.$api.user
              .addAdd({ ...this.form, user_id: this.info.id })
              .then(res => {
                if (res.code === 1) {
                  const redirect = this.$route.query.redirect;
                  if (redirect === "/order") {
                    this.$$router.push("/order");
                  }
                  this.$router.push({ path: "/address", query: { redirect } });
                }
              });
          })
          .catch(e => {
            this.$message.error(e);
          });
      }
    },
    remove() {
      this.$api.user.delAdd({ id: this.editId }).then(res => {
        if (res.code === 1) {
          this.$router.back();
        }
      });
    },
    toSelectAddress() {
      const redirect = this.$route.query.redirect;
      this.$router.push({
        name: "selectAddress",
        params: { edit: true },
        query: { redirect }
      });
      // this.$storage.setItem("editing", this.form);
    },
    getLocation() {
      // if (this.$route.params.getAddress) {
      // this.form.address = this.location.address;
      // const { name, telephone, detail } = this.$storage.getItem("editing");
      // this.form = { ...this.form, name, telephone, detail };
      // }
      this.$root.$on("selectAddress", location => {
        this.form.address = this.location.address;
      });
    },
    getInfo() {
      if (this.$route.params.editAddress) {
        const { name, telephone, address, detail, id } = this.$route.params;
        this.editId = id;
        this.form = {
          name,
          telephone,
          address,
          detail
        };
      }
    }
  },
  created() {
    this.getLocation();
    // console.log("created", this.$route.meta.keepAlive);
    this.getInfo();
  },
  beforeRouteEnter(to, from, next) {
    to.meta.keepAlive = true;
    next();
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/selectAddress") {
      from.meta.keepAlive = true;
      next();
    } else {
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (
          this.$vnode.parent &&
          this.$vnode.parent.componentInstance &&
          this.$vnode.parent.componentInstance.cache
        ) {
          if (this.$vnode.componentOptions) {
            var key =
              this.$vnode.key == null
                ? this.$vnode.componentOptions.Ctor.cid +
                  (this.$vnode.componentOptions.tag
                    ? `::${this.$vnode.componentOptions.tag}`
                    : "")
                : this.$vnode.key;
            var cache = this.$vnode.parent.componentInstance.cache;
            var keys = this.$vnode.parent.componentInstance.keys;
            if (cache[key]) {
              if (keys.length) {
                var index = keys.indexOf(key);
                if (index > -1) {
                  keys.splice(index, 1);
                }
              }
              delete cache[key];
            }
          }
        }
      }
      this.$destroy();
      from.meta.keepAlive = false;
    }
    next();
  }
};
</script>

<style lang="scss">
.edit {
  @include wh(100%, 100%);
  background: #f8f8f8;
}
.form {
  @include wh(100%, 367px);
  background: rgba(255, 255, 255, 1);
  padding: 0 20px;
  @include flexColumn;
  margin-bottom: 72px;
  .form-item {
    flex: 1;
    border-bottom: 1px solid #eee;
    label {
      color: #797979;
      width: 179px;
    }
    input {
      border: none;
      padding-right: 20px;
      &::placeholder {
        color: #bebebe;
      }
      &[readonly] {
        background: none;
      }
    }
    .fa-angle-right {
      justify-self: flex-end;
    }
  }
}
button {
  width: 100%;
  height: 88px;
  background: rgba(255, 50, 50, 1);
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 40px;
}
</style>

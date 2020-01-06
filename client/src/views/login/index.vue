<template>
  <div class="login">
    <img src="https://img.dmallcdn.com/common/e2767579-05b5-4b08-87b1-12d4fc62d59f_750H" alt />
    <fn-form :model="loginForm" :rules="rules" ref="loginForm">
      <fn-form-item type="text" v-model="loginForm.phone" placeholder="请输入您的手机号">
        <button @click="send_msg_code" :disabled="disabled" v-if="downTime === 0">获取验证码</button>
        <button disabled v-else>{{ downTime + "秒后重新获取" }}</button>
      </fn-form-item>
      <fn-form-item type="text" v-model="loginForm.code" placeholder="请输入验证码"></fn-form-item>
    </fn-form>
    <button @click="login" class="loginBtn">确定</button>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        phone: "",
        code: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号" },
          {
            type: "phone",
            message: "手机号格式不正确"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码"
          }
        ]
      },
      downTime: 0
    };
  },
  computed: {
    disabled() {
      let reg = /^(13[0-9]|14[5|7]|15[0-9]|18[0-9])\d{8}$/;
      return !reg.test(this.loginForm.phone);
    }
  },
  methods: {
    async send_msg_code() {
      await this.$api.user.send_msg_code({ phone: this.loginForm.phone });
      this.downTime = 20;
      this.setInterval = setInterval(() => {
        this.downTime -= 1;
        if (this.downTime === 0) {
          clearInterval(this.setInterval);
        }
      }, 1000);
    },
    async login() {
      const res = await this.$refs.loginForm.validate();
      const { code, phone } = this.loginForm;
      await this.$store.dispatch("user/login", {
        phone,
        msg_code: code
      });
      const path = this.$route.query.redirect || "/home";
      this.$router.replace(path);
    }
  }
};
</script>

<style lang="scss">
.login {
  @include wh(100%, 100%);
  background: #f6f6f6;
  img {
    @include wh(750px, 350px);
  }
  .form {
    margin: 10px 0;
    .form-item {
      @include wh(750px, 120px);
      background: #fff;
      padding: 10px;
      @include flexAJ(center, space-between);
      border-bottom: 1px solid #f6f6f6;
      input {
        border: none;
        line-height: 120px;
        flex: 1;
      }
      button {
        @include wh(188px, 70px);
        border: 2px solid #ff712b;
        color: #ff712b;
        border-radius: 8px;
        background: none;
        &:disabled {
          border: 2px solid #ccc;
          color: #ccc;
        }
      }
    }
  }
  .loginBtn {
    @include wh(730px, 78px);
    background: #ff712b;
    padding-top: 10px;
    padding-bottom: 10px;
    color: #fff;
    border-radius: 4px;
    font-size: $fontSize-m;
    margin: 0 10px;
  }
}
</style>

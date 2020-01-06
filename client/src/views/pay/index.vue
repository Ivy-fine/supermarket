<template>
  <div class="pay">
    请选择支付方式
    <select v-model="payWay" @change="change">
      <option value="0">支付宝</option>
      <option value="1">微信</option>
    </select>
    <fn-dialog :show.sync="show" @sure="finish">确认支付吗</fn-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payWay: "",
      timer: null,
      show: false
    };
  },
  methods: {
    change() {
      console.log(this.payWay);
      console.log(window.navigator.userAgent);
      this.show = true;
    },
    finish() {
      this.timer = setTimeout(() => {
        this.$message.success("支付成功");
        this.$router.push("/mine");
      }, 3000);
    }
  },
  destoryed() {
    this.timer = null;
  }
};
</script>

<style>
</style>

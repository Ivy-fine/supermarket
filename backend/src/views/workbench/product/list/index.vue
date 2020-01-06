<template>
  <div>
    <el-button type="primary" @click="toAdd">添加商品</el-button>
    <data-table :list="data" />
  </div>
</template>

<script>
import DataTable from "./components/table";
export default {
  components: {
    DataTable
  },
  data() {
    return {
      page: 0,
      pageSize: 5,
      data: []
    };
  },
  methods: {
    async get_products() {
      const { page, pageSize } = this;
      const res = await this.$api.product.list({ page, pageSize });
      this.data = res.data;
    },
    toAdd() {
      this.$router.push("/product/add");
    }
  },
  created() {
    this.get_products();
  }
};
</script>

<style lang="scss">
.el-button {
  margin-bottom: 20px;
}
</style>

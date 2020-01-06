<template>
  <div class="home">
    <add-dialog :page="page" :pageSize="pageSize" />
    <data-row />
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      :pageSize="pageSize"
      @current-change="change"
    />
  </div>
</template>

<script>
import AddDialog from "./components/addDialog";
import DataRow from "./components/dataRow";
import { mapState } from "vuex";
export default {
  components: {
    AddDialog,
    DataRow
  },
  data() {
    return {
      page: 0,
      pageSize: 8
    };
  },
  computed: {
    ...mapState("home", ["count"])
  },
  methods: {
    get_carousel() {
      const { page, pageSize } = this;
      this.$store.dispatch("home/carousel_list", { page, pageSize });
    },
    change(page) {
      this.page = page - 1;
      this.get_carousel();
    }
  },
  created() {
    this.get_carousel();
  }
};
</script>

<style lang="scss">
.el-pagination {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%);
}
</style>

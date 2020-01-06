<template>
  <el-table ref="filterTable" :data="tableData" style="width: 100%">
    <el-table-column prop="price" label="价格" sortable width="100" column-key="price"></el-table-column>
    <el-table-column prop="name" label="名称" width="180" column-key="name"></el-table-column>
    <el-table-column prop="price" label="价格" sortable width="180" column-key="price"></el-table-column>
    <el-table-column prop="price" label="价格" sortable width="180" column-key="price"></el-table-column>
    <el-table-column prop="price" label="价格" sortable width="180" column-key="price"></el-table-column>
    <el-table-column
      prop="statu"
      label="状态"
      width="100"
      :filters="[{ text: '上架', value: '1' }, { text: '下架', value: '0' },{text:'库存不足',value:'2'}]"
      :filter-method="filterStatu"
      filter-placement="bottom-end"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.statu === '1' ? 'primary' : 'success'"
          disable-transitions
        >{{scope.row.statu}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    }
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          tag: "公司"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          tag: "家"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          tag: "公司"
        }
      ]
    };
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterStatu(value, row) {
      return row.statu === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  },
  created() {
    this.tableData = this.list;
  }
};
</script>

<style>
</style>

<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="item in carousel" :key="item.id">
      <div class="grid-content bg-purple">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.imgUrl" class="image" />
          <div style="padding: 14px;">
            <span>{{ item.title }}</span>
            <div class="bottom clearfix">
              <p class="time">起：{{ item.startTime }}</p>
              <p class="time">止：{{ item.endTime }}</p>
              <p class="time">{{ item.link }}</p>
            </div>
          </div>
          <b class="statu" :class="{end:item.statu==='0'}">{{item.statu==='1'?"进行中":"已结束"}}</b>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DataRow",
  computed: {
    ...mapState("home", ["carousel"])
  }
};
</script>

<style lang="scss">
.el-card {
  position: relative;
}
b.statu {
  width: 50px;
  height: 50px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  border-radius: 50%;
  border: 1px solid darkcyan;
  color: darkcyan;
  line-height: 50px;
  text-align: center;
  &.end {
    color: #999;
    border-color: #999;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  margin-bottom: 20px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  p {
    font-size: 13px;
    color: #999;
    margin-bottom: 10px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 180px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

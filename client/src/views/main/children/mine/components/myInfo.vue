<template>
  <div class="mine-info">
    <div class="nickname">
      <h3>{{info.phone}}</h3>
      <p>开启美好的一天~</p>
    </div>
    <div class="avatar">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573272863461&di=561848c7355a388e958a9a992c8bbdb6&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201504%2F07%2F20150407H4809_fzN5t.thumb.700_0.jpeg"
        alt
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  }
};
</script>

<style lang="scss">
.mine-info {
  height: 264px;
  background: rgba(254, 49, 19, 1);
  box-shadow: 0px 1px 1px 0px rgba(255, 64, 54, 0.2);
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  padding-top: 58px;
  .nickname {
    color: #fff;
    h3 {
      font-size: 40px;
      color: #fff;
      line-height: 56px;
    }
  }
  .avatar {
    width: 84px;
    height: 90px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

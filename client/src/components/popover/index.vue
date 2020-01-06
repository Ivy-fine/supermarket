<template>
  <transition leave-active-class="animated fadeOut" enter-active-class="animated fadeIn">
    <div class="popover-wrap" @click="hide" v-show="show">
      <ul class="popover-list" :style="{top,right}">
        <li v-for="(item,index) in list" :key="index" @click="handleClick(index,item)">
          <span :class="{active:ind===index}">{{item.text}}</span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  name: "PopOver",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array
    },
    top: {
      type: String
    },
    right: {
      type: String
    }
  },
  data() {
    return {
      ind: 0
    };
  },
  methods: {
    hide() {
      this.$emit("update:show", false);
    },
    handleClick(index, item) {
      this.ind = index;
      this.$emit("selectPopOver", item);
    }
  }
};
</script>

<style lang="scss">
.popover-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.3);
  .popover-list {
    position: absolute;
    width: 280px;
    background: #fff;
    border-radius: 10px;
    padding-left: 2px;
    li {
      line-height: 88px;
      span {
        padding-left: 40px;
        &.active {
          border-left: 4px solid #ff6e23;
        }
      }
    }
  }
}
</style>

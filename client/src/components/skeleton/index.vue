<template>
  <div class="fn-skeleton" v-if="loading">
    <div
      v-if="avatar"
      :class="{
        'fn-skeleton-avatar': true,
        'fn-skeleton-avatar-large': avatarSize === 'lg',
        'fn-skeleton-avatar-small': avatarSize === 'sm',
      }"
    ></div>
    <div class="fn-skeleton-content">
      <h4 v-if="title" class="fn-skeleton-title" :style="{ width: getTitleWidth() }" />
      <div
        v-for="index in row"
        class="fn-skeleton-row"
        :style="{width: index === row ? '60%' : getRowWidth(index - 1)}"
        :key="index"
      ></div>
    </div>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>
<script>
const DEFUALT_TITLE_WIDTH = "40%";
const DEFUALT_WIDTH = "100%";
export default {
  name: "Skeleton",
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    avatar: {
      type: Boolean,
      default: false
    },
    row: {
      type: Number,
      default: 3
    },
    title: {
      type: Boolean,
      default: false
    },
    titleWidth: {
      type: [Number, String],
      default: DEFUALT_TITLE_WIDTH
    },
    rowWidth: {
      type: [Number, String, Array],
      default: DEFUALT_WIDTH
    },
    avatarSize: {
      type: String,
      default: "fn"
    }
  },
  methods: {
    isNumber(n) {
      return typeof n === "number";
    },
    getRowWidth(index) {
      const { rowWidth, isNumber } = this;
      if (rowWidth && Array.isArray(rowWidth)) {
        return isNumber(rowWidth[index])
          ? `${rowWidth[index]}%`
          : rowWidth[index];
      } else if (rowWidth) {
        return isNumber(rowWidth) ? `${rowWidth}%` : rowWidth;
      }
      return DEFUALT_WIDTH;
    },
    getTitleWidth() {
      const { titleWidth, isNumber } = this;
      if (titleWidth) {
        return isNumber(titleWidth) ? `${titleWidth}%` : titleWidth;
      }
      return DEFUALT_TITLE_WIDTH;
    }
  }
};
</script>

<style lang="scss">
@mixin placeHolder() {
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: linear-gradient(to right, #f3f3f6 8%, #f8faff 18%, #f3f3f6 33%);
  background-size: 1000px 104px;
}

.fn-skeleton {
  box-sizing: border-box;
  display: flex;

  .fn-skeleton-avatar {
    width: 80px;
    height: 80px;
    margin-right: 32px;
    border-radius: 50%;
    @include placeHolder;

    &.fn-skeleton-avatar-large {
      width: 96px;
      height: 96px;
    }

    &.fn-skeleton-avatar-small {
      width: 64px;
      height: 64px;
    }
  }

  .fn-skeleton-content {
    flex: 1;
  }

  .fn-skeleton-title,
  .fn-skeleton-row {
    box-sizing: border-box;
    height: 32px;
    margin-bottom: 24px;
    border: 0;
    border-radius: 0;
    @include placeHolder;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}
</style>

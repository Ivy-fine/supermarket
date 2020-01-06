<template>
  <svg :style="{ width: size + 'px', height: size + 'px' }">
    <use :xlink:href="`#${name}`" />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      default: ""
    },
    size: {
      type: Number,
      default: 32
    },
    color: {
      type: String,
      default: ""
    }
  }
};
</script>

<style></style>

<template>
  <i
    :class="`fa ${name}`"
    aria-hidden="true"
    :style="{ fontSize: size + 'px', color: color }"
    @click="$emit('click')"
  ></i>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: { type: String },
    size: { type: Number, default: 20 },
    color: { type: String, default: "#000" }
  }
};
</script>

<style></style>

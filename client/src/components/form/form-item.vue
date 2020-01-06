<template>
  <div class="form-item" @click="$emit('click')">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="val"
      :readonly="readonly"
    />
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "FormItem",
  props: {
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  inject: ["form"],
  data() {
    return { val: "" };
  },
  computed: {},
  methods: {},
  watch: {
    val(newValue) {
      this.$emit("input", newValue);
    },
    value(newValue) {
      this.val = newValue;
    }
  },
  created() {
    this.val = this.value;
  }
};
</script>
<style lang="scss">
.form-item {
  display: flex !important;
  align-items: center;
  label {
    flex-shrink: 0;
  }
  input {
    flex: 1;
    &:disabled {
      display: none;
    }
  }
}
</style>

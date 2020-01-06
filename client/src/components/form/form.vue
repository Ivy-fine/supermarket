<template>
  <div class="form">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Form",
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  data() {
    return {
      regs: {
        email: /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/,
        phone: /^(13[0-9]|14[5|7]|15[0-9]|18[0-9])\d{8}$/
      }
    };
  },
  provide() {
    return {
      form: this
    };
  },
  methods: {
    validate() {
      let msg = {};
      return new Promise((resolve, reject) => {
        const model = this.model;
        for (let key in model) {
          const value = model[key];
          const rules = this.rules[key];
          if (rules) {
            const message = this._checkValue(value, rules);
            if (message.length > 0) {
              msg[key] = message;
            }
          }
        }
        if (Object.keys(msg).length > 0) {
          reject(msg[Object.keys(msg)[0]][0]);
        } else {
          resolve("ok");
        }
      });
    },
    _checkValue(value, rules) {
      let str = [];
      rules.forEach(rule => {
        const { required, message, min, max, regExp, type } = rule;
        if (
          (required && value.length <= 0) ||
          (min && value.length < min) ||
          (max && value.length > max)
        ) {
          str.push(message);
        }
        if (regExp && !regExp.test(value)) {
          str.push(message);
        }
        if (type) {
          const reg = this.regs[type];
          if (!reg.test(value)) {
            str.push(message);
          }
        }
      });
      return str;
    }
  }
};
</script>
<style lang="scss">
.form {
  .form-item {
    border-bottom: 1px solid #eee;
    &.readOnly {
      background: #f6f6f6;
    }
    label {
      color: #797979;
    }
    input {
      border: none;
      padding-right: 20px;
      &::placeholder {
        color: #bebebe;
      }
      &[readonly] {
        color: #767676;
        background: #f6f6f6;
      }
    }
  }
}
</style>

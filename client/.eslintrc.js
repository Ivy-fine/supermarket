module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/require-prop-types": "error",
    "vue/max-attributes-per-line": [
      "error",
      { singleline: 5, multiline: { max: 1 } }
    ],
    quotes: "off", //引号
    semi: "off", //结尾分号
    "space-before-function-paren": "off" //函数括号前空格
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};

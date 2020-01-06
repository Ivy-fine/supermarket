import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./api";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "@/styles/index.scss"; // global css
import "@/styles/animate.css";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/scss/element-variables.scss";
import ElementUI from "element-ui";
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$api = api;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

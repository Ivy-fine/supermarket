import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./api";
import "./utils/rem";
import baseComponents from "./plugins/baseComponents";
import baseDirectives from "./plugins/baseDirectives";
import baseFilters from "./plugins/baseFilters";
import storage from "./utils/storage";
Vue.config.productionTip = false;
Vue.use(baseDirectives);
Vue.use(baseComponents);
Vue.use(baseFilters);
Vue.prototype.$api = api;
Vue.prototype.$storage = storage;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

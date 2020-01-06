import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import home from "./modules/home";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    home
  }
});

export default store;

import api from "@/api";
import cookie from "@/utils/cookie";
export default {
  namespaced: true,
  state: {
    info: {},
    token: cookie.getCookie("adminToken") || ""
  },
  getters: {},
  mutations: {
    SET_TOKEN(state) {
      state.token = cookie.getCookie("adminToken");
    },
    SET_USER_INFO(state, info) {
      state.info = info;
    }
  },
  actions: {
    async login({ commit, dispatch }, params) {
      await api.user.login(params);
      commit("SET_TOKEN");
      dispatch("get_user_info");
    },
    async get_user_info({ commit }) {
      const info = await api.user.info();
      commit("SET_USER_INFO", info.data);
    }
  }
};

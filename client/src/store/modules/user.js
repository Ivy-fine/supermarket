import cookie from "@/utils/cookie";
import storage from "@/utils/storage";
import api from "@/api";

const initState = {
  info: storage.getItem("info") || {},
  token: cookie.getCookie("token") || "",
  location: storage.getItem("location") || {},
  addressList: []
};
export default {
  namespaced: true,
  state: initState,
  getters: {},
  mutations: {
    SET_TOKEN(state) {
      state.token = cookie.getCookie("token");
    },
    SET_USER_INFO(state, info) {
      state.info = info;
    },
    SET_LOCATION(state, location) {
      storage.setItem("location", location, { expires: 1000 * 60 * 60 });
      state.location = location;
    },
    SET_ADDRESS_LIST(state, list) {
      state.addressList = list;
    }
  },
  actions: {
    async login({ commit, dispatch }, params) {
      await api.user.login(params);
      commit("SET_TOKEN");
      dispatch("get_user_info");
    },
    async get_user_info({ commit, dispatch }) {
      const info = await api.user.info();
      storage.setItem("info", info.data);
      commit("SET_USER_INFO", info.data);
      dispatch("address_list");
    },
    async address_list({ state, commit }) {
      const res = await api.user.address_list({ id: state.info.id });
      commit("SET_ADDRESS_LIST", res.data);
    }
  }
};

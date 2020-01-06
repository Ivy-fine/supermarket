import api from "@/api";
export default {
  namespaced: true,
  state: {
    carousel: [],
    count: 0
  },
  getters: {},
  mutations: {
    SET_CAROUSEL(state, list) {
      state.carousel = list;
    },
    SET_COUNT(state, count) {
      state.count = count;
    }
  },
  actions: {
    async carousel_list({ commit }, params) {
      const res = await api.home.carousel(params);
      commit("SET_CAROUSEL", res.data);
      commit("SET_COUNT", res.count);
    }
  }
};

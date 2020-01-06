import api from "@/api";

const initState = {
  cartList: []
};
export default {
  namespaced: true,
  state: initState,
  getters: {
    totalPrice(state) {
      const sum = state.cartList.reduce((prev, next) => {
        return prev + next.num * next.price;
      }, 0);
      return sum.toFixed(2);
    }
  },
  mutations: {
    SET_CARTLIST(state, list) {
      state.cartList = list;
    }
  },
  actions: {
    async cart_list({ commit }) {
      const res = await api.shopcart.cart_list();
      commit("SET_CARTLIST", res.data);
    },
    async cart_add({ dispatch }, params) {
      const res = await api.shopcart.cart_add(params);
      console.log(res);
    },
    async cart_update({ dispatch }, params) {
      const res = await api.shopcart.cart_update(params);
      console.log(res);
    }
  }
};

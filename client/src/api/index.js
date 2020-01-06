import axios from "@/utils/request";

export default {
  user: {
    send_msg_code: params => axios.get("/api/user/send_msg_code", params),
    login: params => axios.post("/api/user/login", params),
    info: () => axios.get("/api/user/info"),
    addAdd: params => axios.post("/api/user/address", params),
    address_list: params => axios.get("/api/user/address_list", params),
    editAdd: params => axios.post("/api/user/edit_address", params),
    delAdd: params => axios.post("/api/user/remove_address", params)
  },
  home: {
    getCarousel: () => axios.get("/api/carousel"),
    getNavigator: () => axios.get("/api/navigator"),
    home_classify: () => axios.get("/api/home_classify"),
    home_products: params => axios.get("/api/home_products", params)
  },
  classify: {
    classify_menu: () => axios.get("/api/classify/menu"),
    classify_products: params => axios.get("/api/classify/products", params)
  },
  shopcart: {
    cart_list: () => axios.get("/api/shopcart/list"),
    cart_add: params => axios.post("/api/shopcart/add", params),
    cart_update: params => axios.post("/api/shopcart/update", params)
  },
  order: {
    order_add: params => axios.post("/api/order/add", params)
  },
  product: {
    detail: params => axios.get("/api/product_detail", params)
  }
};

import axios from "@/utils/request";
export default {
  user: {
    login: params => axios.post("/api/admin/login", params),
    info: () => axios.get("/api/admin/info")
  },
  home: {
    carousel: params => axios.get("/api/carousel/list", params),
    carousel_add: params => axios.post("/api/carousel/add", params)
  },
  product: {
    list: params => axios.get("/api/product/list", params)
  }
};

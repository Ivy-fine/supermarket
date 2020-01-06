import axios from "axios";
import { Message } from "element-ui";
let request = axios.create({
  timeout: 5000
  // baseURL: "/api"
});

// request.interceptors.request.use(
//   config => {
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );
request.interceptors.response.use(
  res => {
    if (res.data.code === 1) {
      return res.data;
    } else if (res.data.code === 0) {
      Message.error(res.data.msg);
    }
    return res;
  },
  err => {
    Message.error("连接出错");
    return Promise.reject(err);
  }
);
export default {
  get: (url, params) => request.get(url, { params }),
  post: (url, params) => request.post(url, params)
};

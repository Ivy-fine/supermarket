import axios from "axios";
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
    }
    return res;
  },
  err => {
    return Promise.reject(err);
  }
);
export default {
  get: (url, params) => request.get(url, { params }),
  post: (url, params) => request.post(url, params)
};

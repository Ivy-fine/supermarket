import AMap from "AMap";
const geolocation = (options = {}) => {
  return new Promise((resolve, reject) => {
    AMap.plugin("AMap.Geolocation", function() {
      let geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        ...options
      });
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", resolve);
      AMap.event.addListener(geolocation, "error", reject);
    });
  });
};

const search = (keyword, city = "全国") => {
  return new Promise((resolve, reject) => {
    AMap.plugin("AMap.Autocomplete", function() {
      // 实例化Autocomplete
      let autoOptions = {
        // city 限定城市，默认全国
        city: city
      };
      let autoComplete = new AMap.Autocomplete(autoOptions);
      autoComplete.search(keyword, function(status, result) {
        // 搜索成功时，result即是对应的匹配数据
        resolve(result);
      });
    });
  });
};
export default {
  geolocation,
  search
};

const path = require("path");
const isProduction = process.env.NODE_ENV === "development" ? false : true;

// function resolve(dir) {
//   return path.join(__dirname, "src", dir);
// }
module.exports = {
  lintOnSave: true,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProduction ? true : false,
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData:
          '@import "@/assets/scss/_mixin.scss";@import "@/assets/scss/_variables.scss";' // 全局引入
      },
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 28, // 换算的基数
            propList: ["*"]
          })
        ]
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:7001",
        changeOrigin: true
        // pathRewrite: {
        //   "^/api": ""
        // }
      }
    }
  },
  configureWebpack: {
    externals: {
      AMap: "AMap"
    }
  },
  publicPath: "/public/dist"
  // chainWebpack(config) {
  //   config.module.rules.delete("svg");
  //   config.module
  //     .rule("svg-sprite-loader")
  //     .test(/\.svg$/)
  //     .include.add(resolve("assets/svgs"))
  //     .end()
  //     .use("svg-sprite-loader")
  //     .loader("svg-sprite-loader")
  //     .options({ symbolId: "[name]" });
  // }
};

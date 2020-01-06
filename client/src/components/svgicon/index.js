import SvgIcon from "./svgIcon";

export default {
  install(Vue) {
    const requireAll = requireContext => {
      return requireContext.keys().map(requireContext);
    };
    const req = require.context("@/assets/svgs", true, /\.svg$/);
    requireAll(req);
    Vue.component("SvgIcon", SvgIcon);
  }
};

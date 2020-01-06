import LoadingComponent from "./component";

export default {
  createComponent(Vue) {
    const LoadingClass = Vue.extend(LoadingComponent);
    const Loading = new LoadingClass();
    Loading.$mount();
    document.body.appendChild(Loading.$el);
    return Loading;
  },
  install(Vue) {
    Vue.prototype.$loading = this.createComponent(Vue);
  }
};

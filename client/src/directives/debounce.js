const debounce = (func, wait = 50) => {
  let timer = 0;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

export default {
  bind() {},
  inserted(el, binding, vnode) {
    el.addEventListener(
      "input",
      debounce(e => {
        console.log("防抖");
        vnode.context[binding.expression] = e.target.value;
      }, 300)
    );
  },
  update(el, binding) {
    el.value = binding.value;
  }
};

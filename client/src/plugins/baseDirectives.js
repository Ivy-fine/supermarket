const files = require.context("@/directives", true, /^\.\/(\w*)\.js$/);

export default Vue => {
  files.keys().forEach(path => {
    const name = path.replace(/(\.\/)(\w*)(\.js)/, "$2");
    if (name !== "index") {
      Vue.directive(name, files(path).default);
    }
  });
};

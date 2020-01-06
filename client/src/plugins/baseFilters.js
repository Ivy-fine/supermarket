const files = require.context("@/filters", true, /^\.\/(\w*)\.js$/);

export default Vue => {
  files.keys().forEach(path => {
    const name = path.replace(/(\.\/)(\w*)(\.js)/, "$2");
    if (name !== "index") {
      Vue.filter(name, files(path).default);
    }
  });
};

const pages = require.context('./', false, /.+\.jsx?$/);

module.exports = pages.keys().reduce((exported, filename) => {
  if (filename !== './index.js') {
    exported[filename.match(/^\.\/(.+)\.jsx?$/)[1]] = pages(filename).default;
  }
  return exported;
}, {});

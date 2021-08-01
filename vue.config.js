module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api/v2": {
        target: "http://121.5.235.28:8888",
        // pathRewrite: {'^/api/v1' : ''}
      },
    },
  },
};

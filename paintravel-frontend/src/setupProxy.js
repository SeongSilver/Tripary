const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://54.149.54.73:5000",
      changeOrigin: true,
    })
  );
};

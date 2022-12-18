const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  console.log("에베베베베")
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};

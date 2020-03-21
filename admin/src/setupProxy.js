const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(createProxyMiddleware("/api", {
        target: "http://localhost:5000/api", //配置你要请求的服务器地址
        pathRewrite: {'^/api': ''},
        changeOrigin: true,
    }))
};
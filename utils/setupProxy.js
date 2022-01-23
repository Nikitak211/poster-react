const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(createProxyMiddleware("/**", { // https://github.com/chimurai/http-proxy-middleware
        target: "http://localhost:7000",
        changeOrigin: true
    }));
    app.use(createProxyMiddleware("/api/auth/**", { // https://github.com/chimurai/http-proxy-middleware
        target: "http://localhost:7000",
        secure: true,
        changeOrigin: true
    }));
    app.use(createProxyMiddleware("/api/authed/**", { // https://github.com/chimurai/http-proxy-middleware
        target: "http://localhost:7000",
        secure: true,
        changeOrigin: true
    }));
};
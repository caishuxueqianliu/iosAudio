const { createProxyMiddleware } = require('http-proxy-middleware');
//跨域代理
module.exports = function(app) {
    // app.use('/api1', createProxyMiddleware({
    //     target: 'http://localhost:4000/',
    //     changeOrigin: true,
    //     pathRewrite: {'^/api1':'/'}
    // }))
    app.use('/api1', createProxyMiddleware({
        target: 'http://106.14.40.150:3333/',
        changeOrigin: true,
        pathRewrite: {'^/api1':'/'}
    }))
    app.use('/api', createProxyMiddleware({
        target: 'http://iosaudit.xuegaogame.com/',
        changeOrigin: true,
        pathRewrite: {'^/api':'/'}
    }))

};


//  "proxy":{
//    "/api":{
//      "target":"http://iosaudit.xuegaogame.com/",
//      "changeOrigin": true,
//      "pathRewrite": {
//        "^/api": ""
//      }
//    }
//  }


const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://blog-webapiweb.herokuapp.comhttps://blog-webapiweb.herokuapp.com',
      secure:false,
      changeOrigin: true
    })
  );
  
};
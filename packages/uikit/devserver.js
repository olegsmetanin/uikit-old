'use strict';

var PORT = 3000

var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('./webpack.config.js'),
    express = require('express'),
    // proxy = require('express-http-proxy'),
    app = express(),
    compiler = webpack(config),
    wdm = webpackDevMiddleware(compiler, { noInfo: true, stats: { chunks: false } }),
    whm = webpackHotMiddleware(compiler, {}),
    ws = express.static('./build');

app.use(wdm);
app.use(whm);
app.use(ws);

// var proxyMiddleware = function (host, restpath) {
//   return proxy(host, {
//     forwardPath: function (req) {
//       return restpath + req.url;
//     }
//   });
// },

// proxyDef = {
//   host: 'http://proxy:port',
//   path: '/rest',
//   restpath: '/rest'
// };

// app.use(proxyDef.restpath, proxyMiddleware(proxyDef.host, proxyDef.path));

app.listen(PORT, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info('==> Listening on port %s. Open http://localhost:%s/ ' +
            'in your browser after build is completed.', PORT, PORT);
        console.info('==> Building...');
    }
});
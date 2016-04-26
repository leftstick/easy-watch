var path = require('path');
require('webpack');

module.exports = function(config) {
    config.set({
        autoWatch: false,
        basePath: __dirname,
        browsers: [
            'PhantomJS'
        ],
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            'test/index.js'
        ],
        preprocessors: {
            './test/index.js': [
                'webpack'
            ]
        },
        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel?presets[]=es2015',
                        exclude: /(node_modules)/
                    }
                ]
            },
            resolve: {
                root: [
                    path.resolve(__dirname, 'test')
                ]
            }
        },
        webpackMiddleware: {
            noInfo: true
        },
        frameworks: [
            'mocha', 'chai'
        ],
        logLevel: config.LOG_INFO,
        plugins: [
            'karma-webpack',
            'karma-mocha',
            'karma-chai',
            'karma-phantomjs-launcher'
        ],
        singleRun: true
    });
};

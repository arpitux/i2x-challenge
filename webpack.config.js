var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: APP_DIR + '/Index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'script.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel-loader',
                query:
                {
                    presets:['react']
                }
            },
        ]
    }
};

module.exports = config;
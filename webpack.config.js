var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');


var WEBPACK_ENV = process.env.WEBPACK_ENV||'dev';
//获取htmlWebpackplugin参数
var getHtmlConfig = function(name){
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        inject : true,
        hash : true,
        chunks : ['common',name]
    }
}

var config = {
    entry : {
        'common' : ['./src/pages/common/index.js'],
        'index' : ['./src/pages/index/index.js'],
        'login' : ['./src/pages/login/index.js'],
    },
    output: {
        path: './dist',
        PublicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals : {
        'jquery': 'window.jQuery'
    },
    module : {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(png|jpg|woff|svg|eot|ttf)\?(.*?)$/, loader: 'url-loader' },
        ],
    },
    resolve : {
      alias : {
          utils    : __dirname + '/src/utils',
          page    : __dirname + '/src/pages',
          service : __dirname + '/src/service',
          image   : __dirname + '/src/images',
      }
    },
    plugins : [
        //独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename:'js/base.js'
        }),
        // 把css单独打包到文件中
        new ExtractTextPlugin("css/[name].css"),

        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};

if ('dev'===WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;
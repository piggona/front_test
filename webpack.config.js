var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');


var WEBPACK_ENV = process.env.WEBPACK_ENV||'dev';
//获取htmlWebpackplugin参数
var getHtmlConfig = function(name){
    return {
        //模板路径
        template : './src/view/' + name + '.html',
        //打包文件路径
        filename : 'view/' + name + '.html',
        inject   : true,
        hash     : true,
        //打包的html中引入的js模块名
        chunks   : ['common',name]
    }
};

var config = {
    entry : {
        'common' : ['./src/pages/common/index.js'],
        'index'  : ['./src/pages/index/index.js'],
        'login'  : ['./src/pages/login/index.js'],
    },
    output: {
        path      : './dist',
        publicPath: '/dist/',
        filename  : 'js/[name].js'
    },
    externals : {
        'jquery': 'window.jQuery'
    },
    module : {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(png|jpg|woff|svg|eot|ttf|gif|jpeg)\??.*$/, loader: "url-loader?limit=100000&name=resource/[name].[ext]" },
            { test: /\.(woff|svg|eot|ttf)\??.*$/, loader: 'style-loader!css-loader'},
        ],
    },
    resolve : {
      alias : {
          utils        : __dirname + '/src/utils',
          pages        : __dirname + '/src/pages',
          service      : __dirname + '/src/service',
          image        : __dirname + '/src/images',
          node_modules : __dirname + '/node_modules',
      }
    },
    plugins : [
        //独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name    : 'common',
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
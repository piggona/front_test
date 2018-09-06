'use strict';
//要使得require在
require('../module.js');
// require('./index.css');
var $$ = require('jquery');
var _patent= require('utils/patent.js');

_patent.request({
    url : 'http://happymmall.com/product/list.do?keyword=1',
    success: function(res){
        console.log(res);
    },
    error: function(err){
        console.log(err);
    }
});
console.log(_patent.getUrlParam('test'));
var html = '<div>{{data}}</div>';
var data = {
    data : 123
};
console.log(_patent.renderHtml(html,data));

// $$('body').html('Hello Index');
// console.log('hello index');

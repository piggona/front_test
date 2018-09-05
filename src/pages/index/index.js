'use strict';

require('../module.js');
require('./index.css');
var $$ = require('jquery');
var _pat= require('utils/patent');

_pat.request({
    url : './test.do',
    success : function(res){
        console.log(res);
    },
    error : function(errMsg){
        console.log(errMsg);
    }
});
// $$('body').html('Hello Index');
// console.log('hello index');

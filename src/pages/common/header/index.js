'use strict';
require('./index.css');

var _patent = require('utils/patent.js');

var header = {
    init : function(){
        this.bindEvent();
    },
    onload : function(){
        var keyword= _patent.getUrlParam('keyword');
        //若url中keyword存在，则回填到搜索框上，此步可以放到searchSubmit中作为post解决方案
        if (keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent : function(){
        var _this = this;
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入提交后，做搜索提交
        $('#search-input').keyup(function(e){
            if(e.keycode === 13){
                _this.searchSubmit();
            }
        });
    },
    //搜索所有的输入,使用id查找，并提交。
    searchSubmit : function(){
        var submit_data = {};
        var keyword = $.trim($('#search-input').val());
        if(keyword){
            // 向data加入keyword
            submit_data['keyword'] = keyword;
        }
        if ($.isEmptyObject(submit_data))
        {
            //如果还没有填
            _patent.goHome();
        }
        else{
            _patent.request({
                //发data到服务器地址
                url : 'http://wanlinke.com',
                data : submit_data,
                success: function(res){
                    if(res.keyword){
                        $('#search-input').val(keyword);
                    }
                    console.log(res);
                },
                error: function(err){
                    console.log(err);
                }
            });
        }
    }
};

header.init();
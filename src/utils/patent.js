'use strict';

var Hogan = require('hogan.js');
var conf = {
    serverHost : '',
};
var _patent = {
    //网络请求
    request : function(param){
        $.ajax({
            type     : param.method || 'get',
            url      : param.url    || '',
            dataType : param.type   || 'json',
            data     : param.data   || '',
            success  : function(res){
                //请求成功
                var _this = this;
                if (0 === res.status){
                    //登录成功，若param的success是function类型就向服务器返回data和msg对象
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                else if(10 === res.status){
                    //还没有登录，则执行登录函数
                    _this.dologin();
                }
                else if(1 ===res.status){
                    //返回错误，向服务器返回错误信息
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error    : function(err){
                //请求失败
                 typeof param.error === 'function' && param.error(err.statusText);
            }

        });
    },
    // 获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    // 获取url参数
    getUrlParam : function(name){
      // happymmall.com/product/list?keyword=XXX&page=1
        var reg    = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html模板
    renderHtml : function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate);
        var result   = template.render(data);
        return result;
    },
    // 成功提示
    successTips : function(msg){
        alert(msg || '操作成功');
    },
    // 错误提示
    errorTips : function(msg){
        alert(msg || '出现错误');
    },
    // 字段的验证，支持非空，手机，邮箱
    validate : function(value,type){
        var value = $.trim(value);
        // 非空验证
        if ('require' === type){
            return !!value;
        }
        // 手机号验证
        if ('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if ('email' === type){
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value);
        }
    },
    // 统一登录处理
    dologin : function(){
        //执行登录页面的redirect
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome : function(){
        window.location.href = './index.html';
    }
};

module.exports = _patent;
'use strict';

var _patent = {
    //网络请求
    request : function(param){
        $ajax({
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
    dologin : function(){
        //执行登录页面的redirect
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    }
};

module.export = _patent;
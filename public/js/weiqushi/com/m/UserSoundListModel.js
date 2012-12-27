/*
 * @des 产品分析用户声音
 * @author hangyongsheng
 * @version 1.0
 */
define(function(require,exports,module){
    var Model = require('./model');
    module.exports = lib.Class('UserSoundListModel',{
        ns:'lib.m',
        extend:Model,
        construct:function(opt){
            this.callsuper(opt);
            this._opt = opt || {};
            this._catchdata = {};//数据缓存
            this._url = this._opt.url || "/api/product/yhsy";
            //this._url = "http://data.i.t.sina.com.cn/microtrend/getpublicpraiseword.php";
        },
        methods:{
            get:function(param,fn){
                //var is_weight = param.is_weight;// ? 1 : 0;
                var _this = this;
                var _key = [param.type,param.from,param.to,param.state,param.limit,param.page,param.pid].join("");
                var cachedData = this._catchdata[_key];
                if(cachedData){
                    fn(_this.formartDate({"param":param,"data":cachedData}),cachedData);
                }else{
                    $.ajax({
                      url: this._url,
                      data: param,
                      success: function(data) {
                          _this._catchdata[_key] = data;
                          fn(_this.formartDate({"param":param,"data":data}),data);
                          //lib.log(JSON.stringify(_this._catchdata[_key]));
                      },
                      error: function(data){
                          fn([],{"code":-1,"msg":"接口请求失败"});
                      },
                      dataType:"jsonp"
                    });
                }
            },
            getUseSign:function(param,fn){
                  $.ajax({
                      url: "/api/product/setuse",
                      data: param,
                      success: function(data) {
                          fn(data);
                      },
                      dataType:"jsonp"
                    });
            },
            formartDate:function(opt) {
                var data = opt.data;
                return data;
            }
       }
});
});
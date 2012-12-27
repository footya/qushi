/*
 * @des 产品分析用户细分
 * @author hangyongsheng
 * @version 1.0
 */
define(function(require,exports,module){
    var Model = require('./model');
    module.exports = lib.Class('UserStackChartModel',{
        ns:'lib.m',
        extend:Model,
        construct:function(opt){
            this.callsuper();
            this._url = opt.url || "/api/product/userarea";
            this._catchdata = {};//数据缓存
        },
        methods:{
            get:function(param,fn){
                //var is_weight = param.is_weight;// ? 1 : 0;
                var _this = this;
                //param.type = param.type || "day";
                var _key = [param.from,param.to,param.is_weight].join("");
                var cachedData = this._catchdata[_key];
                if(cachedData){
                    fn(_this.formartDate({"param":param,"data":cachedData.result}),cachedData);
                }else{
                    $.ajax({
                      url: this._url,
                      data: param,
                      success: function(data){
                          _this._catchdata[_key] = data;
                          fn(_this.formartDate({"param":param,"data":data.result}),data);
                      },
                      error: function(data){
                          fn([],{"code":-1,"msg":"接口请求失败"});
                      },
                      dataType:"jsonp"
                    });
                }
            },
            formartDate:function(opt) {
                var type = "value";
                var data = opt.data;
                var d =  {"categories":[],"series":[]};
                var chart = {"1":"正性","0":"中性","-1":"负性"};
                var s = {};
                for(var i=0,len=data.length;i<len;i++){
                    var item = data[i];
                    d.categories.push(item.key);
                    var all = item[type].all;
                    for(var j=0,jlen = item[type]["data"].length;j<jlen;j++){
                        var jitem = item[type]["data"][j];
                        var value = jitem.value/all*100;
                        var _key  = chart[jitem.key];
                        if(s[_key]){
                            s[_key].push(value);
                        }else{
                            s[_key] = [];
                            s[_key].push(value);
                        }
                    }
                }
                for(var key in s){
                    d.series.push({"name":key,"data":s[key]});
                }
                return d;
            }
       }
});
});
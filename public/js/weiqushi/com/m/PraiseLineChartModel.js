/*
 * @des 产品分析线表图
 * @author hangyongsheng
 * @version 1.0
 */
define(function(require,exports,module){
    var Model = require('./model');
    //var dateFormat = require('../../core/date/format.js');
    module.exports = lib.Class('PraiseLineChartModel',{
        ns:'lib.m',
        extend:Model,
        construct:function(opt){
            this.callsuper(opt);
            this._opt = opt;
            this._url = opt.url;
            this._catchdata = {};//数据缓存
        },
        methods:{
            get:function(param,fn){
                //var is_weight = param.is_weight;// ? 1 : 0;
                var _this = this;
                param.datetype = param.datetype || "day";
                var _key = [param.datetype,param.from,param.to,param.is_weight].join("");
                var cachedData = this._catchdata[_key];
                if(cachedData){
                    fn(_this.formartDate({"param":param,"data":cachedData.result}),cachedData);
                }else{
                    $.ajax({
                      url: this._url,
                      data: param,
                      success: function(data) {
                          _this._catchdata[_key] = data;
                          fn(_this.formartDate({"param":param,"data":data.result}),data);
                          //lib.log(JSON.stringify(_this._catchdata[_key]));
                      },
                      error: function(data){
                          fn([],{"code":-1,"msg":"接口请求失败"});
                      },
                      dataType:"jsonp"
                    });
                }
                
            },
            formartDate:function(opt) {
                var d = [];
                var times = [];
                var type = "value";
                var data = opt.data;
                var chart = this._opt.typetext || {};//对应文字
                var s = {};
                for(var i=0,len=data.length;i<len;i++){
                    var item = data[i];
                    times.push(item.time);
                    for(var j=0,jlen = item[type]["data"].length;j<jlen;j++){
                        var jitem = item[type]["data"][j];
                        var value = parseInt(jitem.value);
                        var _key  = chart[jitem.key] || _key;
                        var time  = i;
                        if(s[_key]){
                            s[_key].push([time,value]);
                        }else{
                            s[_key] = [];
                            s[_key].push([time,value]);
                        }
                    }
                }
                for(var key in s){
                    d.push({"name":key,"data":s[key]});
                }
                //lib.log(JSON.stringify(d));
                return {"times":times,"data":d}//.reverse();
            }
       }
});
});
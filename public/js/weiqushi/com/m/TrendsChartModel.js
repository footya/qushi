/*
 * @des 微博动态
 * @author hangyongsheng
 * @version 1.0
 */
define(function(require,exports,module){
    var Model = require('./model');
    module.exports = lib.Class('TrendsChartModel',{
        ns:'lib.m',
        extend:Model,
        construct:function(opt){
            this.callsuper(opt);
            this._opt = opt || {};
            this._catchdata = {};//数据缓存
            this._url = this._opt.url;
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
                         data = _this.checkDate(data);
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
            // formartDate:function(opt) {
            //     var data = opt.data;
            //     //var mids = {};
            //     var d = {"categories":[],"series":[],"srcdata":{}};
            //         var chart = {"1":"正性","0":"中性","-1":"负性"};
            //         for(var i=0,len=data.length;i<len;i++){
            //             var item = data[i];
            //             d.categories.push(item.time);
            //         }
            //         for(var key in chart){
            //             var oitem = {"name":chart[key],"data":[]}
            //             for(var i=0,len=data.length;i<len;i++){
            //                 var item = data[i];
            //                 var _idata = item.data;
            //                 for(var j = 0,jlen =_idata.length;j<jlen;j++){
            //                     var jitem = _idata[j];
            //                     if(key == jitem["attitude"]){
            //                         oitem.data.push([i,jitem.r]);
            //                         var _skey = [i,jitem.r,chart[key]].join("-");
            //                         d.srcdata[_skey] = jitem;
            //                     }
            //                 }
            //             }
            //             d.series.push(oitem);
            //         }
            //         lib.log(JSON.stringify(d));
            //         return d;
            // }
            //处理排重，避免点的位置重合;
            checkDate:function(data) {
                var _result = data.result;
                for(var i=0,len=_result.length;i<len;i++){
                    var item = _result[i];
                    var _data = item.data;
                    for(var j=0,jlen=_data.length;j<jlen;j++){
                        var jitem = _data[j];
                        for(var m=j+1;m<jlen;m++){
                            var mitem = _data[m];
                            //mitem.r = mitem.r + 0.1;
                            if(jitem.r == mitem.r){
                                mitem.r = mitem.r - 0 + 0.1;
                            }
                        }
                    }
                }
                data.result = _result;
                return data;
            },
            formartDate:function(opt) {
                var d = [];
                var src = {};
                var times = [];
                var type = "value";
                var data = opt.data;
                if(!data){
                    return {};
                }
                var chart = {"1":"正性","0":"中性","-1":"负性"};
                var s = {};
                for(var i=0,len=data.length;i<len;i++){
                    var item = data[i];
                    times.push(item.time);
                    for(var j=0,jlen = item["data"].length;j<jlen;j++){
                        var jitem = item["data"][j];
                        var value = jitem.r-0;
                        var _key  = chart[jitem.attitude];
                        var time  = i;
                        if(s[_key]){
                            s[_key].push([time,value]);
                        }else{
                            s[_key] = [];
                            s[_key].push([time,value]);
                        }
                        var _skey = [i,value,_key].join("-");
                        src[_skey] = jitem;
                    }
                }
                d.push({"name":chart["1"],"data":s[chart["1"]]});
                d.push({"name":chart["-1"],"data":s[chart["-1"]]});
                d.push({"name":chart["0"],"data":s[chart["0"]]});
                return {"categories":times,"series":d,"srcdata":src}//.reverse();
            }
       }
});
});
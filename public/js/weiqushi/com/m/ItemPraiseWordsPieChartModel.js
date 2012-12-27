/*
 * @des 口碑词表饼图
 * @author hangyongsheng
 * @version 1.0
 */
define(function(require,exports,module){
    var Model = require('./model');
    module.exports = lib.Class('PraiseWordsPieChartModel',{
        ns:'lib.m',
        extend:Model,
        construct:function(opt){
            this.callsuper(opt);
            this._opt = opt;
            this._catchdata = {};//数据缓存
        },
        methods:{
            get:function(param,fn){
                //var is_weight = param.is_weight;// ? 1 : 0;
                var _this = this;
                //param.type = param.type || "day";
                var _key = [param.from,param.to,param.type,param.is_weight].join("");
                var cachedData = this._catchdata[_key];
                if(cachedData){
                    fn(_this.formartDate({"param":param,"data":cachedData}),cachedData);
                }else{
                    $.ajax({
                      url: this._opt.url,
                      data: param,
                      success: function(data){
                          _this._catchdata[_key] = data;
                          fn(_this.formartDate({"param":param,"data":data}),data);
                      },
                      error: function(data){
                          fn([],{"code":-1,"msg":"接口请求失败"});
                      },
                      dataType:"jsonp"
                    });
                }
            },
            formartDate:function(opt) {
                var data = opt.data;
                //var type = opt.param.is_weight == 1 ? "weight" : "normal";
                var d = {};
                //for(var key in data){
                if(data.result){
                    d = this._formartItemDate(data.result);
                }
                //}
                return d;
            },
            _formartItemDate:function(data) {
                //var type = type == 1 ? "weight" : "normal";
                var d = [];
                var _data = data.data;
                var _all = data.all;
                for(var i=0,len=_data.length;i<len;i++){
                    var item = _data[i];
                    var value = Math.round((item.value/_all)*100);
                    var key = item.key;
                    if(item.key == 0){
                        key = "中性"
                    }
                    if(item.key == 1){
                        key = "正性"
                    }
                    if(item.key == -1){
                        key = "负性"
                    }
                    d.push([key,value]);
                }
                return d;
            }
       }
});
});
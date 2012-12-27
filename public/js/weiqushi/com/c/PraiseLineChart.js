/*
 * @des 产品分析线表图
 * @author hangyongsheng
 * @version 1.0
 */
define(function(require,exports,module){
    var Controller = require('./controller');
    var Suggest = lib.Class('PraiseLineChart',{
        ns:'lib.c',
        extend:Controller,
        construct:function(opt){
            this.callsuper(opt);
        },
        properties:{
            /*
             *@description C层需要响应的事件列表
             */
            events:{
                "updateChartsView":function(data){
                    data = data || {};
                    this.updateChartsView(data);
                }
            }
        },
        methods:{
            updateChartsView:function (param){
                if(!this._model)
                {
                    return false;
                }
                var _this = this;
                this._model.get(param,function(data,srcdata)
                {
                    if(_this._view)
                    {
                       if(srcdata.code == "10000"){
                            _this._view.updateChartsView(data);
                        }else{
                            _this._view.showWarnInfo(srcdata);
                        }
                    }

                });
            },
            show:function(data){
                alert(data);
            }
        }
    });
    
    module.exports = Suggest;
});
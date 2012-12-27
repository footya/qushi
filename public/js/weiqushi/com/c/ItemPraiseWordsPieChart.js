/*
 * @des 口碑词表饼图
 * @author hangyongsheng
 * @version 1.0
 */
define(function(require,exports,module){
    var Controller = require('./controller');
    var ItemPraiseWordsPieChart = lib.Class('ItemPraiseWordsPieChart',{
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
                updateChartView:function(data){
                    data = data || {};
                    this.updateChartView(data);
                }
            }
        },
        methods:{
            updateChartView:function (param){
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
                            _this._view.updateChartView(data);
                        }else{
                            _this._view.showWarnInfo(srcdata);
                        }
                        
                    }
                        
                });
            }
        }
    });
    module.exports = ItemPraiseWordsPieChart;
});
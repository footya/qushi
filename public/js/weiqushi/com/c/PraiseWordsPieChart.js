/*
 * @des 产品分析top5城市
 * @author hangyongsheng
 * @version 1.0
 */
define(function(require,exports,module){
    var Controller = require('./controller');
    var PraiseWordsPieChart = lib.Class('PraiseWordsPieChart',{
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
                updateYelpChartView:function(data){
                    data = data || {};
                    this.updateYelpChartView(data);
                },
                updateGoodChartView:function(data){
                    data = data || {};
                    this.updateGoodChartView(data);
                },
                updateBadChartView:function(data){
                    data = data || {};
                    this.updateBadChartView(data);
                }
            }
        },
        methods:{
            updateYelpChartView:function (param){
                if(!this._model)
                {
                    return false;
                }
                var _this = this;
                this._model.get(param,function(data)
                {
                    if(_this._view)
                    {
                        _this._view.updateYelpChartView(data);
                    }
                });
            },
            updateGoodChartView:function (param){
                if(!this._model)
                {
                    return false;
                }
                var _this = this;
                this._model.get(param,function(data)
                {
                    if(_this._view)
                    {
                        _this._view.updateGoodChartView(data);
                    }
                });
            },
            updateBadChartView:function (param){
                if(!this._model)
                {
                    return false;
                }
                var _this = this;
                this._model.get(param,function(data)
                {
                    if(_this._view)
                    {
                        _this._view.updateBadChartView(data);
                    }
                });
            }
        }
    });
    
    module.exports = PraiseWordsPieChart;
});
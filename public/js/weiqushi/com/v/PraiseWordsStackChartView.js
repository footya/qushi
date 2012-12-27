/*
 * @des 竞品口碑词表
 * @author hangyongsheng
 * @version 1.0
 */
define(function (require, exports, module) {
    var View      = require('./UserStackChartView');
    module.exports = lib.Class('PraiseWordsStackChartView',{
        ns: 'lib.v',
        extend: View,
        construct: function (opt) {
            this.callsuper(opt);
        },
        methods:{
            //加权影响力操作
            _bindIsWeightCheckbox:function() {
                var _this = this;
                lib._PAGE_EVENT.on('g_praisewordsmanager_for_praisewordscharts',function(){
                    _this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                });
            },
            getParam:function() {
                var _params = {};
                _params["from"] = this._formipt.val().replace(/\-/gi,"");
                _params["to"]   = this._toipt.val().replace(/\-/gi,"");
                _params["is_weight"] = this._weight.val();
                _params["pids"]  = WB.productPids.join(",");
                //[todo]需要当用户选择的时间范围为 92天内（3month），使用日数据进行计算。
                //当用户超过92天，但小于 731天（2year），使用周数据进行计算。 
                //当用户超过731天（2year），提示用户修改时间。
                _params["datetype"] = "day";
                return _params;
            }
        }
    });
});

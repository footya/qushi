/*
 * @des 竞品分析线表图
 * @author hangyongsheng
 * @version 1.0
 */
define(function (require, exports, module) {
    var View       = require('./PraiseLineChartView');
    module.exports = lib.Class('CompetePraiseLineChartView',{
        ns: 'lib.v',
        extend: View,
        construct: function (opt) {
            this.callsuper(opt);
        },
        methods:{
            getParam:function() {
                var _params = {};
                _params["datetype"] = this._timetype.attr("data-value");
                _params["from"] = this._formipt.val().replace(/\-/gi,"");
                _params["to"]   = this._toipt.val().replace(/\-/gi,"");
                _params["is_weight"]   = this._weight.val();
                _params["pids"]  = WB.productPids.join(",");
                return _params;
            }
        }
    });
});

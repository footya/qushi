//产品分析口碑变化线表图
define(function (require, exports, module) {
    lib.job.create('PraiseLineChart', function () {
        var M = require('../m/PraiseLineChartModel');
        var C = require('../c/PraiseLineChart');
        var V = require('../v/PraiseLineChartView');
        var url = lib.config.debug ? "/api/product/kbbh":lib.config.apis[0];
        new C({
            model:new M({url:url,typetext:{"1":"正性","0":"中性","-1":"负性"}}),
            view:new V({actclass:"current"})
        });
    });
    lib.job.add('PraiseLineChart');
});
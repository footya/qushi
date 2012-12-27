//产品分析微博动态图
define(function (require, exports, module) {
    lib.job.create('TrendsChart', function () {
        var M = require('../m/TrendsChartModel');
        var C = require('../c/TrendsChart');
        var V = require('../v/TrendsChartView');
        var url = lib.config.debug ? "/api/product/trends":lib.config.apis[8];
        new C({
            model:new M({url:url}),
            view:new V({actclass:"current"})
        });
    });
    lib.job.add('TrendsChart');
});
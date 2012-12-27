//竞品口碑变化线表图
define(function (require, exports, module) {
    lib.job.create('CompetePraiseLineChart', function () {
        var M = require('../m/PraiseLineChartModel');
        var C = require('../c/PraiseLineChart');
        var V = require('../v/CompetePraiseLineChartView');
        var url = lib.config.debug ? "/api/compete/kbbh":lib.config.apis[10];
        var typetext = {};
        $(lib.config.pids).each(function(i,item){
            typetext[i+1] = item.name;
        });
        new C({//lib.config.apis[10] ||
            model:new M({url:url,typetext:typetext}),
            view:new V({actclass:"current"})
        });
    });
    lib.job.add('CompetePraiseLineChart');
});
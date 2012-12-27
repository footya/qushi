//产品分析口碑词表
define(function (require, exports, module) {
    //权重
    lib.job.create('ProductPraiseWordsManager', function () {
        var C = require('../c/PraiseWordsManager');
        new C();
    });
    lib.job.add('ProductPraiseWordsManager');
    lib.job.create('ItemPraiseWordsPieChart', function () {
        var pid = new lib.url(window.location.href).getParam("id");
        var M = require('../m/ItemPraiseWordsPieChartModel');
        var C = require('../c/ItemPraiseWordsPieChart');
        var V = require('../v/ItemPraiseWordsPieChartView');
        var _url = lib.config.debug ? "/api/product/kbcb" : lib.config.apis[1];
        new C({
            model:new M({url:_url}),
            view:new V({id:'i_piechart1',name:"",type:"yelp",pid:pid,width:360,height:360})
        });
        new C({
            model:new M({url:_url}),
            view:new V({id:'i_piechart2',name:"",type:"good",pid:pid,width:360,height:360})
        });
        new C({
            model:new M({url:_url}),
            view:new V({id:'i_piechart3',name:"",type:"bad",pid:pid,width:360,height:360})
        });
    });
    lib.job.add('ItemPraiseWordsPieChart');
});
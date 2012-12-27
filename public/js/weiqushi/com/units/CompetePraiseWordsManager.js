//竞品分析口碑词表
define(function (require, exports, module) {
    //权重
    lib.job.create('PraiseWordsManager', function () {
        var C = require('../c/PraiseWordsManager');
        new C();
    });
    lib.job.add('PraiseWordsManager');
    lib.job.create("PraiseWordsStack",function(argument) {//口碑词表条状图
        var M = require('../m/UserStackChartModel');
        var C = require('../c/UserStackChart');
        var V = require('../v/PraiseWordsStackChartView');
        var url = lib.config.debug ? "/api/compete/kbcb1":lib.config.apis[11];
        $("#j_piechart_list").append('<div id="i_usertype_stack"></div>');
        $("#j_piechart_list").append('<div class="dis_line_chart"></div>');
        var xaxistable = {};
        $(lib.config.pids).each(function(i,item) {
            xaxistable[i+1] = item.name;
        });
        new C({
                model:new M({url:url}),
                view:new V({id:'i_usertype_stack',name:"",xaxistable:xaxistable})
            });
    });
    lib.job.add('PraiseWordsStack');
    lib.job.create('ItemPraiseWordsPieChart', function () {
        var url = lib.config.debug ? "/api/product/kbcb":lib.config.apis[1];
        var producttypetext = {};
        $(lib.config.pids).each(function(i,item){
            producttypetext[i+1] = item.name;
        });
        
        //var pid = new lib.url(window.location.href).getParam("id");
        var M = require('../m/ItemPraiseWordsPieChartModel');
        var C = require('../c/ItemPraiseWordsPieChart');
        var V = require('../v/ItemPraiseWordsPieChartView');
        var pidlist = WB.productPids;
        for(var i=0,len=pidlist.length;i<len;i++){
            var tit  = '<h2 class="tit_chart">'+ producttypetext[pidlist[i]] +'</h2>';
            var cont = '<div class="chart_s"><div class="chart" id="i_piechart_'+ pidlist[i]+'_1">'+ 1 +'</div><h3>正面</h3></div>'
                     + '<div class="chart_s"><div class="chart" id="i_piechart_'+ pidlist[i]+'_2">'+ 2 +'</div><h3>负面</h3></div>'
                     + (i == len-1 ? '' : '<div class="dis_line_chart"></div>');
            $(tit+cont).appendTo("#j_piechart_list");
            var id1 = 'i_piechart_'+pidlist[i]+'_1';
            var id2 = 'i_piechart_'+pidlist[i]+'_2';
            new C({//正面
                model:new M({url:url}),
                view:new V({id:id1,name:"",type:"good",pid:pidlist[i],width:360,height:360})
            });
            new C({//负面
                model:new M({url:url}),
                view:new V({id:id2,name:"",type:"bad",pid:pidlist[i],width:360,height:360})
            });
        }
    });
    lib.job.add('ItemPraiseWordsPieChart');
    
    
});
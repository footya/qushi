//竞品分析用户细分
define(function (require, exports, module) {
    //权重
    lib.job.create('CompeteUserChartManager', function () {
        var C = require('../c/UserChartManager');
        new C();
    });
    lib.job.add('CompeteUserChartManager');
    //产品分析top5城市
    lib.job.create('UserCityStackChart', function () {
        var producttypetext = {};
        $(lib.config.pids).each(function(i,item){
            producttypetext[i+1] = item.name;
        });
        var M = require('../m/UserStackChartModel');
        var C = require('../c/UserStackChart');
        var V = require('../v/UserStackChartView');
        var typedata = ["top5 地区","top5 来源","用户类型","用户活跃度","用户性别","用户年龄"];
        var apidata  = lib.config.debug ? [
                        "/api/product/userarea",//top5 地区  
                        "/api/product/getusersrc",//top5 来源      
                        "/api/product/usertype",//用户类型   
                        "/api/product/getuseractivity",//用户活跃度 
                        "/api/product/getusergender",//用户性别   
                        "/api/product/getuserage"//用户年龄    
                        ] : 
                        [
                        lib.config.apis[2],
                        lib.config.apis[3],
                        lib.config.apis[4],
                        lib.config.apis[5],
                        lib.config.apis[6],
                        lib.config.apis[7]
                        ];
        var xaxistable = [lib.config.citys,{},lib.config.usertypes,lib.config.useractivitys,lib.config.usersexs,lib.config.userages];
        
        //var pid = new lib.url(window.location.href).getParam("id");
        var pidlist = WB.productPids;
        $(typedata).each(function(i,item) {//j_usertype_chartslist
            var tit = '<h2 class="tit_chart">'+ item +'</h2>';
            $(tit).appendTo("#j_usertype_chartslist");
            $(pidlist).each(function(j,jtem) {
                var box = '<div class="chart_s"><div class="chart" id="i_usertype_'+ jtem+'_'+ i +'">'+ 1 +'</div><h3>'+ producttypetext[jtem] +'</h3></div>';
                $(box).appendTo("#j_usertype_chartslist");
                new C({
                    model:new M({url:apidata[i]}),
                    view:new V({id:'i_usertype_'+ jtem+'_'+i,name:"",xaxistable:xaxistable[i],pid:jtem})
                });
            });
            if(i<typedata.length-1){
                $('<div class="dis_line_chart"></div>').appendTo("#j_usertype_chartslist");//分隔线
            }
        })
    });
    lib.job.add('UserCityStackChart'); 
});
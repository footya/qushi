//产品分析用户细分
define(function (require, exports, module) {
    //权重
    lib.job.create('UserChartManager', function () {
        var C = require('../c/UserChartManager');
        new C();
    });
    lib.job.add('UserChartManager');
    //产品分析top5城市
    lib.job.create('UserCityStackChart', function () {
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
        var M = require('../m/UserStackChartModel');
        var C = require('../c/UserStackChart');
        var V = require('../v/UserStackChartView');
        new C({
            model:new M({url:apidata[0]}),
            view:new V({id:'i_stackchart1',name:"",xaxistable:xaxistable[0]})
        });
        new C({
            model:new M({url:apidata[1]}),
            view:new V({id:'i_stackchart2',name:"",xaxistable:xaxistable[1]})
        });
        new C({
            model:new M({url:apidata[2]}),
            view:new V({id:'i_stackchart3',name:"",xaxistable:xaxistable[2]})
        });
        new C({
            model:new M({url:apidata[3]}),
            view:new V({id:'i_stackchart4',name:"",xaxistable:xaxistable[3]})
        });
        new C({
            model:new M({url:apidata[4]}),
            view:new V({id:'i_stackchart5',name:"",xaxistable:xaxistable[4]})
        });
        new C({
            model:new M({url:apidata[5]}),
            view:new V({id:'i_stackchart6',name:"",xaxistable:xaxistable[5]})
        });
    });
    lib.job.add('UserCityStackChart');
    // //产品分析top5来源
    // lib.job.create('UserFromStackChart', function () {
    //     var M = require('../m/UserStackChartModel');
    //     var C = require('../c/UserStackChart');
    //     var V = require('../v/UserStackChartView');
    //     new C({
    //         model:new M({url:"/api/product/userarea"}),
    //         view:new V({id:'i_stackchart2',name:"top5来源"})
    //     });
    // });
    // lib.job.add('UserFromStackChart');
    // //产品分析用户类型
    // lib.job.create('UserTypeStackChart', function () {
    //     var M = require('../m/UserStackChartModel');
    //     var C = require('../c/UserStackChart');
    //     var V = require('../v/UserStackChartView');
    //     new C({
    //         model:new M({url:"/api/product/userarea"}),
    //         view:new V({id:'i_stackchart3',name:"用户类型"})
    //     });
    // });
    // lib.job.add('UserTypeStackChart');
    // //产品分析用户活跃度
    // lib.job.create('UserActiveStackChart', function () {
    //     var M = require('../m/UserStackChartModel');
    //     var C = require('../c/UserStackChart');
    //     var V = require('../v/UserStackChartView');
    //     new C({
    //         model:new M({url:"/api/product/userarea"}),
    //         view:new V({id:'i_stackchart4',name:"用户活跃度"})
    //     });
    // });
    // lib.job.add('UserActiveStackChart');
    // //产品分析用户性别
    // lib.job.create('UserSexStackChart', function () {
    //     var M = require('../m/UserStackChartModel');
    //     var C = require('../c/UserStackChart');
    //     var V = require('../v/UserStackChartView');
    //     new C({
    //         model:new M({url:"/api/product/userarea"}),
    //         view:new V({id:'i_stackchart5',name:"用户性别"})
    //     });
    // });
    // lib.job.add('UserSexStackChart');
    // //产品分析用户年龄
    // lib.job.create('UserAgeStackChart', function () {
    //     var M = require('../m/UserStackChartModel');
    //     var C = require('../c/UserStackChart');
    //     var V = require('../v/UserStackChartView');
    //     new C({
    //         model:new M({url:"/api/product/userarea"}),
    //         view:new V({id:'i_stackchart6',name:"用户年龄"})
    //     });
    // });
    // lib.job.add('UserAgeStackChart');
    
});
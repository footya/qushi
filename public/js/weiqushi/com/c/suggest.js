/*
 * @fileOverview 新版suggest
 * @author hangyongsheng
 * @version 1.0
 */
define(function(require,exports,module){
    var Controller = require('./controller');
    var Suggest = lib.Class('Suggest',{
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
                "click":function(data){
                    this.show(data.name);
                }
            }
        },
        methods:{
            show:function(data){
                alert(data);
            }
        }
    });
    
    module.exports = Suggest;
});
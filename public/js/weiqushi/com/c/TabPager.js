/*
 * @fileOverview 三页签分页
 * @author hangyongsheng
 * @version 1.0
 */
define(function(require,exports,module){
    var Controller = require('./controller');
    module.exports = lib.Class('TabPager',
    {
        extend:Controller,
        construct:function(model,view){
            this.callsuper(model,view);
            this._evList = [];
        },
        properties:{
            
        },
        methods:
        {
            init : function(opt){
                this._view.initView(opt);
            },
            on:function(type,fn){
                if(!this._evList[type])
                {
                    this._evList[type] = [];
                }
                this._evList[type].push(fn);
            },
            fire:function(type,back){
                if(this._evList[type]){
                    for(var i=0,l=this._evList[type].length;i<l;i++){
                        this._evList[type][i].call(null,back);
                    }
                }
            }
        }
    });
});
define(function (require, exports, module) {
/**
 * @fileoverview 自定义事件
 * @author wangxiang|7241|wangxiang@qiyi.com
 */
var evt = lib.Class('Event',
    {
        construct: function (options) {
            this.handlers = {};
        },
        methods: {
            on: function(type, handler) {
                if (typeof this.handlers[type] == "undefined") {
                    this.handlers[type] = [];
                }
                this.handlers[type].push(handler);
            },
            fire: function(event) {
                if (!event.target) {
                    event.target = this;
                }
                if (this.handlers[event.type] instanceof Array) {
                    var handlers = this.handlers[event.type];
                    for (var i = 0, len = handlers.length; i < len; i++){
                        try{
                            handlers[i](event);
                        }catch(e){
                            lib.log(e);
                        }
                    }
                }
            },
            un: function(type, handler) {
                if (this.handlers[type] instanceof Array) {
                    var handlers = this.handlers[type];
                    for (var i = 0, len = handlers.length; i < len; i++) {
                        if (handlers[i] === handler) {
                            break;
                        }
                    }
                    handlers.splice(i, 1);
                }
            }
        }
    });

module.exports  = evt;
});
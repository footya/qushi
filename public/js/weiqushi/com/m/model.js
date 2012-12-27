/*
 * @fileOverview 通用数据交互类
 * @author hangyongsheng
 * @version 1.0
 */

define(function(require,exports,module){
    module.exports = lib.Class('Model',
    {
        ns:'lib.m',
        construct:function()
        {
            this._data = {};
        },
        methods:
        {
            /*
             * @public
             * @param ctrl 控制层对象
             * @description 类初始化，在控制类构造函数被调用时执行
             */
            init:function() {
                // body...
            },
            /*
             * @public
             * @param 
             * param 获取数据时所需的参数
             * fn 异步获取数据时的回调函数
             * @return 
             * 同步获取数据时，返回数据对象。
             * 异步获取数据时，无返回值
             */
            get:function(){return this._data;},
            /*
             * @public
             * @param 
             * data 需要设置的数据
             * fn 异步设置数据时的回调函数
             * @return 
             * 同步设置数据时，返回更新后的数据对象。
             * 异步设置数据时，无返回值
             */
            set:function(data){
                //return lib.object.extend(this._data,data);
                return $.extend(true, this._data, data);
            }
        }
    });
});

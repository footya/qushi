/*
 * @fileOverview 通用数据交互类
 * @author hangyongsheng
 * @version 1.0
 */

define(function(require,exports,module){
    
    module.exports = lib.Class('View',
    {
        ns:'lib.v',
        methods:
        {
            /*
             * @public
             * @param ctrl 控制层对象
             * @description 类初始化，在控制类构造函数被调用时执行
             */
            init: function (ctrl) {
                this._ctrl = ctrl;
            },
            /*
             * @public
             * @param data 数据源
             * @description 根据数据源更新显示
             */
            update:function() {
                // body...
            }
        }
    });
});

/*
 * @des 三页签分页数据层
 * @author hangyongsheng
 * @version 1.0
 */
define(function(require,exports,module){
    var Model = require('./model');
    module.exports = lib.Class('TabPagerModel',
    {
        extend:Model,
        construct:function()
        {
            this._data = {"focus":1,"total":1};
        },
        methods:
        {
            set:function(data)
            {
               if(data.focus > this._data.total){
                    data.focus = this._data.total;
               }
               if(data.focus < 1){
                    data.focus = 1;
               }
              return $.extend(true,this._data,data);
            }
        }
    });
});

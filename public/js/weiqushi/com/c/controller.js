/*
 * @fileOverview 通用数据交互类
 * @author piaoshihuang
 * @version 1.0
 */

define(function(require,exports,module){

    var Model = require('../m/model');
    var View = require('../v/view');
    module.exports = lib.Class('Controller',
    {
        ns:'lib.c',
        /*
         * @constructs 
         * @param 
         * model 数据类实例
         * view  显示类实例
         * @example 
         * var adapter = new lib.action.Adapter(model,view);
         */
        construct:function(options)
        {
            this._events = [];
            options = options || {};
            var model = options.model;
            var view = options.view;
            if (model instanceof Model)
            {
                this._model = model;
                this._model.init(this);
            }
            if (view instanceof View) 
            {
                this._view = view;
                this._view.init(this);
            }
        },
        methods:
        {
            /*
             *@public 
             *@param param 请求数据所需参数必须包含type和data属性
             *@description 提供一个公共方法用来接收view层通知
                eg.
                  this._ctrl.notice({"type":"click"});
             *@使用此方法需要在C层properties上添加一个events属性，把type对应的操作都列出来
                 eg.
                    events:{
                        "click" : function(data){
                            this.show(data);//此处的this为C本身
                        }
                    }
             */
            notice:function(param){
                 if(param.hasOwnProperty("type")){
                    this._fire(param);
                 }else{
                    throw "The ctrlClass method \"notice\" argument is not Meet the standard!"
                 }
            },
            /*
             *@private 
             *@param param 参数必须包含type和data属性
             *@description 执行events列表里对应的事件
             */
            _fire:function(param){
                if(this.events&&this.events.hasOwnProperty(param.type)){
                    this.events[param.type].call(this,param.data);
                }
            },
            /*
             * @public 
             * @param param 请求数据所需参数
             * @description 同步获取数据
             */
            syncGet:function(param)
            {
                if(this._model)
                {
                    var data = this._model.get(param);
                }
                if(this._view)
                {
                    this._view.update(data);
                }
            },
            /*
             * @public 
             * @param param 请求数据所需参数
             * @description 异步获取数据
             */
            asyncGet:function(param)
            {
                if(!this._model)
                {
                    return false;
                }
                var _this = this;
                this._model.get(param,function(data)
                {
                    if(_this._view)
                    {
                        _this._view.update(data);
                    }
                });
            },
            /*
             * @public 
             * @param data 要设置的数据
             * @description 同步设置数据
             */
            syncSet:function(data)
            {
                if(this._model)
                {
                    var newData = this._model.set(data);
                }
                if(this._view)
                {
                    this._view.update(newData);
                }
            },
            /*
             * @public 
             * @param data 要设置的数据
             * @description 异步设置数据
             */
            asyncSet:function(data)
            {
                if(!this._model)
                {
                    return false;
                }
                var _this = this;
                this._model.set(data,function(newData)
                {
                    if(_this._view)
                    {
                        _this._view.update(newData);
                    }
                })
            }
        }
    });
});

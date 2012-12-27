/*
 * @des 时间选择
 * @author hangyongsheng
 * @version 1.0
 */
define(function(require,exports,module){
    var Controller = require('./controller');
    var Suggest = lib.Class('DatePicker',{
        ns:'lib.c',
        extend:Controller,
        construct:function(opt){
            this.callsuper(opt);
            this.bindEvent();
        },
        properties:{
            /*
             *@description C层需要响应的事件列表
             */
            events:{
                "date_submit":function(data){
                    data = data || {};
                    this.dateSubmit(data);
                }
                // ,
                // "date_check":function(data){
                //     data = data || {};
                //     this.checkDate(data);
                // }
            }
        },
        methods:{
            bindEvent:function() {
                var _this = this;
                lib._PAGE_EVENT.on("g_trendschart_for_datepicker_checkdate",function(_data){//告诉trendschart验证通过了
                    _this.checkDate(_data.data,function(data) {
                        //lib._PAGE_EVENT.fire({"type":"g_datepicker_for_checkdate","data":data.data});
                        lib._PAGE_EVENT.fire({"type":"g_datepicker_for_trendschart_checkdate","data":data.data});
                        
                    });
                });
                lib._PAGE_EVENT.on("g_linechart_for_datepicker_checkdate",function(_data){//告诉linechart验证通过了
                    _this.checkDate(_data.data,function(data) {
                        lib._PAGE_EVENT.fire({"type":"g_datepicker_for_checkdate","data":data.data});
                        //lib._PAGE_EVENT.fire({"type":"g_datepicker_for_trendschart_checkdate","data":data.data});
                    });
                });
            },
            dateSubmit:function (param){
                this.checkDate(param,function(data) {
                    if(data.code == "100000"){
                        lib._PAGE_EVENT.fire({type:'g_datepicker_change_for_all'});
                    }
                });
            },
            checkDate:function(param,fn) {
                if(!this._model)
                {
                    return false;
                }
                var _this = this;
                this._model.checkDate(param,function(data)
                {
                    if(_this._view)
                    {
                        //_this._view.updateChartsView(data);
                        if(data.code !== "100000"){
                            _this._view.dateWarning(data);
                        }else{
                            fn(data);//正确往下执行
                        }
                    }
                });
            }
        }
    });
    
    module.exports = Suggest;
});
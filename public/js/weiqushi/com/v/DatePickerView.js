/*
 * @des 时间选择
 * @author hangyongsheng
 * @version 1.0
 */
define(function (require, exports, module) {
    require('../../plugin/jquery-ui-1.9.2.custom.min');
    var View      = require('./view');
    module.exports = lib.Class('DatePickerView',{
        ns: 'lib.v',
        extend: View,
        construct: function () {
            this.callsuper();
            this._fromipt  = $("#j-from-date-input");
            this._toipt    = $("#j-to-date-input");
            this._frombtn  = $("#j-from-date-button");
            this._tobtn    = $("#j-to-date-button");
            this._dateform = $("#j-date-form");
            this._submitbtn= $("#j-date-submit-button");
        },
        methods:{
            init: function (ctrl) {
                this._ctrl = ctrl;
                this.bindEvent();
                this.setDefultValue();
            },
            setDefultValue:function() {
                var today = new Date();
                var beforeday = new Date(today.getTime() - 3600000*24*30);
                var _today = (today.getDate() < 10) ? "0" + today.getDate() : today.getDate();
                var _beforeday = (beforeday.getDate() < 10) ? "0" + beforeday.getDate() : beforeday.getDate();
                this._toipt.val([today.getFullYear(),today.getMonth()+1,_today].join("-"));
                this._fromipt.val([beforeday.getFullYear(),beforeday.getMonth()+1,_beforeday].join("-"));
                lib._PAGE_EVENT.fire({"type":"g_datepicker_change_for_all"});
            },
            bindEvent:function() {
                var _this = this;
                this._bindDateInput();
                this._bindDateForm();
                this._bindDateBtn();
                //监听一个checkdate事件到全局事件
            },
            _bindDateBtn:function() {
                var _this = this;
                this._frombtn.on("click",function(e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    } 
                    else {
                        e.returnValue = false;
                    };
                    _this._fromipt.focus();
                });
                this._tobtn.on("click",function(e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    } 
                    else {
                        e.returnValue = false;
                    };
                    _this._toipt.focus();
                });
                this._submitbtn.on("click",function(e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    } 
                    else {
                        e.returnValue = false;
                    };
                    _this._dateform.submit();
                })
            },
            _bindDateInput:function() {
                var _this = this;
                this._fromipt.datepicker({
                    changeMonth: true,
                    changeYear: true,
                    onClose: function( selectedDate ) {
                        _this._toipt.datepicker("option", "minDate", selectedDate);
                    }
                });
                this._toipt.datepicker({
                    changeMonth: true,
                    changeYear: true,
                    onClose: function(selectedDate){
                        //lib.log(selectedDate);
                    }
                });
                var today = [new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()].join("-");
                this._fromipt.datepicker( "option", "maxDate", today);
                this._toipt.datepicker( "option", "maxDate", today);
                $.datepicker.setDefaults({
                            closeText: '关闭',
                            prevText: '&#x3C;上月',
                            nextText: '下月&#x3E;',
                            currentText: '今天',
                            monthNames: ['一月','二月','三月','四月','五月','六月',
                            '七月','八月','九月','十月','十一月','十二月'],
                            monthNamesShort: ['一月','二月','三月','四月','五月','六月',
                            '七月','八月','九月','十月','十一月','十二月'],
                            dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
                            dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
                            dayNamesMin: ['日','一','二','三','四','五','六'],
                            weekHeader: '周',
                            dateFormat: 'yy-mm-dd',
                            firstDay: 1,
                            isRTL: false,
                            showMonthAfterYear: true,
                            yearSuffix: '年'});
            },
            _bindDateForm:function() {
                var _this = this;
                this._dateform.on("submit",function(e){
                    if (e.preventDefault) {
                        e.preventDefault();
                    } 
                    else {
                        e.returnValue = false;
                    }
                    var _target = e.target || e.srcElement
                     var type = $(_target).attr("data-value");
                    _this._ctrl.notice({"type":"date_submit","data":{"from":_this._fromipt.val(),"to":_this._toipt.val(),"type":type}});
                });
            },
            dateWarning:function(data) {
                alert(data.msg);
            }
        }
    });
});

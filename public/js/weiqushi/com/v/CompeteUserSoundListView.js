/*
 * @des 竞品分析用户声音
 * @author hangyongsheng
 * @version 1.0
 */
define(function (require, exports, module) {
    //require('../../plugin/highcharts/modules/exporting.js');
    // var dateFormat = require('../../core/date/format.js');
    // var strToDate = require('../../core/date/todate.js');
    
    //var pid = new lib.url(window.location.href).getParam("id");
    var View      = require('./UserSoundListView');
    module.exports = lib.Class('CompeteUserSoundListView',{
        extend: View,
        construct: function (opt) {
            this.callsuper(opt);
            // this._opt = opt || {};
            // this._dateform = $("#j-date-form");//时间选择form
            // this._formipt  = $("#j-from-date-input");//开始时间
            // this._toipt    = $("#j-to-date-input");//结束时间
            // this._usersoundtype = $("#j_usersound_type");//用户心声类型
            // this._attitudetype  = $("#j_attitude_type");//feed态度

            // this._usersoundbox  = $("#j_usersound_box");//用户心声feed容器
            // this._usersoundpage = $("#j_usersound_pageer");//用户心声分页
            // this._params = {};
            // this._params["type"] = "weibo";
            // this._params["state"]= "all";
            // this._params["limit"]= 10;
            // this._params["page"] = 1;
            this._pidtype  = $("#j_pid_type");//feed态度
            this._params["pid"]  = WB.productPids[0];//获取pid
        },
        methods:{
            init:function (ctrl) {
                this._ctrl = ctrl;
                this.bindEvent();
                this._initPager();
            },
            bindEvent:function(){
                var _this = this;
                //响应全局事件
                lib._PAGE_EVENT.on('g_datepicker_change_for_all',function() {
                    _this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                });
                //this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                this._bindUserSoundTypeLinks();
                this._bindUserAttitudeTypeLinks();
                this._bindUserIsUseful();
                this._bindUserPidTypeLinks();
                //this._bindIsWeightCheckbox();
                // lib._PAGE_EVENT.on('g_datepicker_for_checkdate',function(data){
                //     // _this._timetype.children("a").removeClass("active");
                //     // _this._target.className = "active";
                //     // _this._timetype.attr("data-value",_this._type);
                //     // _this._dateform.attr("data-value",_this._type);
                //     _this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                // });
                //});
            },
            //产品类型
            _bindUserPidTypeLinks:function() {
                this.createPtypeLinks();
                var _this = this;
                var _sign = 0;
                var activeclass = this._opt.actclass || "active";
                this._pidtype.delegate('a', 'click', function(e){
                    if(e.preventDefault){
                        e.preventDefault();
                    }else{
                        e.returnValue = false;
                    }
                    var _target = e.target || e.srcElement;
                    var _type = _target.getAttribute("data-value");
                    _this._pidtype.children("a").removeClass(activeclass);
                    _target.className = activeclass;
                    _this._params["pid"] = _type;
                     _this._params["page"] = 1;
                    //_this.resetPager();
                    _this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                    //lib._PAGE_EVENT.fire({type:'g_usersound_for_datepicker_checkdate',"data":{"type":_type,"from":_this._formipt.val(),"to":_this._toipt.val()}}); 
                });
            },
            createPtypeLinks:function(){//生成产品tab
                var pids = WB.productPids;
                var producttypetext = {};
                $(lib.config.pids).each(function(i,item){
                    producttypetext[i+1] = item.name;
                });
                $(pids).each(function(i,item){
                    var html = '<a href="#" class="'+ (i==0 ? "current" : "") + '" data-value="'+ item +'">'+ producttypetext[item] +'</a>';
                    $("#j_pid_type").append(html);
                });
                
            }
        }
    });
});

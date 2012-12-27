/*
 * @des 产品分析线表图
 * @author hangyongsheng
 * @version 1.0
 */
define(function (require, exports, module) {
    require('../../plugin/highcharts/highcharts');
    //require('../../plugin/highcharts/modules/exporting.js');
    // var dateFormat = require('../../core/date/format.js');
    // var strToDate = require('../../core/date/todate.js');
    
    var pid = new lib.url(window.location.href).getParam("id");
    var View      = require('./view');
    module.exports = lib.Class('PraiseLineChartView',{
        ns: 'lib.v',
        extend: View,
        construct: function (opt) {
            this.callsuper(opt);
            this._opt = opt;
            this._dateform = $("#j-date-form");//时间选择form
            this._formipt  = $("#j-from-date-input");//开始时间
            this._toipt    = $("#j-to-date-input");//结束时间
            this._weight   = $("#i_linechart1_weight");//加权
            this._timetype = $("#i_linechart1_type");//单位时间类型
            this._download = $("#j-down-kbbh")//数据下载
            this._params   = {};
        },
        methods:{
            init:function (ctrl) {
                this._ctrl = ctrl;
                this.bindEvent();
            },
            bindEvent:function(){
                var _this = this;
                //响应全局事件
                lib._PAGE_EVENT.on('g_datepicker_change_for_all',function() {
                    _this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                });
                //this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                this._bindTimeTypeLinks();
                this._bindIsWeightCheckbox();
                var active = this._opt.actclass || "active";
                lib._PAGE_EVENT.on('g_datepicker_for_checkdate',function(data){
                    _this._timetype.children("a").removeClass(active);
                    _this._target.className = active;
                    _this._timetype.attr("data-value",_this._type);
                    _this._dateform.attr("data-value",_this._type);
                    _this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                });
                //});
            },
            _changeDownLink:function(){
                var href = this._download.attr("href");
                var url = new lib.url(href).url;
                url = url || lib.config.apis[0];
                var params = this.getParam();
                var query = [];
                params.download=1;
                for(var k in params){
                    query.push(k+"="+params[k]);
                }
                this._download.attr("href",url+"?"+query.join("&"));
            },
            //单位时间操作
            _bindTimeTypeLinks:function() {
                var _this = this;
                var _sign = 0;
                this._timetype.delegate('a', 'click', function(e){
                    if(e.preventDefault){
                        e.preventDefault();
                    }else{
                        e.returnValue = false;
                    }
                    var _target = e.target || e.srcElement;
                    _this._target = _target;
                    var _type = _target.getAttribute("data-value");
                    _this._type = _type;
                    // if(_sign == 0){
                    //     lib._PAGE_EVENT.on('g_datepicker_for_checkdate',function(data){
                    //         lib.log("------"+JSON.stringify(data.data));
                    //         _this._timetype.children("a").removeClass("active");
                    //         _target.className = "active";
                    //         _this._timetype.attr("data-value",_type);
                    //         _this._dateform.attr("data-value",_type);
                    //         _this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                    //     });
                    //     _sign = 1;
                    // }
                    lib._PAGE_EVENT.fire({type:'g_linechart_for_datepicker_checkdate',"data":{"type":_type,"from":_this._formipt.val(),"to":_this._toipt.val()}}); 
                });
            },
            //加权影响力操作
            _bindIsWeightCheckbox:function() {
                var _this = this;
                this._weight.on('click', function(e) {
                    var _target = e.target || e.srcElement;
                    if(_target.checked){
                        _target.value = 1;
                    }else{
                        _target.value = 0;
                    }
                    _this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                });
            },
            //更新图表显示
            updateChartsView:function(data){
                var _tickInterval = data.times.length > 40 ? 5 : 1;
                var _rotation = data.times.length > 10 ? -45 : 0;
                var _align = data.times.length > 10 ? 'right' : 'center';
                new Highcharts.Chart({
                    chart: {
                        renderTo: 'i_linechart1',
                        type: 'spline',
                        marginBottom: 105,
                        backgroundColor:"#F7F7F7"
                    },
                    colors: ['#64c2a0','#f76967','#4facd5'],
                    credits:{
                        enabled: false
                    },
                    plotOptions:{
                        spline:{
                            marker:{
                                symbol:"circle"
                            }
                        }
                    },
                    title: {
                        text: '',
                        x: -20 //center
                    },
                    subtitle: {
                        text: '',
                        x: -20
                    },
                    xAxis: {
                        tickInterval:_tickInterval,
                        labels: {
                            rotation: _rotation,
                            //y:50,
                            align: _align,
                            style: {
                                fontSize: '10px',
                                fontFamily: 'Verdana, sans-serif'
                            },
                            formatter:function() {
                                var time = this.value;
                                // var date = strToDate(time);
                                // var sday = dateFormat(date,"yyyy/MM/dd")//[new Date(time).getFullYear(),new Date(time).getMonth()+1,new Date(time).getDate()].join("/");
                                // return sday;
                                return data.times[time];
                            }
                        },
                        showLastLabel: true
                    },
                    yAxis: {
                        min:0,
                        //max:110,
                        //tickInterval:10,
                        title: {
                            text: '',
                            rotation: 0,
                            y:-130,
                            x:30
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }],
                        labels: {
                            formatter: function() {
                                return this.value; // clean, unformatted number for year
                            }
                        },
                        startOnTick: true,
                        endOnTick: true,
                        showLastLabel: true,
                        lineWidth: 1
                    },
                    tooltip: {
                        formatter:function() {
                            var time = this.x;
                            // var date = strToDate(time);
                            // var sday = dateFormat(date,"yyyy/MM/dd")//[new Date(time).getFullYear(),new Date(time).getMonth()+1,new Date(time).getDate()].join("/");
                            return data.times[time] +"   "+ this.y;
                            //return [new Date(time).getFullYear(),new Date(time).getMonth()+1,new Date(time).getDate()].join("/") +":"+ this.y
                        }
                    },
                    legend: {
                        backgroundColor: '#FFFFFF',
                        reversed: true
                    },
                    series: data.data
                });
                this._changeDownLink();
            },
            showWarnInfo:function(srcdata) {
                $("#i_linechart1").html('<p class="no_data_warn">'+srcdata.msg+'</p>');
            },
            getParam:function() {
                var _params = {};
                _params["datetype"] = this._timetype.attr("data-value");
                _params["from"] = this._formipt.val().replace(/\-/gi,"");
                _params["to"]   = this._toipt.val().replace(/\-/gi,"");
                _params["is_weight"]   = this._weight.val();
                _params["pid"]  = WB.pageName == 'product' ? pid :  decodeURIComponent(WB.productPids.join(","));
                return _params;
            }
        }
    });
});

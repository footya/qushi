/*
 * @des 产品分析用户细分
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
    module.exports = lib.Class('UserStackChartView',{
        ns: 'lib.v',
        extend: View,
        construct: function (opt) {
            this.callsuper(opt);
            this._opt = opt || {};
            this._dateform = $("#j-date-form");//时间选择form
            this._formipt  = $("#j-from-date-input");//开始时间
            this._toipt    = $("#j-to-date-input");//结束时间
            this._weight   = $("#i_userchart_weight");//加权
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
                lib._PAGE_EVENT.on('g_datepicker_change_for_all',function(){
                    _this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                });
                //this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                this._bindIsWeightCheckbox();
            },
            //加权影响力操作
            _bindIsWeightCheckbox:function() {
                var _this = this;
                lib._PAGE_EVENT.on('g_usermanager_for_usercharts',function(){
                    _this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                });
            },
            //更新图表显示
            updateChartsView:function(data){
                this.updateChartsItem({id:this._opt.id || 'i_stackchart1',name:this._opt.name ||""},data);
                // this.updateChartsItem({id:'i_piechart2',name:"正面"},data.good);
                // this.updateChartsItem({id:'i_piechart3',name:"负面"},data.bad);
            },
            updateChartsItem:function (param,data){
                var _this = this;
                new Highcharts.Chart({
                        chart: {
                            renderTo: param.id,
                            type: 'bar',
                            width:this._opt.width || "",
                            height:this._opt.height || 300,
                            backgroundColor:"#F7F7F7"
                        },
                        colors: ['#64c2a0','#f76967','#4facd5'],
                        credits:{
                            enabled: false
                        },
                        title: {
                            text: param.name
                        },
                        xAxis: {
                            categories: data.categories,//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
                            labels: {
                                formatter: function() {
                                    _this._opt.xaxistable = _this._opt.xaxistable || {};
                                    return _this._opt.xaxistable[this.value] || this.value;
                                }
                            }
                        },
                        yAxis: {
                            max:100, // 定义Y轴 最大值  
                            //min:0, // 定义最小值  
                            // minPadding: 0.2,   
                            // maxPadding: 0.2,  
                            tickInterval:10, // 刻度值 
                            min: 0,
                            title: {
                                text: ''
                            },
                            lineWidth: 1
                        },
                        legend: {
                            backgroundColor: '#FFFFFF',
                            reversed: true
                        },
                        tooltip: {
                            formatter: function() {
                                return ''+
                                    this.series.name +': '+ this.y.toFixed(2) +'%';
                            }
                        },
                        plotOptions: {
                            series: {
                                stacking: 'normal'
                            }
                        },
                        series: data.series
                    });
            },
            showWarnInfo:function(data) {
                $("#"+this._opt.id).html('<p class="no_data_warn">'+data.msg+'</p>');
            },
            getParam:function(){
                var _params = {};
                _params["from"] = this._formipt.val().replace(/\-/gi,"");
                _params["to"]   = this._toipt.val().replace(/\-/gi,"");
                _params["is_weight"]   = this._weight.val();
                _params["pid"]  = this._opt.pid || pid;
                //[todo]需要当用户选择的时间范围为 92天内（3month），使用日数据进行计算。
                //当用户超过92天，但小于 731天（2year），使用周数据进行计算。 
                //当用户超过731天（2year），提示用户修改时间。
                _params["datetype"] = "day";
                return _params;
            }
        }
    });
});

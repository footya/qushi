/*
 * @des 产品分析口碑词表饼图
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
    module.exports = lib.Class('PraiseWordsPieChartView',{
        ns: 'lib.v',
        extend: View,
        construct: function (opt) {
            this.callsuper(opt);
            this._opt = opt;
            this._dateform = $("#j-date-form");//时间选择form
            this._formipt  = $("#j-from-date-input");//开始时间
            this._toipt    = $("#j-to-date-input");//结束时间
            this._weight   = $("#i_piechart_weight");//加权
            this._timetype = $("#i_linechart1_type");//单位时间类型
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
                    //_this._ctrl.notice({"type":"updateYelpChartView","data":_this.getParam({"type":"yelp"})});
                    _this.updateAll();
                });
                this.updateAll();
                this._bindIsWeightCheckbox();
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
                    _this.updateAll();
                    //_this._ctrl.notice({"type":"updateYelpChartView","data":_this.getParam({"type":"yelp"})});
                });
            },
            updateAll:function() {
                this._ctrl.notice({"type":"updateYelpChartView","data":this.getParam({"type":"yelp"})});
                this._ctrl.notice({"type":"updateGoodChartView","data":this.getParam({"type":"good"})});
                this._ctrl.notice({"type":"updateBadChartView","data":this.getParam({"type":"bad"})});
            },
            //更新图表显示
            updateYelpChartView:function(data){
                //lib.log(JSON.stringify(data));
                this.updateChartsItem({id:'i_piechart1',name:"口碑"},data);
            },
            updateGoodChartView:function(data){
                //lib.log(JSON.stringify(data));
                this.updateChartsItem({id:'i_piechart2',name:"正面"},data);
            },
            updateBadChartView:function(data){
                //lib.log(JSON.stringify(data));
                this.updateChartsItem({id:'i_piechart3',name:"负面"},data);
            },
            updateChartsItem:function (param,data){
                new Highcharts.Chart({
                    chart: {
                        renderTo: param.id,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        width:this._opt.width || 250,
                        height:this._opt.height || 250,
                        backgroundColor:"#F7F7F7"
                    },
                    colors: ['#64c2a0','#f76967','#4facd5'],
                    credits:{
                        enabled: false
                    },
                    title: {
                        text: param.name//标题
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                        percentageDecimals: 0,
                        enabled: false
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                align:"left",
                                enabled: true,
                                color: '#FFFFFF',
                                formatter: function() {
                                    return this.point.name +':'+ this.percentage +'%';
                                },
                                connectorPadding: 0,
                                distance: -30
                            },
                            showInLegend: false
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: '比例',
                        data: data
                    }]
                });
            },
            getParam:function(opt) {
                var _params = {};
                _params["from"] = this._formipt.val().replace(/\-/gi,"");
                _params["to"]   = this._toipt.val().replace(/\-/gi,"");
                _params["is_weight"]   = this._weight.val();
                _params["type"]  = opt.type;
                _params["pid"]  = pid;//[todo]获取pid
                //[todo]需要当用户选择的时间范围为 92天内（3month），使用日数据进行计算。
                //当用户超过92天，但小于 731天（2year），使用周数据进行计算。 
                //当用户超过731天（2year），提示用户修改时间。
                _params["datetype"] = "day";
                return _params;
            }
        }
    });
});

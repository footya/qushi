/*
 * @des 微博动态
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
    module.exports = lib.Class('TrendsChartView',{
        ns: 'lib.v',
        extend: View,
        construct: function (opt) {
            this.callsuper(opt);
            this._opt = opt || {};
            this._dateform = $("#j-date-form");//时间选择form
            this._formipt  = $("#j-from-date-input");//开始时间
            this._toipt    = $("#j-to-date-input");//结束时间
            this._weight   = $("#i_trendschart1_weight");//加权
            this._timetype = $("#i_trendschart1_type");//单位时间类型
            this._download = $("#j-down-wbdt")//数据下载
            this._params   = {};
        },
        methods:{
            init:function (ctrl) {
                this._ctrl = ctrl;
                this.bindEvent();
            },
            bindEvent:function(){
                var _this = this;
                var active = this._opt.actclass || "active";
                //响应全局事件
                lib._PAGE_EVENT.on('g_datepicker_change_for_all',function() {
                    _this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                });
                //this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                this._bindTimeTypeLinks();
                //this._bindIsWeightCheckbox();
                lib._PAGE_EVENT.on('g_datepicker_for_trendschart_checkdate',function(data){
                    _this._timetype.children("a").removeClass(active);
                    _this._target.className = active;
                    _this._timetype.attr("data-value",_this._type);
                    _this._dateform.attr("data-value",_this._type);
                    _this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                });
                //});
            },
            _changeDownLink:function(){
                //var href = this._download.attr("href");
                var url = 'http://qushi.udc.weibo.com/export/dynamic';//new lib.url(href).url;
                var params = this.getParam();
                var query = [];
                for(var k in params){
                    query.push(k+"="+params[k]);
                }
                this._download.attr("href",url+"?"+query.join("&"));
            },
            //单位时间操作
            _bindTimeTypeLinks:function(){
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
                    lib._PAGE_EVENT.fire({type:'g_trendschart_for_datepicker_checkdate',"data":{"type":_type,"from":_this._formipt.val(),"to":_this._toipt.val()}}); 
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
                var _this = this;
                this._srcdata = data.srcdata;
                var _tickInterval = data.categories.length > 40 ? 5 : 1;
                var _rotation = data.categories.length > 10 ? -45 : 0;
                var _align = data.categories.length > 10 ? 'right' : 'center';
                new Highcharts.Chart({
                    chart: {
                        renderTo: 'i_trendschart1',
                        type: 'scatter',
                        marginBottom: 105,
                        backgroundColor:"#F7F7F7"
                    },
                    colors: ['#64c2a0','#f76967','#4facd5'],
                    credits:{
                        enabled: false
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        // title: {
                        //     enabled: true,
                        //     text: ''
                        // },
                        // startOnTick: true,
                        // endOnTick: true,
                        // showLastLabel: true,
                        //categories: formatDate(data.data).categories,
                        tickInterval:_tickInterval, // 刻度值 
                        labels: {
                            rotation: _rotation,
                            //y:50,
                            align: _align,
                            style: {
                                fontSize: '10px',
                                fontFamily: 'Verdana, sans-serif'
                            },
                            formatter: function() {
                                var time = this.value;
                                var day = data.categories[time];//[new Date(time).getFullYear(),new Date(time).getMonth()+1,new Date(time).getDate()].join("/");
                                return day;
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        lineWidth: 1
                    },
                    tooltip: {
                        formatter: function() {
                                // var time = this.x;
                                // var day = data.categories[time];
                                // return ''+
                                // day +', '+ this.y +','+this.series.name;
                                var day = data.categories[this.x];
                                var feed = _this.findFeed(this.x,this.y,this.series.name).status;
                                //lib.log( JSON.stringify(mid));
                                var str = [];
                                //str.push('<p style="clear:both;width:300px;">');
                                if(feed.deleted == 1){
                                   str.push('抱歉，MID：'+ feed.mid + '的微博已被删除。');
                                }else{
                                    str.push('<strong>'+feed.user.name+":"+'</strong>');
                                    var _text = feed.text.replace(/\n|\s/g,"");
                                    var __s = [];
                                    for(var i=0,len=_text.length;i<len;i++){
                                       if(i%40 == 0){
                                          __s.push("<br />");
                                       }
                                       __s.push(_text.charAt(i));
                                    }
                                    str.push(__s.join(""));
                                    str.push("<br/>")
                                    str.push('来自:'+feed.source);
                                    str.push('<span style="color:#999">转发：(' + feed.reposts_count + ')</span>');
                                    str.push('<span style="color:#999">评论：(' + feed.comments_count + ')</span>');
                                }
                                //str.push('</p>');
                                return str.join("");
                                //return '<p style="clear:both">微博内容微博内容微博内容微博内容微博内容微博内容</p><br/><p>来自:新浪微博，转发<span style="color:#ddd">(100)</span></p>';
                        },
                        style:{
                            width:"300px"
                        }
                    },
                    legend: {
                        backgroundColor: '#FFFFFF',
                        reversed: true
                    },
                    plotOptions: {
                        scatter: {
                            marker: {
                                symbol:"circle",
                                radius: 5,
                                states: {
                                    hover: {
                                        enabled: true,
                                        lineColor: 'rgb(0,100,100)'
                                    }
                                }
                            },
                            states: {
                                hover: {
                                    marker: {
                                        enabled: false
                                    }
                                }
                            },
                            point:{
                                // events:{
                                //     mouseOver:function() {
                                //         //lib.log(this);
                                //         var day = data.categories[this.x];
                                //         var mid = _this.findFeed(this.x,this.y,this.series.name);
                                //         lib.log(JSON.stringify(mid));
                                //     }
                                // }
                            }
                            
                        }
                    },
                    series: data.series
                });
            this._changeDownLink();
            },
            showWarnInfo:function(data) {
                $("#i_trendschart1").html('<p class="no_data_warn">'+data.msg+'</p>');
            },
            getParam:function() {
                var _params = {};
                _params["datetype"] = this._timetype.attr("data-value") || "day";
                _params["from"] = this._formipt.val().replace(/\-/gi,"");
                _params["to"]   = this._toipt.val().replace(/\-/gi,"");
               //_params["is_weight"]   = this._weight.val();
                _params["pid"]  = pid;//[todo]获取pid
                return _params;
            },
            findFeed : function(x,y,z){
                    var chart = {"1":"正性","0":"中性","-1":"负性"};
                    var data = this._srcdata;
                    var key = [x,y,z].join("-");
                    return data[key];
            }
        }
    });
});

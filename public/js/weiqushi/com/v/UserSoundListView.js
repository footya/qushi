/*
 * @des 产品分析用户声音
 * @author hangyongsheng
 * @version 1.0
 */
define(function (require, exports, module) {
    
    var pid = new lib.url(window.location.href).getParam("id");
    var TabPagerModel = require('../m/TabPagerModel');
    var TabPagerView  = require('../v/TabPagerView');
    var TabPager      = require('../c/TabPager');
    var View      = require('./view');
    module.exports = lib.Class('UserSoundListView',{
        ns: 'lib.v',
        extend: View,
        construct: function (opt) {
            this.callsuper(opt);
            this._opt = opt || {};
            this._dateform = $("#j-date-form");//时间选择form
            this._formipt  = $("#j-from-date-input");//开始时间
            this._toipt    = $("#j-to-date-input");//结束时间
            this._usersoundtype = $("#j_usersound_type");//用户心声类型
            this._attitudetype  = $("#j_attitude_type");//feed态度
            this._usersoundbox  = $("#j_usersound_box");//用户心声feed容器
            this._usersoundpage = $("#j_usersound_pageer");//用户心声分页
            this._download = $("#j-down-yhsy")//数据下载
            this._params = {};
            this._params["type"] = "0";
            this._params["state"]= "-1";
            this._params["limit"]= 10;
            this._params["page"] = 1;//第几页
            this._params["pid"]  = pid;//[todo]获取pid
            this._pagetotal = 10;//总页数
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
            _changeDownLink:function(){
                //var href = this._download.attr("href");
                var url = 'http://qushi.udc.weibo.com/export/feedback';//new lib.url(href).url;
                var params = this.getParam();
                var query = [];
                for(var k in params){
                    if(k == "limit" || k == "page"){
                        continue;
                    }
                    query.push(k+"="+params[k]);
                }
                this._download.attr("href",url+"?"+query.join("&"));
            },
            _bindUserIsUseful:function(){
                var _this = this;
                this._usersoundbox.delegate('a[name=use_sign]', 'click', function(e){
                    if(e.preventDefault){
                        e.preventDefault();
                    }else{
                        e.returnValue = false;
                    }
                    var target = e.target || e.srcElement;
                    while(target.tagName.toLocaleLowerCase() !== "a") 
                    {
                      target = target.parentNode; 
                    }
                    _this._activeuseele = target;
                    if(target.getAttribute("dis") != 1){
                        _this._ctrl.notice({"type":"updateUsefullSign","data":{"pid":_this._params["pid"],"mid":target.getAttribute("data-mid"),"is_useful":1}});
                    }
                })
            },
            updateUsefullSign:function(data) {
                if(data.result.state == 1){
                    $(this._activeuseele).addClass("btn_true");
                    $(this._activeuseele).html('<i class="ico_com_true"></i>');
                    $(this._activeuseele).attr("dis",1);
                    '<span href="#" class="com_btn btn_true"><i class="ico_com_true"></i></span>'
                }
            },
            _initPager:function() {
                var _this = this;
                var _M  = new TabPagerModel();
                var _V  = new TabPagerView({"pagerfrom":this._usersoundbox,"pager":this._usersoundpage});
                this._tabPager = new TabPager({
                                                model:_M,
                                                view:_V
                                            });
                this._tabPager.on("select",function(e){
                   var num = e;
                   _this._params["page"] = num;
                   _this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                });
               //this._tabPager.init();
            },
            resetPager:function(opt){
                //this._params["page"] = 1;
                this._tabPager.init(opt);
            },
            //feed类型操作
            _bindUserSoundTypeLinks:function() {
                var _this = this;
                var _sign = 0;
                var activeclass = this._opt.actclass || "active";
                this._usersoundtype.delegate('a', 'click', function(e){
                    if(e.preventDefault){
                        e.preventDefault();
                    }else{
                        e.returnValue = false;
                    }
                    var _target = e.target || e.srcElement;
                    var _type = _target.getAttribute("data-value");
                    _this._usersoundtype.children("a").removeClass(activeclass);
                    _target.className = activeclass;
                    _this._params["type"] = _type;
		            _this._params["page"] = 1;
                    //_this.resetPager();
                    _this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                    //lib._PAGE_EVENT.fire({type:'g_usersound_for_datepicker_checkdate',"data":{"type":_type,"from":_this._formipt.val(),"to":_this._toipt.val()}}); 
                });
            },
            //feed类型操作
            _bindUserAttitudeTypeLinks:function() {
                var _this = this;
                var _sign = 0;
                var activeclass = this._opt.actclass || "active";
                this._attitudetype.delegate('a', 'click', function(e){
                    if(e.preventDefault){
                        e.preventDefault();
                    }else{
                        e.returnValue = false;
                    }
                    var _target = e.target || e.srcElement;
                    var _type = _target.getAttribute("data-value");
                    _this._attitudetype.children("a").removeClass(activeclass);
                    _target.className = activeclass;
                    //_this.resetPager();
                    _this._params["page"] = 1;
                    _this._params["state"] = _type;
                    _this._ctrl.notice({"type":"updateChartsView","data":_this.getParam()});
                    //lib._PAGE_EVENT.fire({type:'g_usersound_for_datepicker_checkdate',"data":{"type":_type,"from":_this._formipt.val(),"to":_this._toipt.val()}}); 
                });
            },
            //更新界面
            updateChartsView:function(data){

                //lib.log(JSON.stringify(data)+"*********************");
                var _this = this;
                var data = data.result;
                var d = [];
                var feed = data.statuses;
                if(data.total_number == 0){
                    this.showWarnInfo({msg:"暂无数据"});
                    this._usersoundpage.hide();
                    return;
                }else{
                    this._usersoundpage.show();
                }
                this._pagetotal = (data.total_number%this._params["limit"]) != 0 ? parseInt(data.total_number/this._params["limit"]) + 1 : parseInt(data.total_number/this._params["limit"]);
                this.resetPager({"total":this._pagetotal,"focus":this._params["page"]});
                $(feed).each(function(index,item) {
                    var _item = item;
                    var time = _this.dateFormat(new Date(),new Date(/UTC+/.test(_item.created_at) ? _item.created_at : _item.created_at.replace("+","UTC+")));
                    if(_item.deleted != 1){
                        var tpl = ['<li><div class="com_libox clearfix">',
                                        '<div class="com_ico">'+ parseInt(index+1) +'</div>',
                                        '<div class="com_pic"><a href="http://www.weibo.com/'+ (_item.user.domain || _item.user.profile_url) +'" target="_blank"><img src="'+ _item.user.avatar_large +'"></a></div>',
                                        '<div class="com_con">',
                                            '<div class="con_tit">'+_item.user.name+'</div>',
                                            '<p class="con_txt">'+ _item.text +'</p>',
                                            '<div class="con_info">',
                                            '<span class="txt_lf">'+time+'&nbsp;'+ _item.source.replace(/<\/?[^>]*>/g,'') +'</span>',
                                            '<span class="txt_rt">转发('+ _item.reposts_count +') |  评论('+_item.comments_count+')  </span>',
                                            '</div>',
                                        '</div>',
                                        '<a style="display:none;" href="#" class="com_btn" name="use_sign" data-pid="'+_this._params["pid"]+'" data-mid="'+item.mid+'">',
                                            '<i class="ico_com_star"></i><span>有用</span>',
                                        '</a>',
                                    '</div></li>'].join("");
                    }else{
                         var tpl = ['<li><div class="com_libox clearfix">',
                                        '抱歉，MID：'+ _item.mid + '的微博已被删除。',
                                    '</div></li>'].join("");
                    }
                    d.push(tpl);
                });
                this._usersoundbox.html(d.join(""));
                this._changeDownLink();
            },
            showWarnInfo:function(data) {
                this._usersoundbox.html('<p class="no_data_warn">'+data.msg+'</p>');
            },
            dateFormat :function(dServerTime, dFeedTime){
                var MTEXT = "月";
                var DTEXT = "日";
                var TODAYTEXT = "今天";
                var BSTEXT = "秒前";
                var BMTEXT = "分钟前";
                var server_year = dServerTime.getFullYear();
                var feed_year = dFeedTime.getFullYear();
                
                var server_month = dServerTime.getMonth() + 1;
                var feed_month = dFeedTime.getMonth() + 1;
                
                var server_day = dServerTime.getDate();
                var feed_day = dFeedTime.getDate();
                
                var server_hour = dServerTime.getHours();
                var feed_hour = dFeedTime.getHours();
                if(feed_hour < 10) feed_hour = "0" + feed_hour;
                var feed_minute = dFeedTime.getMinutes();
                if(feed_minute < 10) feed_minute = "0" + feed_minute;
                
                var diff_time = dServerTime - dFeedTime;
                diff_time = diff_time > 0 ? diff_time : 0;
                diff_time = diff_time/ 1000;
                
                if (server_year != feed_year) {
                    return feed_year + '-' + feed_month + '-' + feed_day + ' ' + feed_hour + ':' + feed_minute;
                } else 
                    if (server_month != feed_month || server_day != feed_day) {
                        return feed_month + MTEXT + feed_day + DTEXT + feed_hour + ':' + feed_minute;
                    } else if (server_hour != feed_hour && diff_time > (60 * 60)) {
                            return TODAYTEXT + feed_hour + ':' + feed_minute;
                        } else if(diff_time < 51){
                            diff_time = diff_time < 1 ? 1 : diff_time;
                            return (Math.floor((diff_time - 1) / 10) + 1) + "0" + BSTEXT;
                        } else {
                            return Math.floor((diff_time / 60) + 1) + BMTEXT;
                        }
                return '';
            },
            getParam:function() {
                this._params["from"] = this._formipt.val().replace(/\-/gi,"");
                this._params["to"]   = this._toipt.val().replace(/\-/gi,"");
                return this._params;
            }
        }
    });
});

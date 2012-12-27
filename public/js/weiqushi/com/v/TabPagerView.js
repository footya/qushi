/*
 * @des 三页签分页显示层
 * @author hangyongsheng
 * @version 1.0
 */
define(function (require, exports, module) {
    var View      = require('./view');
    module.exports = lib.Class('TabPagerView',
    {
        extend:View,
        construct:function(opt){
           var opt = opt || {};
           opt.pager = opt.pager || "";
           this.opt = opt;
           this.opt.pager    = $(opt.pager) || $("#j-pagelist-pager")//组件节点
           //this.opt.pagerfrom= $(opt.pagerfrom) || $("#j-pagelist")//组件节点
           this.opt.preCss   = opt.preCss  || ["","page_btn_none"];//上一个css数组[0]默认,[1]选中
           this.opt.nextCss  = opt.nextCss || ["","page_btn_none"];//下一个css数组[0]默认,[1]选中
           this.opt.step = opt.step || 10;//一页显示多少个
        },
        methods:
        {
            init:function(ctrl){
               this._ctrl = ctrl;
               this._getDoms();
               this._bindEvent();
            },
            _getDoms:function(){//获取所需节点
                this._self    = this.opt.pager;
                this._numbtn  = this._self.find('*[name=num]'); //页面显示节点
                this._nextbtn = this._self.find('*[name=next]');//下一个节点
                this._prebtn  = this._self.find('*[name=pre]'); //上一个节点
                this._player  = this._self.find('*[name=player]'); //分页浮层
            },
            initView:function(opt){//初始化界面
                var data = this.getPageInfo(opt);
                this._ctrl.syncSet(data);
            },
            update:function(data)
            {
                this.setPreBtbStatus(data);
                this.setNextBtbStatus(data);
                this.setNum(data);
                
            },
            setPreBtbStatus:function(data){
                if(data.focus == 1){
                    this._prebtn.removeClass(this.opt.preCss[0]);
                    this._prebtn.addClass(this.opt.preCss[1]);
                    this._prebtn.attr("data-dis","dis");
                }else{
                    this._prebtn.removeClass(this.opt.preCss[1]);
                    this._prebtn.addClass(this.opt.preCss[0]);
                    this._prebtn.attr("data-dis","act");
                }
            },
            setNextBtbStatus:function(data){
                if(data.focus == data.total){
                    this._nextbtn.removeClass(this.opt.nextCss[0]);
                    this._nextbtn.addClass(this.opt.nextCss[1]);
                    this._nextbtn.attr("data-dis","dis");
                }else{
                    this._nextbtn.removeClass(this.opt.nextCss[1]);
                    this._nextbtn.addClass(this.opt.nextCss[0]);
                    this._nextbtn.attr("data-dis","act");
                }
            },
            setNum:function(data){
                this._num = data.focus;
                var num = this.formatNum(data.focus);
                this._numbtn.html(num);
                this.setPlayer(data);
            },
            setPlayer:function(data) {
                var focus = data.focus;
                var total = data.total;
                var str = [];
                str.unshift("</ul>");
                for(var i=1;i<=total; i++){
                    if(i == focus){
                       //str.unshift('<a class="page current" data-value="'+ i +'" href="#">第&nbsp;'+ i +'&nbsp;页</a>');
                       str.unshift('<li>第'+ i +'页</li>');
                    }else{
                       str.unshift('<li><a href="#" data-value="'+ i +'">第'+ i +'页</a></li>');
                    }
                }
                str.unshift("<ul>");
                if(this._player){
                    this._player.html(str.join(""));
                }
            },
            //格式化需要显示的页码格式
            formatNum:function(num){
               // var des = this.opt.step;
               // var l = (num-1)*des + 1;
               // var r = num*des;
               return "第"+num+"页";
            },
            getPageInfo:function(opt){//需要子类获取总页数和当前页码
                var data    = {};
                data["total"]  =  opt.total || 10;
                data["focus"]  =  opt.focus || 1;
                return data;
            },
            //分页小浮层事件
            _bindPageLayerEvent:function(src,tar) {
                src = src || this._numbtn;
                tar = tar || this._player;
                var _srctimeer = null;
                var _this = this;
                src.on("mouseover",function() {
                        clearTimeout(_srctimeer);
                        tar.show();
                });
                src.on("mouseout",function(){
                    _srctimeer = setTimeout(function() {
                        tar.hide();
                    },400);
                });
                tar.on("mouseenter",function(){
                    clearTimeout(_srctimeer);
                });
                tar.on("click",function(){
                    tar.hide();
                });
                tar.on("mouseleave",function(){
                    _srctimeer = setTimeout(function() {
                        tar.hide();
                    },400);
                });
            },
            _bindEvent:function(){
                var _this = this;
                if(this._player){
                    this._bindPageLayerEvent();
                    this._player.delegate('a', 'click', function(e){
                        var e = window.event || e;
                        if(e.preventDefault){
                            e.preventDefault();
                        }else{
                            e.returnValue = false;
                        }
                        var target = e.target || e.srcElement;
                        var num = parseInt(target.getAttribute("data-value"));
                        //_this._num = num;
                        _this._ctrl.syncSet({"focus":num});
                        _this._ctrl.fire("select",num);
                    });
                }
                this._numbtn.on("click",function(e){
                    var e = window.event || e;
                    if(e.preventDefault){
                        e.preventDefault();
                    }else{
                        e.returnValue = false;
                    }
                });
                this._prebtn.on("click",function(e){
                    var e = window.event || e;
                    if(e.preventDefault){
                        e.preventDefault();
                    }else{
                        e.returnValue = false;
                    }
                    var target = e.target || e.srcElement;
                    target.blur();
                    if($(this).attr("data-dis") == "dis"){
                        return;
                    }
                    var num = _this._num - 1;
                    _this._ctrl.syncSet({"focus":num});
                    _this._ctrl.fire("select",num);
                });
                this._nextbtn.on("click",function(e){
                    var e = window.event || e;
                    if(e.preventDefault){
                        e.preventDefault();
                    }else{
                        e.returnValue = false;
                    }
                    var target = e.target || e.srcElement;
                    target.blur();
                    if($(this).attr("data-dis") == "dis"){
                        return;
                    }
                    var num = _this._num + 1;
                    //lib.log(num);
                    _this._ctrl.syncSet({"focus":num});
                    _this._ctrl.fire("select",num);
                })
            }
        }
    });
});